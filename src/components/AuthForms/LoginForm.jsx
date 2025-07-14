import { useState , useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { EyeClosed } from "lucide-react";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
  });


  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sanitizedPhone =
    formData.phoneNumber.startsWith("0")
      ? formData.phoneNumber.slice(1)
      : formData.phoneNumber;
    try {
      const response = await axios.post("https://your-api.com/api/auth/login", {
        phoneNumber: sanitizedPhone,
        password: formData.password,
      });

      // Handle login success: store token, redirect, etc.
      const { token, user } = response.data;
      console.log("Login successful:", user);

      // Example: Store token in localStorage
      localStorage.setItem("authToken", token);

      // Redirect or show dashboard (you can use React Router)
      //  navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || "Invalid phone number or password please try again");
    }
    localStorage.setItem("token", response.data.token);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-cardBackground p-8 rounded-lg shadow-lg w-[370px] flex flex-col justify-self-center items-center mt-[20px] border  border-gray font-noto"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <p className="text-[13px] text-gray-500 text-center">Welcome back!</p>
        <div className="w-full space-y-1">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="912345678"
            required
            className="bg-white border-[0.5px] border-gray p-2 rounded-md w-full text-black"
          />
        </div>

        <div className="w-full space-y-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="bg-white border-[0.5px] border-gray p-2 rounded-md w-full text-black"
          />
        </div>
        <Link
          to="/forgot-password"
          className="flex -translate-x-5 -translate-y-3  self-end hover:underline  hover:text-black text-[13px]  text-gray-500"
        >
          Forgot Password?
        </Link>

        {error && <p className="text-gray-800">{error}</p>}

        <button
          type="submit"
          className="bg-white transform duration-200 text-gray-800 font-bold py-2 px-4 rounded-md w-[100px] hover:bg-black hover:text-white border-[0.5px] border-gray"
        >
          Log In
        </button>
        <p className="text-[13px] text-gray-800 flex self-end">
          Don't have an account? &nbsp;
          <Link
            to="/signup"
            className="underline font-semibold hover:font-bold"
          >
            Sign Up
          </Link>
        </p>
      </form>
      
    </>
  );
};

export default LoginForm;
