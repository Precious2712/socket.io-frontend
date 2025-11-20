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
import {
    IFriendRequest
} from "@/data/header-nav/friend-request";
import { RequestData } from "next/dist/server/web/types";

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

    request: FriendRequestsResponse | null;
    pending: RequestsResponse | null;
    acceptedRef: RequestAcceptedResponse | null;

    handleUpdate: (id: string) => void;
    handleDeleteRequest: () => void;
    show: boolean;

    friends: IFriendRequest[];
    acceptReq: RequestData | null;
    online: IFriendRequest[];
    offline: IFriendRequest[];
    unConfirm: IFriendRequest[];

    recieverFriend: IFriendRequest[];
    friendList: IFriendRequest[];
    reject: IFriendRequest[];
    away: IFriendRequest[];
    active: IFriendRequest[];
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

    const [friends, setFriends] = useState<IFriendRequest[]>([]);
    const [acceptReq, setAcceptReq] = useState<RequestData | null>(null);
    const [online, setOnline] = useState<IFriendRequest[]>([]);
    const [offline, setOffline] = useState<IFriendRequest[]>([]);
    const [unConfirm, setUnconfirm] = useState<IFriendRequest[]>([]);

    ///RECIEVER///
    const [recieverFriend, setRecieverFriend] = useState<IFriendRequest[]>([]);
    const [reject, setReject] = useState<IFriendRequest[]>([]);
    const [friendList, setFriendList] = useState<IFriendRequest[]>([]);
    const [away, setAway] = useState<IFriendRequest[]>([]);
    const [active, setActive] = useState<IFriendRequest[]>([]);


    const navigate = useRouter();

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
            const res = await axios.post("http://localhost:5000/request/create", payload);
            setAcceptReq(res.data);
            console.log(res.data, 'sender-request-view');

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

    //// LOGINUSER THAT IS LOG IN //////////////

    const pendingRequest = async () => {
        const id = localStorage.getItem("user_id");
        if (!id) return;

        try {
            const res = await axios.get<FriendRequestsResponse>(
                `http://localhost:5000/request/search?loginUserId=${id}`
            );
            console.log('datta', res.data);

            setRequest(res.data);
        } catch (err) {
            console.log("pendingRequest error", err);
        }
    };

    //// RECIEVER THAT IS LOG IN  /////// 

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

    const handleUpdate = async (id: string) => {
        if (id) {
            alert(`User - ${id}`);
        } else {
            alert("No pending request to accept.");
        }

        try {
            await axios.put(
                `http://localhost:5000/request/${id}/response`,
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


    ////LogInUser////////////////////////////////////////////////////////
    useEffect(() => {
        if (!request?.result) return;
        const homies = request?.result.filter(
            (el: IFriendRequest) => el.response === true
        )
        setFriends(homies)
        console.log('homies-req', homies);
    }, [request])

    useEffect(() => {
        if (!request?.result) return;

        const notConfirm = request.result.filter(
            (el: IFriendRequest) => el.response === false
        );

        setUnconfirm(notConfirm);
        console.log("Pending-request:", notConfirm);
    }, [request]);


    useEffect(() => {
        if (!request?.result) return;

        const offlineUsers = request.result.filter(
            (el: IFriendRequest) => el.recieverStatus === false
        );

        setOffline(offlineUsers);
        console.log("Offline-user:", offlineUsers);
    }, [request]);

    useEffect(() => {
        if (!request?.result) return;

        const onlineUsers = request.result.filter(
            (el: IFriendRequest) => el.recieverStatus === true
        );

        setOnline(onlineUsers);
        console.log("Online-user:", online);
    }, [request]);

    //reciever////////////////////////////////////////

    useEffect(() => {
        if (!pending?.result) return;

        const recieverReq = pending.result.filter(
            (el: IFriendRequest) => el.response === true
        );

        setRecieverFriend(recieverReq);
        console.log("Accepted Requests:", recieverReq);
    }, [pending]);

    useEffect(() => {
        if (!pending?.result) return;
        const list = pending?.result.filter(
            (el: IFriendRequest) => el.response === true
        )
        setFriendList(list)
        console.log('req', list);
    }, [pending])

    useEffect(() => {
        if (!pending?.result) return;

        const unfriend = pending.result.filter(
            (el: IFriendRequest) => el.response === false
        );

        setReject(unfriend);
        console.log("Pending-request:", unfriend);
    }, [pending]);

    useEffect(() => {
        if (!pending?.result) return;

        const awayUsers = pending.result.filter(
            (el: IFriendRequest) => el.loginStatus === false
        );

        setAway(awayUsers);
        console.log("Offline-user:", awayUsers);
    }, [pending]);

    useEffect(() => {
        if (!pending?.result) return;

        const available = pending.result.filter(
            (el: IFriendRequest) => el.loginStatus === true
        );

        setActive(available);
        console.log("Online-user:", online);
    }, [pending]);



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
                reject,
                friendList,

                sendFriendRequest,
                isLoading,
                show,
                active,

                request,
                pending,
                acceptedRef,
                friends,
                acceptReq,
                online,
                offline,
                unConfirm,
                away,

                handleUpdate,
                handleDeleteRequest,
                recieverFriend
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
