import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    socket.emit("join", username);

    socket.on("userList", (userList: User[]) => {
      console.log("Received user list from server:", userList);
      setUserList(userList);
    });

    socket.on("message", (message: { user: string; text: string }) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("userList");
      socket.off("message");
    };
  }, [username]);

  const onSendMessage = (message: string) => {
    if (message.trim()) {
      socket.emit("sendMessage", message);
    }
  };

  return (
    <ChatContainer>
      <UserList userList={userList} currentUser={username} socket={socket} />
      <Content>
        <MessageList messages={messages} currentUser={username} />
        <MessageInputContainer>
          <MessageInput onSendMessage={onSendMessage} />
        </MessageInputContainer>
      </Content>
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  height: 100%;
  flex-grow: 1;
  padding-bottom: 60px;
  overflow: hidden;
`;

const MessageInputContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: calc(100% - 400px);
  background-color: #fff;
  padding: 0 10px;
  z-index: 999;
`;
