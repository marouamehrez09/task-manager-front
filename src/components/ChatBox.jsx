import React, { useState, useEffect, useRef } from "react";
import { addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from '../utils/firebase'
import moment from "moment"

function ChatBox({ selectedUser }) { 
  const userData = sessionStorage.getItem("userInfo");
  const user = userData ? JSON.parse(userData) : null;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");

  const chatId = selectedUser ? [user?._id, selectedUser._id].sort().join("_") : null;
  
  const messagesEndRef = useRef(null); 


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
   

  useEffect(() => {
    if (chatId) {
      const q = query(
        messagesRef, 
        where("chatId", "==", chatId),
        orderBy("createdAt", "asc")
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const messagesList = querySnapshot.docs.map(doc => doc.data());
        setMessages(messagesList);
      });

      return () => unsubscribe();
    }
  }, [chatId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      userId: user?._id,
      userName: user?.name,
      chatId, 
    });

    setNewMessage("");
  };

  if (!selectedUser) {
    return <div className="p-4">Veuillez sélectionner un utilisateur pour démarrer la conversation.</div>;
  }

  return (
  
    <div className="flex flex-col h-[500px] w-full p-4 bg-white rounded-lg shadow-md">
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.userId === user?._id ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs md:max-w-md p-3 rounded-lg text-lg text-white shadow-md ${msg.userId === user?._id ? "bg-blue-500" : "bg-gray-400 text-black"}`}>
              <p className="mt-1 text-white font-semibold">{msg.userName}</p>
              <p className="mt-1 text-lg text-gray-800 p-2 rounded-lg">{msg.text}</p>
              <p className="mt-1 text-gray-200 text-xs italic text-right">{msg.createdAt ? moment(msg.createdAt.toDate()).calendar() : "En cours..."}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>

      </div>

      
      <form className="flex items-center space-x-4" onSubmit={handleSubmit}>
        <input 
          className="flex-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Tapez votre message ici.."
          onChange={(e) => setNewMessage(e.target.value)}
          value={newMessage}
        />
        <button 
          type="submit" 
          className="px-6 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
