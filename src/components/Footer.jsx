function Footer() {

  // Footer component rendering
  return (
    <>
      <footer>
        <div className="footer-container">
          <p>&copy; 2024 - All Rights Reserved</p>
          <p>
            <a href="mailto:cooltrainer@kanto.jp">
              <i className="fa-solid fa-envelope" /> cooltrainer@kanto.pkmn
            </a>
          </p>
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
        </div>
      </footer>
    </>
  )
};
  
export default Footer;