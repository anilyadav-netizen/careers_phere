const express = require("express");
const router = express.Router();
const {
  getAllPlansAdmin,
  getPlanByIdAdmin,
  createPlan,
  updatePlan,
  deletePlan,
  togglePlanActive,
} = require("../controllers/adminSubscriptionController");
const { protect, admin } = require("../middleware/auth");
// Agar tumhare auth middleware me admin-check ka naam alag hai
// (isAdmin / authorizeAdmin / restrictTo('admin')), bata dena, adjust kar dunga.

console.log("protect =", typeof protect);
console.log("admin =", typeof admin);

router.use(protect, admin);

router.get("/", getAllPlansAdmin);
router.get("/:id", getPlanByIdAdmin);
router.post("/", createPlan);
router.put("/:id", updatePlan);
router.delete("/:id", deletePlan);
router.patch("/:id/toggle-active", togglePlanActive);

module.exports = router;
