  import React, { useState } from 'react'
  import { AiTwotoneEdit } from "react-icons/ai";
import EditProfileModal from './EditProfile';

  const UserCard = ({name , url , email }) => {

    return (
      <>
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={url?.secure_url} />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">{name}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
         <button >
         <AiTwotoneEdit />
         </button>
        </div>
      </div>

      </>
    )
  }

  export default UserCard