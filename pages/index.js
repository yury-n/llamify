import c from "classnames";
import { useRouter } from "next/router";
import { useUser } from "../utils/auth/useUser";
import StickyBar from "../components/StickyBar";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import Head from "./_head";
import { useEffect, useState } from "react";
import initFirebase from "../utils/auth/initFirebase";
import PostModal from "../components/Modals/PostModal";
import StartTeamForm from "../components/StartTeamForm";
import NewPostsToggle from "../components/NewPostsToggle";
import HumanEditModal from "../components/Modals/HumanEditModal";
import Human from "../components/Human";

/*

creator:
/teams/user_id/team/name
/teams/user_id/team/members/
/teams/user_id/team/members/user_id/posts

/team_member_posts/team_id/user_id/

member:
/teams/user_id/team_id/

*/

initFirebase();
const firestore = firebase.firestore();

const Index = () => {
  const router = useRouter();
  const { user, isUserFetched } = useUser();
  const [timeframe, setTimeframe] = useState(null);
  const [searchString, setSearchString] = useState();
  const [openModal] = useState(false);
  const [teamState, setTeamState] = useState({
    isFetched: false,
    data: {
      teamName: null,
      teamMembers: [],
    },
  });

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
            data,
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

  const startTeam = ({ name, teamName }) => {
    const teamData = {
      teamName,
      teamMembers: {
        [`${user.id}`]: { id: user.id, name },
      },
    };
    firestore.doc(`/teams/${user.id}`).set(teamData);
    setTeamState({
      isFetched: true,
      data: teamData,
    });
  };

  const setName = ({ name }) => {
    firestore.doc(`/teams/${user.id}`).update({
      [`teamMembers.${user.id}.name`]: name,
    });
    setTeamState({
      isFetched: true,
      data: {
        ...teamState.data,
        teamMembers: {
          ...teamState.data.teamMembers,
          [`${user.id}`]: { ...teamState.data.teamMembers[user.id], name },
        },
      },
    });
  };

  const showStartTeamForm = teamState.isFetched && !teamState.data;
  const showTeamDirectoty = teamState.isFetched && teamState.data;

  const teamMembersArray = [];
  if (teamState.data?.teamMembers) {
    Object.keys(teamState.data.teamMembers).forEach((key) => {
      teamMembersArray.push(teamState.data.teamMembers[key]);
    });
  }
  console.log(teamMembersArray);
  return (
    <>
      <Head />
      <link rel="stylesheet" media="screen, projection" href="/home.css" />
      <div className={c("home-page", showStartTeamForm && "home-sisu-page")}>
        <StickyBar
          teamName={teamState.data?.teamName}
          teamId={teamState.data?.teamId || user.id}
          onTeamEditSubmit={({ teamName }) => {
            setTeamState({
              ...teamState,
              data: { ...teamState.data, teamName },
            });
            firestore.doc(`/teams/${user.id}/`).update({ teamName });
          }}
        />
        {openModal && (
          <PostModal
            image="https://source.unsplash.com/random?6"
            description="This wonderfull view I had when I visited Croatia with my team of frontend and backend developers this autumn."
          />
        )}
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
                placeholder="Search by name"
                onChange={(e) => setSearchString(e.target.value)}
              />
            </div>
            <NewPostsToggle
              timeframe={timeframe}
              onSetTimeframe={setTimeframe}
            />
            {teamMembersArray.map((member) => (
              <Human
                key={user.id}
                human={member}
                isOwner={member.id === user.id}
                onSetName={setName}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Index;
