import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { ToastContext } from "../context/ToastContext";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  // ------------------ Validation ------------------
  const validateForm = () => {
    const newErrors = {};

    if (!form.username.trim()) newErrors.username = "Username is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ------------------ Handlers ------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trimStart() }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/register", {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      showToast("success", "Registration successful! Check your email for OTP.");

      navigate("/verify-otp", {
        state: {
          email: form.email.trim(),
          userId: res.data.userId || res.data._id,
        },
      });
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Try again.";

      showToast("danger", message);

      if (err.response?.data?.field) {
        setErrors((prev) => ({
          ...prev,
          [err.response.data.field]: message,
        }));
      }
    } finally {
      setLoading(false);
    }
  };

  const isDisabled =
    loading ||
    !form.username.trim() ||
    !form.email.trim() ||
    !form.password ||
    !form.confirmPassword;

  // ------------------ UI ------------------
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            sign in to your existing account
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                aria-invalid={!!errors.username}
                aria-describedby={errors.username ? "username-error" : undefined}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.username ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.username && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id="username-error"
                >
                  {errors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600" id="email-error">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  className={`mt-1 block w-full px-3 py-2 border ${
                    errors.password ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute inset-y-0 right-0 px-3 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600" id="password-error">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={
                  errors.confirmPassword ? "confirmPassword-error" : undefined
                }
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
              />
              {errors.confirmPassword && (
                <p
                  className="mt-1 text-sm text-red-600"
                  id="confirmPassword-error"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className="w-full py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
