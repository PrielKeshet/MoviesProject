const express = require("express");
const membersBLL = require("../BLL/membersBLL");
const { protectRoute } = require("./authUtils");
const router = express.Router();

router.route("/").get(protectRoute, async (req, resp) => {
  try {
    const members = await membersBLL.GetAll();
    resp.status(200).json(members);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").get(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const member = await membersBLL.GetById(id);
    resp.status(200).json(member);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/").post(protectRoute, async (req, resp) => {
  try {
    const obj = req.body;
    const result = await membersBLL.AddItem(obj);
    resp.status(201).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").put(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const obj = req.body;
    const result = await membersBLL.Update(id, obj);
    resp.status(202).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

router.route("/:id").delete(protectRoute, async (req, resp) => {
  try {
    const id = req.params.id;
    const result = await membersBLL.Delete(id);
    resp.status(204).json(result);
  } catch (error) {
    resp.status(500).json(error.message);
  }
});

module.exports = router;
