import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../reduxStore/AuthSlice";
import { useNavigate } from "react-router-dom";

const EditProfileModal = ({toggleModal}) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    image: null,
    imageUrl: null,
    userId: user._id,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFormData({
        ...formData,
        [name]: files[0],
        imageUrl,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userId } = formData;

    console.log(formData);

    axios
      .post(
        `http://localhost:3000/api/user/edit-profile/:${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        dispatch(updateProfile(res.data.user));
        toggleModal()
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container px-5 py-24 mx-auto flex  items-center max-w-2xl">
        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <div className="w-full bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Edit Profile
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="p-2 w-2/3">
              <div className="relative">
                <label htmlFor="image"></label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                />
                {formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Selected"
                    className="mt-2 w-1/3 h-1/3"
                  />
                )}
              </div>
            </div>
            <button className="text-white bg-black border-0 py-2 px-8 mt-5 focus:outline-none hover:bg-gray-800 rounded text-lg">
              Edit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfileModal;
