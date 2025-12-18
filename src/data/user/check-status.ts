interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    login: boolean;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface OfflineOrOnlineData {
    message: string;
    success: boolean;
    offlineOrOnline: User[];
}
