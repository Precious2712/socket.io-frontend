// types/friend-request.ts
export interface FriendRequest {
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

export interface RequestsResponse {
  message: string;
  success: boolean;
  result: FriendRequest[];
}