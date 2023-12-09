import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../reduxStore/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    error: "",
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

    const { email, password } = formData;
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
    } else if (password.length < 4) {
      newErrors.password = "Invalid password";
    } else {
      newErrors.password = "";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
    } else {
      setErrors({ email: "", password: "" });
      axios
        .post("http://localhost:3000/api/user/login", formData)
        .then((res) => {
          dispatch(
            setLogin({
              user: res.data.user ,
              token: res.data.token
            })
          );
          navigate("/");
        })
        .catch((err) => {
          setErrors({ error: err.response?.data?.error });
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 ">
      <div className="container bg-black p-12 rounded-md w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
        <h2 className="text-3xl text-white mb-4 font-bold text-center">
          Login
        </h2>
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            id="email"
            className="bg-gray-800 p-3 mb-4 rounded-md w-5/6"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />

          <input
            type="password"
            name="password"
            id="password"
            className="bg-gray-800 p-3 mb-4 rounded-md w-5/6"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p className="text-red-500 text-xs italic text-center mb-4">
            {errors?.email} <br />
            {errors?.password}
            {errors?.error}
          </p>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
          <div className="text-gray-600 flex flex-row gap-3 mt-5">
            <p>Create New Account? </p>
            <a href="/signup" className="text-blue-800">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
