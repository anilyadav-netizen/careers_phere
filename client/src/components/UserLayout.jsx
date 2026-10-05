import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import FloatingVideoWidget from "./FloatingVideoWidget";
import WelcomePopup from "./WelcomePopup";

const UserLayout = () => {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <Outlet />

      {/* Welcome popup for first-time visitors */}
      <WelcomePopup />

      {/* Floating bunny video - non-intrusive, independent z-layer */}
      <FloatingVideoWidget />

      <Footer />
    </>
  );
};

export default UserLayout;