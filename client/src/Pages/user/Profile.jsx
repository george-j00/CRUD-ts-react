import React, { useState } from "react";
import { useSelector } from "react-redux";
// import EditProfile from '../../components/EditProfile'
import { Link } from "react-router-dom";
import EditProfileModal from "../../components/EditProfile";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <section className="container text-gray-600 body-font p-10">
        <div className="mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Profile
            </h1>
            <div className="p-2 w-2/3">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  readonly
                  value={user.name}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-2/3">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  readonly
                  value={user.email}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="inline-flex text-gray-100 bg-gray-900 border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded text-lg"
                onClick={toggleModal}
              >
                Edit Profile
              </button>
              <Link to="/">
                <button className="inline-flex text-gray-600 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Back
                </button>
              </Link>
            </div>
          </div>
          <div className="lg:max-w-md lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="hero"
              src={user?.profilePicture.secure_url}
            />
          </div>
        </div>
      </section>

      {/* profile edit modal  */}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={toggleModal} className="close-button text-white">
              X
            </button>
            <EditProfileModal toggleModal={toggleModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
