import React, { useEffect, useState } from "react";
import axios from "axios";

const LeftSidebar = ({ onUserSelect }) => { 
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/user/get-team`, {
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  const handleUserSelect = (user) => {
    //console.log("Utilisateur sélectionné:", user);
    onUserSelect(user);  
  };

  return (
    <div className="sidebar w-72 bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Team Members</h2>
      <ul className="space-y-4">
        {users?.map((user) => (
          <li 
            key={user._id} 
            className="flex items-center gap-4 p-4 rounded-lg bg-white bg-opacity-30 text-white hover:bg-opacity-60 cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => handleUserSelect(user)}
          >
            <span className="text-lg text-gray-800">
                {user.name}
            </span> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
