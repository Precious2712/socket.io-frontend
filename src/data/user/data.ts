

export interface PopulatedSender {
    _id: string;
    firstName: string;
    lastName: string;
    gender: string;
    login: boolean;
}

export interface UserFriendRequest {
    _id: string;
    senderId: PopulatedSender;
    receiverId: string;
    status: string;
    pair: string;
    senderFirstName: string;
    senderLastName: string;
    senderGender: string;
    sendCount: number;
    createdAt: string | Date;
    updatedAt: string | Date;
    __v: number;
}

