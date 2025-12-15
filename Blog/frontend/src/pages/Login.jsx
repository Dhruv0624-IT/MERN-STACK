import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post("/auth/login", form);
      login(res.data);
      showToast("success", "Logged in successfully");
      navigate("/");
    } catch (err) {
      showToast("danger", err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestOtp = async () => {
    if (!form.email) {
      showToast("warning", "Please enter your email first");
      return;
    }
    try {
      setLoading(true);
      await api.post("/auth/request-otp", { email: form.email });
      setOtpRequested(true);
      showToast("info", "OTP sent to your email");
    } catch (err) {
      showToast("danger", err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode) {
      showToast("warning", "Enter OTP code");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", {
        email: form.email,
        code: otpCode,
      });
      login(res.data);
      showToast("success", "OTP verified. Logged in.");
      navigate("/");
    } catch (err) {
      showToast("danger", err.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Login</h3>

              <form onSubmit={handleSubmit} className="vstack gap-3">
                <div>
                  <label className="form-label">Email</label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="d-flex gap-2 align-items-center">
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={handleRequestOtp}
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Request OTP"}
                  </button>

                  {otpRequested && (
                    <>
                      <input
                        autoFocus
                        className="form-control"
                        style={{ maxWidth: 160 }}
                        placeholder="OTP"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={handleVerifyOtp}
                        disabled={loading}
                      >
                        Verify
                      </button>
                    </>
                  )}
                </div>

                <div>
                  <label className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  Login with Password
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
