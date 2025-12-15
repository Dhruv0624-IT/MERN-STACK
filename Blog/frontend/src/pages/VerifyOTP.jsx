import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { ToastContext } from '../context/ToastContext';

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useContext(ToastContext);

  const { email, userId } = location.state || {};

  // Redirect back if no email/userId
  useEffect(() => {
    if (!email || !userId) navigate('/register');
  }, [email, userId, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(60);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  // Handle OTP input change
  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  // Verify OTP
  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      showToast('danger', 'Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setIsLoading(true);
      await api.post('/auth/verify-otp', { email, code: otpCode });
      showToast('success', 'Email verified successfully! Please login.');
      navigate('/login', { state: { email, message: 'Email verified successfully! Please login.' } });
    } catch (error) {
      console.error('OTP verification failed:', error);
      showToast('danger', error.response?.data?.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOTP = async () => {
    try {
      setResendDisabled(true);
      setCountdown(60);
      await api.post('/auth/request-otp', { email });
      showToast('info', 'New OTP sent to your email');
    } catch (error) {
      console.error('Failed to resend OTP:', error);
      showToast('danger', error.response?.data?.message || 'Failed to resend OTP');
      setResendDisabled(false);
    }
  };

  if (!email || !userId) return null;

  const isVerifyDisabled = otp.some((digit) => digit === '');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify Your Email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a 6-digit verification code to {email}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleVerify}>
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <div className="mt-1 flex justify-center space-x-2">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    aria-label={`Digit ${index + 1}`}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || isVerifyDisabled}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading || isVerifyDisabled ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Didn't receive the code?</p>
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendDisabled}
              className={`mt-2 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${resendDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
