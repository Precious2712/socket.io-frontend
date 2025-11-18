'use client';

import { motion, Variants } from "framer-motion";
import { LoginFormComp } from "@/components/auth/LoginFormComp";
import { useEffect, useState } from "react";
import { AnimatedLetter } from "@/components/DashBoardComp/AnimatedLetter";
import { AnimatedParagraph } from "@/components/DashBoardComp/AnimatedParagraph";

export default function LoginPage() {
    const [name, setName] = useState<String | null>(null);

    const textVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number = 0) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    useEffect(() => {
        const userName = localStorage.getItem('user_firstName');
        setName(userName);
    }, []);


    return (
        <div className="bg-linear-to-br from-sky-50 to-blue-100 min-h-screen flex flex-col justify-center items-center">

            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center mb-8 flex flex-col">
                <AnimatedLetter
                    text={`Welcome back.`}
                    className="text-3xl font-bold text-center sm:text-4xl text-sky-950"
                />

                <AnimatedParagraph
                    text="Log in to start conversation."
                    className="text-[25px] mt-2 text-cyan-400 font-semibold"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut",
                }}
                className="mt-2 overflow-hidden w-[90%] lg:w-[30%] shadow-md p-6 rounded-2xl"
            >
                <LoginFormComp />
            </motion.div>
        </div>
    )
}