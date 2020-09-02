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
        <img src="/images/confetti-back.png" className="confetti-back" />
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
        <div className="secondary-text">
          <div className="secondary-text-img-wrapper">
            <div
              className="secondary-text-img"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
              }}
            ></div>
            <div
              className="secondary-text-img secondary-text-img-blur"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
                width: 50,
                height: 50,
                top: -1,
                left: 111,
                filter: "blur(5px)",
              }}
            ></div>
          </div>
          <div>
            <h2>Your identity at work</h2>
            <div className="secondary-text-block">
              Behind each username in your team there is a human.
            </div>
            <div className="secondary-text-block">
              With their strengths and weaknesses.
              <br />
              With their cool and uncool parts.
            </div>
            <div className="secondary-text-block">
              It's really interesting to learn more about those who you work
              with.
              <br />
              It feels good to be yourself at work.
            </div>
          </div>
        </div>
        <div className="secondary-text">
          <div>
            <h2>Dedicated space for updates</h2>
            <div className="secondary-text-block">
              Have control over what you share with your colleages.
            </div>
            <div className="secondary-text-block">
              Consume updates from them at a comfortable pace.
            </div>
          </div>
          <div className="secondary-text-img-wrapper">
            <div
              className="secondary-text-img"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
              }}
            ></div>
            <div
              className="secondary-text-img secondary-text-img-blur"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
              }}
            ></div>
          </div>
        </div>
        <div className="secondary-text">
          <div className="secondary-text-img-wrapper">
            <div
              className="secondary-text-img"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
              }}
            ></div>
            <div
              className="secondary-text-img secondary-text-img-blur"
              style={{
                backgroundImage: `url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60)`,
              }}
            ></div>
          </div>
          <div>
            <h2>More productive environment</h2>
            <div className="secondary-text-block">
              1+1 is 2 when you're counting resources.
            </div>
            <div className="secondary-text-block">
              1+1 is 3 when there is a team synergy.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
