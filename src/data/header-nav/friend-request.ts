// types/friend-request.ts
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


////Accepted Friend Request//////////

export interface RequestAccepted {
    _id: string;
    logInUserId: string;
    logInFirstName: string;
    loginLastName: string;
    recieverLastName: string;
    response: boolean;
    reciever: string;
    recieverStatus: boolean;
    recieverFirstName: string;
    loginGender: string;
    loginStatus: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

// export interface RequestAcceptedResponse {
//     message: string;
//     success: boolean;
//     result: FriendRequest[];
// }

//.........SinglerUser Found............../////////////...////////////.................///

export interface User {
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
