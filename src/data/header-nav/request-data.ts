export interface RequestData {
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
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateRequestResponse {
    message: string;
    success: boolean;
    data: RequestData;
}
