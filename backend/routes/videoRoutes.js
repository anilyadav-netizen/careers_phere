const express = require("express");
const router = express.Router();
const { streamVideo, getVideoMeta } = require("../controllers/videoController");

// Public endpoints for video streaming and metadata
router.get("/meta", getVideoMeta);
router.get("/stream", streamVideo);

module.exports = router;
