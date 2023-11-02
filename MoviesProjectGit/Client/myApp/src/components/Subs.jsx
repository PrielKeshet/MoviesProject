import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function Subs() {
  return (
    <>
      <h1>Subs:</h1>
      {/* subs navBar: */}
      <nav className="navbar navbar-expand-sm bg-warning">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={"/webSite/subs/all"}
                  className="nav-link active"
                  aria-current="page"
                >
                  All Members
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/webSite/subs/add"}>
                  Add Member
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
