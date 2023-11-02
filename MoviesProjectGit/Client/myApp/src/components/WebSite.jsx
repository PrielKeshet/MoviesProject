import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import TokenAlert from "./TokenAlert";

export default function WebSite() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (localStorage["token"]) {
      GetData();
      GetNameFromToken();
    } else {
      console.log("token invalid");
      localStorage.clear();
      navigate("/");
    }
  }, []);

  // token expires check
  useEffect(() => {
    const checkTokenExpiration = setInterval(() => {
      try {
        const decodedToken = jwtDecode(localStorage["token"]);
        const currentTime = Date.now();

        //if token is expired
        if (decodedToken.exp && decodedToken.exp * 1000 <= currentTime) {
          localStorage.clear();
          navigate("/");
        }

        //if localStorage["token"] is about to expire in the next 5 minutes
        if (decodedToken.exp * 1000 - currentTime <= 5 * 60 * 1000) {
          setShowAlert(true);
        }
      } catch {
        alert("session is invalid, log in again");
        localStorage.clear();
        navigate("/");
      }
    }, 60000);

    return () => clearInterval(checkTokenExpiration);
  }, [localStorage["token"]]);

  //decode the token and get user name
  function GetNameFromToken() {
    try {
      const decodedToken = jwtDecode(localStorage["token"]);
      setName(decodedToken.FullName);
    } catch (error) {
      console.error("Error decoding or validating token:", error);
      localStorage.clear();
      navigate("/");
    }
  }

  //Get data from db and send to redux
  async function GetData() {
    let Data = {};
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage["token"]}`,
      },
    };
    try {
      let resp = await axios.get("http://localhost:3000/movies", config);
      Data.movies = resp.data;

      resp = await axios.get("http://localhost:3000/members", config);
      Data.members = resp.data;

      resp = await axios.get("http://localhost:3000/subs", config);
      Data.subs = resp.data;

      dispatch({ type: "START", payload: Data });
    } catch (error) {
      if (error.response.status === 401) {
        alert("connection is off, please login again");
        localStorage.clear();
        navigate("/");
      } else {
        alert("Something went wrong.");
        console.error("Error:", error);
      }
    }
  }

  return (
    <>
      <NavBar />
      <p style={{ fontFamily: "fantasy, Copperplate", fontSize: "30px" }}>
        {name}
      </p>
      {showAlert && (
        <TokenAlert
          closerFunc={() => {
            setShowAlert(false);
          }}
        />
      )}
      <Outlet />
    </>
  );
}
