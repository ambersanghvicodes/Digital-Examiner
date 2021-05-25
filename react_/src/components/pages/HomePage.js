import React, { Component } from "react";
import "./grid.css";
import "./HomePage.css";
// Link
// import Link
// import VideoPlayer from 'react-video-js-player';
// import Video from './video/video1.mp4';
import { Link } from "react-router-dom";

export class Home extends Component {
  render() {
    // const videosrc = Video;
    return (
      <div>
        <div className="hero">
          <h1>
            Welcome to <br />{" "}
            <span style={{ color: "yellow", paddingLeft: "15%" }}>
              DIGITAL EXAMINER
            </span>
          </h1>
          <br />
          <br />
          <br />
          <br />
          <br />
          <a href="#working">WANNA SEE THE WORKING</a>&nbsp;&nbsp;&nbsp;
          {"    |  "}&nbsp;&nbsp;&nbsp;
          <Link to="/login">LOGIN</Link>
        </div>
        <header>
          <div className="Head">
            <div className="row">
              <div className="col span-1-of-2 text-box">
                <h1>WE ARE DIGITAL EXAMINER</h1>
                <a className="Button" href="#working">
                  WANNA SEE THE WORKING
                </a>
              </div>
              <div className="col span-1-of-2 imgs"></div>
            </div>
          </div>
        </header>
        <section className="mission">
          <div className="row">
            <div className="col span-1-of-2 cl">
              <h3>OUR MISSION</h3>
              <p className="para" style={{ textTransform: "uppercase" }}>
                {" "}
                we are aiming to get workload of teachers off there back and{" "}
                <br></br>just to let teachers enjoy their time to the fulliest
              </p>
            </div>
            <div className="col span-1-of-2 cl">
              <h3>MOTIVATION</h3>
              <p className="para" style={{ textTransform: "uppercase" }}>
                after getting to know the struggle of teachers in making papers
                was a bit hectic so we thought of changing the scenario of
                making papers
              </p>
              `
            </div>
            <div className="nve">
              <h3>GOAL</h3>
              <p className="para" style={{ textTransform: "uppercase" }}>
                our main goal is to let teachers enjoy their life with less work
                load of maikng papers and<br></br> still enjoy their time while
                making papers
              </p>
            </div>
          </div>
        </section>
        <section
          className="flowchart"
          id="working"
          style={{ backgroundColor: "#004f95" }}
        >
          <h1 style={{ color: "white", marginTop: "0px" }}>
            WORKING of the app
          </h1>
        </section>
        <center>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/q9ukU4OELeU"
            title="Digital Examiner Working Explained"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </center>
      </div>
    );
  }
}

export default Home;
