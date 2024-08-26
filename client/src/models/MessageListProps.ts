export interface Message {
     user: string;
     text: string;
}

export interface MessageListProps {
     messages: Message[];
     currentUser: string;
}