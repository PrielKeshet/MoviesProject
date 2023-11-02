const express = require("express");
const moviesBLL = require("../BLL/moviesBLL");
const { protectRoute } = require("./authUtils");
const router = express.Router();

router.route("/").get(protectRoute, async (req, resp) => {
  try {
    const movies = await moviesBLL.GetAll();
    resp.status(200).json(movies);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").get(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const movie = await moviesBLL.GetById(id);
    resp.status(200).json(movie);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/").post(protectRoute, async (req, resp) => {
  try {
    const obj = req.body;
    const result = await moviesBLL.AddItem(obj);
    resp.status(201).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").put(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const result = await moviesBLL.Update(id, obj);
    resp.status(202).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").delete(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const result = await moviesBLL.Delete(id);
    resp.status(204).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

module.exports = router;
