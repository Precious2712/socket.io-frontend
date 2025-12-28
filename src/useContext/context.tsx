'use client';

import {
    useContext,
    createContext,
    ReactNode,
    useState,
    useEffect
} from "react";

import { useRouter } from "next/navigation";
import axios, { isAxiosError } from "axios";
import { UserFriendRequest } from "@/data/user/data";
import { FriendsResponse } from "@/data/user/record";
import { AcceptedCountResponse } from "@/data/user/count";
import { UserStatusResponse } from "@/data/user/user-status";
import { User, UsersResponse } from "@/data/user/chat";

import { searchedUser } from "@/data/header-nav/search-user";


type AppContextType = {
    handleSelectItem: (text: string) => void;
    item: string;

    searchResults: searchedUser[];
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;

    sendFriendRequest: (user: string) => void;
    isLoading: boolean;

    request: UserFriendRequest[];

    handleUpdate: (id: string) => void;
    handleDeleteRequest: (id: string) => void;
    show: boolean;
    handleReject: (id: string) => void;
    friendsData: FriendsResponse | null;

    count: AcceptedCountResponse | null;
    status: UserStatusResponse | null;
    absent: UserStatusResponse | null;
    chat: User[];

};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const BoxItemsProvider = ({ children }: { children: ReactNode }) => {
    const [item, setItem] = useState("Dashboard");
    const [searchResults, setSearchResults] = useState<searchedUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [request, setRequest] = useState<UserFriendRequest[]>([]);
    const [friendsData, setFriendsData] = useState<FriendsResponse | null>(null);
    const [count, setCount] = useState<AcceptedCountResponse | null>(null);
    const [status, setStatus] = useState<UserStatusResponse | null>(null);
    const [absent, setAbsent] = useState<UserStatusResponse | null>(null);
    const [chat, setChat] = useState<User[]>([]);

    const navigate = useRouter();

    const handleSelectItem = async (text: string) => {
        const id = localStorage.getItem("user_id");
        setItem(text);

        if (text === "Logout") {
            if (id) {
                try {
                    await Promise.allSettled([
                        axios.put(`http://localhost:5000/auth/${id}`, { login: false }),
                    ]);
                } catch (e) {
                    console.log("logout update error:", e);
                }
            }

            localStorage.clear();
            navigate.push("/");
        }
    };

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([]);
            setLoading(false);
            setShow(false);
            return;
        }

        setLoading(true);

        const delay = setTimeout(async () => {
            try {
                const response = await axios.get<{
                    message: string
                    success: boolean
                    data: searchedUser[]
                }>(
                    `http://localhost:5000/auth/search?firstName=${encodeURIComponent(
                        searchTerm
                    )}`
                );
                console.log(response.data);
                setSearchResults(response.data.data)
                setShow(true);
            } catch (err) {
                console.log("search error", err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    const sendFriendRequest = async (user: string) => {
        const isLoginUser = localStorage.getItem("user_id");
        if (!isLoginUser) {
            alert("You need to be logged in to send requests.");
            return;
        }

        const payload = {
            senderId: isLoginUser,
            receiverId: user
        };

        localStorage.setItem("reciever-id", user);

        try {
            setIsLoading(true);

            const res = await axios.post("http://localhost:5000/sender/send", payload);
            console.log(res.data, "sender-request-view");

        } catch (err) {
            let msg = "A friend request already exists.";
            if (isAxiosError(err)) msg = err.response?.data?.message || msg;
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const pendingRequest = async () => {
        const id = localStorage.getItem("user_id");
        if (!id) return;

        try {
            const res = await axios.get<UserFriendRequest[]>(
                `http://localhost:5000/sender/pending/${id}`
            );
            console.log("datta", res.data);
            setRequest(res.data);
        } catch (err) {
            console.log("pendingRequest error", err);
        }
    };

    const handleUpdate = async (id: string) => {
        try {
            const currentUserId = localStorage.getItem("user_id");
            console.log(currentUserId);

            const res = await axios.put(
                `http://localhost:5000/sender/update/${id}`,
                {
                    status: "accepted",
                    currentUserId
                }
            );

            if (res) {
                alert('Request accepted');
            }

            console.log(res.data, "accepted-response");
            totalFriend();
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleDeleteRequest = async (id: string) => {
        try {
            await axios.put(`http://localhost:5000/sender/update/${id}`, { status: "accepted" });
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleReject = async (id: string) => {
        try {
            await axios.put(`http://localhost:5000/sender/update/${id}`, { status: "rejected" });
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const countAcceptedRequest = async () => {
        const userId = localStorage.getItem("user_id");
        if (!userId) return;

        try {
            const res = await axios.get<AcceptedCountResponse>(
                `http://localhost:5000/sender/accepted-count/${userId}`
            );

            setCount(res.data);
            console.log('Accepted Count:', res.data);

            return res.data;
        } catch (error) {
            console.error('Error fetching accepted count:', error);
        }
    };


    const totalFriend = async () => {
        const userId = localStorage.getItem("user_id");
        console.log(userId);

        if (!userId) return;

        try {
            const res = await axios.get<FriendsResponse>(
                `http://localhost:5000/sender/friends/${userId}`
            );
            console.log('total-friends', res.data);
            setFriendsData(res.data)
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };


    const offlineUsers = async () => {
        try {
            const res = await axios.get<UserStatusResponse>(`http://localhost:5000/auth/status-check?login=${false}`);
            console.log(res, 'offline-users');
            setAbsent(res.data);
        } catch (err) {
            let msg = "A friend request already exists.";
            if (isAxiosError(err)) msg = err.response?.data?.message || msg;
            alert(msg);
        }
    }

    const onlineUsers = async () => {
        try {
            const res = await axios.get<UserStatusResponse>(`http://localhost:5000/auth/status-check?login=${true}`);
            console.log(res, 'online-users');
            setStatus(res.data);
        } catch (err) {
            let msg = "A friend request already exists.";
            if (isAxiosError(err)) msg = err.response?.data?.message || msg;
            alert(msg);
        }
    }

    const Users = async () => {
        try {
            const res = await axios.get<UsersResponse>(`http://localhost:5000/auth/fetch-users`);
            console.log(res.data?.users);
            setChat(res.data?.users);
        } catch (err) {
            let msg = "A friend request already exists.";
            if (isAxiosError(err)) msg = err.response?.data?.message || msg;
        }
    }



    useEffect(() => {
        pendingRequest()
        countAcceptedRequest()
        totalFriend()
        onlineUsers();
        offlineUsers();
        Users();
    }, [])

    return (
        <AppContext.Provider
            value={{
                handleSelectItem,
                item,
                searchResults,
                searchTerm,
                setSearchTerm,
                loading,
                setLoading,
                sendFriendRequest,
                isLoading,
                show,
                chat,
                request,
                handleUpdate,
                handleDeleteRequest,
                handleReject,
                friendsData,
                count,
                status,
                absent
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error("useAppContext must be used inside provider");
    return ctx;
};