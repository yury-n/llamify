import FirebaseAuth from "../components/FirebaseAuth";
import Head from "./_head";
import Footer from "../components/Footer";
import SimpleStats from "../components/Stats";

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
      <Footer />
      <SimpleStats />
    </>
  );
};

export default Auth;
