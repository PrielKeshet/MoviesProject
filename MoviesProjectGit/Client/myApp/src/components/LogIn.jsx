import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage["token"]) {
      TokenCheck(localStorage["token"]);
    }
  });

  //check if current token from localStorage is valid
  async function TokenCheck(token) {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.get("http://localhost:3000/users/protected-route", config);

      navigate("/webSite/movies/all");
    } catch (error) {
      localStorage.clear();
    }
  }

  //cheack user info and make new token
  const Login = async (e) => {
    e.preventDefault();

    try {
      let resp = await axios.post("http://localhost:3000/users/login", user);
      let token = resp.data.token;
      localStorage["token"] = token;
      navigate("/webSite/movies/all");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("your info is invalid. Please check your username and password.");
      } else {
        alert("An error occurred while trying to log in.");
      }
    }
  };

  return (
    <>
      <h1>LogIn</h1> <br />
      <form onSubmit={Login}>
        <input
          type="text"
          required
          placeholder="userName"
          onChange={(e) => setUser({ ...user, UserName: e.target.value })}
        />
        <br />
        <br />
        <input
          type="number"
          required
          placeholder="password"
          onChange={(e) => setUser({ ...user, PassWord: +e.target.value })}
        />
        <br />
        <br />
        <input type="submit" value="LogIn" />
      </form>
    </>
  );
}
