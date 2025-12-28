'use client';

import { User } from '@/data/user/chat';
import { ArrowLeft, CircleChevronRight } from 'lucide-react';
import Link from 'next/link';

interface Props {
    users: User[];
    onSelectUser: (user: User) => void;
    selectedUserId?: string;
    unreadCounts?: Record<string, number>;
}

export function Sidebar({
    users = [],
    onSelectUser,
    selectedUserId,
    unreadCounts = {},
}: Props) {
    return (
        <aside className="w-72 h-screen border-r bg-white flex flex-col bg-gray-600">
            <div className='flex justify-between p-3 items-center bg-gray-200'>
                <div className='flex gap-3'>
                    <Link href='/home'>
                        <CircleChevronRight className='w-4 h-4' />
                    </Link>
                    <ArrowLeft className='w-4 h-4' />
                </div>
                <span className='font-bold text-red-600 font-sans hover:text-red-300 cursor-pointer'>Chats</span>
            </div>

            <ul className="flex-1 overflow-y-auto no-scroll bg-gray-600">
                {users.map((user) => {
                    const isActive = selectedUserId === user._id;

                    return (
                        <li
                            key={user._id}
                            onClick={() => onSelectUser(user)}
                            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition
                ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}
              `}
                        >
                            <div className="relative">
                                <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold uppercase">
                                    {user.firstName.charAt(0)}
                                </div>

                                <span
                                    className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white
                    ${user.login ? 'bg-green-500' : 'bg-gray-400'}
                  `}
                                />
                            </div>

                            <div className="flex-1 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-800">
                                    {user.firstName} {user.lastName}
                                </span>

                                {unreadCounts[user._id] > 0 && (
                                    <span className="bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                                        {unreadCounts[user._id]}
                                    </span>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
