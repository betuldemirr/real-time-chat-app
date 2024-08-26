import { Socket } from "socket.io-client";
export interface UserProps {
     id: string;
     username: string;
}

export interface UserListProps {
     userList: UserProps[];
     currentUser: string;
     socket: Socket;
}