'use client';

import { Button } from "@/components/ui/button";
import { heading } from "@/data/header-nav/header";
import { useAppContext } from "@/useContext/context";
import { Home, Menu, MessageCircle, Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { dashboardData } from "@/data/header-nav/dashboard";
import { DashboardCard } from "@/data/header-nav/dashboard";
import { shuffle } from "@/data/header-nav/dashboard";
import { DashBoardComp } from "@/components/DashBoardComp/DashBoard";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/DashBoardComp/UserAvatar";
import { AcceptFriendRequest } from "@/components/home-pages/AcceptFriendRequest";
import { RejectRequest } from "@/components/home-pages/RejectRequest";
import { FriendsBucketList } from "@/components/home-pages/FriendsBucketList";
import { OfflinePage } from "@/components/home-pages/OfflineUserList";
import { OnlineUsersList } from "@/components/DashBoardComp/online-users";
import { OnlinePage } from "@/components/home-pages/OnlineUerList";
import Link from "next/link";
import WelcomeChatPage from "../chat-room-link/page";


export default function HomepageComp() {
    const { handleSelectItem, item, setSearchTerm, searchTerm, show, searchResults, sendFriendRequest, loading, setLoading } = useAppContext();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeId, setActiveId] = useState(0);
    const [cards, setCards] = useState<DashboardCard[]>(dashboardData);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const timeout = setTimeout(() => setCards(shuffle([...cards])), 3000);
        return () => clearTimeout(timeout);
    }, [cards]);

    const handleNavClick = (id: number) => {
        setActiveId(id);
        setIsMobileMenuOpen(false);
    };

    useEffect(() => {
        const userEmail = localStorage.getItem('user-email');
        setEmail(userEmail);
    }, []);

    return (
        <div className="relative min-h-screen bg-linear-to-br from-sky-50 to-blue-100 no-scroll">
            {/* Mobile Header & Menu */}
            <div className="bg-white lg:hidden">
                <div className="fixed top-0 w-full flex items-center justify-between h-16 px-4 bg-sky-900 z-50">
                    <div className="flex items-center gap-2">
                        <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="bg-sky-700  text-white hover:bg-sky-800 hover:text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            className="fixed z-50 bg-sky-900 w-[90%] shadow-xl no-scroll pt-16 pb-16"
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        >
                            <nav className=" overflow-y-auto py-4 no-scroll">
                                <div className="space-y-2 px-3">
                                    {heading.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                handleNavClick(item.id);
                                                handleSelectItem(item.text);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-sm ${activeId === item.id
                                                ? "bg-sky-700 text-white shadow-md"
                                                : "text-sky-100 hover:bg-sky-800 hover:text-white"
                                                }`}
                                        >
                                            {item.icon}
                                            <span className="font-medium">{item.text}</span>
                                        </button>
                                    ))}

                                </div>

                                <div className="w-[80%] relative border rounded-2xl mt-5 bg-amber-100 ml-3.5">
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />

                                    {/* Search Results */}
                                    {searchTerm && (
                                        <div className="absolute top-12 shadow-lg rounded-lg w-full h-[30vh] overflow-y-auto z-50 no-scroll">
                                            {searchResults.length === 0 ? (
                                                <p className="p-3 text-gray-500">No results found</p>
                                            ) : (
                                                searchResults.map((user) => (
                                                    <div
                                                        key={user._id}
                                                        className="flex items-center justify-between p-3 bg-sky-100 hover:bg-gray-100 cursor-pointer "
                                                    >
                                                        <div className="flex items-center gap-3 text-xs">
                                                            <UserAvatar
                                                                gender={user.gender}
                                                                firstName={user.firstName}
                                                                lastName={user.lastName}
                                                            />

                                                            <p className="font-semibold text-gray-800">
                                                                {user.firstName} {user.lastName}
                                                            </p>
                                                        </div>

                                                        <Button
                                                            className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700"
                                                            onClick={() => sendFriendRequest(user._id)}
                                                        >
                                                            {/* {isLoading ? "Loading" : "Click"} */}
                                                            Send
                                                        </Button>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}

                                </div>
                            </nav>
                        </motion.div>
                    )}

                </AnimatePresence>

                <div className="pt-16 h-screen">

                    <div className="h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth no-scroll">
                        <div className="min-h-full">
                            {item === 'Dashboard' && <DashBoardComp />}
                            {item === 'Accept Requests' && <AcceptFriendRequest />}
                            {item === 'Friends' && <FriendsBucketList />}
                            {item === 'Offline Friends' && <OfflinePage />}
                            {item === 'Online Friends' && <OnlinePage />}
                            {item === 'Chat-Room' && <WelcomeChatPage />}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex  min-h-screen ">
                <div className="flex flex-col h-screen w-[230px] bg-sky-900 border-r border-sky-700 fixed top-0 z-0">
                    <nav className="mt-16 overflow-y-auto overflow-x-hidden w-[230px] no-scroll">
                        <div className="flex items-center gap-3 py-2 px-3 border-b border-sky-700 bg-sky-900 shrink-0">
                            <div className="w-7 h-7 rounded-lg bg-sky-700 flex items-center justify-center">
                                <Home className="w-4 h-4 text-white" />
                            </div>
                            <h1 className="font-bold text-white">Chat App</h1>
                        </div>

                        <div className="space-y-2 mt-3.5 pr-1 text-xs">
                            {heading.map((item) => (
                                <motion.button
                                    key={item.id}
                                    onClick={() => {
                                        handleNavClick(item.id);
                                        handleSelectItem(item.text);
                                    }}
                                    className={`w-[225px] flex items-center gap-3 px-4 py-3 rounded-lg overflow-hidden text-sm font-medium transition-all duration-200 ${activeId === item.id
                                        ? "bg-sky-700 text-white shadow-md"
                                        : "text-sky-100 hover:bg-sky-800 hover:text-white"
                                        }`}
                                    whileHover={{ scale: 1.01, originX: 0 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    {item.icon}
                                    <span className="text-xs">{item.text}</span>
                                </motion.button>
                            ))}
                        </div>
                    </nav>
                </div>

                <div className="flex-1 ml-[235px]  ">
                    <nav className="hidden lg:fixed w-full top-0 right-0 bg-sky-900 py-2 px-6 lg:flex justify-between border-b-3 border-b-gray-600 z-50">
                        <div className="flex gap-2 font-bold">
                            <h1 className="text-white">
                                {email}
                            </h1>
                            <h1 className="text-white">Dashboard</h1>
                        </div>
                        <div className="flex gap-1.5 justify-items-center">
                            <Button className="h-9">
                                Chat-room
                            </Button>
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

                                <Input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setLoading(true);

                                        setTimeout(() => setLoading(false), 1000);
                                    }}
                                    className="pl-10 pr-10"
                                />

                                {loading && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-transparent"></div>
                                    </div>
                                )}
                            </div>

                            {show && (
                                <div className="absolute top-14 bg-white shadow-lg rounded-lg w-80 max-h-[250px] overflow-y-auto z-50">
                                    {searchResults.length === 0 ? (
                                        <p className="p-3 text-gray-500">No results found</p>
                                    ) : (
                                        searchResults.map((user) => (
                                            <div
                                                key={user._id}
                                                className="flex items-center justify-between p-3 border-b hover:bg-gray-100 cursor-pointer"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <UserAvatar
                                                        gender={user.gender}
                                                        firstName={user.firstName}
                                                        lastName={user.lastName}
                                                    />

                                                    <div>
                                                        <p className="font-semibold text-gray-800">
                                                            {user.firstName} {user.lastName}
                                                        </p>
                                                    </div>
                                                </div>
                                                <Button
                                                    className="bg-purple-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-purple-700"
                                                    onClick={() => sendFriendRequest(user._id)}
                                                >
                                                    Send
                                                </Button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}

                        </div>
                    </nav>
                    {item === 'Dashboard' && <DashBoardComp />}
                    {item === 'Accept Requests' && <AcceptFriendRequest />}
                    {item === 'Reject Requests' && <RejectRequest />}
                    {item === 'Friends' && <FriendsBucketList />}
                    {item === 'Offline Friends' && <OfflinePage />}
                    {item === 'Online Friends' && <OnlinePage />}

                    {item === 'Chat-Room' && (
                        <WelcomeChatPage />
                    )}
                </div>
            </div>
        </div>
    );
}