import AboutWrapper from "./About.style";

const About = () => {
  return (
    <AboutWrapper id="about">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h2 className="about-title">About Our Project</h2>
            <p className="about-subtitle">
              Learn more about our revolutionary blockchain solution that aims to change the future of decentralized finance.
            </p>

            <div className="about-content-wrapper">
              <div className="about-card">
                <h3>Our Vision</h3>
                <p>
                  We aim to create a seamless, secure, and accessible financial ecosystem that empowers users worldwide.
                  Our platform is designed to bridge the gap between traditional finance and the decentralized world,
                  making cryptocurrency investments available to everyone.
                </p>
              </div>

              <div className="about-card">
                <h3>Our Mission</h3>
                <p>
                  To revolutionize the cryptocurrency space by providing innovative solutions that address
                  real-world problems. We're committed to developing user-friendly tools that simplify complex
                  blockchain interactions while maintaining the highest standards of security and transparency.
                </p>
              </div>

              <div className="about-card">
                <h3>Our Team</h3>
                <p>
                  Behind our project stands a team of seasoned blockchain developers, financial experts, and
                  visionary entrepreneurs with a proven track record in building successful crypto ventures.
                  We combine technical expertise with real-world business acumen to create sustainable value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AboutWrapper>
  );
};

export default About;
