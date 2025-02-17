/*import React, { useEffect, useState } from "react";
import axios from "axios";

const SidebarChat = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8801/api/user/get-team", {
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

  return (
    <div className="sidebar w-60 bg-gray-100 hover:bg-gray-300 p-4">
      <h2 className="text-xl font-semibold mb-4">Team Members</h2>
      <ul className="space-y-2">
        {users?.map((user) => (
          <li 
            key={user._id} 
            className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded cursor-pointer"
            onClick={() => (user)}
          >
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarChat;*/
