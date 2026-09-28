import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Loader2,
} from "lucide-react";

import {
  loginUser,
  getProfile,
  clearAuthError,
  clearAuthSuccess,
} from "../../redux/slicer/authSlice";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [adminError, setAdminError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setAdminError("");

    if (!email.trim() || !password) {
      setAdminError("Please enter email and password.");
      return;
    }

    try {
      dispatch(clearAuthError());
      dispatch(clearAuthSuccess());

      // =========================================
      // STEP 1: LOGIN
      // =========================================
      const loginResult = await dispatch(
        loginUser({
          email: email.trim(),
          password,
        })
      );

      console.log("========== LOGIN RESULT ==========");
      console.log("LOGIN RESULT:", loginResult);
      console.log("LOGIN PAYLOAD:", loginResult.payload);
      console.log("LOGIN DATA:", loginResult.payload?.data);
      console.log("==================================");

      // Login failed
      if (!loginUser.fulfilled.match(loginResult)) {
        setAdminError(
          loginResult.payload || "Login failed."
        );
        return;
      }

      // =========================================
      // STEP 2: GET PROFILE FROM BACKEND
      // =========================================
      const profileResult = await dispatch(getProfile());

      console.log("========== PROFILE RESULT ==========");
      console.log("PROFILE RESULT:", profileResult);
      console.log("PROFILE PAYLOAD:", profileResult.payload);
      console.log(
        "PROFILE DATA:",
        profileResult.payload?.data
      );
      console.log("====================================");

      // Profile failed
      if (!getProfile.fulfilled.match(profileResult)) {
        setAdminError(
          profileResult.payload ||
            "Unable to fetch user profile."
        );
        return;
      }

      // =========================================
      // STEP 3: GET USER FROM PROFILE RESPONSE
      // =========================================
      const profileData = profileResult.payload?.data;

      const loggedInUser =
        profileData?.user ||
        profileData;

      console.log("========== ADMIN USER ==========");
      console.log("USER:", loggedInUser);
      console.log(
        "USER ID:",
        loggedInUser?._id || loggedInUser?.id
      );
      console.log(
        "USER NAME:",
        loggedInUser?.name
      );
      console.log(
        "USER EMAIL:",
        loggedInUser?.email
      );
      console.log(
        "USER ROLE:",
        loggedInUser?.role
      );
      console.log(
        "IS ADMIN:",
        loggedInUser?.isAdmin
      );
      console.log("================================");

      // =========================================
      // STEP 4: NORMALIZE ROLE
      // =========================================
      const role = String(
        loggedInUser?.role || ""
      )
        .trim()
        .toLowerCase();

      console.log("NORMALIZED ROLE:", role);

      // =========================================
      // STEP 5: ADMIN CHECK
      // =========================================
      if (
        role !== "admin" &&
        loggedInUser?.isAdmin !== true
      ) {
        console.log(
          "Not an admin. Role received:",
          role
        );

        setAdminError(
          "You are not authorized to access the admin panel."
        );

        return;
      }

      // =========================================
      // STEP 6: ADMIN LOGIN SUCCESS
      // =========================================
      console.log("==============================");
      console.log("ADMIN LOGIN SUCCESS");
      console.log("REDIRECTING TO /admin");
      console.log("==============================");

      const redirectPath =
        location.state?.from?.pathname ||
        "/admin";

      navigate(redirectPath, {
        replace: true,
      });
    } catch (err) {
      console.error(
        "ADMIN LOGIN ERROR:",
        err
      );

      setAdminError(
        err?.message ||
          "Something went wrong during login."
      );
    }
  };

  const displayError =
    adminError || error;

  return (
    <main className="flex min-h-[calc(100vh-68px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg">
            <ShieldCheck size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-black text-slate-900">
            Admin Login
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Login to manage CareerSphere
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Admin Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="admin@careersphere.com"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setAdminError("");
                  }}
                  placeholder="Enter admin password"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-11 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  disabled={loading}
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700 disabled:cursor-not-allowed"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            {displayError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {displayError}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Login as Admin
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default AdminLogin;