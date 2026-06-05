import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const navigate = useNavigate();
  const handleVerifyOTP = async () => {
    if (otp.trim() === "") {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await axios.post("http://localhost:4000/verify-otp", {
        email,
        otp,
      });

      alert(res.data.message);
      localStorage.setItem("resetToken", res.data.resetToken);

      // move to reset password page
      navigate("/password", { state: { email } });
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    console.log("Send OTP clicked");
    if (email.trim() === "") {
      alert("please enter valid gmail");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/forget_password",
        { email },
      );

      alert(response.data.message);
      setShowOtp(true);
    } catch (error) {
      alert(error.response?.data?.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔐</div>
          <h1 className="text-3xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-gray-500 mt-2">
            Enter your email and OTP to continue
          </p>
        </div>

        {/* Email Input */}
        <div className="mb-5">
          <label className="block text-gray-700 font-medium mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* OTP Input */}
        <div className={`mb-6 ${showOtp ? "block" : "hidden"}`}>
          <label className="block text-gray-700 font-medium mb-2">OTP</label>
          <input
            type="text"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSendOTP}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition"
          >
            Send OTP
          </button>

          <button
            onClick={handleVerifyOTP}
            className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition"
          >
            Verify OTP
          </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <button className="text-sm text-blue-600 hover:underline">
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
