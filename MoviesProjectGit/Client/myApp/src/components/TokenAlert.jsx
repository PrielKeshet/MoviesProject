import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TokenAlert({ closerFunc }) {
  const navigate = useNavigate();
  const token = localStorage["token"];

  const handleStayLoggedIn = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      //get new token
      let resp = await axios.get("http://localhost:3000/users/refresh", config);
      localStorage["token"] = resp.data;
    } catch (error) {
      alert("something went wrong, login again.");
      console.error("error: " + error);
      localStorage.clear();
      navigate("/");
    }
    closerFunc();
  };

  const handleClose = () => {
    closerFunc();
    localStorage.clear();
    navigate("/");
  };
  return (
    // this code use modal dialog box so to "interrupt"
    // the user from continuing his use in the app to tell him a msg
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>Your Session Is About To End</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your session is about to end in less then five minutes, would you like
        to prolong it?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No, log me out
        </Button>
        <Button variant="primary" onClick={handleStayLoggedIn}>
          Yes, prolong my stay
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
