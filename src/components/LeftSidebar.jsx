import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import moment from "moment";

const LeftSidebar = ({ onUserSelect }) => { 
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");
  //console.log("Token récupéré:", token);

  
  const currentUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const currentUserId = currentUser?._id;

  const [userMsg, setUserMsg] = useState({})
  const [unreadedMsg, setUnreadedMsg] = useState({})
  //const [totalUnrededMsg, setTotalUnrededMsg] = useState(0)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/user/get-team`, {
          headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
          },
        })
      
      
        //console.log("Réponse de l'API:", response.data);
        setUsers(response.data); 
        //console.log(response.data)

      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
      }
    };

    if (token) {
      //console.log("Liste des utilisateurs:", users);
      fetchUsers();
    }
  }, [token])

  useEffect(() => {
    const messageRef = collection(db, "messages")

    const unsubscribe = onSnapshot(messageRef, (querySnapshot) => {
      const msgData = {};
      const unreaded = {};
      //let totalUnreded = 0;

      querySnapshot.forEach((doc) => {
        const msg = doc.data();
        const chatId = msg.chatId;

      if(!msgData[chatId] || msgData[chatId].createdAt < msg.createdAt) {
        msgData[chatId] = {
          text: msg.text,
          createdAt: msg.createdAt,
          SenderId: msg.userId,
          read: msg.read,
        }
      }

      if(!msg.read && msg.userId !== currentUserId && chatId.includes(currentUserId)) {
        unreaded[chatId]= (unreaded[chatId] || 0) +1 ;
        //totalUnreded ++;
      }
      })
      //console.log("Unread messages:", unreaded);
      //console.log("Total unread messages:", totalUnreded);

      setUserMsg(msgData);
      setUnreadedMsg(unreaded)
      //setTotalUnrededMsg(totalUnreded)
    })

    return () => unsubscribe()
  }, [currentUserId ])
  

  const handleUserSelect = (user) => {
    //console.log("Utilisateur sélectionné:", user);
    onUserSelect(user);  
  };

  return (
    <div className="sidebar w-72 bg-gradient-to-r from-blue-500 to-blue-700 p-6 rounded-xl shadow-lg space-y-6 h-[500px]">
      <h2 className="text-2xl font-semibold text-white mb-6">
          Team Members
          {/*} {totalUnrededMsg > 0 && <span className="bg-red-500 text-white rounded-full px-2 text-xs">{totalUnrededMsg}</span>}*/}
      </h2>
      <ul className="space-y-4  overflow-y-auto h-[calc(500px-120px)]">
        {/*{users?.map((user) => (
          <li 
            key={user._id} 
            className="flex items-center gap-4 p-4 rounded-lg bg-white bg-opacity-30 text-white hover:bg-opacity-60 cursor-pointer transition-all duration-300 transform hover:scale-105"
            onClick={() => handleUserSelect(user)}
          >
            <span className="text-lg text-gray-800">{user.name}</span> 
            
          </li>
        ))}*/}

{users.filter(user => user._id !== currentUserId).map((user) => {
          const chatId = [user._id, currentUserId].sort().join("_");
          const lastMessage = userMsg[chatId];
          const unreadCount = unreadedMsg[chatId] || 0;

          return (
            <li
              key={user._id}
              className="flex items-center gap-4 p-4 rounded-lg bg-white bg-opacity-30 text-white hover:bg-opacity-60 cursor-pointer transition-all duration-300 transform hover:scale-105"
              onClick={() => handleUserSelect(user)}
            >
              <div className="flex flex-col">
                <span className="text-lg text-gray-800 font-bold">{user.name}</span>
                <span className="text-sm text-white">
                  {lastMessage ? lastMessage.text : "Aucun message"}
                </span>
                <span className="text-xs text-gray-800">
                  {lastMessage?.createdAt ? moment(lastMessage.createdAt.toDate()).calendar() : ""}
                </span>
              </div>
              
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white rounded-full px-2 text-xs">
                  {unreadCount} 
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LeftSidebar 

