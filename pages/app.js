import c from "classnames";
import orderBy from "lodash.orderby";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import { useUser } from "../utils/auth/useUser";
import StickyBar from "../components/StickyBar";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import Head from "./_head";
import { useEffect, useState, useRef, useCallback } from "react";
import initFirebase from "../utils/auth/initFirebase";
import PostModal from "../components/Modals/PostModal";
import StartTeamForm from "../components/StartTeamForm";
import TimeframeToggle from "../components/TimeframeToggle";
import JoinTeamForm from "../components/JoinTeamForm";
import Humans from "../components/Humans";
import PostSubmitModal from "../components/Modals/PostSubmitModal";
import getImageFilePreview from "../utils/getImageFilePreview";
import PostsGrid from "../components/PostsGrid";
import PostsFeed from "../components/PostsFeed";
import Footer from "../components/Footer";
import { RECENT_POSTS_COUNT, TEAM_POSTS_PER_PAGE } from "../utils/consts";
import LoadingIndicator from "../components/LoadingIndicator";
import getFromTimestamp from "../utils/getFromTimestamp";
import ViewModeTabs from "../components/ViewModeTabs";

initFirebase();
const firestore = firebase.firestore();

export const ActionsContext = React.createContext({});
export const TeamContext = React.createContext({});
export const CurrentUserContext = React.createContext({});
export const TimeframeContext = React.createContext({});

const Index = () => {
  const router = useRouter();
  const rootDiv = useRef(null);
  const { user, isUserFetched } = useUser();
  const [timeframe, setTimeframe] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [showPostSubmitModal, setShowPostSubmitModal] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [droppedFile, setDroppedFile] = useState();
  const [searchString, setSearchString] = useState();
  const [isTeamFetched, setIsTeamFetched] = useState(false);
  const [areTeamPostsFetched, setAreTeamPostsFetched] = useState(false);
  const [isFetchingInitial, setIsFetchingInitial] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [team, setTeam] = useState({
    teamId: null,
    teamName: null,
  });
  const [userRole, setUserRole] = useState(null);
  const [teamPosts, setTeamPosts] = useState([]);
  const [teamPostsHasMore, setTeamPostsHasMore] = useState(true);
  const [teamMembersWithRecentPosts, setTeamMembersWithRecentPosts] = useState(
    []
  );

  let teamIdFromURL;
  let forNewsletterOnly = false;
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    teamIdFromURL = urlParams.get("team");
    if (window.location.search.includes("newsletter")) {
      forNewsletterOnly = true;
    }
  }

  const fetchUserTeam = (userId) => {
    firestore
      .doc(`/userTeams/${userId}`)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data) {
          setUserRole(data.role);
          fetchTeam(data.teamId);
          fetchTeamMembersWithRecentPosts(data.teamId);
        } else {
          setIsTeamFetched(true);
        }
      });
  };

  const fetchTeam = (teamId) => {
    firestore
      .doc(`/teams/${teamId}`)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data) {
          setTeam(data);
        }
        setIsTeamFetched(true);
      });
  };

  const fetchTeamMembersWithRecentPosts = (teamId) => {
    firestore
      .collection(`/teams/${teamId}/teamMembersWithRecentPosts`)
      .get()
      .then((membersSnapshot) => {
        const fetchedMembers = [];
        membersSnapshot.forEach((m) => {
          const member = m.data();
          fetchedMembers[member.id] = member;
        });
        setTeamMembersWithRecentPosts(fetchedMembers);
      });
  };

  const fetchTeamPosts = (teamId, fetchMore) => {
    if (!teamId) {
      return;
    }

    fetchMore ? setIsFetchingMore(true) : setIsFetchingInitial(true);

    let query = firestore
      .collection(`/teams/${teamId}/posts`)
      .orderBy("postTimestamp", "desc");

    if (timeframe) {
      const fromTimestamp = getFromTimestamp(timeframe);
      query = query.where(
        "postTimestamp",
        ">=",
        firebase.firestore.Timestamp.fromDate(new Date(fromTimestamp * 1000))
      );
    }

    if (fetchMore) {
      query = query.startAfter(teamPosts[teamPosts.length - 1].timestamp);
    }
    query = query.limit(TEAM_POSTS_PER_PAGE + 1);

    query.get().then((postsSnapshot) => {
      const fetchedPosts = [];
      postsSnapshot.forEach((post) => {
        const postData = post.data().postData; // <3
        if (
          !forNewsletterOnly ||
          (forNewsletterOnly && postData.includeInNewsletter)
        ) {
          fetchedPosts.push(post.data().postData);
        }
      });
      const fetchHasMore = fetchedPosts.length === TEAM_POSTS_PER_PAGE + 1;
      if (fetchHasMore) {
        fetchedPosts.pop();
      }
      if (fetchMore) {
        setTeamPosts([...teamPosts, ...fetchedPosts]);
      } else {
        setTeamPosts(fetchedPosts);
      }
      setAreTeamPostsFetched(true);
      if (!fetchHasMore) {
        setTeamPostsHasMore(false);
      }
      fetchMore ? setIsFetchingMore(false) : setIsFetchingInitial(false);
    });
  };

  const onDragEnter = () => {
    setIsDragActive(true);
    setShowPostSubmitModal(true);
  };

  const onDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();

    let file;
    if (e.dataTransfer.items) {
      file = e.dataTransfer.items[0].getAsFile();
    } else {
      file = e.dataTransfer.files[0];
    }
    setDroppedFile(file);
  };

  useEffect(() => {
    const viewModeFromStorage =
      localStorage.getItem("app.viewMode") || viewMode;
    const timeframeFromStorage = localStorage.getItem("app.timeframe") || null;

    setViewMode(viewModeFromStorage);
    setTimeframe(timeframeFromStorage);

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get("q");
      if (query) {
        setSearchString(query);
      }
    }
    window.document.addEventListener("dragenter", onDragEnter);
    window.document.addEventListener("dragover", onDragOver);
    window.document.addEventListener("drop", onDrop);

    // hack: extend auth cookie expiration date
    setTimeout(() => {
      cookies.set("auth", cookies.get("auth"), { expires: 1000 });
    }, 1000);

    return () => {
      window.document.removeEventListener("dragenter", onDragEnter);
      window.document.removeEventListener("dragover", onDragOver);
      window.document.removeEventListener("drop", onDrop);
    };
  }, []);

  useEffect(() => {
    if (["grid", "feed"].includes(viewMode) && !areTeamPostsFetched) {
      fetchTeamPosts(team?.teamId);
    }
  }, [viewMode, isTeamFetched]);

  // re-fetch on timeframe change
  const prevTimeframeRef = useRef();
  useEffect(() => {
    if (
      ["grid", "feed"].includes(viewMode) &&
      prevTimeframeRef.current !== undefined &&
      prevTimeframeRef.current !== timeframe &&
      areTeamPostsFetched &&
      !isFetchingInitial &&
      team?.teamId
    ) {
      setTeamPosts([]);
      setAreTeamPostsFetched(false);
      fetchTeamPosts(team?.teamId);
    }
    prevTimeframeRef.current = timeframe;
  }, [timeframe, viewMode, team, areTeamPostsFetched]);

  useEffect(() => {
    if (searchString && searchString.length >= 2 && viewMode !== "list") {
      setViewMode("list");
    }
  }, [searchString]);

  useEffect(() => {
    if (user && !isTeamFetched) {
      fetchUserTeam(user.id);
    }
  }, [user, isTeamFetched]);

  if (!user) {
    if (isUserFetched) {
      // http://localhost:3000/?team=OmDHMXlbFNTWeaqBeabLlie4CaK2
      const urlParams = new URLSearchParams(window.location.search);
      const team = urlParams.get("team");
      let redirectTo = team ? `/auth?team=${team}` : "/auth";
      router.push(redirectTo);
    }
    return null;
  }

  const startTeam = ({ firstName, lastName, teamName, teamLogo, teamId }) => {
    const teamData = {
      teamId,
      teamName,
    };
    if (teamLogo) {
      teamData.teamLogo = teamLogo;
    }
    const teamMember = {
      id: user.id,
      firstName,
      lastName,
      recentPosts: [],
      totalPostCount: 0,
    };
    firestore
      .doc(`/teams/${teamId}`)
      .set(teamData)
      .then(() => {
        firestore
          .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${user.id}`)
          .set(teamMember);
      });
    firestore.doc(`/userTeams/${user.id}`).set({
      teamId,
      role: "admin",
    });
    setUserRole("admin");
    setTeam(teamData);
    setTeamMembersWithRecentPosts({ [user.id]: teamMember });
    setIsTeamFetched(true);
  };

  const joinTeam = ({ firstName, lastName }) => {
    firestore
      .doc(`/userTeams/${user.id}`)
      .set({ teamId: teamIdFromURL, role: "member" })
      .then(() => {
        firestore
          .doc(`/teams/${teamIdFromURL}/teamMembersWithRecentPosts/${user.id}`)
          .set({
            id: user.id,
            firstName,
            lastName,
            recentPosts: [],
            totalPostCount: 0,
          })
          .then(() => {
            setUserRole("member");
            fetchTeam(teamIdFromURL);
            fetchTeamMembersWithRecentPosts(teamIdFromURL);
          });
      });
  };

  const updateHuman = ({
    firstName,
    lastName,
    role,
    avatarThumbUrl,
    avatarFullUrl,
  }) => {
    if (!team?.teamId) {
      return;
    }
    firestore
      .doc(`/teams/${team.teamId}/teamMembersWithRecentPosts/${user.id}`)
      .update({
        firstName,
        lastName,
        role: role || null,
        avatarThumbUrl: avatarThumbUrl || null,
        avatarFullUrl: avatarFullUrl || null,
      });

    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [user.id]: {
        ...teamMembersWithRecentPosts[user.id],
        firstName,
        lastName,
        role,
        avatarThumbUrl,
        avatarFullUrl,
      },
    });
  };

  const onShowPostSubmitModal = () => setShowPostSubmitModal(true);

  const onClosePostSubmitModal = () => {
    setShowPostSubmitModal(false);
    setDroppedFile(null);
    setIsDragActive(false);
  };

  const onPostSubmit = ({
    postId,
    teamId,
    userId,
    fullImageUrl,
    thumbImageUrl,
    description,
    includeInNewsletter,
  }) => {
    let recentPosts = teamMembersWithRecentPosts[userId].recentPosts || {};
    let recentPostIds = teamMembersWithRecentPosts[userId].recentPostIds || [];
    const isNewPost = !recentPostIds.includes(postId);
    if (isNewPost) {
      recentPostIds.unshift(postId);
    }
    const post = {
      postId,
    };
    if (fullImageUrl && thumbImageUrl) {
      post.fullImageUrl = fullImageUrl;
      post.thumbImageUrl = thumbImageUrl;
    }
    post.description = description || "";
    const currentUser = teamMembersWithRecentPosts[userId] || {
      id: userId,
    };
    post.author = {
      id: userId,
      firstName: currentUser.firstName || null,
      lastName: currentUser.lastName || null,
      role: currentUser.role || null,
      avatarThumbUrl: currentUser.avatarThumbUrl || null,
    };
    post.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    if (includeInNewsletter) {
      post.includeInNewsletter = true;
    }

    const postForUIState = {
      ...post,
    };
    postForUIState.timestamp = {
      seconds: +new Date(),
    };

    const totalPostCount =
      teamMembersWithRecentPosts[userId].totalPostCount + 1;
    recentPostIds = recentPostIds.slice(0, RECENT_POSTS_COUNT);
    recentPosts = { ...recentPosts, [postId]: post };
    const recentPostsForUIState = { ...recentPosts, [postId]: postForUIState };

    console.log({ recentPostIds });

    Object.keys(recentPosts).forEach((key) => {
      const p = recentPosts[key];
      if (!recentPostIds.includes(p.postId)) {
        delete recentPosts[key];
      }
    });

    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [userId]: {
        ...teamMembersWithRecentPosts[userId],
        recentPostIds,
        recentPosts: recentPostsForUIState,
        totalPostCount,
      },
    });
    setTeamPosts([postForUIState, ...teamPosts]);
    window.scrollTo(0, 0);

    firestore
      .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${userId}`)
      .update({
        recentPostIds,
        recentPosts,
        totalPostCount,
      });

    if (isNewPost) {
      firestore.doc(`/teams/${teamId}/posts/${postId}`).set({
        postTimestamp: post.timestamp,
        postData: post,
      });
      firestore.doc(`/users/${userId}/posts/${postId}`).set({
        postTimestamp: post.timestamp,
        postData: post,
      });
    }
  };

  const onPostRemove = (postId) => {
    const userId = user.id;
    const teamId = team?.teamId;
    if (!userId || !teamId) {
      return;
    }

    // quick update
    const recentPostIds = teamMembersWithRecentPosts[
      userId
    ].recentPostIds.filter((pId) => pId !== postId);

    const newTotalPostCount =
      teamMembersWithRecentPosts[userId].totalPostCount - 1;
    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [user.id]: {
        ...teamMembersWithRecentPosts[userId],
        recentPostIds,
        newTotalPostCount,
      },
    });

    const postsFiltered = teamPosts.filter((p) => p.postId !== postId);
    setTeamPosts(postsFiltered);

    firestore.doc(`/teams/${teamId}/posts/${postId}`).delete();
    firestore
      .doc(`/users/${userId}/posts/${postId}`)
      .delete()
      .then(() => {
        const query = firestore
          .collection(`/users/${userId}/posts`)
          .orderBy("postTimestamp", "desc")
          .limit(RECENT_POSTS_COUNT);
        query.get().then((postsSnapshot) => {
          const newRecentPosts = {};
          const newRecentPostIds = [];
          postsSnapshot.forEach((post) => {
            const postData = post.data().postData; // <3
            newRecentPostIds.push(postData.postId);
            newRecentPosts[postData.postId] = postData;
          });
          setTeamMembersWithRecentPosts({
            ...teamMembersWithRecentPosts,
            [user.id]: {
              ...teamMembersWithRecentPosts[user.id],
              recentPostIds: newRecentPostIds,
              recentPosts: newRecentPosts,
            },
          });

          firestore
            .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${userId}`)
            .update({
              recentPostIds: newRecentPostIds,
              recentPosts: newRecentPosts,
              totalPostCount: newTotalPostCount,
            });
        });
      });
  };

  const updateTeam = ({ teamId, teamName, teamLogo }) => {
    const updates = { teamName };
    if (teamLogo) {
      updates.teamLogo = teamLogo;
    }
    setTeam({
      ...team,
      ...updates,
    });
    firestore.doc(`/teams/${teamId}/`).update(updates);
  };

  const onSetViewMode = (viewMode) => {
    setViewMode(viewMode);
    localStorage.setItem("app.viewMode", viewMode);
  };

  const onSetTimeframe = (timeframe) => {
    setTimeframe(timeframe);
    if (timeframe) {
      localStorage.setItem("app.timeframe", timeframe);
    } else {
      localStorage.removeItem("app.timeframe");
    }
  };

  const showStartTeamForm = isTeamFetched && !team?.teamId && !teamIdFromURL;
  const showJoinTeamForm = isTeamFetched && !team?.teamId && teamIdFromURL;
  const showTeamDirectoty =
    isTeamFetched && Object.keys(teamMembersWithRecentPosts).length > 0;

  const showForm = showStartTeamForm || showJoinTeamForm;

  let teamMembersArray;

  const teamMembersArrayUnsorted = [];
  if (teamMembersWithRecentPosts) {
    Object.keys(teamMembersWithRecentPosts).forEach((key) => {
      teamMembersArrayUnsorted.push(teamMembersWithRecentPosts[key]);
    });

    // TODO: sort in firebase
    teamMembersArray = orderBy(
      teamMembersArrayUnsorted,
      [(u) => `${u.firstName.toLowerCase()} ${u.lastName.toLowerCase()}`],
      ["asc"]
    );

    if (teamMembersArray.length) {
      // put yourself first
      teamMembersArray = [
        teamMembersArray.find((m) => m.id === user.id),
        ...teamMembersArray.filter((m) => m.id !== user.id),
      ];
    }

    if (searchString && searchString.length >= 2) {
      teamMembersArray = teamMembersArray.filter((u) => {
        const searchStringLower = searchString.toLowerCase();
        return (
          `${u.firstName.toLowerCase()} ${u.lastName.toLowerCase()}`.includes(
            searchStringLower
          ) ||
          // TODO: either 3 capital letters or more than 4
          (u.role && u.role.toLowerCase().includes(searchStringLower))
        );
      });
    }
  }

  const updateCommentCount = ({
    teamId,
    postId,
    postAuthorId,
    newCommentCount,
  }) => {
    // TODO: might be a comment in grid view
    const post = teamMembersWithRecentPosts[postAuthorId].recentPosts[postId];
    const indexInPosts = teamPosts.findIndex((p) => p.postId === postId);

    const updatedPost = {
      ...post,
      commentCount: newCommentCount,
    };
    const updatedTeamPosts = [...teamPosts];
    updatedTeamPosts[indexInPosts] = updatedPost;

    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [postAuthorId]: {
        ...teamMembersWithRecentPosts[postAuthorId],
        // TODO: this is not right
        recentPosts: {
          ...teamMembersWithRecentPosts[postAuthorId].recentPosts,
          [postId]: updatedPost,
        },
      },
    });

    setTeamPosts(updatedTeamPosts);

    firestore
      .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${postAuthorId}/`)
      .update({
        [`recentPosts.${postId}.commentCount`]: newCommentCount,
      });
    firestore.doc(`/teams/${teamId}/posts/${postId}`).update({
      ["postData.commentCount"]: newCommentCount,
    });
    firestore.doc(`/users/${postAuthorId}/posts/${postId}`).update({
      ["postData.commentCount"]: newCommentCount,
    });
  };

  const submitComment = ({
    teamId,
    postAuthorId,
    postId,
    newComment,
    newCommentCount,
  }) => {
    firestore
      .doc(
        `/teams/${teamId}/postComments/${postId}/comments/${newComment.commentId}`
      )
      .set({
        commentTimestamp: newComment.timestamp,
        commentData: newComment,
      });

    updateCommentCount({
      teamId,
      postId,
      postAuthorId,
      newCommentCount,
    });
  };

  const removeComment = ({
    teamId,
    postId,
    postAuthorId,
    commentId,
    newCommentCount,
  }) => {
    updateCommentCount({ teamId, postId, postAuthorId, newCommentCount });
    firestore
      .doc(`/teams/${teamId}/postComments/${postId}/comments/${commentId}`)
      .delete();
  };

  const actions = { submitComment, removeComment, updateTeam };

  const currentUser = user.id ? teamMembersWithRecentPosts[user.id] : {};

  return (
    <>
      <ActionsContext.Provider value={actions}>
        <TeamContext.Provider value={team}>
          <CurrentUserContext.Provider value={{ currentUser }}>
            <TimeframeContext.Provider
              value={{
                timeframe,
                fromTimestamp: timeframe && getFromTimestamp(timeframe),
              }}
            >
              <Head teamName={team?.teamName} />
              <link
                rel="stylesheet"
                media="screen, projection"
                href="/app.css"
              />
              <div
                className={c(
                  "app-page",
                  showForm && "app-sisu-page",
                  !isTeamFetched && "loading"
                )}
                ref={rootDiv}
              >
                {!isTeamFetched && <LoadingIndicator showWithDelay />}
                {isTeamFetched && (
                  <StickyBar
                    isTeamEditable={userRole === "admin"}
                    teamName={team?.teamName}
                    teamId={team?.teamId}
                    teamLogo={team?.teamLogo}
                    viewMode={viewMode}
                    onSetViewMode={onSetViewMode}
                  />
                )}
                {showJoinTeamForm && <JoinTeamForm onJoinTeam={joinTeam} />}
                {showStartTeamForm && <StartTeamForm onStartTeam={startTeam} />}
                {showTeamDirectoty && (
                  <div className="directory">
                    {viewMode === "list" && (
                      <div className="input-wrapper input-search-wrapper">
                        <img src="/icons/magnifying_glass.svg" />
                        <input
                          className="input input-search"
                          id="email"
                          type="text"
                          autoComplete="off"
                          spellCheck={false}
                          placeholder="Search by name or role"
                          value={searchString}
                          onChange={(e) => setSearchString(e.target.value)}
                        />
                      </div>
                    )}
                    <TimeframeToggle
                      timeframe={timeframe}
                      onSetTimeframe={onSetTimeframe}
                    />
                    <ViewModeTabs />
                    {viewMode === "list" && teamMembersArray && (
                      <Humans
                        humans={teamMembersArray}
                        teamId={team?.teamId}
                        currentUserId={user.id}
                        onHumanEditSubmit={updateHuman}
                        onShowPostSubmitModal={onShowPostSubmitModal}
                        onPostRemove={onPostRemove}
                        searchString={
                          searchString &&
                          searchString.length >= 2 &&
                          searchString
                        }
                      />
                    )}
                    {viewMode === "grid" && (
                      <div className="grid-view">
                        {!areTeamPostsFetched && (
                          <LoadingIndicator withWrapper />
                        )}
                        {areTeamPostsFetched && (
                          <PostsGrid
                            posts={
                              // unless the last page, show -1 num of items to leave room for the "+" button
                              teamPostsHasMore
                                ? teamPosts.slice(0, teamPosts.length - 1)
                                : teamPosts
                            }
                            onShowPostSubmitModal={onShowPostSubmitModal}
                            onPostRemove={onPostRemove}
                          />
                        )}
                        {isFetchingMore && <LoadingIndicator withWrapper />}
                        {areTeamPostsFetched &&
                          teamPostsHasMore &&
                          !isFetchingMore && (
                            <button
                              className="button button-secondary button-white a-real-large-button load-more-button"
                              tabIndex="-1"
                              onClick={() => fetchTeamPosts(team?.teamId, true)}
                            >
                              <span>Load more</span>
                            </button>
                          )}
                      </div>
                    )}
                    {viewMode === "feed" && (
                      <div className="feed-view">
                        {!areTeamPostsFetched && (
                          <LoadingIndicator withWrapper />
                        )}
                        {areTeamPostsFetched && (
                          <>
                            <button
                              className="button button-secondary button-white feed-submit-post-button a-real-large-button"
                              tabIndex="-1"
                              onClick={onShowPostSubmitModal}
                            >
                              <img src="/icons/plus.svg" />
                              <span>Submit a Post</span>
                            </button>
                            <PostsFeed
                              posts={teamPosts}
                              onPostRemove={onPostRemove}
                            />
                            {isFetchingMore && <LoadingIndicator withWrapper />}
                            {teamPosts.length > 0 &&
                              teamPostsHasMore &&
                              !isFetchingMore && (
                                <button
                                  className="button button-secondary button-white a-real-large-button load-more-button"
                                  tabIndex="-1"
                                  onClick={() =>
                                    fetchTeamPosts(team?.teamId, true)
                                  }
                                >
                                  <span>Load more</span>
                                </button>
                              )}
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Footer />
              {showPostSubmitModal && (
                <PostSubmitModal
                  userId={user.id}
                  teamId={team?.teamId}
                  imageFile={droppedFile}
                  imagePreview={droppedFile && getImageFilePreview(droppedFile)}
                  onPostSubmit={onPostSubmit}
                  onClose={onClosePostSubmitModal}
                  isDragActive={isDragActive}
                />
              )}
            </TimeframeContext.Provider>
          </CurrentUserContext.Provider>
        </TeamContext.Provider>
      </ActionsContext.Provider>
    </>
  );
};

export default Index;
