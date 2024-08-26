import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MessageListProps } from "../models/MessageListProps";

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    const lastMessageRef = messageRefs.current[messageRefs.current.length - 1];

    if (container && lastMessageRef) {
      // Scroll yalnızca içeriğin yüksekliği container yüksekliğinden büyükse
      if (container.scrollHeight > container.clientHeight) {
        lastMessageRef.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [messages]);
  return (
    <MessageListContainer ref={containerRef}>
      <ul>
        {messages.map((message, index) => (
          <MessageItem
            key={index}
            isCurrentUser={message.user === currentUser}
            ref={(el) => (messageRefs.current[index] = el)}
          >
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
  flex-grow: 1;
  overflow-y: auto;
  padding: 30px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px ul {
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
  max-width: 40%;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ isCurrentUser }) =>
    isCurrentUser ? "#c8e6c9" : "#e0e0e0"};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;
  text-align: left;
`;
