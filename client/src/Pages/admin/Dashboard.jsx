import React, { useEffect, useState } from "react";
import UserCard from "../../components/UserCard";
import SearchUser from "../../components/SearchUser";
import axios from "axios";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/all-users"
        );
        setUsers(response.data.users);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = searchQuery
    ? users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : users;

  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              User Data
            </h1>
            <p className="lg:w-2/3 mt-5 mx-auto  ">
            <div className="w-full max-w-sm mx-auto">
      <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
        <input
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      
      </div>
    </div>
            </p>
          </div>
          <div className="flex flex-wrap -m-2">
            {filteredUsers.map((user, i) => (
              <UserCard
                key={i}
                name={user.name}
                email={user.email}
                url={user.profilePicture}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
