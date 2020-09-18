import { verifyIdToken } from "../../utils/auth/firebaseAdmin";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import initFirebase from "../../utils/auth/initFirebase";

initFirebase();
const firestore = firebase.firestore();

const updateCommentCount = async (req, res) => {
  const token = req.headers.token;
  const { teamId, postId, postAuthorId, newCommentCount } = req.body;
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

  try {
    await verifyIdToken(token);
    return res.status(200).json({
      ok: "cool",
    });
  } catch (error) {
    return res.status(401).send("You are unauthorised");
  }
};

export default updateCommentCount;
