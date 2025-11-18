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

import { searchedUser } from "@/data/header-nav/search-user";
import { FriendRequestsResponse, RequestsResponse, RequestAcceptedResponse, User } from "@/data/i-user.ts/users";

type AppContextType = {
    handleSelectItem: (text: string) => void;
    item: string;

    searchResults: searchedUser[];
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    loading: boolean;

    sendFriendRequest: (id: User) => void;
    isLoading: boolean;

    request: FriendRequestsResponse | null;   // outgoing / pending
    pending: RequestsResponse | null;         // incoming requests
    acceptedRef: RequestAcceptedResponse | null; // accepted friends

    handleUpdate: () => void;
    handleDeleteRequest: () => void;
    show: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const BoxItemsProvider = ({ children }: { children: ReactNode }) => {
    const [item, setItem] = useState("Dashboard");
    const [searchResults, setSearchResults] = useState<searchedUser[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);

    const [request, setRequest] = useState<FriendRequestsResponse | null>(null);
    const [pending, setPending] = useState<RequestsResponse | null>(null);
    const [acceptedRef, setAcceptedRef] = useState<RequestAcceptedResponse | null>(null);

    const navigate = useRouter();

    // ----------------------------------------------------
    // MENU ROUTER
    // ----------------------------------------------------
    const handleSelectItem = async (text: string) => {
        const id = localStorage.getItem("user_id");
        setItem(text);

        if (text === "Logout") {
            if (id) {
                try {
                    await Promise.allSettled([
                        axios.put(`http://localhost:5000/auth/${id}`, { login: false }),
                        axios.put(
                            `http://localhost:5000/request/user/${id}/login`,
                            { login: false }
                        )
                    ]);
                } catch (e) {
                    console.log("logout update error:", e);
                }
            }

            localStorage.clear();
            navigate.push("/");
        }
    };

    // ----------------------------------------------------
    // SEARCH USERS
    // ----------------------------------------------------
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
                    message: string;
                    success: boolean;
                    data: searchedUser[];
                }>(
                    `http://localhost:5000/auth/search?firstName=${encodeURIComponent(
                        searchTerm
                    )}`
                );

                setSearchResults(response.data.data || []);
                setShow(true);
            } catch (err) {
                console.log("search error", err);
            } finally {
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    // ----------------------------------------------------
    // SEND FRIEND REQUEST
    // ----------------------------------------------------
    const sendFriendRequest = async (id: User) => {
        const isLoginUser = localStorage.getItem("user_id");
        if (!isLoginUser) {
            alert("You need to be logged in to send requests.");
            return;
        }

        const payload = {
            logInUserId: isLoginUser,
            logInFirstName: localStorage.getItem("user-first-name") || "",
            loginLastName: localStorage.getItem("user-last-name") || "",
            loginGender: localStorage.getItem("user-gender") || "",
            reciever: id._id,
            recieverFirstName: id.firstName || "",
            recieverLastName: id.lastName || ""
        };

        try {
            setIsLoading(true);
            await axios.post("http://localhost:5000/request/create", payload);

            pendingRequest();
            acceptFriendRequest();
        } catch (err) {
            let msg = "A friend request already exists.";
            if (isAxiosError(err)) msg = err.response?.data?.message || msg;
            alert(msg);
        } finally {
            setIsLoading(false);
        }
    };

    // ----------------------------------------------------
    // OUTGOING REQUESTS (I sent)
    // ----------------------------------------------------
    const pendingRequest = async () => {
        const id = localStorage.getItem("user_id");
        if (!id) return;

        try {
            const res = await axios.get<FriendRequestsResponse>(
                `http://localhost:5000/request/search?loginUserId=${id}`
            );
            setRequest(res.data);
        } catch (err) {
            console.log("pendingRequest error", err);
        }
    };

    // ----------------------------------------------------
    // INCOMING REQUESTS (people who added me)
    // ----------------------------------------------------
    const acceptFriendRequest = async () => {
        const id = localStorage.getItem("user_id");
        if (!id) return;

        try {
            const res = await axios.get<RequestsResponse>(
                `http://localhost:5000/request/search?reciever=${id}`
            );
            setPending(res.data);
        } catch (err) {
            console.log("acceptFriendRequest error", err);
        }
    };

    // ----------------------------------------------------
    // ACCEPT FRIEND REQUEST
    // ----------------------------------------------------
    const handleUpdate = async () => {
        const firstId = pending?.result?.[0]?._id;

        if (!firstId) {
            alert("No pending request to accept.");
            return;
        }

        try {
            await axios.put(
                `http://localhost:5000/request/${firstId}/response`,
                { response: true }
            );

            pendingRequest();
            acceptFriendRequest();
            totalFriends();
        } catch (err) {
            let msg = "Unable to accept request.";
            if (isAxiosError(err)) msg = err.response?.data?.message || msg;
            alert(msg);
        }
    };

    const handleDeleteRequest = () => { };

    // ----------------------------------------------------
    // TOTAL FRIENDS
    // ----------------------------------------------------
    const totalFriends = async () => {
        const id = localStorage.getItem("user_id");
        if (!id) return;

        try {
            const res = await axios.get<RequestAcceptedResponse>(
                `http://localhost:5000/request/search?reciever=${id}&response=true`
            );
            setAcceptedRef(res.data);
        } catch (err) {
            console.log("totalFriends error", err);
        }
    };

    useEffect(() => {
        pendingRequest();
        acceptFriendRequest();
        totalFriends();
    }, []);

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
                
                request,
                pending,
                acceptedRef,

                handleUpdate,
                handleDeleteRequest
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
