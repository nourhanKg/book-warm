import React from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
const NavBar = function () {
  const { data: session } = useSession();
  const changeClass = function (e) {
    const links = document.querySelectorAll("a");
    links.forEach((link) => {
      link.classList.remove("active");
      e.target.classList.add("active");
    });
  };
  if (session) {
    return (
      <nav
        className="navbar navbar-expand-lg navbar-light bg-warning bg-gradient
      "
      >
        <div className="container">
          <Link className="navbar-brand fs-3" href="/">
            BookWarm
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  onClick={changeClass}
                  className="nav-link active fs-4"
                  aria-current="page"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={changeClass}
                  className="nav-link fs-4"
                  href="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  onClick={changeClass}
                  className="nav-link fs-4"
                  href="/books"
                  tabIndex="-1"
                  aria-disabled="true"
                >
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link fs-4 fw-bold text-white"
                  aria-current="page"
                  href="/api/auth/signout"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning bg-gradient">
      <div className="container">
        <Link className="navbar-brand" href="/">
          BookWarm
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                onClick={changeClass}
                className="nav-link fs-4 active"
                aria-current="page"
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={changeClass}
                className="nav-link fs-4"
                href="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={changeClass}
                className="nav-link fs-4"
                href="/books"
                tabIndex="-1"
                aria-disabled="true"
              >
                Books
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link fs-4 fw-bold text-white"
                aria-current="page"
                href="/api/auth/signin"
                onClick={() => signIn()}
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
