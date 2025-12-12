export interface FriendUser {
    _id: string;
    gender: string;
    login: boolean;
    firstName: string;
    lastName: string;
}

export interface FriendRecord {
    _id: string;
    pair: string;
    status: "accepted" | "pending" | "rejected";
    sendCount: number;
    createdAt: string;
    updatedAt: string;

    senderId: FriendUser;
    receiverId: FriendUser;

    senderFirstName: string;
    senderLastName: string;
    senderGender: string;
}


export interface FriendsResponse {
    friends: FriendRecord[];
    totalFriends: number;
}
