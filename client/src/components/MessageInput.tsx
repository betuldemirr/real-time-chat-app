import React, { useState } from "react";
import styled from "styled-components";
import { MessageInputProps } from "../models/MessageInputProps";
import AutoWordSuggestions from "./AutoWordSuggestions";

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const onSelectSuggestion = (word: string) => {
    setMessage(word);
  };

  return (
    <MessageInputContainer>
      <AutoWordSuggestions
        searchTerm={message}
        onSelectSuggestion={onSelectSuggestion}
      />
      <InputContainer>
        <TextInput
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write a message..."
        />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
    </MessageInputContainer>
  );
};

export default MessageInput;

const MessageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px;
  background-color: #fff;
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
`;

const TextInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 0;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #45a049;
  }
`;
