import React, { useState } from "react";
import { useSelector } from "react-redux";
// import EditProfile from '../../components/EditProfile'
import { Link } from "react-router-dom";
import EditProfileModal from "../../components/EditProfile";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [imageUrl, setImageUrl] = useState('');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <section className="container text-gray-600 body-font flex justify-center items-center h-screen">
        <div className="flex flex-col lg:flex-row mx-auto px-5 py-10 lg:w-3/4">
          {/* profile picture  */}
          <div className="lg:w-1/2 flex justify-center mb-10  lg:mb-0">
            <div className="w-52 h-52 mt-7 rounded-full overflow-hidden">
              {user && user.profilePicture && user.profilePicture.secure_url ? (
                <img
                  className="object-cover object-center rounded-full w-full h-full "
                  alt="Profile Picture"
                  src={user.profilePicture.secure_url}
                />
              ) : (
                <img
                  className="object-cover object-center rounded-full w-full h-full"
                  alt="Default Profile Picture"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRV5Sh-Mjz4EzZrC7bEJ3Ol4WieT6YgjuMZ6w&usqp=CAU"
                />
              )}
            </div>
          </div>

          <div className="lg:w-1/2 flex flex-col items-center text-center lg:pl-10">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-900">
              Profile
            </h1>
            <div className="p-2 w-full max-w-xs">
              <div className="flex flex-col">
                <input
                  type="text"
                  id="name"
                  name="name"
                  readOnly
                  value={user.name}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full max-w-xs">
              <div className="flex flex-col">
               
                <input
                  type="text"
                  id="email"
                  name="email"
                  readOnly
                  value={user.email}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="flex justify-center space-x-4 mt-5">
              <button
                className="text-gray-100 bg-gray-900 border-0 py-2 px-12  focus:outline-none hover:bg-gray-800 rounded text-lg"
                onClick={toggleModal}
              >
                Edit Profile
              </button>
              <Link to="/">
                <button className="text-gray-600 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                  Back
                </button>
              </Link>
            </div>
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
