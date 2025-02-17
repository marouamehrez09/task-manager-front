import React, { useState } from "react";
import LeftSidebar from "../components/LeftSidebar";
import ChatBox from "../components/ChatBox";

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="flex">
      <LeftSidebar onUserSelect={handleUserSelect} /> 
      <ChatBox selectedUser={selectedUser} /> 
    </div>
  );
};

export default Chat;
