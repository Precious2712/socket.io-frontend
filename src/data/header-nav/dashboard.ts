import React from 'react';
import { Clock, MessageCircle, MessageSquare, UserCheck, UserPlus, Users } from "lucide-react";

export interface DashboardCard {
    id: number;
    title: string;
    value: string;
    description: string;
    color: string;
    icon: React.ReactNode;
    path: string;
    image: string;
}

export const dashboardData: DashboardCard[] = [
    {
        id: 0,
        title: "Accept Requests",
        value: "5 New",
        description: "Friend requests waiting for your approval",
        color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        icon: React.createElement(Clock, { size: 28, color: "white" }),
        path: "/requests/pending",
        image: "https://images.unsplash.com/photo-1551836026-d5c8c2d7b5f5?w=400&h=300&fit=crop"
    },
    {
        id: 1,
        title: "Reject Requests",
        value: "5 New",
        description: "Friend requests waiting for your approval",
        color: "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)",
        icon: React.createElement(Clock, { size: 28, color: "white" }),
        path: "/requests/pending",
        image: "https://images.unsplash.com/photo-1551836026-d5c8c2d7b5f5?w=400&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Online Friends",
        value: "12 Friends",
        description: "Successfully connected friends this month",
        color: "linear-gradient(135deg, #4ECDC4 0%, #6DE5D9 100%)",
        icon: React.createElement(UserCheck, { size: 28, color: "white" }),
        path: "/requests/accepted",
        image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        title: "Friends",
        value: "47 People",
        description: "Active friends in your network",
        color: "linear-gradient(135deg, #45B7D1 0%, #67D1EB 100%)",
        icon: React.createElement(Users, { size: 28, color: "white" }),
        path: "/friends",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop"
    },
    {
        id: 4,
        title: "Offline Friends",
        value: "3 Active",
        description: "Group conversations you're participating in",
        color: "linear-gradient(135deg, #96CEB4 0%, #B4E8C9 100%)",
        icon: React.createElement(MessageCircle, { size: 28, color: "white" }),
        path: "/chat",
        image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=400&h=300&fit=crop"
    },
    {
        id: 5,
        title: "Chat Room",
        value: "8 Unread",
        description: "Messages requiring your attention",
        color: "linear-gradient(135deg, #FFEAA7 0%, #FFF4D1 100%)",
        icon: React.createElement(MessageSquare, { size: 28, color: "white" }),
        path: "/chat",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
        id: 6,
        title: "N0 of Accepted Request",
        value: "15 Active",
        description: "Friends currently available to chat",
        color: "linear-gradient(135deg, #DDA0DD 0%, #E8B5E8 100%)",
        icon: React.createElement(UserPlus, { size: 28, color: "white" }),
        path: "/friends",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop"
    }
];

export function shuffle(array: DashboardCard[]): DashboardCard[] {
    return [...array].sort(() => Math.random() - 0.5);
}