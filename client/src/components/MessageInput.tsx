import React, { useState } from "react";
import styled from "styled-components";
import AutoWordSuggestions from "./AutoWordSuggestions";
import { autoData } from "../constants/autoData";
import { MessageInputProps } from "../models/MessageInputProps";

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
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
          onChange={onChange}
          onKeyDown={onKeyDown}
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
  background-color: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;

const TextInput = styled.input`
  width: 80%;
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  border-radius: 4px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 4px;
  &:hover {
    background-color: #45a049;
  }
`;
