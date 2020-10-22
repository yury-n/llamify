import cookies from "js-cookie";
import Head from "./_head";
import { useRouter } from "next/router";
import SimpleStats from "../components/Stats";
import PricingPlans from "../components/PricingPlans";
import { isLlamifyDotCom } from "../utils";

const About = () => {
  const router = useRouter();

  if (cookies.get("auth")) {
    window.location.href = "/app";
    return null;
  }
  return (
    <>
      <Head />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@600"
        rel="stylesheet"
      ></link>
      <link rel="stylesheet" media="screen, projection" href="/index.css" />
      <div className="about-page">
        <div className="header">
          <div className="header-left-side">
            <img className="about-logo" src="/images/logo-alt.svg" />
            <span className="llamify">llamify</span>
          </div>
          <div className="header-right-side">
            <a
              href="https://github.com/yury-n/llamify"
              target="_blank"
              className="header-link"
            >
              Github
            </a>
            <a
              href="https://docs.google.com/forms/d/1925mzlkhLEle8P7uF14645l9izpuhfCrsrEhBPPtVT0/"
              target="_blank"
              className="header-link"
              style={{ marginRight: 60 }}
            >
              Contact
            </a>
            <a onClick={() => router.push("/app")} className="header-link">
              Sign Up
            </a>
            <button
              className="button-wrapper"
              onClick={() => router.push("/app")}
            >
              <span className="button button-hollow" tabIndex="-1">
                Log In
              </span>
            </button>
          </div>
        </div>
        <img src="/images/confetti-back.png" className="confetti-back" />
        <div className="main-text">
          a place to share your off-work moments with colleagues
        </div>
        <div className="cta-button-wrapper">
          <button
            className="button-wrapper"
            onClick={() => router.push("/app")}
          >
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
          <img
            className="screenshot-desktop"
            src="/images/app-screenshot-small-simple.jpg"
          />
          <img
            className="screenshot-mobile"
            src="/images/app-screenshot-mobile.jpg"
          />
        </div>
        <div className="secondary-text your-identiy-at-work">
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="secondary-text-img-wrapper"><div class="post-thumb" style="
              width: 200px;
              transform: rotate(-2deg);
              color: #eef8f5;
          "><div class="post-thumb-image" style="background: url(/images/big-shoes-4.png);background-size: 200%;background-position-x: -152px;"></div></div></div>`,
            }}
          />
          <div>
            <h2>Your identity… at work!</h2>
            <div className="secondary-text-block">
              Behind every username in your team there’s a{" "}
              <span className="human-span">human</span>,
            </div>
            <div className="secondary-text-block">
              each with strengths, weaknesses, hobbies, <br />
              and experiences to share.
            </div>
            <div className="secondary-text-block">
              <span
                className="bullet"
                style={{
                  background: "rgb(159 212 255)",
                  left: -14,
                  height: 16,
                }}
              ></span>
              Get to know your teammates better
              <div style={{ marginTop: 2 }}>
                <span
                  className="bullet"
                  style={{ background: "rgb(255 242 131)", left: -6 }}
                ></span>
                and be yourself at work.
              </div>
            </div>
          </div>
        </div>
        <div className="secondary-text space-for-updates">
          <div>
            <h2>A dedicated space for updates</h2>
            <div>
              <span
                className="bullet"
                style={{ background: "#ff8019", left: -12, top: -9 }}
              ></span>
              Have control over what you share with your colleages.
            </div>
            <div style={{ marginTop: 4 }}>
              <span
                className="bullet"
                style={{ background: "#53d870", left: -4, top: 5 }}
              ></span>
              Browse updates from them at a comfortable pace.
            </div>
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="secondary-text-img-wrapper"><div class="post-thumb" style="
              width: 200px;
              transform: rotate(2deg);
              color: #eef8f5;
          "><div class="post-thumb-image" style="background: url(/images/big-shoes-6.png);background-size: 200%;background-position-x: -162px;"></div></div></div>`,
            }}
          ></div>
        </div>
        <div className="secondary-text more-productive">
          <div
            dangerouslySetInnerHTML={{
              __html: `<div class="secondary-text-img-wrapper"><div class="post-thumb" style="
              width: 200px;
              transform: rotate(-3deg);
              color: #eef8f5;
          "><div class="post-thumb-image" style="background: url(/images/collective.png);background-size: cover;background-position-x: -85px;"></div></div></div>`,
            }}
          />
          <div>
            <h2>More productive environment</h2>
            <div className="secondary-text-block">
              You’re more productive in a team
              <br />
              when you’ve built a closer bond with your co-workers.
            </div>
            <div className="secondary-text-block">
              Start sharing about your <br />{" "}
              <span className="activity">indoor</span>,{" "}
              <span className="activity">outdoor</span>, and{" "}
              <span className="activity">virtual</span> activities!
            </div>
          </div>
        </div>
        {isLlamifyDotCom() && <PricingPlans />}
      </div>
      <SimpleStats />
    </>
  );
};

export default About;
