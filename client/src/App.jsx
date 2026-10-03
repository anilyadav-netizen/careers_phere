import AboutUs from "./Pages/AboutUs";
import ContactUs from "./Pages/ContactUs";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
// import Subscription from "./Pages/Subscription";

import { Route, Routes } from "react-router-dom";

import SkillDevelopment from "./components/SkillDevelopment";
import CarrierResources from "./Pages/CarrierResources";
import JobDetail from "./Pages/JobDetail";
import Jobs from "./Pages/Jobs";
import MyApplication from "./Pages/MyAppication";
import Profile from "./Pages/Profile";
import Purchases from "./Pages/Purchases";
import SavedApplication from "./Pages/SavedApplication";

import PrivateRoute from "./components/PrivateRoute";

import UserLayout from "./components/UserLayout";

// =====================================================
// ADMIN
// =====================================================

import AdminLayout from "./admin/components/AdminLayout";
import CreateJob from "./admin/pages/CreateJob";
import Jobcategories from "./admin/pages/Jobcategories";
import AdminJobs from "./admin/pages/Jobs";
import Users from "./admin/pages/Users";

import { ApplicationProvider } from "./admin/context/ApplicationContext";
import { JobCategoryProvider } from "./admin/context/JobCategoryContext";
import { SubscriptionProvider } from "./admin/context/SubscriptionContext";

import ApplicationDetails from "./admin/pages/ApplicationDetails";
import Applications from "./admin/pages/Applications";
import FrontendApplications from "./admin/pages/FrontendApplications";
import RoleOpportunities from "./admin/pages/RoleOpportunities";

import SubscriptionCreate from "./admin/pages/SubscriptionCreate";
import SubscriptionEdit from "./admin/pages/SubscriptionEdit";
import Subscriptions from "./admin/pages/Subscriptions";

import AdminGallery from "./admin/pages/Gallery";
import Settings from "./admin/pages/Settings";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminProfile from "./admin/pages/AdminProfile";
import AdminDashboard from "./admin/pages/Dashboard";
import TestimonialManagement from "./admin/pages/TestimonialManagement";
import AndriodDevelopers from "./Pages/AndriodDevelopers";
import BackendDeveloper from "./Pages/BackendDeveloper";
import FrontendDeveloprs from "./Pages/FrontendDeveloprs";
import FullStackDeveloper from "./Pages/FullStackDeveloper";
import UiUxDesigner from "./Pages/UiUxDesigner";
import VideoEditor from "./Pages/VideoEditor";
import { getProfile } from "./redux/slicer/authSlice";
// import MySubscription from "./Pages/MySubscription";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <JobCategoryProvider>
      <ApplicationProvider>
        <SubscriptionProvider>
          <Routes>
            {/* =====================================================
                USER SIDE
            ===================================================== */}

            <Route element={<UserLayout />}>
              {/* PUBLIC USER ROUTES */}

              <Route path="/" element={<Home />} />

              {/* <Route path="/subscription" element={<Subscription />} /> */}

              <Route path="/fullStack" element={<FullStackDeveloper />} />
              <Route path="/andriod" element={<AndriodDevelopers />} />
              <Route path="/frontend" element={<FrontendDeveloprs />} />
              <Route path="/backend" element={<BackendDeveloper />} />
              {/* <Route path="/video-editor" element={<VideoEditor />} /> */}
              <Route path="/videoEditor" element={<VideoEditor />} />
              <Route path="/uiux-designer" element={<UiUxDesigner />} />
              <Route path="/uiux" element={<UiUxDesigner />} />

              <Route path="/contact" element={<ContactUs />} />

              <Route path="/about" element={<AboutUs />} />

              <Route path="/register" element={<Register />} />

              {/* USER LOGIN */}

              <Route path="/login" element={<Login />} />

              <Route path="/jobs" element={<Jobs />} />

              <Route path="/jobs/:id" element={<JobDetail />} />

              <Route path="/Carrier" element={<CarrierResources />} />
              {/* <Route path="/my-subscription" element={<MySubscription  />} /> */}

              <Route path="/skills" element={<SkillDevelopment />} />

              <Route path="/purchases" element={<Purchases />} />

              {/* =================================================
                  USER PRIVATE ROUTES
              ================================================= */}

              <Route element={<PrivateRoute allowedRoles={["user"]} />}>
                <Route path="/profile" element={<Profile />} />

                <Route path="/applications" element={<MyApplication />} />

                <Route
                  path="/savedapplication"
                  element={<SavedApplication />}
                />
              </Route>
            </Route>

            {/* =====================================================
                ADMIN LOGIN
                Separate Admin Login
            ===================================================== */}

            <Route path="/admin/login" element={<AdminLogin />} />

            {/* =====================================================
                ADMIN PRIVATE ROUTES
                Same PrivateRoute
            ===================================================== */}

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin" element={<AdminLayout />}>
                {/* DASHBOARD */}

                <Route index element={<AdminDashboard />} />

                {/* USERS */}

                <Route path="users" element={<Users />} />

                {/* JOB CATEGORIES */}

                <Route path="jobcategories" element={<Jobcategories />} />

                {/* JOBS */}

                <Route path="jobs" element={<AdminJobs />} />

                <Route path="jobs/create" element={<CreateJob />} />

                <Route
                  path="/admin/reviews"
                  element={<TestimonialManagement />}
                />

                {/* APPLICATIONS */}

                <Route path="applications" element={<Applications />} />

                <Route
                  path="applications/:applicationId"
                  element={<ApplicationDetails />}
                />

                {/* Unified Redirects: Role Applications -> Applications, Role Opportunities -> Jobs */}
                <Route
                  path="frontend-applications"
                  element={<Applications />}
                />

                <Route
                  path="role-opportunities"
                  element={<AdminJobs />}
                />

                {/* SUBSCRIPTIONS */}

                <Route path="subscriptions" element={<Subscriptions />} />

                <Route
                  path="subscriptions/create"
                  element={<SubscriptionCreate />}
                />

                <Route
                  path="subscriptions/edit/:id"
                  element={<SubscriptionEdit />}
                />

                {/* GALLERY */}

                <Route path="gallery" element={<AdminGallery />} />

                <Route path="profile" element={<AdminProfile />} />

                {/* SETTINGS */}

                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </SubscriptionProvider>
      </ApplicationProvider>
    </JobCategoryProvider>
  );
}

export default App;
