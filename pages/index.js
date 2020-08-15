import { useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "../utils/auth/useUser";
import StickyBar from "../components/StickyBar";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import Head from "./_head";
import { useEffect, useState } from "react";
import initFirebase from "../utils/auth/initFirebase";

/*

creator:
/teams/user_id/team/name
/teams/user_id/team/members/
/teams/user_id/team/members/user_id/posts

member:
/teams/user_id/team_id/

*/

initFirebase();
const firestore = firebase.firestore();

const Index = () => {
  const router = useRouter();
  const { user, isUserFetched } = useUser();
  const [teamState, setTeamState] = useState({
    isFetched: false,
    name: null,
    members: [],
  });
  const nameInput = useRef(null);
  const teamNameInput = useRef(null);

  useEffect(() => {
    if (user) {
      firestore
        .doc(`/teams/${user.id}`)
        .get()
        .then((doc) => {
          const data = doc.data();
          console.log({ data });
          setTeamState({
            isFetched: true,
            data: data.team,
          });
        });
    }
  }, [user]);

  if (!user) {
    if (isUserFetched) {
      router.push("/auth");
    }
    return null;
  }

  const startTeam = () => {
    firestore
      .doc(`/teams/${user.id}/`)
      .set({ team: { name: teamNameInput.current.value } });
  };

  console.log(">>>", `/teams/${user.id}/team/name`);

  return (
    <>
      <Head />
      <link rel="stylesheet" media="screen, projection" href="/home.css" />
      <div className="home-page home-sisu-page">
        <StickyBar
          teamName={teamState.data?.name}
          onTeamEditSubmit={({ teamName }) => {
            firebase
              .database()
              .ref()
              .update({ [`/teams/${user.id}/team/name`]: teamName });
          }}
        />
        <div className="sisu-form">
          <div className="form-group">
            <label htmlFor="teamName" className="label">
              Team Name
            </label>
            <input
              id="teamName"
              ref={teamNameInput}
              className="input"
              type="text"
              autoComplete="off"
              spellCheck="false"
              autoFocus={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name" className="label">
              Your Name
            </label>
            <input
              id="name"
              ref={nameInput}
              className="input"
              type="text"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="form-buttons buttons">
            <button className="button-wrapper" onClick={() => startTeam()}>
              <span className="button button-primary" tabIndex="-1">
                Start
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
