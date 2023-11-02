import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Movie from "./Movie";

export default function AllMovies() {
  const movies = useSelector((state) => state.movies);
  const [serch, setSerch] = useState("");
  const [copy, setCopy] = useState([]);

  //set copy to movies array
  useEffect(() => {
    setCopy(movies);
  }, [movies]);

  //set copy to the movies that fit the serch
  function Find() {
    setCopy(movies.filter((item) => item.Name.includes(serch)));
  }

  return (
    <>
      <h1>All Movies</h1>
      <div>
        <h4>serch:</h4>
        <input
          type="text"
          onChange={(e) => {
            setSerch(e.target.value);
          }}
        />
        <button onClick={() => Find()}>find movie</button>
        <button onClick={() => setCopy(movies)}>show all</button>
      </div>
      <br />
      {copy?.map((item) => {
        return <Movie key={item._id} movie={item} />;
      })}
      {copy?.length === 0 && <h3>sorry, there were no such movie</h3>}
    </>
  );
}
