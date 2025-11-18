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

export interface FriendsList {
    _id: string;
    logInUserId: User;
    logInFirstName: string;
    loginLastName: string;
    recieverLastName: string;
    response: boolean;
    reciever: User;
    recieverStatus: boolean;
    recieverFirstName: string;
    loginGender: string;
    loginStatus: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface RequestData {
    message: string;
    success: boolean;
    result: FriendsList[];
}

////////////////////////////////////////////////////////////////////
export interface IUser {
  _id: string;
  email: string;
  password: string;
  gender: string;
  login: boolean;
  firstName?: string;
  lastName?: string;
  createdAt?: string;
  updatedAt?: string;
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

export interface FriendRequestsResponseData {
  message: string;
  success: boolean;
  result: IFriendRequest[];
}
