import { useEffect, useState } from "react";
import DropdownWrapper from "./Dropdown.style";
import { chainInfo } from "../../../contracts/chainConfig";

const Dropdown = ({
  variant,
  selectedImg,
  titleText,
  setIsActiveBuyOnEth,
  setIsActiveBuyOnBnb,
  switchChain,
  makeEmptyInputs,
  ethChainId,
  bnbChainId,
}) => {
  const dropdownList = chainInfo;
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  
  // Get the current active chain ID based on the title text
  const getCurrentChainId = () => {
    return titleText.includes("ETH") ? ethChainId : bnbChainId;
  };

  // Enable dropdown toggle functionality for network selection
  const dropdownHandle = () => {
    setIsDropdownActive(!isDropdownActive);
  };

  const handleDropdownData = (item) => {
    if (!item) return;
    
    setIsDropdownActive(false);
    
    // Log the item being selected for debugging
    console.log("Network selected:", item.title, "Chain ID:", item.chainId);
    
    // Use a direct approach with a simple link
    if (item.chainId === ethChainId) {
      // Create a direct link to switch to ETH
      const ethLink = document.createElement('a');
      ethLink.href = '/eth.html';
      ethLink.style.display = 'none';
      document.body.appendChild(ethLink);
      ethLink.click();
      document.body.removeChild(ethLink);
    } else if (item.chainId === bnbChainId) {
      // Create a direct link to switch to BNB
      const bnbLink = document.createElement('a');
      bnbLink.href = '/bnb.html';
      bnbLink.style.display = 'none';
      document.body.appendChild(bnbLink);
      bnbLink.click();
      document.body.removeChild(bnbLink);
    }
  };

  // Filter the dropdown list to only show the unselected option
  const filteredDropdownList = dropdownList.filter(
    (item) => item.chainId !== getCurrentChainId()
  );

  // Ensure we always have at least one option in the dropdown
  useEffect(() => {
    if (filteredDropdownList.length === 0) {
      console.warn("No alternative networks available in dropdown");
    }
  }, [filteredDropdownList]);

  return (
    <DropdownWrapper variant={variant}>
      <button
        className={`dropdown-toggle ${isDropdownActive ? "active" : ""}`}
        onClick={dropdownHandle}
      >
        <img src={selectedImg} alt="icon" />
        <span>{titleText}</span>
      </button>
      {isDropdownActive && (
        <ul className="dropdown-list">
          {filteredDropdownList.map((item, i) => (
            <li key={i}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDropdownData(item);
                }}
              >
                <img src={item.icon} alt="icon" />
                <span>{item.title}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
