import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../../reduxStore/AuthSlice";

const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hanldeLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };
  return (
    <>
      {token ? (
        <div className="flex justify-center first-letter items-center h-screen">
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">
              <span className="text-blue-600">Welcome</span> {user?.name}{" "}
            </h1>
            <div className="flex justify-center gap-5">
              <Link to="/profile">
                <button className="mt-5 bg-black text-white p-3 rounded-lg ">
                  View Profile
                </button>
              </Link>
              <button
                className="mt-5 bg-red-600 text-white p-3 rounded-lg "
                onClick={hanldeLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default Home;
