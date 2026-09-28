import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../AdminSidebar";
import AdminNavbar from "../AdminNavbar";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* SIDEBAR */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* MAIN AREA */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-72">
        <AdminNavbar setSidebarOpen={setSidebarOpen} />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
