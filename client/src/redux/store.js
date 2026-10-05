import { configureStore } from "@reduxjs/toolkit";
import subscriptionReducer from "../redux/slicer/adminsubscriptionSlice";
import adminUserReducer from "../redux/slicer/adminuserSlice";
import authReducer from "../redux/slicer/authSlice";
import categoryReducer from "../redux/slicer/categorySlice";
import galleryReducer from "../redux/slicer/gallerySlice";
import applicationReducer from "../redux/slicer/jobApplicationSlice";
import jobsReducer from "../redux/slicer/jobSlice";
import testimonialReducer from "../redux/slicer/testimonialSlice";
import userSubscriptionReducer from "../redux/slicer/userSubscriptionSlice";
import testimonialsReducer from "../redux/slicer/userTestimonialSlice";
import frontendApplicationReducer from "../redux/slicer/frontendApplicationSlice";
import roleOpportunityReducer from "../redux/slicer/roleOpportunitySlice";
import jobTypeReducer from "../redux/slicer/jobTypeSlice";
import videoReducer from "../redux/slicer/videoSlice";
import enquiryReducer from "../redux/slicer/enquirySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    categories: categoryReducer,
    jobs: jobsReducer,
    jobTypes: jobTypeReducer,
    gallery: galleryReducer,
    subscription: subscriptionReducer,
    testimonials: testimonialReducer,
    adminUser: adminUserReducer,
    usertestimonial: testimonialsReducer,
    userSubscription: userSubscriptionReducer,
    application: applicationReducer,
    frontendApplications: frontendApplicationReducer,
    roleOpportunities: roleOpportunityReducer,
    video: videoReducer,
    enquiries: enquiryReducer,
  },
});
