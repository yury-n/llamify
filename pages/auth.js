import FirebaseAuth from "../components/FirebaseAuth";
import Head from "./_head";

const Auth = () => {
  return (
    <>
      <Head />
      <link
        rel="stylesheet"
        media="screen, projection"
        href="/firebaseui-bacchanalia.css"
      />
      <div className="sisu-page">
        <FirebaseAuth />
      </div>
    </>
  );
};

export default Auth;
