'use client';

import { useAppContext } from '@/useContext/context';
import { motion, Variants } from 'framer-motion';
import { FriendRequestList } from '../DashBoardComp/FriendRequestList';
import { RejectFriendRequest } from '../DashBoardComp/RejectFriendRequest';

export function RejectRequest() {
    const { handleReject, request } = useAppContext();

    const getInitials = (firstName: string, lastName: string) =>
        `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();

    const getAvatarColor = (gender: string) => {
        switch (gender?.toLowerCase()) {
            case 'male': return 'bg-blue-500';
            case 'female': return 'bg-pink-500';
            default: return 'bg-gray-500';
        }
    };

    // ✅ Properly typed variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",   // MUST be a valid type
                stiffness: 300,
                damping: 24
            }
        }
    };

    const pendingData = request || [];

    return (
        <div className="pt-6 px-4 sm:px-6 lg:px-8 w-full lg:pt-24">

            {pendingData.length > 0 && (
                <RejectFriendRequest
                    data={pendingData}
                    handleReject={handleReject}
                    getInitials={getInitials}
                    getAvatarColor={getAvatarColor}
                    containerVariants={containerVariants}
                    cardVariants={cardVariants}
                />
            )}

            {/* {pendingData.length === 0 && requestData.length > 0 && (
                <FriendRequestList
                    data={requestData}
                    handleUpdate={handleReject}
                    getInitials={getInitials}
                    getAvatarColor={getAvatarColor}
                    containerVariants={containerVariants}
                    cardVariants={cardVariants}
                />
            )} */}

            {pendingData.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full flex flex-col items-center justify-center py-20 text-center"
                >
                    <motion.h1
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-7xl md:text-8xl font-extrabold text-gray-800 tracking-widest select-none"
                    >
                        404
                    </motion.h1>

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-6xl mt-6 mb-4"
                    >
                        😊
                    </motion.div>

                    <h2 className="text-xl font-semibold text-slate-700">
                        No Friend Requests Yet
                    </h2>

                    <p className="text-gray-500 mt-2 max-w-[300px]">
                        Hang tight! Other users will send you requests soon.
                        Keep exploring and connecting.
                    </p>
                </motion.div>
            )}


        </div>
    );
}
