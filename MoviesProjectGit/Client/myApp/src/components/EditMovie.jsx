import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function EditMovie() {
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allMovies = useSelector((state) => state.movies);
  const [movie, setMovie] = useState({ Geners: [] });

  const genersArray = [
    "Action",
    "Horror",
    "Drama",
    "Comdy",
    "Sci-Fi",
    "Kids",
    "Mystory",
  ];

  //get movie info by id
  useEffect(() => {
    if (allMovies) {
      setMovie(allMovies.find((item) => item._id === id));
    }
  }, [allMovies]);

  //update movie + checkBoxs validity
  const Update = async (e) => {
    e.preventDefault();

    //checkBoxs validity
    if (movie.Geners.length == 0) {
      alert("enter genre");
      return;
    }

    try {
      //update movie to db
      let resp = await axios.put(
        `http://localhost:3000/movies/${movie._id}`,
        movie,
        {
          headers: {
            Authorization: `Bearer ${localStorage["token"]}`,
          },
        }
      );
      //update movie to redux
      dispatch({ type: "UPDATE_MOVIE", payload: movie });
      navigate("/webSite/movies/all");
    } catch (error) {
      if (error.response.status === 401) {
        alert("connection is off, please try login again");
        localStorage.clear();
        navigate("/");
      } else {
        alert("something went wrong, please try again");
      }
    }
  };

  // add/remove gener from movie
  const handleGenerChange = (Gener) => {
    if (movie.Geners.includes(Gener)) {
      setMovie({ ...movie, Geners: movie.Geners.filter((g) => g !== Gener) });
    } else {
      setMovie({ ...movie, Geners: [...movie.Geners, Gener] });
    }
  };

  return (
    <>
      <form onSubmit={Update}>
        <div style={{ border: "2px solid red" }}>
          <p>Name:</p>
          <input
            type="text"
            required
            value={movie.Name || ""}
            onChange={(e) => setMovie({ ...movie, Name: e.target.value })}
          />
          <p>Geners:</p>
          {genersArray.map((item) => {
            return (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={movie?.Geners && movie?.Geners.includes(item)}
                  onChange={() => handleGenerChange(item)}
                />
                {item}
              </label>
            );
          })}
          <br />
          <p>Img Url:</p>
          <input
            type="text"
            required
            value={movie.ImgUrl || ""}
            onChange={(e) => setMovie({ ...movie, ImgUrl: e.target.value })}
          />
          <p>Year:</p>
          <input
            type="number"
            required
            min="0"
            max={new Date().getFullYear()}
            value={movie.Year || ""}
            onChange={(e) => setMovie({ ...movie, Year: +e.target.value })}
          />{" "}
          <br />
          <br />
          <input type="submit" value="update" />
          <button type="button" onClick={() => navigate("/webSite/movies/all")}>
            cancel
          </button>
        </div>
      </form>
    </>
  );
}
