import React, { useState } from "react";
import styled from "styled-components";
import ChatContainer from "./Components/ChatContainer";
import SidePanel from "./Components/SidePanel";

function App() {
  const [newChat, setNewChat] = useState(false);
  const [history, setHistory] = useState([]);
  const [newChatFunc, setNewchatFunc] = useState(false);

  return (
    <Container>
      <SidePanel setNewChat={setNewChat} history={history} />
      <ChatContainer
        newChat={newChat}
        setNewChat={setNewChat}
        setHistory={setHistory}
      />
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  display: flex;
`;
