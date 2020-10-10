/* globals window */
import { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "../utils/auth/initFirebase";
import { setUserCookie } from "../utils/auth/userCookies";
import { mapUserData } from "../utils/auth/mapUserData";

// Init the Firebase app.
initFirebase();

const firebaseAuthConfig = {
  signInFlow: "popup",
  // Auth providers
  // https://github.com/firebase/firebaseui-web#configure-oauth-providers
  signInOptions: [
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      scopes: [],
      customParameters: {
        // Forces account selection even when one account
        // is available.
        prompt: "select_account",
      },
    },
  ],
  signInSuccessUrl: "/app",
  credentialHelper: "none",
  callbacks: {
    signInSuccessWithAuthResult: async ({ user }, redirectUrl) => {
      const userData = mapUserData(user);
      setUserCookie(userData);
    },
  },
};

const FirebaseAuth = () => {
  // Do not SSR FirebaseUI, because it is not supported.
  // https://github.com/firebase/firebaseui-web/issues/213
  const [renderAuth, setRenderAuth] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const team = urlParams.get("team");
      let redirectTo = team ? `/app?team=${team}` : "/app";

      if (window?.location?.hostname !== "llamify.me") {
        firebaseAuthConfig.signInOptions.push({
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
          requireDisplayName: false,
        });
      }

      firebaseAuthConfig.signInSuccessUrl = redirectTo;
      setRenderAuth(true);
    }
  }, []);

  useEffect(() => {
    if (renderAuth) {
      setTimeout(() => {
        const emailInput = document.getElementById("ui-sign-in-email-input");
        if (!emailInput) {
          return;
        }
        emailInput.setAttribute("autocomplete", "email");
        const lastEmailUsed = localStorage.getItem("app.lastEmailUsed");
        if (lastEmailUsed) {
          emailInput.value = lastEmailUsed;
        }
      }, 750);
    }
  }, [renderAuth]);
  return (
    <div className="sisu-form">
      {renderAuth ? (
        <>
          <a href="/">
            <img src="/images/logo.svg" className="sisu-logo" />
          </a>
          <StyledFirebaseAuth
            uiConfig={firebaseAuthConfig}
            firebaseAuth={firebase.auth()}
          />
        </>
      ) : null}
    </div>
  );
};

export default FirebaseAuth;
