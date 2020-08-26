import c from "classnames";
import orderBy from "lodash.orderby";
import { useRouter } from "next/router";
import { useUser } from "../utils/auth/useUser";
import StickyBar from "../components/StickyBar";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import Head from "./_head";
import { useEffect, useState, useRef } from "react";
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
  const { user, isUserFetched } = useUser();
  const [timeframe, setTimeframe] = useState(null);
  const [viewMode, setViewMode] = useState("list");
  const [showPostSubmitModal, setShowPostSubmitModal] = useState(false);
  const [isDragActive, setIsDragActive] = useState(false);
  const [droppedFile, setDroppedFile] = useState();
  const [searchString, setSearchString] = useState();
  const [openModal] = useState(false);
  const [teamState, setTeamState] = useState({
    isFetched: false,
    data: {
      teamId: null,
      teamName: null,
      teamMembers: [],
    },
  });
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [postsHasMore, setPostsHasMore] = useState(true);

  let teamIdFromURL;
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    teamIdFromURL = urlParams.get("team");
  }

  const fetchTeam = (teamId) => {
    firestore
      .doc(`/teams/${teamId}`)
      .get()
      .then((doc) => {
        const data = doc.data();
        if (data && data.joinedTeamId) {
          fetchTeam(data.joinedTeamId);
          return;
        }
        console.log("teamData", data);
        setTeamState({
          isFetched: true,
          data,
        });
      });
  };

  const fetchPosts = (teamId) => {
    if (!teamId) {
      return;
    }

    setIsFetching(true);

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
      setIsFetching(false);
      if (!fetchHasMore) {
        setPostsHasMore(fetchHasMore);
      }
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
    return () => {
      window.document.removeEventListener("dragenter", onDragEnter);
      window.document.removeEventListener("dragover", onDragOver);
      window.document.removeEventListener("drop", onDrop);
    };
  }, []);

  useEffect(() => {
    if (["grid", "feed"].includes(viewMode) && !posts.length) {
      fetchPosts(teamState.data?.teamId);
    }
  }, [viewMode, teamState]);

  useEffect(() => {
    if (searchString && searchString.length >= 2 && viewMode !== "list") {
      setViewMode("list");
    }
  }, [searchString]);

  useEffect(() => {
    if (user) {
      fetchTeam(user.id);
    }
  }, [user]);

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

  const startTeam = ({ firstName, lastName, teamName }) => {
    const teamData = {
      teamId: user.id,
      teamName,
      teamMembers: {
        [`${user.id}`]: { id: user.id, firstName, lastName },
      },
    };
    firestore.doc(`/teams/${user.id}`).set(teamData);
    setTeamState({
      isFetched: true,
      data: teamData,
    });
  };

  const joinTeam = ({ firstName, lastName }) => {
    firestore.doc(`/teams/${user.id}`).set({ joinedTeamId: teamIdFromURL });
    firestore
      .doc(`/teams/${teamIdFromURL}`)
      .update({
        [`teamMembers.${user.id}.id`]: user.id,
        [`teamMembers.${user.id}.firstName`]: firstName,
        [`teamMembers.${user.id}.lastName`]: lastName,
      })
      .then(() => {
        fetchTeam(teamIdFromURL);
      });
  };

  const updateHuman = ({
    firstName,
    lastName,
    role,
    avatarThumbUrl,
    avatarFullUrl,
  }) => {
    if (!teamState.data?.teamId) {
      return;
    }
    firestore.doc(`/teams/${teamState.data?.teamId}`).update({
      [`teamMembers.${user.id}.firstName`]: firstName,
      [`teamMembers.${user.id}.lastName`]: lastName,
      [`teamMembers.${user.id}.role`]: role || null,
      [`teamMembers.${user.id}.avatarThumbUrl`]: avatarThumbUrl || null,
      [`teamMembers.${user.id}.avatarFullUrl`]: avatarFullUrl || null,
    });
    setTeamState({
      isFetched: true,
      data: {
        ...teamState.data,
        teamMembers: {
          ...teamState.data.teamMembers,
          [`${user.id}`]: {
            ...teamState.data.teamMembers[user.id],
            firstName,
            lastName,
            role,
            avatarThumbUrl,
            avatarFullUrl,
          },
        },
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
  }) => {
    const allUserPostIds = teamState.data?.teamMembers[userId].postIds || [];
    const isNewPost = !allUserPostIds.includes(postId);
    if (isNewPost) {
      allUserPostIds.unshift(postId);
    }
    const post = {
      postId,
    };
    if (fullImageUrl && thumbImageUrl) {
      post.fullImageUrl = fullImageUrl;
      post.thumbImageUrl = thumbImageUrl;
    }
    post.description = description || "";
    const currentUser = teamState.data.teamMembers[user.id];
    post.author = {
      id: currentUser.id,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      role: currentUser.role,
      avatarThumbUrl: currentUser.avatarThumbUrl,
    };
    post.timestamp = firebase.firestore.FieldValue.serverTimestamp();

    setTeamState({
      isFetched: true,
      data: {
        ...teamState.data,
        teamMembers: {
          ...teamState.data.teamMembers,
          [`${user.id}`]: {
            ...teamState.data.teamMembers[user.id],
            postIds: allUserPostIds,
            posts: {
              ...teamState.data.teamMembers[user.id].posts,
              [postId]: post,
            },
          },
        },
      },
    });
    setPosts([post, ...posts]);

    firestore.doc(`/teams/${teamId}/`).update({
      [`teamMembers.${userId}.postIds`]: allUserPostIds,
      [`teamMembers.${userId}.posts.${postId}`]: post,
    });

    if (isNewPost) {
      firestore.doc(`/teams/${teamId}/posts/${postId}`).set({
        postTimestamp: post.timestamp,
        postData: post,
      });
    }
  };

  const onPostRemove = (postId) => {
    const userId = user.id;
    const teamId = teamState.data?.teamId;
    if (!userId || !teamId) {
      return;
    }
    const postIds = teamState.data?.teamMembers[userId].postIds.filter(
      (pId) => pId !== postId
    );

    setTeamState({
      isFetched: true,
      data: {
        ...teamState.data,
        teamMembers: {
          ...teamState.data.teamMembers,
          [`${user.id}`]: {
            ...teamState.data.teamMembers[user.id],
            postIds,
          },
        },
      },
    });

    const postsFiltered = posts.filter((p) => p.postId !== postId);
    setPosts(postsFiltered);

    firestore.doc(`/teams/${teamId}/`).update({
      [`teamMembers.${userId}.postIds`]: postIds,
      [`teamMembers.${userId}.posts.${postId}`]: firebase.firestore.FieldValue.delete(),
    });
    firestore.doc(`/teams/${teamId}/posts/${postId}`).delete();

    // TODO: remove from team.posts
  };

  const updateTeam = ({ teamId, teamName, teamLogo }) => {
    const updates = { teamName };
    if (teamLogo) {
      updates.teamLogo = teamLogo;
    }
    setTeamState({
      ...teamState,
      data: { ...teamState.data, ...updates },
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

  const showStartTeamForm =
    teamState.isFetched && !teamState.data && !teamIdFromURL;
  const showJoinTeamForm =
    teamState.isFetched && !teamState.data && teamIdFromURL;
  const showTeamDirectoty = teamState.isFetched && teamState.data;

  const showForm = showStartTeamForm || showJoinTeamForm;

  let teamMembersArray;

  const teamMembersArrayUnsorted = [];
  if (teamState.data?.teamMembers) {
    Object.keys(teamState.data.teamMembers).forEach((key) => {
      teamMembersArrayUnsorted.push(teamState.data.teamMembers[key]);
    });

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
    const post = teamState.data.teamMembers[postAuthorId].posts[postId];
    const updatedPost = {
      ...post,
      commentCount: newCommentCount,
    };
    const newTeamState = { ...teamState };
    teamState.data.teamMembers[postAuthorId].posts[postId] = updatedPost;
    setTeamState(newTeamState);
    const postIndex = posts.findIndex((p) => p.postId === postId);
    const newPosts = [...posts];
    newPosts[postIndex] = updatedPost;
    setPosts(newPosts);

    firestore.doc(`/teams/${teamId}/`).update({
      [`teamMembers.${postAuthorId}.posts.${postId}.commentCount`]: newCommentCount,
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

  const actions = { onCommentSubmit, onCommentRemove };

  const currentUser = user.id ? teamState.data?.teamMembers[user.id] : {};
  // console.log({ currentUser });

  return (
    <>
      <ActionsContext.Provider value={actions}>
        <TeamContext.Provider value={{ teamId: teamState.data?.teamId }}>
          <CurrentUserContext.Provider value={{ currentUser }}>
            <ViewPropsContext.Provider value={{ timeframe }}>
              <Head teamName={teamState.data?.teamName} />
              <link
                rel="stylesheet"
                media="screen, projection"
                href="/home.css"
              />
              <div
                className={c("home-page", showForm && "home-sisu-page")}
                ref={rootDiv}
              >
                {teamState.isFetched && (
                  <StickyBar
                    isTeamEditable={user.id === teamState.data?.teamId}
                    teamName={teamState.data?.teamName}
                    teamId={teamState.data?.teamId}
                    teamLogo={teamState.data?.teamLogo}
                    onTeamEditSubmit={updateTeam}
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
                        teamId={teamState.data?.teamId}
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
                            onClick={() => fetchPosts(teamState.data?.teamId)}
                          >
                            <span
                              className={c(
                                "button button-secondary button-white",
                                isFetching && "busy"
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
              {showPostSubmitModal && (
                <PostSubmitModal
                  userId={user.id}
                  teamId={teamState.data?.teamId}
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
