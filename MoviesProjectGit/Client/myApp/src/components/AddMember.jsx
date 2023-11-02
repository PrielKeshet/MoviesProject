import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

export default function AddMember() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [member, setMember] = useState({});

  //add new member
  const Add = async (e) => {
    e.preventDefault();
    try {
      //add to db
      let resp = await axios.post(`http://localhost:3000/members`, member, {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
        },
      });

      //add to redux
      const m = { ...member, _id: resp.data._id };
      dispatch({ type: "ADD_MEMBER", payload: m });
      navigate("/webSite/subs/all");
    } catch (error) {
      if (error.response.status === 401) {
        alert("connection is off, please try login again");
        localStorage.clear();
        navigate("/");
      } else {
        alert("something went wrong, please try again");
      }
      console.error("Error: " + error);
    }
  };
  return (
    <>
      <form onSubmit={Add}>
        Name:{" "}
        <input
          type="text"
          required
          onChange={(e) => setMember({ ...member, Name: e.target.value })}
        />{" "}
        <br />
        Email:{" "}
        <input
          type="text"
          required
          onChange={(e) => setMember({ ...member, Email: e.target.value })}
        />{" "}
        <br />
        City:{" "}
        <input
          type="text"
          required
          onChange={(e) => setMember({ ...member, City: e.target.value })}
        />{" "}
        <br />
        <input type="submit" value="Add" /> <br />
        <button type="button" onClick={() => navigate("/webSite/subs/all")}>
          cancel
        </button>
      </form>
    </>
  );
}
