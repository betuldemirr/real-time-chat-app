import React, { useState } from "react";
import styled from "styled-components";
import AutoWordSuggestions from "./AutoWordSuggestions";
import { autoData } from "../constants/autoData";
import { MessageInputProps } from "../models/MessageInputProps";

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessage(value);

    if (value) {
      const filteredSuggestions = autoData.filter((word) =>
        word.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
      setSuggestions([]);
    }
  };

  const onSelectSuggestion = (suggestion: string) => {
    setMessage(suggestion);
    setSuggestions([]);
  };

  return (
    <MessageInputContainer>
      <AutoWordSuggestions
        suggestions={suggestions}
        onSelectSuggestion={onSelectSuggestion}
      />
      <InputContainer>
        <TextInput
          type="text"
          value={message}
          onChange={handleChange}
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
