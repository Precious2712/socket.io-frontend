export interface IUser {
    _id: string;
    email: string;
    password: string;
    gender: string;
    login: boolean;
    firstName?: string;
    lastName?: string;
}

export interface IFriendRequest {
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;

    logInFirstName: string;
    loginLastName: string;
    loginGender: string;
    loginStatus: boolean;

    recieverFirstName: string;
    recieverLastName: string;
    recieverStatus: boolean;

    response: boolean;

    logInUserId: IUser;
    reciever: IUser;
}

export interface FriendRequestsResponse {
    message: string;
    success: boolean;
    result: IFriendRequest[];
}

export interface RequestsResponse {
    message: string;
    success: boolean;
    result: IFriendRequest[];
}

export interface RequestAcceptedResponse {
    message: string;
    success: boolean;
    result: IFriendRequest[];
}

export type User = IUser;
