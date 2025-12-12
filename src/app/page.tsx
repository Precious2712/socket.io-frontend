'use client';

import { SignupFormComps } from "@/components/auth/SignupFormComps";
import { AnimatedText } from "@/components/DashBoardComp/AnimatedText";
import { LineText } from "@/components/DashBoardComp/LineTexts";
import { ShortText } from "@/components/DashBoardComp/ShortText";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 to-blue-100 flex items-center justify-center lg:justify-around p-6">

      <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-around gap-10 lg:gap-0 w-full">

        <div className="hidden lg:flex flex-col justify-center">
          <div className="flex gap-5">
            <AnimatedText text="Create " className=" font-bold text-7xl" />
            <AnimatedText text="Your " className=" font-bold text-7xl" />
          </div>
          <AnimatedText text="Account" className=" font-bold sm:text-7xl text-center" />
        </div>

        <div className="lg:hidden text-center font-bold">
          <LineText className="text-2xl text-sky-950" text="Create Account!" />
          <ShortText className="text-blue-600 text-2xl" text="Start Chatting" />
        </div>

        <div className="overflow-y-auto w-[90%] lg:w-[430px]  h-[450px] shadow-2xl py-6 px-6 rounded-2xl no-scroll">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <SignupFormComps />
          </motion.div>
        </div>

      </div>

    </div>

  );
}
