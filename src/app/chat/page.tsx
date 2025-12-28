'use client';

import { useEffect, useState } from 'react';
import { Sidebar } from '@/components/DashBoardComp/side-bar';
import { ChatWindow } from '@/components/DashBoardComp/ChatWindow';
import { useAppContext } from '@/useContext/context';
import { User } from '@/data/user/chat';
import { ArrowLeft } from 'lucide-react';

interface CurrentUser {
    _id: string;
    firstName: string;
    lastName: string;
}

export default function ChatPage() {
    const { chat } = useAppContext();

    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    // const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    const handleSelectUser = (user: User) => {
        setSelectedUser(user);
    };

    useEffect(() => {
        const firstName = localStorage.getItem('user-first-name');
        const lastName = localStorage.getItem('user-last-name');
        const userId = localStorage.getItem('user_id');

        if (firstName && lastName && userId) {
            setCurrentUser({
                _id: userId,
                firstName,
                lastName,
            });
        }
    }, []);

    if (!currentUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading chat...
            </div>
        );
    }

    return (
        <div className="h-screen flex overflow-hidden">

            <div
                className={`
          w-full md:w-[320px]
          ${selectedUser ? 'hidden md:block' : 'block'}
          border-r
        `}
            >
                <Sidebar
                    users={chat}
                    onSelectUser={handleSelectUser}
                    selectedUserId={selectedUser?._id}
                    // unreadCounts={unreadCounts}
                />
            </div>

            <div
                className={`
          flex-1
          ${!selectedUser ? 'hidden md:flex' : 'flex'}
          flex-col
        `}
            >
                {selectedUser && (
                    <div className="md:hidden border-b p-2">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="text-pink-600 font-semibold"
                        >
                            <ArrowLeft />
                        </button>
                    </div>
                )}

                <ChatWindow
                    currentUser={currentUser}
                    selectedUser={selectedUser}
                />
            </div>
        </div>
    );
}
