import React, { useState } from "react";
import styled from "styled-components";
import Chat from "./Chat";
import JoinForm from "./JoinForm";

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <AppContainer>
      {username ? (
        <Chat username={username} />
      ) : (
        <JoinForm onUsernameSubmit={setUsername} />
      )}
    </AppContainer>
  );
};

export default App;

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
