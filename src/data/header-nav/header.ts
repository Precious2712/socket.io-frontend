import { Clock, CheckCircle2, Users, MessageSquare, Settings, LogOut, LayoutDashboard, UserPlus } from "lucide-react";
import React from "react";

interface NavItem {
  id: number;
  text: string;
  icon: React.ReactNode;
  path: string;
}

export const heading: NavItem[] = [
  {
    id: 0,
    text: "Dashboard",
    icon: React.createElement(LayoutDashboard, { className: "w-5 h-5" }),
    path: "/dashboard",
  },
  {
    id: 1,
    text: "Pending Requests",
    icon: React.createElement(Clock, { className: "w-5 h-5" }),
    path: "/requests/pending",
  },
  {
    id: 2,
    text: "Accepted Requests",
    icon: React.createElement(CheckCircle2, { className: "w-5 h-5" }),
    path: "/requests/accepted",
  },
  {
    id: 3,
    text: "Friends",
    icon: React.createElement(Users, { className: "w-5 h-5" }),
    path: "/friends",
  },
  {
    id: 4,
    text: "Chat Room",
    icon: React.createElement(MessageSquare, { className: "w-5 h-5" }),
    path: "/chat",
  },
  {
    id: 5,
    text: "Settings",
    icon: React.createElement(Settings, { className: "w-5 h-5" }),
    path: "/settings",
  },
  {
    id: 6,
    text: "Accept Friend Request",
    icon: React.createElement(UserPlus, { className: "w-5 h-5" }),
    path: "/requests/accept",
  },
  {
    id: 7,
    text: "Logout",
    icon: React.createElement(LogOut, { className: "w-5 h-5" }),
    path: "/logout",
  }
];