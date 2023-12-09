import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setLogin } from "../../reduxStore/AuthSlice";
const AdminLogin = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const TEST_EMAIL = "admin@gmail.com";
    const TEST_PASSWORD = "1234";

    const { email, password } = formData;

    console.log(formData);

    if (email === TEST_EMAIL && password === TEST_PASSWORD) {
      navigate("/dashboard");
    } else {
      setErrors("Invalid credentials");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-900 ">
        <div className="container bg-black p-12 rounded-md w-2/3 md:w-1/2 lg:w-1/3 mx-auto">
          <h2 className="text-3xl text-white mb-4 font-bold text-center">
            Admin Login
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
              {errors}
            </p>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
