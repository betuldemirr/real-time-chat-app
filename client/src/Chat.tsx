import React, { useEffect } from "react";
import styled from "styled-components";
import UserList from "./components/UserList";
import MessageList from "./components/MessageList";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { setUserList, addMessage } from "./features/chatSlice";
import MessageInput from "./components/MessageInput";
import io from "socket.io-client";
import { User } from "./models/UserListProps";

const socket = io("http://localhost:3001");

const Chat: React.FC<{ username: string }> = ({ username }) => {
  const dispatch = useDispatch<AppDispatch>();
  const userList = useSelector((state: RootState) => state.chat.userList);
  const messages = useSelector((state: RootState) => state.chat.messages);

  useEffect(() => {
    socket.emit("join", username);

    socket.on("userList", (userList: User[]) => {
      dispatch(setUserList(userList));
    });

    socket.on("message", (message: { user: string; text: string }) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off("userList");
      socket.off("message");
    };
  }, [username, dispatch]);

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
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 60px;
  height: 100%;
  overflow: hidden;
`;

const MessageInputContainer = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  width: -webkit-fill-available;
  background-color: #fff;
  padding: 30px;
  z-index: 999;
`;
