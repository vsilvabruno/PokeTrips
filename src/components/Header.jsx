import { useState } from "react";
import { Link, useLocation } from "wouter";

function Header() {
  // Getting the current page location from the router
  const [currentPage] = useLocation();

  // Function to determine if the link is active (current page)
  // Returns 'active' class if the href matches the current page
  const isActive = (href) => {
    return currentPage === href ? "active" : "";
  };

  // Scrolls to the top of the page when called
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  };

  // State for toggling the side menu visibility
  const [isSideMenu, setSideMenu] = useState(true);

  // Header component rendering
  return (
    <>
      <header>
        <div className="header-container">
          {/* Logo Link: Click will set side menu visible and scroll to top */}
          <Link className="link" onClick={() => { setSideMenu(true); scrollToTop(); }} href="/">
            <img src="/images/header/logo.png" alt="Logo" />
          </Link>
           {/* Hamburger Menu: Click will toggle side menu visibility */}
          <i onClick={() => {setSideMenu(false)}} className="fa-solid fa-bars" />

          <nav>
            <ul>
              {/* Navigation links: Clicking each link scrolls to top and closes side menu */}
              <li>
                <Link className={`link ${isActive("/")}`} onClick={() => { setSideMenu(true); scrollToTop(); }} href="/">Home</Link>
              </li>
              <li>
                <Link className={`link ${isActive("/newlocation")}`} onClick={() => { setSideMenu(true); scrollToTop(); }} href="/newlocation">Add Location</Link>
              </li>
              <li>
                <Link className={`link ${isActive("/about")}`} onClick={() => { setSideMenu(true); scrollToTop(); }} href="/about">About Me</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Side Menu: Shown/hidden based on the state of isSideMenu */}
        <div className={isSideMenu ? "header-sidemenu hidden" : "header-sidemenu"}>
          <nav>
            <img src="/images/header/logo.png" alt="Logo" />
            <div className="socials">
              <a href="https://www.facebook.com/#">
                <i className="fa-brands fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/#">
                <i className="fa-brands fa-instagram" />
              </a>
              <a href="https://www.twitter.com/#">
                <i className="fa-brands fa-twitter" />
              </a>
              <a href="https://www.tumblr.com/#">
                <i className="fa-brands fa-tumblr" />
              </a>
            </div>
            <ul>
              <li>
                <Link className="link" onClick={() => { setSideMenu(true); scrollToTop(); }} href="/">Home</Link>
              </li>
              <hr/>
              <li>
                <Link className="link" onClick={() => { setSideMenu(true); scrollToTop(); }} href="/newlocation">Add Location</Link>
              </li>
              <hr/>
              <li>
                <Link className="link" onClick={() => { setSideMenu(true); scrollToTop(); }} href="/about">About Me</Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Dim background: Click will close the side menu */}
        <div onClick={() => {setSideMenu(true)}} className={isSideMenu ? "header-bg-dim clear" : "header-bg-dim"}></div>
      </header>
    </>
  )
};
  
export default Header;