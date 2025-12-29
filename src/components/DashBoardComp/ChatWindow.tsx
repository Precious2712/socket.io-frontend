'use client';

import { useEffect, useRef, useState } from 'react';
import { socket } from '@/lib/socket';

type Message = {
    _id: string;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
    message: string;
    seen: boolean;
};

type Props = {
    currentUser: {
        _id: string;
        firstName: string;
        lastName: string;
    };
    selectedUser: {
        _id: string;
        firstName: string;
        lastName: string;
    } | null;
};

export function ChatWindow({ currentUser, selectedUser }: Props) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [text, setText] = useState('');
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const bottomRef = useRef<HTMLDivElement | null>(null);

    // Connect & register
    useEffect(() => {
        socket.connect();
        socket.emit('registerUser', currentUser._id);

        socket.on('userOnline', (userId: string) => {
            setOnlineUsers(prev => [...new Set([...prev, userId])]);
        });

        socket.on('userOffline', (userId: string) => {
            setOnlineUsers(prev => prev.filter(id => id !== userId));
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // Join room & load messages
    useEffect(() => {
        if (!selectedUser) return;

        socket.emit('joinRoom', {
            senderId: currentUser._id,
            receiverId: selectedUser._id,
        });

        socket.emit('loadMessages', {
            senderId: currentUser._id,
            receiverId: selectedUser._id,
        });

        socket.emit('markAsSeen', {
            senderId: currentUser._id,
            receiverId: selectedUser._id,
        });

        socket.on('chatHistory', (data: Message[]) => {
            setMessages(data);
        });

        socket.on('messagesSeen', () => {
            setMessages(prev =>
                prev.map(m =>
                    m.senderId === currentUser._id ? { ...m, seen: true } : m,
                ),
            );
        });

        return () => {
            socket.off('chatHistory');
            socket.off('messagesSeen');
        };
    }, [selectedUser?._id]);

    // Receive live messages
    useEffect(() => {
        socket.on('receiveMessage', (msg: Message) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, []);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = () => {
        if (!text || !selectedUser) return;

        socket.emit('sendMessage', {
            senderId: currentUser._id,
            senderName: currentUser.firstName,
            receiverId: selectedUser._id,
            receiverName: selectedUser.firstName,
            message: text,
        });

        setText('');
    };

    if (!selectedUser) {
        return (
            <div className="flex-1 flex items-center justify-center text-gray-400 bg-linear-to-br from-sky-50 to-blue-100">
                Select a user to start chatting
            </div>
        );
    }

    const isOnline = onlineUsers.includes(selectedUser._id);

    return (
        <div className="flex-1 flex flex-col bg-gray-400">
            <header className="p-3 border-b flex justify-between items-center">
                <span className="font-semibold">
                    {selectedUser.lastName}
                </span>
                <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-green-400'}`}>
                    {isOnline ? 'Online' : 'Offline'}
                </span>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {messages.map(msg => (
                    <div
                        key={msg._id}
                        className={` max-w-xs p-2 rounded ${msg.senderId === currentUser._id
                                ? 'ml-auto bg-gray-600 text-white'
                                : 'bg-gray-200'
                            }`}
                    >
                        <p>{msg.message}</p>

                        {msg.senderId === currentUser._id && (
                            <span className="text-xs opacity-70 flex justify-end">
                                {msg.seen ? '✔✔ Seen' : '✔ Delivered'}
                            </span>
                        )}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="p-3 border-t flex gap-2">
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    className="flex-1 border rounded px-3 py-2"
                    placeholder="Type a message..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-pink-600 text-white px-4 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
}
