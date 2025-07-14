import { useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const OtpVerificationForm = () => {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        // Clear current value if not empty
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 5) {
      setError("Please enter the full 5-digit OTP");
      return;
    }

    try {
      const response = await axios.post(
        "https://your-api.com/api/auth/verify-otp",
        {
          otp: otpCode,
        }
      );

    //   setMessage(response.data.message || "OTP verified successfully");
      setError("");
    } catch (err) {
      console.error("OTP verification error:", err);
      setError(err.response?.data?.message || "Invalid or expired OTP");
      setMessage("");
    }
  };
  const handleResend = async () => {
    try {
      const response = await axios.post(
        "https://your-api.com/api/auth/resend-otp"
      );
      setMessage(response.data.message || "OTP resent");
      setError("");
    } catch (err) {
      console.error("Resend OTP error:", err);
      setError(err.response?.data?.message || "Failed to resend OTP");
      setMessage("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-cardBackground p-8 rounded-lg shadow-lg w-[370px] flex flex-col items-center gap-12 border-[0.5px] min-h-[250px] border-gray font-noto"
    >
      <div className="w-full space-y-3 flex flex-col items-center">
        <h2 className="text-xl font-bold">Enter OTP</h2>
        <div className="flex gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
              className="w-10 h-10 text-center border border-gray-300 rounded-lg text-lg"
            />
          ))}
        </div>
        {/* Resend OTP */}
        <p className="text-[16px] text-gray-600 flex self-end justify-end hover:font-semibold hover:underline transform duration-200 cursor-pointer w-fit" onClick={handleResend}>
          
            Resend 
          
        </p>
      </div>

      {error !=='' ? <p className="text-red-500">{error}</p>:null}
      {message !=='' ? <p className="text-green-500">{message}</p>:null}

      <button
        type="submit"
        className="bg-white text-black font-semibold p-2 hover:bg-black hover:text-white transform duration-200 rounded-lg w-[150px] border-[0.5px] border-gray"
      >
        Verify OTP
      </button>
    </form>
  );
};

export default OtpVerificationForm;
