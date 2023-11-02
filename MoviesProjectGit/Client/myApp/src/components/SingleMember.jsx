import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function SingleMember(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Data = useSelector((state) => state);
  const mySubs = Data.subs.filter((item) => item.MemberId == props.member._id);
  const [flag, setFlag] = useState(false);
  const [newSub, setNewSub] = useState({ MemberId: props.member._id });

  //delete member and his subs
  async function DeleteMember() {
    if (confirm("are you sure you want to delete this member??")) {
      try {
        //delete his subs from db
        mySubs.forEach(async (item) => {
          try {
            await axios.delete(`http://localhost:3000/subs/${item._id}`, {
              headers: {
                Authorization: `Bearer ${localStorage["token"]}`,
              },
            });
          } catch (error) {
            if (error.response.status === 401) {
              alert("connection is off, please login again");
              localStorage.clear();
              navigate("/");
            } else {
              alert("Something went wrong with deleting a subscription.");
              console.error("Error:", error);
            }
          }
        });
        try {
          //delete member from db
          await axios.delete(
            `http://localhost:3000/members/${props.member._id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage["token"]}`,
              },
            }
          );

          //delete member and his subs from redux
          dispatch({
            type: "DELETE_MEMBER",
            payload: { subs: mySubs, member: props.member },
          });
        } catch (error) {
          if (error.response.status === 401) {
            alert("connection is off, please login again");
            localStorage.clear();
            navigate("/");
          } else {
            alert("Something went wrong with deleting the member.");
            console.error("Error:", error);
          }
        }
      } catch (error) {
        alert("something went wrong, please try again");
      }
    }
  }

  //return all the movies that member didn't watch yet
  function filterMovies() {
    const filteredMovies = Data.movies.filter((movie) => {
      return !mySubs.some((sub) => sub.MovieId === movie._id);
    });
    return filteredMovies;
  }

  //add new sub to member
  async function AddSub(e) {
    e.preventDefault();
    let sub = newSub;
    try {
      //add sub to db
      let resp = await axios.post("http://localhost:3000/subs", sub, {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
        },
      });

      //add sub to redux
      sub = { ...sub, _id: resp.data._id };
      dispatch({ type: "ADD_SUB", payload: sub });
      setFlag(false);
    } catch (error) {
      if (error.response.status === 401) {
        alert("connection is off, please login again");
        localStorage.clear();
        navigate("/");
      } else {
        alert("something went wrong, please try again");
        console.log(error);
      }
    }
  }

  return (
    <>
      <div style={{ border: "2px solid DarkViolet" }}>
        <h3>single member:</h3>
        <p>Name: {props.member.Name}</p>
        <p>Email: {props.member.Email}</p>
        <p>City: {props.member.City}</p>
        <div style={{ border: "2px solid pink" }}>
          <p>my subs:</p>
          <ul>
            {mySubs.map((item) => {
              return (
                <li key={item._id}>
                  {" "}
                  <Link to={`/webSite/movies/edit/${item.MovieId}`}>
                    {
                      Data.movies.find((movie) => movie._id === item.MovieId)
                        ?.Name
                    }
                  </Link>
                  ,{item.Date}
                </li>
              );
            })}
          </ul>
          <button onClick={() => setFlag(!flag)}>add subscription</button>

          {/* add sub div */}
          {flag && (
            <div style={{ border: " 2px solid orange" }}>
              <form onSubmit={(e) => AddSub(e)}>
                <p>add new subscription:</p>
                <select
                  name="movies"
                  required
                  defaultValue={""}
                  id="movies"
                  onFocus={(e) =>
                    setNewSub({ ...newSub, MovieId: e.target.value })
                  }
                  onChange={(e) =>
                    setNewSub({ ...newSub, MovieId: e.target.value })
                  }
                >
                  <option value="" disabled>
                    --- Select a Movie ---
                  </option>
                  {filterMovies().map((item) => {
                    return (
                      <option value={item._id} key={item._id}>
                        {item.Name}
                      </option>
                    );
                  })}
                </select>
                <input
                  type="date"
                  required
                  onChange={(e) =>
                    setNewSub({ ...newSub, Date: e.target.value })
                  }
                />
                <input type="submit" />
              </form>
            </div>
          )}
        </div>
        <button
          onClick={() => navigate(`/webSite/subs/edit/${props.member._id}`)}
        >
          Edit member
        </button>
        <button onClick={() => DeleteMember()}>Delete member</button>
      </div>
    </>
  );
}
