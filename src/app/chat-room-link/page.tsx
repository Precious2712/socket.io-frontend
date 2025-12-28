'use client';

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WelcomeChatPage() {
    return (
        <div className="min-h-screen flex items-center justify-center  px-4 pt-20">
            <div className="bg-white w-full max-w-xl rounded-2xl shadow-xl p-8 text-center">

                <div className="flex justify-center mb-4">
                    <div className="bg-pink-100 p-4 rounded-full">
                        <MessageCircle className="w-8 h-8 text-pink-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Welcome to the Chat Room
                </h1>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    Connect instantly with friends and community members in real-time.
                    Send messages, stay online, and enjoy smooth conversations — just like WhatsApp.
                </p>

                <div className="text-sm text-gray-600 mb-8 space-y-2">
                    <p>⚡ Real-time messaging powered by sockets</p>
                    <p>🟢 See who’s online and active</p>
                    <p>🔒 Secure and private conversations</p>
                </div>

                <Link
                    href="/chat"
                    className="inline-block bg-pink-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-pink-700 transition"
                >
                    Enter Chat Room
                </Link>
                
                <p className="text-xs text-gray-400 mt-6">
                    Make sure you’re connected to the internet for the best experience.
                </p>
            </div>
        </div>
    );
}
