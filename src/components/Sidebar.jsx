import React, { useEffect, useState } from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { PiChatCircleText } from "react-icons/pi";
import { FaChargingStation, FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";
import clsx from "clsx";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";



const Sidebar = () => {
  const currentUser = JSON.parse(sessionStorage.getItem("userInfo"));
  const currentUserId = currentUser?._id;

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const location = useLocation();

  const path = location.pathname.split("/")[1];

  const [userMsg, setUserMsg] = useState({})
  const [unreadedMsg, setUnreadedMsg] = useState({})
  const [totalUnrededMsg, setTotalUnrededMsg] = useState(0)

useEffect(() => {
    const messageRef = collection(db, "messages")

    const unsubscribe = onSnapshot(messageRef, (querySnapshot) => {
      const msgData = {};
      const unreaded = {};
      let totalUnreded = 0;

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
        totalUnreded ++;
      }
      })
      //console.log("Unread messages:", unreaded);
      //console.log("Total unread messages:", totalUnreded);

      setUserMsg(msgData);
      setUnreadedMsg(unreaded)
      setTotalUnrededMsg(totalUnreded)
    })

    return () => unsubscribe()
  }, [currentUserId])

  const linkData = [
    {
      label: "Dashboard",
      link: "dashboard",
      icon: <MdDashboard />,
    },
    {
      label: "Tasks",
      link: "tasks",
      icon: <FaTasks />,
    },
    {
      label: "Completed",
      link: "completed/completed",
      icon: <MdTaskAlt />,
    },
    {
      label: "In Progress",
      link: "in-progress/in progress",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "To Do",
      link: "todo/todo",
      icon: <MdOutlinePendingActions />,
    },
    {
      label: "Trash",
      link: "trashed",
      icon: <FaTrashAlt />,
    },
    {
      label: "Chat",
      link: "chat",
      icon:(
        
      <div className="relative">
      <PiChatCircleText />
          {totalUnrededMsg > 0 &&
            <span className="bg-red-500 text-white rounded-full px-2 text-xs absolute top-0 left-40">{totalUnrededMsg}</span>}
      </div> 
      
    )},
    {
      label: "Team",
      link: "team",
      icon: <FaUsers />,
    },
  ];
  const sidebarLinks = user?.isAdmin ? linkData : linkData.slice(0, 7);

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        to={el.link}
        onClick={closeSidebar}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-neutral-100" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed]">{el.label}</span>
      </Link>
    );
  };
  return (
    <div className="w-full  h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <p className="bg-blue-600 p-2 rounded-full">
          <MdOutlineAddTask className="text-white text-2xl font-black" />
        </p>
        <span className="text-2xl font-bold text-black">TaskMe</span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
