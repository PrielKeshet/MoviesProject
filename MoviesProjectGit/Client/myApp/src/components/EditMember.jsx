import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

export default function EditMember() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useParams().id;
  const [member, setMember] = useState({});
  const allMembers = useSelector((state) => state.members);

  //get member info by id
  useEffect(() => {
    if (allMembers) {
      setMember(allMembers.find((item) => item._id === id));
    }
  }, [allMembers]);

  //update member to db and redux
  const Update = async (e) => {
    e.preventDefault();
    try {
      //update to db
      await axios.put(`http://localhost:3000/members/${member._id}`, member, {
        headers: {
          Authorization: `Bearer ${localStorage["token"]}`,
        },
      });

      //update to redux
      dispatch({ type: "UPDATE_MEMBER", payload: member });
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
      <form onSubmit={Update}>
        Name:{" "}
        <input
          type="text"
          required
          value={member.Name || ""}
          onChange={(e) => setMember({ ...member, Name: e.target.value })}
        />{" "}
        <br />
        Email:{" "}
        <input
          type="text"
          required
          value={member.Email || ""}
          onChange={(e) => setMember({ ...member, Email: e.target.value })}
        />{" "}
        <br />
        City:{" "}
        <input
          type="text"
          required
          value={member.City || ""}
          onChange={(e) => setMember({ ...member, City: e.target.value })}
        />{" "}
        <br />
        <input type="submit" value="update" /> <br />
        <button type="button" onClick={() => navigate("/webSite/subs/all")}>
          cancel
        </button>
      </form>
    </>
  );
}
