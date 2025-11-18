'use client';

import { SignupFormComps } from "@/components/auth/SignupFormComps";
import { AnimatedText } from "@/components/DashBoardComp/AnimatedText";
import { LineText } from "@/components/DashBoardComp/LineTexts";
import { ShortText } from "@/components/DashBoardComp/ShortText";
import { motion } from "framer-motion";

export default function Home() {

  return (
    <div className=" bg-linear-to-br from-sky-50 to-blue-100 min-h-screen flex flex-wrap lg:flex-row items-center justify-around py-3.5">
      <div className="hidden lg:h-screen lg:flex flex-col justify-center">
        <div className="flex gap-5">
          <AnimatedText
            text="Create "
            className="text-3xl font-bold sm:text-8xl"
          />

          <AnimatedText
            text="Your "
            className="text-3xl font-bold sm:text-8xl"
          />
        </div>

        <AnimatedText
          text="Account"
          className="text-3xl font-bold sm:text-7xl text-center"
        />
      </div>

      <div className="text-center font-bold lg:hidden">
        <LineText
          className="text-4xl text-sky-950"
          text="Create Account!"
        />
        <ShortText
          className="text-blue-600 text-4xl"
          text="Start Chatting"
        />
      </div>

      <div className=" overflow-hidden overflow-y-auto w-[90%] lg:w-[30%] shadow-2xl  py-6 px-6 rounded-2xl no-scroll">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="h-[380px] "
        >
          <SignupFormComps />
        </motion.div>
      </div>
    </div>
  );
}
