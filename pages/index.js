import c from "classnames";
import orderBy from "lodash.orderby";
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
import Human from "../components/Human";
import JoinTeamForm from "../components/JoinTeamForm";

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
      teamId: null,
      teamName: null,
      teamMembers: [],
    },
  });
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
        setTeamState({
          isFetched: true,
          data,
        });
      });
  };

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

  const startTeam = ({ name, teamName }) => {
    const teamData = {
      teamId: user.id,
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

  const joinTeam = ({ name }) => {
    firestore.doc(`/teams/${user.id}`).set({ joinedTeamId: teamIdFromURL });
    firestore
      .doc(`/teams/${teamIdFromURL}`)
      .update({
        [`teamMembers.${user.id}.id`]: user.id,
        [`teamMembers.${user.id}.name`]: name,
      })
      .then(() => {
        fetchTeam(teamIdFromURL);
      });
  };

  const setName = ({ name }) => {
    if (!teamState.data?.teamId) {
      return;
    }
    firestore.doc(`/teams/${teamState.data?.teamId}`).update({
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

  const updateTeam = ({ teamId, teamName, teamLogo }) => {
    setTeamState({
      ...teamState,
      data: { ...teamState.data, teamName, teamLogo },
    });
    firestore.doc(`/teams/${teamId}/`).update({ teamName, teamLogo });
  };

  const showStartTeamForm =
    teamState.isFetched && !teamState.data && !teamIdFromURL;
  const showJoinTeamForm =
    teamState.isFetched && !teamState.data && teamIdFromURL;
  const showTeamDirectoty = teamState.isFetched && teamState.data;

  const showForm = showStartTeamForm || showJoinTeamForm;

  const teamMembersArrayUnsorted = [];
  if (teamState.data?.teamMembers) {
    Object.keys(teamState.data.teamMembers).forEach((key) => {
      teamMembersArrayUnsorted.push(teamState.data.teamMembers[key]);
    });
  }
  let teamMembersArray = orderBy(
    teamMembersArrayUnsorted,
    [(u) => u.name.toLowerCase()],
    ["asc"]
  );

  if (searchString) {
    teamMembersArray = teamMembersArray.filter((u) =>
      u.name.toLowerCase().includes(searchString.toLowerCase())
    );
  }

  return (
    <>
      <Head />
      <link rel="stylesheet" media="screen, projection" href="/home.css" />
      <div className={c("home-page", showForm && "home-sisu-page")}>
        {teamState.isFetched && (
          <StickyBar
            teamName={teamState.data?.teamName}
            teamId={teamState.data?.teamId}
            teamLogo={teamState.data?.teamLogo}
            onTeamEditSubmit={updateTeam}
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
                key={member.id}
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
