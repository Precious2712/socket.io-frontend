export interface UserStatusResponse {
    message: string;
    success: boolean;
    offlineOrOnline: UserData[];
}

export interface UserData {
    _id: string;
    email: string;
    password: string;
    gender: string;
    login: boolean;
    firstName: string;
    lastName: string;
    createdAt: string; 
    updatedAt: string; 
    __v: number;
}
