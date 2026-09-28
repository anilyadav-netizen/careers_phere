import {
  BriefcaseBusiness,
  ChevronRight,
  CreditCard,
  FileText,
  Images,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },

    {
      name: "Categories",
      path: "/admin/jobcategories",
      icon: ShieldCheck,
    },
    {
      name: "Jobs",
      path: "/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      name: "Applications",
      path: "/admin/applications",
      icon: FileText,
    },
    {
      name: "Testimonial",
      path: "/admin/reviews",
      icon: FileText,
    },
    {
      name: "Subscriptions",
      path: "/admin/subscriptions",
      icon: CreditCard,
    },
    {
      name: "Gallery",
      path: "/admin/gallery",
      icon: Images,
    },
  ];

  const bottomItems = [
    {
      name: "Admin Profile",
      path: "/admin/profile",
      icon: UserRound,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("careerSphereAdmin");
    localStorage.removeItem("careerSphereAdminToken");

    navigate("/admin/login");
  };

  const renderNavItem = (item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        end={item.path === "/admin"}
        onClick={() => setSidebarOpen(false)}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all ${
            isActive
              ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
              : "text-slate-600 hover:bg-blue-50 hover:text-blue-600"
          }`
        }
      >
        {({ isActive }) => (
          <>
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                isActive
                  ? "bg-white/15 text-white"
                  : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
              }`}
            >
              <Icon size={18} />
            </span>

            <span className="min-w-0 flex-1 truncate">{item.name}</span>

            <ChevronRight
              size={15}
              className={`shrink-0 transition-transform ${
                isActive
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            />
          </>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white shadow-xl transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20">
              <BriefcaseBusiness size={22} />
            </div>

            <div className="min-w-0 text-left">
              <h1 className="truncate text-lg font-black tracking-tight text-slate-900">
                CareerSphere
              </h1>

              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                Admin Panel
              </p>
            </div>
          </button>

          {/* MOBILE CLOSE */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* ADMIN PROFILE MINI */}
        <div className="mx-4 mt-5 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-black text-white">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-800">
                Administrator
              </p>

              <p className="truncate text-[10px] font-medium text-blue-600">
                Super Admin
              </p>
            </div>

            <div className="ml-auto h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 ring-4 ring-green-100" />
          </div>
        </div>

        {/* NAVIGATION */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1.5">{menuItems.map(renderNavItem)}</nav>

          <div className="my-6 h-px bg-slate-100" />

          <p className="mb-3 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
            Account
          </p>

          <nav className="space-y-1.5">{bottomItems.map(renderNavItem)}</nav>
        </div>

        {/* LOGOUT */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 transition group-hover:bg-red-100">
              <LogOut size={18} />
            </span>

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
