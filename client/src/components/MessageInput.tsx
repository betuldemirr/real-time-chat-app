import React, { useState, KeyboardEvent } from "react";
import styled from "styled-components";
import { MessageInputProps } from "../models/MessageInputProps";

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <MessageInputContainer>
      <TextInput
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Write a message..."
      />
      <SendButton onClick={handleSend}>Send</SendButton>
    </MessageInputContainer>
  );
};

export default MessageInput;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 20px;
  background-color: #fff;
  //box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
  font-size: 16px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;
