import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ForgotPasswordForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }else if(phoneNumber.length !== 9){
      setError("Phone number must be 9 digits");
      return;
    }else{
      setError("");
    }

    try {
      const response = await axios.post('https://your-api.com/api/auth/forgot-password', {
        phoneNumber: phoneNumber,
      });

      setMessage(response.data.message || 'Reset link sent to your email');
      setError('');
    } catch (err) {
      console.error("Forgot password error:", err);
      setError(err.response?.data?.message || 'Something went wrong.');
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-cardBackground p-8 rounded-lg shadow-lg w-[370px] flex flex-col items-center gap-12 border min-h-[250px] border-gray font-noto">
      <div className="w-full space-y-3 flex flex-col">
      <h2 className="text-xl font-bold">Forgot Password</h2>

      <input
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        onChange={(e) => {
          const sanitizedPhone =
          e.target.value.startsWith("0")
            ? e.target.value.slice(1)
            : e.target.value;
          setPhoneNumber(sanitizedPhone)}}
        placeholder="Enter your phone number"
        required
        className="bg-white border-[0.5px] border-gray p-2 rounded-lg w-full"
      />
      <p className="text-[13px] text-gray-600 flex self-end">Return to &nbsp; <Link to="/login" className="underline font-semibold hover:font-bold">Login</Link></p>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}

      <button type="submit" className=" bg-white text-black font-semibold p-2 hover:bg-black hover:text-white transform duration-200 rounded-lg w-[150px] border-[0.5px] border-gray">
       <Link to="/otp"> Send Reset Link</Link>
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
