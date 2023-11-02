import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddMovie() {
  const [movie, setMovie] = useState({ Geners: [] });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const genersArray = [
    "Action",
    "Horror",
    "Drama",
    "Comdy",
    "Sci-Fi",
    "Kids",
    "Mystory",
  ];

  //add movie and vaildity of checkboxs
  const AddMovie = async (e) => {
    e.preventDefault();
    try {
      //checkboxs validity
      if (movie.Geners.length === 0) {
        alert("Please select at least one genre.");
        return;
      }

      //add movie to db
      let resp = await axios.post(`http://localhost:3000/movies`, movie, {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
        },
      });

      //add movie to redux
      let m = { ...movie, _id: resp.data._id };
      dispatch({ type: "ADD_MOVIE", payload: m });
      navigate("/webSite/movies/all");
    } catch (error) {
      if (error.response.status === 401) {
        alert("connection is off, please try login again");
        localStorage.clear();
        navigate("/");
      } else {
        alert("something went wrong, please try again");
      }
      console.log(error);
    }
  };

  // add/remove geners from movie.geners array
  const handleGenerChange = (Gener) => {
    if (movie.Geners.includes(Gener)) {
      setMovie({ ...movie, Geners: movie.Geners.filter((g) => g !== Gener) });
    } else {
      setMovie({ ...movie, Geners: [...movie.Geners, Gener] });
    }
  };

  return (
    <>
      <form onSubmit={AddMovie}>
        <div style={{ border: "2px solid red" }}>
          <p>Name:</p>
          <input
            type="text"
            required
            onChange={(e) => setMovie({ ...movie, Name: e.target.value })}
          />
          <p>Genres:</p>
          {genersArray.map((item) => {
            return (
              <label key={item}>
                <input
                  type="checkbox"
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
            onChange={(e) => setMovie({ ...movie, ImgUrl: e.target.value })}
          />
          <p>Year:</p>
          <input
            type="number"
            min="0"
            max={new Date().getFullYear()}
            required
            onChange={(e) => setMovie({ ...movie, Year: +e.target.value })}
          />{" "}
          <br />
          <br />
          <input type="submit" value="Add Movie" />
          <button type="button" onClick={() => navigate("/webSite/movies/all")}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
