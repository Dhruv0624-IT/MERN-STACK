import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
<<<<<<< HEAD
=======
import { ToastContext } from "../context/ToastContext";
>>>>>>> bf97954 (updated Back-End Projects)

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
<<<<<<< HEAD
  const { login } = useContext(AuthContext);
=======
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { showToast } = useContext(ToastContext);
>>>>>>> bf97954 (updated Back-End Projects)
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);
      login(res.data);
<<<<<<< HEAD
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
=======
      showToast("success", "Logged in successfully");
      navigate("/");
    } catch (err) {
      showToast("danger", err.response?.data?.message || "Login failed");
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
      showToast("info", "OTP sent to your email. Check inbox/spam.");
    } catch (err) {
      showToast("danger", err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!form.email || !otpCode) {
      showToast("warning", "Enter email and the OTP code");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/auth/verify-otp", { email: form.email, code: otpCode });
      login(res.data);
      showToast("success", "OTP verified. Logged in.");
      navigate("/");
    } catch (err) {
      showToast("danger", err.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
>>>>>>> bf97954 (updated Back-End Projects)
    }
  };

  return (
<<<<<<< HEAD
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <div className="password-input-container">
          <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            placeholder="Password" 
            onChange={handleChange} 
            required 
          />
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
=======
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h3 className="mb-3 text-center">Login</h3>
              <form onSubmit={handleSubmit} className="vstack gap-3">
                <div>
                  <label className="form-label">Email</label>
                  <input className="form-control" name="email" placeholder="you@example.com" onChange={handleChange} required />
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button type="button" className="btn btn-outline-primary" disabled={loading} onClick={handleRequestOtp}>
                    {loading ? "Sending..." : "Request OTP"}
                  </button>
                  {otpRequested && (
                    <>
                      <input
                        className="form-control"
                        style={{ maxWidth: 180 }}
                        name="otp"
                        placeholder="OTP code"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                      />
                      <button type="button" className="btn btn-success" disabled={loading} onClick={handleVerifyOtp}>
                        {loading ? "Verifying..." : "Verify OTP"}
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
                      placeholder="Password"
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

                <button type="submit" className="btn btn-primary w-100">Login with Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
>>>>>>> bf97954 (updated Back-End Projects)
    </div>
  );
};

export default Login;
