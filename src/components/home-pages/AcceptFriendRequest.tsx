'use client';

import { useAppContext } from '@/useContext/context';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

export function AcceptFriendRequest() {
    const { pending, handleUpdate, request } = useAppContext();

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
    };

    const getAvatarColor = (gender: string) => {
        switch (gender?.toLowerCase()) {
            case 'male': return 'bg-blue-500';
            case 'female': return 'bg-pink-500';
            default: return 'bg-gray-500';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <div className="pt-6 px-4 sm:px-6 lg:px-8 w-full lg:pt-24">
            {pending?.result.length === 0 ? (
                <motion.div
                    className="text-center py-20 text-gray-500 w-full text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    No pending friend requests
                </motion.div>
            ) : (
                <motion.div
                    className="w-full flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {pending?.result.map((req) => (
                        <motion.div
                            key={req._id}
                            variants={cardVariants}
                            className="bg-transparent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 w-full hover:shadow-lg transition-all duration-300"
                            whileHover={{
                                scale: 1.01,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 w-full">
                                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full ${getAvatarColor(req.loginGender)} flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-md shrink-0`}>
                                        {getInitials(req.logInFirstName, req.loginLastName)}
                                    </div>

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
                                            {req.logInFirstName} {req.loginLastName}
                                        </h2>
                                        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                                            <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                                {req.loginGender || 'Not specified'}
                                            </span>
                                            <span
                                                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap ${req.recieverStatus
                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                                                    }`}
                                            >
                                                {req.response ? '🟢 True' : '⚫ False'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-[200px]">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full"
                                    >
                                        <Button
                                            className="h-9 sm:h-7 lg:h-8 text-sm sm:text-base font-semibold bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md w-full"
                                            onClick={() => handleUpdate(req._id)}
                                            disabled={req.response}
                                        >
                                            Accept
                                        </Button>
                                    </motion.div>

                                    {/* <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full"
                                    >
                                        <Button
                                            variant="outline"
                                            className="h-9 sm:h-7 lg:h-8 text-sm sm:text-base font-semibold border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 w-full"
                                            disabled={!req.response}
                                        >
                                            Reject
                                        </Button>
                                    </motion.div> */}
                                </div>
                            </div>


                        </motion.div>
                    ))}
                </motion.div>
            )}

            {request?.result.length === 0 ?
                (
                    <motion.div
                        className="text-center py-20 text-gray-500 w-full text-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        No pending friend requests
                    </motion.div>
                )
                :
                <motion.div
                    className="w-full flex flex-col gap-4 sm:gap-6 max-w-7xl mx-auto"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {request?.result.map((req) => (
                        <motion.div
                            key={req._id}
                            variants={cardVariants}
                            className="bg-transparent rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-200 w-full hover:shadow-lg transition-all duration-300"
                            whileHover={{
                                scale: 1.01,
                                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6 w-full">
                                <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 w-full lg:w-auto">
                                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full ${getAvatarColor(req.loginGender)} flex items-center justify-center text-white font-bold text-lg sm:text-xl lg:text-2xl shadow-md shrink-0`}>
                                        {getInitials(req.logInFirstName, req.loginLastName)}
                                    </div>

                                    <div className="flex flex-col flex-1 min-w-0">
                                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 truncate">
                                            {req.logInFirstName} {req.loginLastName}
                                        </h2>
                                        <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                                            <span className="text-xs sm:text-sm text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 rounded-full whitespace-nowrap">
                                                {req.loginGender || 'Not specified'}
                                            </span>
                                            <span
                                                className={`text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap ${req.recieverStatus
                                                    ? 'bg-green-100 text-green-700 border border-green-200'
                                                    : 'bg-gray-100 text-gray-700 border border-gray-200'
                                                    }`}
                                            >
                                                {req.response ? '🟢 True' : '⚫ False'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col xs:flex-row gap-2 sm:gap-3 w-full lg:w-auto lg:min-w-[200px]">
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full"
                                    >
                                        <Button
                                            className="h-9 sm:h-7 lg:h-8 text-sm sm:text-base font-semibold bg-green-600 hover:bg-green-700 transition-colors duration-200 shadow-md w-full"
                                            onClick={() => handleUpdate(req._id)}
                                            disabled={req.response}
                                        >
                                            Accept
                                        </Button>
                                    </motion.div>

                                    {/* <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full"
                                    >
                                        <Button
                                            variant="outline"
                                            className="h-9 sm:h-7 lg:h-8 text-sm sm:text-base font-semibold border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 w-full"
                                            disabled={!req.response}
                                        >
                                            Reject
                                        </Button>
                                    </motion.div> */}
                                </div>
                            </div>


                        </motion.div>
                    ))}
                </motion.div>
            }
        </div>
    );
}