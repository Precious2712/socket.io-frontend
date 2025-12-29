'use client';

import { motion } from "framer-motion";
import { FriendRecord } from "@/data/user/record";
import Link from "next/link";

interface FriendsListProps {
    data?: FriendRecord[] | null;
}

export function FriendsList({ data }: FriendsListProps) {
    const friends = data ?? [];

    return (
        <div className="mt-5  w-[95%] h-[80vh] mx-auto md:max-w-2xl lg:max-w-4xl lg:mt-20">
            {friends.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-16"
                >
                    <motion.h1
                        initial={{ scale: 0.7 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="text-6xl font-bold text-slate-300"
                    >
                        404
                    </motion.h1>

                    <p className="text-gray-500 mt-3 text-lg">
                        No friends found.
                    </p>

                    <p className="text-slate-600 max-w-[300px] mt-1 text-center">
                        Start connecting with people to grow your friend list.
                    </p>
                </motion.div>
            )}

            <div className="w-full  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 p-5">
                {friends.map((item, i) => {
                    const reciever =
                        item.senderId.login === false ? item.senderId : item.receiverId;

                    const name = `${reciever.firstName} ${reciever.lastName}`;
                    
                    const initials = item.receiverId.firstName.charAt(0) + item.receiverId.lastName.charAt(0);

                    return (
                        <motion.div
                            key={item._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className=" w-full rounded-2xl shadow-lg p-4 flex items-center gap-4 hover:shadow-xl transform hover:-translate-y-1 transition-all lg:col-span-3"
                        >
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-semibold">
                                    {initials}
                                </div>

                                <span
                                    className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${reciever.login ? "bg-green-500" : "bg-gray-400"
                                        }`}
                                ></span>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-slate-800">{name}</h3>
                                <p className="text-sm text-gray-500">
                                    {reciever.gender}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Link href='/chat' className="py-1 px-3 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700">
                                    Message
                                </Link>
                                {/* <button className="py-1 px-3 border border-blue-600 text-blue-600 rounded-xl text-sm hover:bg-blue-50">
                                    View
                                </button> */}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
