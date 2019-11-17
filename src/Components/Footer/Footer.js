import React from "react";
import githubIcon from "../../images/github-icon.png";

/*Style Import*/
import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      <a href="https://github.com/thareshjose">
        <img src={githubIcon} alt="github" />
      </a>
    </div>
  );
};

export default Footer;
