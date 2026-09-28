import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

const UserLayout = () => {
  return (
    <>
      <Navbar />

      <ScrollToTop />

      <Outlet />

      <Footer />
    </>
  );
};

export default UserLayout;