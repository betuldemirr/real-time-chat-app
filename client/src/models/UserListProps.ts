import { Socket } from "socket.io-client";

export interface User {
     id: string;
     username: string;
}

export interface UserListProps {
     userList: User[];
     currentUser: string;
     socket: Socket;
}
