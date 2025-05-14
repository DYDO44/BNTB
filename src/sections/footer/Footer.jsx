import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import FooterWrapper from "./Footer.style";
import footerSocialLinks from "../../assets/data/footerSocialLinks";
import Logo from "../../assets/images/logo-4.png";

const Footer = ({ variant }) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper className={variant}>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 col-md-5 col-sm-12">
            <div className="footer-widget footer-about">
              <div className="footer-logo">
                <Link to="/">
                  <img src={Logo} alt="Gittu" />
                </Link>
              </div>
              <p className="footer-about-text">
                BNBMAGA Token is a next-generation decentralized platform designed to
                revolutionize the cryptocurrency space. Join our presale now to be part
                of this groundbreaking project.
              </p>
              <div className="footer-social-links">
                {footerSocialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.title}
                  >
                    <img src={item.icon} alt={item.title} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6 footer-quick-links">
            <div className="footer-widget footer-links">
              <h3 className="footer-widget-title">Quick Links</h3>
              <ul className="footer-links-list">
                <li><a href="#presale-phases">Presale</a></li>
                <li><a href="#profit-calculator">Profits</a></li>
                <li><a href="#how-to-buy">How to Buy</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#tokenomics">Tokenomics</a></li>
                <li><a href="#roadmap">Roadmap</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-2 col-md-2 col-sm-6 footer-terms">
            <div className="footer-widget footer-links">
              <h3 className="footer-widget-title">Terms</h3>
              <ul className="footer-links-list">
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-6 footer-resources">
            <div className="footer-widget footer-links">
              <h3 className="footer-widget-title">Resources</h3>
              <ul className="footer-links-list">
                <li><a href="/pdf/whitepaper.pdf" target="_blank">Whitepaper</a></li>
                {/* GitHub, BscScan, and CoinMarketCap links hidden for now */}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="row">
            <div className="col-md-12">
              <p className="footer-copyright text-center">
                &copy; {currentYear} BNBMAGA Token. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

Footer.propTypes = {
  variant: PropTypes.string
};

export default Footer;
