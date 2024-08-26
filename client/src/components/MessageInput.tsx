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

  return (
    <MessageInputContainer>
      <TextInput
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write a message..."
      />
      <SendButton onClick={handleSend}>Send</SendButton>
    </MessageInputContainer>
  );
};

export default MessageInput;

const MessageInputContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 20px;
  background-color: #fff;
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
