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
import NewPostsToggle from "../components/NewPostsToggle";
import JoinTeamForm from "../components/JoinTeamForm";
import Humans from "../components/Humans";
import PostSubmitModal from "../components/Modals/PostSubmitModal";
import getImageFilePreview from "../utils/getImageFilePreview";
import PostsGrid from "../components/PostsGrid";
import PostsFeed from "../components/PostsFeed";
import Footer from "../components/Footer";
import { RECENT_POSTS_COUNT } from "../utils/consts";

initFirebase();
const firestore = firebase.firestore();

const GRID_POSTS_PER_PAGE = 20;

export const ActionsContext = React.createContext({});
export const TeamContext = React.createContext({});
export const CurrentUserContext = React.createContext({});
export const ViewPropsContext = React.createContext({});

const Index = () => {
  const router = useRouter();
  const rootDiv = useRef(null);
  const spinnerDiv = useRef(null);
  const { user, isUserFetched } = useUser();
  const [timeframe, setTimeframe] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [showPostSubmitModal, setShowPostSubmitModal] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [droppedFile, setDroppedFile] = useState();
  const [searchString, setSearchString] = useState();
  const [openModal] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [team, setTeam] = useState({
    teamId: null,
    teamName: null,
  });
  const [userRole, setUserRole] = useState(null);
  const [posts, setPosts] = useState([]);
  const [postsHasMore, setPostsHasMore] = useState(true);
  const [teamMembersWithRecentPosts, setTeamMembersWithRecentPosts] = useState(
    []
  );

  let teamIdFromURL;
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    teamIdFromURL = urlParams.get("team");
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
          setIsFetched(true);
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
        setIsFetched(true);
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

  const fetchPosts = (teamId) => {
    if (!teamId) {
      return;
    }

    setIsFetchingMore(true);

    let query = firestore
      .collection(`/teams/${teamId}/posts`)
      .orderBy("postTimestamp", "desc");

    if (posts.length) {
      query = query.startAfter(posts[posts.length - 1].timestamp);
    }
    query = query.limit(GRID_POSTS_PER_PAGE + 1);

    query.get().then((postsSnapshot) => {
      const fetchedPosts = [];
      postsSnapshot.forEach((post) => {
        fetchedPosts.push(post.data().postData); // <3
      });
      const fetchHasMore = fetchedPosts.length === GRID_POSTS_PER_PAGE + 1;
      if (fetchHasMore) {
        fetchedPosts.pop();
      }
      setPosts([...posts, ...fetchedPosts]);
      if (!fetchHasMore) {
        setPostsHasMore(false);
      }
      setIsFetchingMore(false);
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
    if (["grid", "feed"].includes(viewMode) && !isFetched) {
      fetchPosts(team?.teamId);
    }
  }, [viewMode, isFetched]);

  useEffect(() => {
    if (searchString && searchString.length >= 2 && viewMode !== "list") {
      setViewMode("list");
    }
  }, [searchString]);

  useEffect(() => {
    if (user && !isFetched) {
      fetchUserTeam(user.id);
      setTimeout(() => {
        if (spinnerDiv.current) {
          spinnerDiv.current.style.opacity = 1;
        }
      }, 1500);
    }
  }, [user, isFetched]);

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
      lastPosts: [],
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
    setIsFetched(true);
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
            lastPosts: [],
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
    let recentPosts = teamMembersWithRecentPosts[userId].posts || {};
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
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      role: currentUser.role,
      avatarThumbUrl: currentUser.avatarThumbUrl,
    };
    post.timestamp = firebase.firestore.FieldValue.serverTimestamp();
    if (includeInNewsletter) {
      post.includeInNewsletter = true;
    }

    recentPostIds = recentPostIds.slice(0, RECENT_POSTS_COUNT);
    recentPosts = { ...recentPosts, [postId]: post };

    Object.keys(recentPosts).forEach((key) => {
      const p = recentPosts[key];
      if (!recentPostIds.includes(p.postId)) {
        recentPosts[key] = firebase.firestore.FieldValue.delete();
      }
    });

    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [userId]: {
        ...teamMembersWithRecentPosts[userId],
        recentPostIds,
        recentPosts: recentPosts,
        totalPostCount: teamMembersWithRecentPosts[userId].totalPostCount + 1,
      },
    });
    setPosts([post, ...posts]);

    firestore
      .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${userId}`)
      .update({
        recentPostIds,
        recentPosts,
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
    const postIds = teamMembersWithRecentPosts[userId].postIds.filter(
      (pId) => pId !== postId
    );

    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [user.id]: {
        ...teamMembersWithRecentPosts[user.id],
        postIds,
      },
    });

    const postsFiltered = posts.filter((p) => p.postId !== postId);
    setPosts(postsFiltered);

    firestore
      .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${userId}`)
      .update({
        postIds,
        [`posts.${postId}`]: firebase.firestore.FieldValue.delete(),
      });
    firestore.doc(`/teams/${teamId}/posts/${postId}`).delete();
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

  const showStartTeamForm = isFetched && !team?.teamId && !teamIdFromURL;
  const showJoinTeamForm = isFetched && !team?.teamId && teamIdFromURL;
  const showTeamDirectoty =
    isFetched && Object.keys(teamMembersWithRecentPosts).length > 0;

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
      teamMembersArray = teamMembersArray.filter((u) =>
        `${u.firstName.toLowerCase()} ${u.lastName.toLowerCase()}`.includes(
          searchString.toLowerCase()
        )
      );
    }
  }

  const updateCommentCount = ({
    teamId,
    postId,
    postAuthorId,
    newCommentCount,
  }) => {
    const post = teamMembersWithRecentPosts[postAuthorId].posts[postId];
    const indexInPosts = posts.findIndex((p) => p.postId === postId);

    const updatedPost = {
      ...post,
      commentCount: newCommentCount,
    };
    const updatesPosts = [...posts];
    updatesPosts[indexInPosts] = updatedPost;

    setTeamMembersWithRecentPosts({
      ...teamMembersWithRecentPosts,
      [postAuthorId]: {
        ...teamMembersWithRecentPosts[postAuthorId],
        posts: {
          ...teamMembersWithRecentPosts[postAuthorId].posts,
          [postId]: updatedPost,
        },
      },
    });

    setPosts(updatesPosts);

    firestore
      .doc(`/teams/${teamId}/teamMembersWithRecentPosts/${postAuthorId}`)
      .update({
        [`posts.${postId}.commentCount`]: newCommentCount,
      });
    firestore.doc(`/teams/${teamId}/posts/${postId}`).update({
      ["postData.commentCount"]: newCommentCount,
    });
  };

  const onCommentSubmit = ({
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

  const onCommentRemove = ({
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

  // TODO: naming consistency
  const actions = { onCommentSubmit, onCommentRemove, updateTeam };

  const currentUser = user.id ? teamMembersWithRecentPosts[user.id] : {};

  return (
    <>
      <ActionsContext.Provider value={actions}>
        <TeamContext.Provider value={team}>
          <CurrentUserContext.Provider value={{ currentUser }}>
            <ViewPropsContext.Provider value={{ timeframe }}>
              <Head teamName={team?.teamName} />
              <link
                rel="stylesheet"
                media="screen, projection"
                href="/home.css"
              />
              <div
                className={c(
                  "home-page",
                  showForm && "home-sisu-page",
                  !isFetched && "loading"
                )}
                ref={rootDiv}
              >
                {!isFetched && (
                  <div
                    ref={spinnerDiv}
                    className="spinner-box"
                    style={{ opacity: 0 }}
                  >
                    <div className="circle-border">
                      <div className="circle-core"></div>
                    </div>
                  </div>
                )}
                {isFetched && (
                  <StickyBar
                    isTeamEditable={userRole === "admin"}
                    teamName={team?.teamName}
                    teamId={team?.teamId}
                    teamLogo={team?.teamLogo}
                    viewMode={viewMode}
                    onSetViewMode={onSetViewMode}
                  />
                )}
                {openModal && (
                  <PostModal
                    image="https://source.unsplash.com/random?6"
                    description="This wonderfull view I had when I visited Croatia with my team of frontend and backend developers this autumn."
                  />
                )}
                {showJoinTeamForm && <JoinTeamForm onJoinTeam={joinTeam} />}
                {showStartTeamForm && <StartTeamForm onStartTeam={startTeam} />}
                {showTeamDirectoty && (
                  <div className="directory">
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
                    <NewPostsToggle
                      timeframe={timeframe}
                      onSetTimeframe={onSetTimeframe}
                    />
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
                        <PostsGrid
                          posts={posts}
                          onShowPostSubmitModal={onShowPostSubmitModal}
                          onPostRemove={onPostRemove}
                        />
                        {posts.length > 0 && postsHasMore && (
                          <button
                            className="button-wrapper load-more-button-wrapper"
                            onClick={() => fetchPosts(team?.teamId)}
                          >
                            <span
                              className={c(
                                "button button-secondary button-white",
                                isFetchingMore && "busy"
                              )}
                              tabIndex="-1"
                            >
                              Load more
                            </span>
                          </button>
                        )}
                      </div>
                    )}
                    {viewMode === "feed" && (
                      <div className="feed-view">
                        <PostsFeed posts={posts} onPostRemove={onPostRemove} />
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
            </ViewPropsContext.Provider>
          </CurrentUserContext.Provider>
        </TeamContext.Provider>
      </ActionsContext.Provider>
    </>
  );
};

export default Index;
