import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contacts/AuthProvider";
import googleLogo from "../assets/google-logo.svg";
import { fetchUserRole } from "../services/Userservice";

const FoodManagerLogin = () => {
  const { login, loginwithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ login: false, google: false });
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading((prev) => ({ ...prev, login: true }));
    setError("");

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const userCredential = await login(email, password); // Now we get userCredential properly
      const user = userCredential.user; // This should no longer be undefined

      const userRole = await fetchUserRole(user.uid); // Assuming you have a function to fetch user role

      if (userRole === "food-manager") alert("Sign up successful!");
      else alert("Go to inner-pantry login");
      navigateBasedOnRole(userRole); // Navigate based on role
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, login: false }));
    }
  };

  const handleGoogleLogin = async () => {
    setLoading((prev) => ({ ...prev, google: true }));
    setError("");

    try {
      const result = await loginwithGoogle();
      const user = result.user;

      const userRole = await fetchUserRole(user.uid);
      if (userRole === "food-manager") alert("Sign up successful!");
      else alert("Go to inner-pantry login");

      navigateBasedOnRole(userRole);
    } catch (err) {
      setError(err.message || "Google login failed. Please try again.");
    } finally {
      setLoading((prev) => ({ ...prev, google: false }));
    }
  };

  const navigateBasedOnRole = (role) => {
    if (role === "food-manager") {
      navigate("/food-manager/dashboard", { replace: true });
    } else if (role === "inner-pantry") {
      navigate("/login/inner-pantry", { replace: true });
    } else {
      alert("Role not recognized!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold">Login Form</h1>
            <form
              onSubmit={handleLogin}
              className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
            >
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                  placeholder="Email address"
                  aria-label="Email address"
                  required
                />
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-blue-600"
                  placeholder="Password"
                  aria-label="Password"
                  required
                />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <p>
                If you don't have an account, please{" "}
                <Link to="/sign-up" className="text-blue-600 underline">
                  Sign Up
                </Link>{" "}
                here.
              </p>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md px-6 py-2 w-full"
                disabled={loading.login}
              >
                {loading.login ? "Logging in..." : "Login"}
              </button>
            </form>
            <hr className="my-6" />
            <div className="text-center">
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-md px-4 py-2 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                disabled={loading.google}
              >
                <img
                  src={googleLogo}
                  className="w-6 h-6 mr-2"
                  alt="Google logo"
                />
                {loading.google ? "Signing up..." : "Login with Google"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodManagerLogin;
