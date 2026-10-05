const express = require("express");
const router = express.Router();
const { submitEnquiry } = require("../controllers/enquiryController");

// Public route to submit contact enquiry
router.post("/", submitEnquiry);

module.exports = router;
