import { Link } from "wouter";

function PageNotFoundView() {
  // Scrolls to the top of the page when called
  const scrollToTop = () => {
    window.scrollTo(0, 0)
  };

  // Not Found View component rendering
  return (
    <>
      <main>
        <div className="page404-container">
          <img src="/images/not_found/404.jpeg" alt="404" />
          <div className="title-container">
            Page Not Found
          </div>
          
          {/* Link back to Home */}
          <Link href="/" onClick={() => scrollToTop()}>
              <button>Back to Home</button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default PageNotFoundView;