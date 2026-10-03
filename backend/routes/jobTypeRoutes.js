const express = require("express");
const router = express.Router();
const { getAllJobTypesPublic } = require("../controllers/jobTypeController");

// Public route to get active job types
router.get("/", getAllJobTypesPublic);

module.exports = router;
