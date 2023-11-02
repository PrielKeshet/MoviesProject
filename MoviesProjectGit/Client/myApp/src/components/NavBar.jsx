import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <p className="navbar-brand">
            <u>MoviesWeb</u>
          </p>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={"/webSite/movies/all"}
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/webSite/subs/all"}>
                  Subs
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/"} onClick={Logout}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
