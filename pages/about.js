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
        <div className="secondary-text" style={{ maxWidth: 740 }}>
          <div
            style={{ marginTop: 50 }}
            dangerouslySetInnerHTML={{
              __html: `<div class="secondary-text-img-wrapper"><div class="secondary-text-img" style="position:absolute;left:0;top:0;background-image:url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter: blur(11px) brightness(2);"></div><div aria-label="A photo of an outdoor activity" data-balloon-pos="down" class="secondary-text-img" style="background-image:url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(2.3);background-size: 220px;background-position: 150px -20px;opacity: 0.7;"></div><div class="secondary-text-img" style="position:absolute;background-image:url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);width:50px;height:50px;top: -31px;left: 111px;filter: blur(5px) brightness(2);transform: rotate(222deg);"></div><div class="secondary-text-img" style="position:absolute;background-image:url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);width:25px;height:25px;top: 69px;left: -49px;filter:blur(5px) brightness(2);"></div>
              <div class="secondary-text-img" style="position:absolute;background-image:url(https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);width: 15px;height: 15px;top: -41px;left: -39px;filter: blur(2px) brightness(1.5);transform: rotate(155deg);"></div>
              </div>`,
            }}
          />
          <div>
            <h2>Your identity at work</h2>
            <div className="secondary-text-block">
              Behind each username in your team there is a human.
            </div>
            <div className="secondary-text-block">
              With their strengths and weaknesses.
              <br />
              With their cool and uncool* parts.
            </div>
            <div className="secondary-text-block">
              <span
                className="bullet"
                style={{ background: "rgb(159 212 255)", left: -14 }}
              ></span>
              get to know your colleagues better
              <div style={{ marginTop: 2 }}>
                <span
                  className="bullet"
                  style={{ background: "rgb(255 242 131)", left: -6 }}
                ></span>
                be yourself at work
              </div>
            </div>
          </div>
        </div>
        <div className="secondary-text space-for-updates">
          <div>
            <h2>Dedicated space for updates</h2>
            <div>
              <span
                className="bullet"
                style={{ background: "#ff8019", left: -12, top: -9 }}
              ></span>
              Have control over what you share with your colleages
            </div>
            <div style={{ marginTop: 4 }}>
              <span
                className="bullet"
                style={{ background: "#53d870", left: -4, top: 5 }}
              ></span>
              Consume updates from them at a comfortable pace
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="secondary-text-img-wrapper">
              <div aria-label="A result of an indoor activity" data-balloon-pos="down" class="secondary-text-img" style="background-image:url(https://images.unsplash.com/photo-1573333515743-56d57731dd1f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(1.6) contrast(0.8);box-shadow: inset 0 0 18px 8px #7c7874;"></div>
              <div class="secondary-text-img" style="background-image:url(https://images.unsplash.com/photo-1573333515743-56d57731dd1f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(1.6) contrast(0.8);position: absolute;top: 0;left: 0;filter: blur(14px);z-index: -1;"></div>
              <div class="secondary-text-img" style="background-image:url(https://images.unsplash.com/photo-1573333515743-56d57731dd1f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(1.6) contrast(0.8);position: absolute;top: 120px;left: 140px;filter: blur(4px) brightness(1.9) saturate(0.4);z-index: -1;width: 20px;height: 20px;opacity: 0.6;"></div><div class="secondary-text-img" style="background-image:url(https://images.unsplash.com/photo-1573333515743-56d57731dd1f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(1.6) contrast(0.8);position: absolute;top: -30px;left: 200px;filter: blur(2px) brightness(1.9) saturate(0.4);z-index: -1;width: 10px;height: 10px;opacity: 0.6;"></div></div>`,
            }}
          ></div>
        </div>
        <div className="secondary-text more-productive">
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="secondary-text-img-wrapper">
              <div class="secondary-text-img" style="background-image:url(https://images.unsplash.com/photo-1580484144342-caee18aff064?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(1.8) contrast(0.8);top: 0;left: 0;position: absolute;filter: blur(8px);opacity: 0.1;"></div><div class="secondary-text-img" style="position:absolute;left:0;top:0;background-image: url(https://images.unsplash.com/photo-1580484144342-caee18aff064?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter: blur(11px) brightness(2);"></div><div aria-label="An instrument for a virtual activity" data-balloon-pos="down" class="secondary-text-img" style="background-image: url(https://images.unsplash.com/photo-1580484144342-caee18aff064?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);filter:brightness(2.3);background-size: 220px;background-position: 150px -20px;opacity: 0.7;"></div><div class="secondary-text-img" style="position:absolute;background-image: url(https://images.unsplash.com/photo-1580484144342-caee18aff064?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);width: 10px;height: 40px;top: -31px;left: -19px;filter: blur(5px) brightness(2);transform: rotate(222deg);"></div><div class="secondary-text-img" style="position:absolute;background-image: url(https://images.unsplash.com/photo-1580484144342-caee18aff064?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);width: 9px;height: 12px;top: 23px;left: -72px;filter: blur(5px) brightness(1.3);background: #4b4b4b;"></div>
                            <div class="secondary-text-img" style="position:absolute;background-image: url(https://images.unsplash.com/photo-1580484144342-caee18aff064?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60);width: 15px;height: 15px;top: 129px;left: -19px;filter: blur(2px) brightness(1.5);transform: rotate(155deg);opacity: 0.4;"></div></div>`,
            }}
          />
          <div>
            <h2>More productive environment</h2>
            <div className="secondary-text-block">
              You are more productive in a team
              <br />
              where you are accepted the way you are.
            </div>
            <div className="secondary-text-block">
              Start sharing about your <br />{" "}
              <span className="activity">indoor</span>,{" "}
              <span className="activity">outdoor</span>, and{" "}
              <span className="activity">virtual</span> activities!
            </div>
            <div className="secondary-text-block">It's going to be fun!</div>
          </div>
        </div>
        <div className="cta-button-wrapper" style={{ marginTop: 240 }}>
          <button className="button-wrapper">
            <span className="button button-primary cta-button" tabIndex="-1">
              Create a Team
            </span>
          </button>
        </div>
        <div className="final-cta">
          <div style={{ marginTop: 30 }}>
            *to be cool you don't really need to try to be cool{" "}
            <span
              style={{
                fontSize: "20px",
                position: "relative",
                top: 2,
                left: 2,
              }}
            >
              😎
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
