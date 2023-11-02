const express = require("express");
const subsBLL = require("../BLL/subscriptionsBLL");
const { protectRoute } = require("./authUtils");
const router = express.Router();

router.route("/").get(protectRoute, async (req, resp) => {
  try {
    const subs = await subsBLL.GetAll();
    resp.status(200).json(subs);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").get(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const sub = await subsBLL.GetById(id);
    resp.status(200).json(sub);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/").post(protectRoute, async (req, resp) => {
  try {
    const obj = req.body;
    const result = await subsBLL.AddItem(obj);
    resp.status(201).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").put(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const result = await subsBLL.Update(id, obj);
    resp.status(202).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").delete(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const result = await subsBLL.Delete(id);
    resp.status(204).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

module.exports = router;
