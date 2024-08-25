import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

interface JoinFormProps {
  onUsernameSubmit: (username: string) => void;
}

const JoinForm: React.FC<JoinFormProps> = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onUsernameSubmit(username.trim());
    } else {
      alert("Username cannot be empty");
    }
  };

  return (
    <JoinFormContainer>
      <LeftPanel>
        <FormWrapper>
          <h1>Welcome to Chat App</h1>
          <p>Please enter your username to join the chat</p>
          <form onSubmit={handleSubmit}>
            <StyledInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
            <StyledButton type="submit">Join Chat</StyledButton>
          </form>
        </FormWrapper>
      </LeftPanel>
      <RightPanel>
        <AnimationContainer>
          <FadingText>Welcome to the Chat</FadingText>
          <FadingText delay="2s">Start by entering your username</FadingText>
          <FadingText delay="4s">Enjoy your conversation!</FadingText>
        </AnimationContainer>
      </RightPanel>
    </JoinFormContainer>
  );
};

export default JoinForm;

const JoinFormContainer = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const LeftPanel = styled.div`
  width: 30%;
  background-color: #e0f7e9;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightPanel = styled.div`
  width: 70%;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FormWrapper = styled.div`
  display: flex !important;
  flex-direction: column;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const StyledInput = styled.input`
  width: 90%;
  padding: 10px;
  margin-top: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-50px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(50px); }
`;
const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const FadingText = styled.div<{ delay?: string }>`
  font-size: 2.5rem;
  line-height: 3rem;
  color: #4caf50;
  margin-bottom: 20px;
  animation: ${fadeInOut} 10s linear infinite;
  animation-delay: ${({ delay }) => delay || "0s"};
`;
