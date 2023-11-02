import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Movie(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage["token"];
  const Data = useSelector((state) => state);
  const mySubs = Data.subs.filter((item) => item.MovieId == props.movie._id);

  //delete movie and his subs
  async function DeleteMovie() {
    if (confirm("are you sure you want to delete this movie??")) {
      try {
        //delete movie's subs from db
        mySubs.forEach(async (item) => {
          try {
            await axios.delete(`http://localhost:3000/subs/${item._id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
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
          //delete movie from db
          await axios.delete(
            `http://localhost:3000/movies/${props.movie._id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //delete movie and movie's subs from redux
          dispatch({
            type: "DELETE_MOVIE",
            payload: { subs: mySubs, movie: props.movie },
          });
        } catch (error) {
          if (error.response.status === 401) {
            alert("connection is off, please login again");
            localStorage.clear();
            navigate("/");
          } else {
            alert("Something went wrong with deleting the movie.");
            console.error("Error:", error);
          }
        }
      } catch (error) {
        alert("something went wrong, please try again");
        console.error("Eerror: " + error);
      }
    }
  }

  return (
    <>
      <div
        className="card mb-3"
        style={{ maxWidth: "50%", marginLeft: "15px" }}
      >
        <div className="row g-0" style={{ display: "flex" }}>
          <div className="col-md-4" style={{ flex: "0 0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={props.movie.ImgUrl}
                className="img-fluid rounded-start"
                alt={props.movie.Name}
                style={{ width: "auto", height: "100%" }}
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">
                {props.movie.Name}, {props.movie.Year}
              </h5>
              <div className="details-container" style={{ display: "flex" }}>
                <div className="geners">
                  <p className="card-text">Geners:</p>
                  <ul>
                    {props.movie.Geners.map((item) => {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                </div>

                {/* subs div: */}
                <div className="subs" style={{ marginLeft: "20px" }}>
                  <p>subs:</p>
                  <ul>
                    {mySubs.map((item) => {
                      return (
                        <li key={item._id}>
                          <Link to={`/webSite/subs/edit/${item.MemberId}`}>
                            {
                              Data.members.find(
                                (mem) => mem._id === item.MemberId
                              ).Name
                            }
                          </Link>{" "}
                          , {item.Date}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <br />
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() =>
                    navigate(`/webSite/movies/edit/${props.movie._id}`)
                  }
                >
                  Edit
                </button>{" "}
                <button onClick={() => DeleteMovie()}>Delete movie</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Movie);
