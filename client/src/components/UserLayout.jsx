import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import FloatingVideoWidget from "./FloatingVideoWidget";

const UserLayout = () => {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <Outlet />

      <FloatingVideoWidget />

      <Footer />
    </>
  );
};

export default UserLayout;