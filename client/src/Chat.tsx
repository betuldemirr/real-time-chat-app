import React, { useState } from "react";
import styled from "styled-components";
import UserList from "./components/UserList";
import MessageList from "./components/MessageList";
import { ChatProps, User } from "./models/ChatProps";
import MessageInput from "./components/MessageInput";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [userList, setUserList] = useState<User[]>([]);
  const [messages, setMessages] = useState<{ user: string; text: string }[]>(
    []
  );

  const onSendMessage = (message: string) => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
    }
  };

  return (
    <ChatContainer>
      <LeftPanel>
        <UserList userList={userList} currentUser={username} />
      </LeftPanel>
      <RightPanel>
        <MessageList messages={messages} currentUser={username} />
        <MessageInput onSendMessage={onSendMessage} />
      </RightPanel>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;

const LeftPanel = styled.div`
  width: 30%;
  height: 100%;
`;

const RightPanel = styled.div`
  width: 70%;
  height: 100%;
`;
