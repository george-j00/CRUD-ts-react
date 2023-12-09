import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@gmail.com$/;
    return emailPattern.test(email);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    } else {
      newErrors.email = "";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 8 characters long";
    } else {
      newErrors.password = "";
    }

    if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    } else {
      setErrors({ email: "", password: "" });
      console.log("this is form data", formData);
      axios
        .post("http://localhost:3000/api/user/signup", formData)
        .then((res) => {
          console.log("this is response ", res.data.message);
          navigate("/login");
        })
        .catch((err) => console.log(err.response.data.error));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 ">
      <div className="container bg-black p-12 rounded-md w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
        <h2 className="text-3xl text-white mb-4 font-bold text-center">
          Sign Up
        </h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-800 p-3 mb-4 rounded-md w-5/6"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-800 p-3 mb-4 rounded-md w-5/6"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          {/* <p className="text-red-500 text-xs italic text-center mb-4">
            {errors.email}
          </p> */}
          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-800 p-3 mb-4 rounded-md w-5/6"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="bg-gray-800 p-3 mb-4 rounded-md w-5/6"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <p className="text-red-500 text-xs italic text-center mb-4">
            {errors?.email} <br />
            {errors?.password}
          </p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Sign Up
          </button>
          <div className="text-gray-600 flex flex-row gap-3 mt-5">
            <p>Already have an account ? </p>
            <a href="/login" className="text-blue-800">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
