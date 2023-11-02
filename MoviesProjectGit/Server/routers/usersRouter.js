const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const router = express.Router();
const secretKey = process.env.secretKey;
const User = require("../models/usersModel");
const { verifyToken } = require("./authUtils");

//token is about to expire and user need a new one

router.get("/refresh", async (req, resp) => {
  const oldToken = req.headers.authorization?.split(" ")[1];
  let decodedToken = verifyToken(oldToken);
  if (decodedToken) {
    return resp.json(
      jwt.sign({ FullName: decodedToken.FullName }, secretKey, {
        expiresIn: "1h",
      })
    );
  } else {
    return resp.status(401).json({ message: "Invalid token or token expired" });
  }
});

//on login, get a token if info is correct

router.post("/login", async (req, resp) => {
  const { UserName, PassWord } = req.body;

  const user = await User.findOne({ UserName: UserName });

  if (!user) {
    return resp.status(401).json({ message: "Authentication failed by name:" });
  }

  if (PassWord != user.PassWord) {
    return resp
      .status(401)
      .json({ message: "Authentication failed by password" });
  }

  const token = jwt.sign({ FullName: user.FullName }, secretKey, {
    expiresIn: "1h",
  });

  return resp.json({ token });
});

module.exports = router;
