import FirebaseAuth from "../components/FirebaseAuth";

const Auth = () => {
  return (
    <div className="sisu-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&amp;display=swap"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" media="screen, projection" href="/reset.css" />
      <link rel="stylesheet" media="screen, projection" href="/index.css" />
      <FirebaseAuth />
    </div>
  );
};

export default Auth;
