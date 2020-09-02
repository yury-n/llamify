import Head from "./_head";

const About = () => {
  return (
    <>
      <Head />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" media="screen, projection" href="/about.css" />
      <div className="about-page">
        <div className="header">
          <div className="header-left-side">
            <img className="about-logo" src="/images/logo-alt.svg" />
            <span className="llamify">llamify</span>
          </div>
          <div className="header-right-side">
            <a href="#" className="header-link">
              Pricing
            </a>
            <a href="#" className="header-link">
              Github
            </a>
            <a href="#" className="header-link" style={{ marginRight: 60 }}>
              Contact
            </a>
            <a href="#" className="header-link">
              Log In
            </a>
            <button className="button-wrapper">
              <span className="button button-hollow" tabIndex="-1">
                Sign Up
              </span>
            </button>
          </div>
        </div>
        <div className="main-text">
          a place to share your off work moments with colleagues
        </div>
        <div className="cta-button-wrapper">
          <button className="button-wrapper">
            <span className="button button-primary cta-button" tabIndex="-1">
              Create a Team
            </span>
          </button>
        </div>
        <div className="mock-up">
          <div className="mock-up-bar">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
