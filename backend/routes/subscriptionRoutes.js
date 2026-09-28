const express = require("express");
const router = express.Router();
const {
  getAllSubscriptionsUser,
  getSubscriptionByIdUser,
  getSubscriptionByPlanName,
} = require("../controllers/subscriptionController");
const {
  buySubscription,
  createSubscriptionOrder,
  verifySubscriptionPayment,
  getMySubscription,
  getSubscriptionHistory,
  cancelSubscription,
  toggleAutoRenew,
  checkSubscriptionStatus,
} = require("../controllers/userSubscriptionController");
const { protect } = require("../middleware/auth");

// Public routes (get subscriptions) — 'plan/:planName' /:id se pehle hi thi, theek hai
router.get("/", getAllSubscriptionsUser);
router.get("/plan/:planName", getSubscriptionByPlanName);

// ⚠️ Protected + named routes /:id se PEHLE — warna /:id inhe hijack kar leta hai
router.use(protect);
router.post("/buy", buySubscription);
router.post("/create-order", createSubscriptionOrder);
router.post("/verify-payment", verifySubscriptionPayment);
router.get("/my-subscription", getMySubscription);
router.get("/history", getSubscriptionHistory);
router.get("/status", checkSubscriptionStatus);
router.patch("/cancel", cancelSubscription);
router.patch("/auto-renew", toggleAutoRenew);

// Generic /:id sabse LAST mein — sirf ye tab match hoga jab upar ka kuch match na ho
router.get("/:id", getSubscriptionByIdUser);

module.exports = router;