// User interface representing a single user object
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

export interface UsersResponse {
  message: string;
  users: User[];
}