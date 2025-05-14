import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderWrapper from "./Header.style";
import ConnectWalletButton from "../../connectWalletButton/ConnectWalletButton";
import MobileMenu from "../mobileMenu/MobileMenu";
import HeaderSocialLinks from "../../../assets/data/headerSocialLinks";
import Whitepaper from "../../../assets/pdf/whitepaper.pdf";
import Logo from "../../../assets/images/logo-3.png";
import Logo4 from "../../../assets/images/logo-4.png";
import Logo5 from "../../../assets/images/logo-5.png";
import { HiMenuAlt3 } from "react-icons/hi";

const Header = ({ variant }) => {
  const [logoImg, setLogoImg] = useState(Logo4); // Always use Logo4
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  const handleMobileMenu = () => {
    setIsMobileMenu(!isMobileMenu);
  };

  return (
    <>
      <HeaderWrapper className="header-section">
        <div className="container">
          <div className="gittu-header-content">
            <div className="gittu-header-left">
              <NavLink className="gittu-header-logo" to="/" end>
                <img src={logoImg} alt="Logo" />
              </NavLink>

              {/* Navigation menu for version 5 and 6 */}
              {(variant === "v5" || variant === "v6") && (
                <ul className="gittu-nav-menu">
                  <li>
                    <a href="#presale-phases">Presale</a>
                  </li>
                  <li>
                    <a href="#profit-calculator">Profits</a>
                  </li>
                  <li>
                    <a href="#how-to-buy">How to buy</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#tokenomics">Tokenomics</a>
                  </li>
                  <li>
                    <a href="#roadmap">Roadmap</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ul>
              )}
            </div>
            <div className="gittu-header-right">
              <div className="gittu-header-menu-toggle">
                <button className="menu-toggler" onClick={handleMobileMenu}>
                  <HiMenuAlt3 />
                </button>
              </div>
              <div className="gittu-header-right-menu">
                {variant === "v1" && (
                  <ul className="gittu-header-menu">
                    <li>
                      <a href={Whitepaper} target="_blank" rel="noreferrer">
                        Whitepaper
                      </a>
                    </li>
                  </ul>
                )}

                {(variant === "v2" ||
                  variant === "v3" ||
                  variant === "v5" ||
                  variant === "v6" ||
                  variant === "v7") && (
                  <ul className="social-links">
                    {HeaderSocialLinks?.map((socialLinkItem, i) => (
                      <li key={i}>
                        <a
                          href={socialLinkItem.url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src={socialLinkItem.icon}
                            alt={socialLinkItem.title}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                {variant === "v1" && <ConnectWalletButton />}
                {variant === "v2" && <ConnectWalletButton variant="v2" />}
                {variant === "v3" && <ConnectWalletButton variant="yellow" />}
                {variant === "v4" && <ConnectWalletButton variant="gradient" />}
                {variant === "v5" && <ConnectWalletButton variant="v5" />}
                {variant === "v6" && <ConnectWalletButton variant="v6" />}
                {variant === "v7" && <ConnectWalletButton />}
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>

      {isMobileMenu && <MobileMenu mobileMenuHandle={handleMobileMenu} />}
    </>
  );
};

export default Header;
