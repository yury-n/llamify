import FirebaseAuth from "../components/FirebaseAuth";
import Head from "./_head";
import Footer from "../components/Footer";

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
    </>
  );
};

export default Auth;
