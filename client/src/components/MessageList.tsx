import React from "react";
import styled from "styled-components";
import { MessageListProps } from "../models/MessageListProps";

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <MessageListContainer>
      <ul>
        {messages.map((message, index) => (
          <MessageItem key={index} isCurrentUser={message.user === currentUser}>
            <MessageContent isCurrentUser={message.user === currentUser}>
              <strong>{message.user}:</strong> {message.text}
            </MessageContent>
          </MessageItem>
        ))}
      </ul>
    </MessageListContainer>
  );
};

export default MessageList;

const MessageListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

const MessageItem = styled.li<{ isCurrentUser: boolean }>`
  display: flex;
  justify-content: ${({ isCurrentUser }) =>
    isCurrentUser ? "flex-end" : "flex-start"};
  margin-bottom: 15px;
`;

const MessageContent = styled.div<{ isCurrentUser: boolean }>`
  max-width: 50%;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "#c8e6c9" : "#e0e0e0"};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  text-align: ${({ isCurrentUser }) => (isCurrentUser ? "right" : "left")};
`;
