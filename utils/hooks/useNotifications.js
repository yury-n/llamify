const { useState, useContext, useEffect } = require("react");
import "firebase/firestore";
import "firebase/database";
import firebase from "firebase/app";
import { CurrentUserContext } from "../../pages/app";

const firestore = firebase.firestore();

const useNotifications = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const currentUserId = currentUser?.id;

  const [isFetched, setIsFetched] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = () => {
    if (!isFetched && currentUserId) {
      firestore
        .collection(`/users/${currentUserId}/notifications/`)
        .orderBy("timestamp", "desc")
        .limit(10)
        .get()
        .then((notificationsSnapshot) => {
          const fetchedNotifications = [];
          notificationsSnapshot.forEach((notification) => {
            fetchedNotifications.push(notification.data());
          });
          setNotifications(fetchedNotifications);
          setIsFetched(true);
          setHasUnreadNotifications(false);
          firestore.doc(`/users/${currentUserId}/`).set({
            hasUnreadNotifications: false,
          });
        });
    }
  };

  useEffect(() => {
    if (currentUserId) {
      firestore
        .doc(`/users/${currentUserId}`)
        .get()
        .then((snapshot) => {
          setHasUnreadNotifications(!!snapshot.data()?.hasUnreadNotifications);
        });
    }
  }, [currentUserId]);

  return {
    areNotificationsFetched: isFetched,
    notifications,
    hasUnreadNotifications,
    fetchNotifications,
  };
};

export default useNotifications;
