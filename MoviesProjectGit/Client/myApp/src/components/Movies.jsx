import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Movies() {
  return (
    <>
      <h1>Movies:</h1>

      {/* movies navBar */}
      <nav className="navbar navbar-expand-sm bg-info">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={"/webSite/movies/all"}
                  className="nav-link active"
                  aria-current="page"
                >
                  All Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/webSite/movies/add"}>
                  Add Movie
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
}
