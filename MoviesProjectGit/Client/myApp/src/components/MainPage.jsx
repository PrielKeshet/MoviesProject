import React from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";
import WebSite from "./WebSite";
import Movies from "./Movies";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import EditMovie from "./EditMovie";
import Subs from "./Subs";
import AllMembers from "./AllMembers";
import AddMember from "./AddMember";
import EditMember from "./EditMember";
import NotFound from "./NotFound";

export default function MainPage() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/webSite" element={<WebSite />}>
          {/* movies routers */}
          <Route path="movies" element={<Movies />}>
            <Route path="all" element={<AllMovies />} />
            <Route path="add" element={<AddMovie />} />
            <Route path="edit/:id" element={<EditMovie />} />
          </Route>

          {/* subs routers */}
          <Route path="subs" element={<Subs />}>
            <Route path="all" element={<AllMembers />} />
            <Route path="add" element={<AddMember />} />
            <Route path="edit/:id" element={<EditMember />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
