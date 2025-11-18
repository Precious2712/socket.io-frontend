"use client";

import { DashboardCard } from "@/data/header-nav/dashboard";
import { shuffle } from "@/data/header-nav/dashboard";
import { dashboardData } from "@/data/header-nav/dashboard";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "@/useContext/context";

import {
    IFriendRequest
} from "@/data/header-nav/friend-request";

export function DashBoardComp() {
    const { request, pending } = useAppContext();

    const [cards, setCards] = useState<DashboardCard[]>(dashboardData);

    const [name, setName] = useState<string | null>(null);

    const [acceptedReq, setAcceptedReq] = useState<IFriendRequest[]>([]);
    const [online, setOnline] = useState<IFriendRequest[]>([]);
    const [offline, setOffline] = useState<IFriendRequest[]>([]);

    useEffect(() => {
        if (!request?.result) return;

        const filterPendingReq = request.result.filter(
            (el: IFriendRequest) => el.response === true
        );

        setAcceptedReq(filterPendingReq);
        console.log("Pending Requests:", filterPendingReq);
    }, [request]);

    useEffect(() => {
        if (!request?.result) return;

        const offlineUsers = request.result.filter(
            (el: IFriendRequest) => el.recieverStatus === false
        );

        setOffline(offlineUsers);
        console.log("Offline-user:", offlineUsers);
    }, [request]);

    useEffect(() => {
        if (!request?.result) return;

        const onlineUsers = request.result.filter(
            (el: IFriendRequest) => el.recieverStatus === true
        );

        setOnline(onlineUsers);
        console.log("Online-user:", online);
    }, [request]);

    useEffect(() => {
        const timeout = setTimeout(() => setCards(shuffle([...cards])), 3000);
        return () => clearTimeout(timeout);
    }, [cards]);

    useEffect(() => {
        const name = localStorage.getItem("user-first-name");
        setName(name);
    }, []);

    return (
        <div className="pt-6 p-3 bg-linear-to-br from-sky-50 to-blue-100 lg:pt-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-2xl font-bold text-gray-600 mb-4 lg:text-3xl">
                        {name} Dashboard
                    </h1>
                </motion.div>

                <motion.ul
                    className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <AnimatePresence>
                        {cards.map((card, index) => (
                            <motion.li
                                key={card.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{
                                    type: "spring",
                                    damping: 25,
                                    stiffness: 200,
                                    delay: index * 0.1,
                                }}
                                className="h-64 cursor-pointer no-scroll"
                                whileHover={{
                                    scale: 1.05,
                                    transition: { type: "spring", stiffness: 400 },
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <div
                                    className="w-full h-full rounded-2xl relative overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl"
                                    style={{ background: card.color }}
                                    onClick={() => console.log(`Navigate to: ${card.path}`)}
                                >
                                    <div
                                        className="absolute inset-0 bg-cover bg-center opacity-40 transition-opacity duration-300 hover:opacity-30"
                                        style={{ backgroundImage: `url(${card.image})` }}
                                    />

                                    <div className="relative z-10 w-full h-full p-6 flex flex-col justify-between bg-linear-to-br from-black/20 to-black/10">
                                        <div className="flex items-center gap-3">
                                            <motion.div
                                                className="bg-white/20 p-2 rounded-xl backdrop-blur-sm border border-white/30"
                                                whileHover={{ rotate: 5 }}
                                            >
                                                {card.icon}
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                                {card.title}
                                            </h3>
                                        </div>

                                        <div className="space-y-2">
                                            <motion.p
                                                className="text-3xl font-black text-white drop-shadow-2xl"
                                                whileHover={{ scale: 1.1 }}
                                            >
                                                {card.title === "Pending Requests"
                                                    ? `${request?.result.length} Request`
                                                    : card.title === "Accept Friend Request"
                                                        ? `${pending?.result.length || 0} Request`
                                                        : card.title === "Total Friends"
                                                            ? `${acceptedReq.length || 0} Friend`
                                                            : card.title === 'Offline Friends'
                                                                ? `${offline.length || 0} Users`
                                                                : card.title === 'Online Friends'
                                                                    ? `${online.length || 0} Users`
                                                                    : card.title === 'Friends'
                                                                        ? `${acceptedReq.length || 0} Accepted`
                                                                        : card.value}
                                            </motion.p>

                                            <p className="text-lg text-white/95 font-medium drop-shadow">
                                                {card.description}
                                            </p>
                                        </div>

                                        <div className="flex justify-end">
                                            <motion.div
                                                className="bg-white/25 px-4 py-2 rounded-full backdrop-blur-sm border border-white/40 text-white font-semibold text-sm"
                                                whileHover={{
                                                    scale: 1.1,
                                                    backgroundColor: "rgba(255, 255, 255, 0.35)",
                                                }}
                                            >
                                                View Details →
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </motion.ul>
            </div>
        </div>
    );
}
