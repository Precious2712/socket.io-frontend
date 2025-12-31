
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UserFriendRequest } from '@/data/user/data';
import { Variants } from 'framer-motion';

interface Props {
    data: UserFriendRequest[];
    handleReject: (id: string) => void;
    getInitials: (f: string, l: string) => string;
    getAvatarColor: (gender: string) => string;
    containerVariants: Variants;
    cardVariants: Variants;
}

export function RejectFriendRequest({
    data,
    handleReject,
    getInitials,
    getAvatarColor,
    containerVariants,
    cardVariants
}: Props) {

    return (
        <motion.div
            className="w-full flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {data.map(req => (
                <motion.div
                    key={req._id}
                    variants={cardVariants}
                    className="bg-transparent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 w-full hover:shadow-lg transition-all duration-300"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 w-full">

                        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">

                            <div
                                className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full 
                                ${getAvatarColor(req.senderGender)} 
                                flex items-center justify-center text-white font-bold 
                                text-lg sm:text-xl lg:text-2xl shadow-md shrink-0`}
                            >
                                {getInitials(req.senderFirstName, req.senderLastName)}
                            </div>

                            <div className="flex flex-col flex-1 min-w-0">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
                                    {req.senderFirstName} {req.senderLastName}
                                </h2>

                                <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                    {req.senderGender || "Not specified"}
                                </span>

                                <span className='mt-3.5 text-sm'>
                                    <h1>Status: {req.status}</h1>
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-[200px]">
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                                <Button
                                    className="cursor-pointer h-9 sm:h-7 lg:h-8 text-sm sm:text-base font-semibold bg-red-700 hover:bg-red-400 transition-colors duration-200 shadow-md w-full"
                                    onClick={() => handleReject(req._id)}
                                >
                                    Decline
                                </Button>
                            </motion.div>
                        </div>

                    </div>
                </motion.div>
            ))}
        </motion.div>
    );
}
