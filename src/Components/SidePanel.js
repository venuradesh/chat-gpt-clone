import React, { useState } from "react";
import styled from "styled-components";

//icons
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Person2Icon from "@mui/icons-material/Person2";

function SidePanel({ setNewChat, history }) {
  return (
    <Container>
      <div className="top-section">
        <div className="new-chat">
          <div className="btn-new" onClick={() => setNewChat(true)}>
            <span>+</span> New Chat
          </div>
        </div>
        <div className="chats-panel">
          {history.length !== 0 &&
            history.map((item, index) => (
              <div className="chat-item" key={index}>
                <ChatBubbleOutlineIcon className="icon" />
                <div className="content">{item}</div>
              </div>
            ))}
        </div>
      </div>
      <div className="account">
        <Person2Icon className="icon" /> Venura Warnasooriya
      </div>
    </Container>
  );
}

export default SidePanel;

const Container = styled.div`
  width: 320px;
  height: 100%;
  background-color: var(--panel-color);
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .top-section {
    width: 100%;
    height: 80vh;
    overflow-y: overlay;
    z-index: 0;

    .new-chat {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      position: sticky;
      top: 0;
      z-index: 10;

      .btn-new {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        border: 2px solid var(--bg-color);
        display: flex;
        align-items: center;
        justify-content: center;
        column-gap: 10px;
        font-weight: 600;
        background-color: var(--panel-color);
        z-index: 10;
        cursor: pointer;

        &:hover {
          background-color: var(--bg-color);
        }
      }
    }

    .chats-panel {
      width: 100%;
      height: max-content;

      .chat-item {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-bottom: 10px;
        white-space: nowrap;
        text-overflow: ellipsis;
        column-gap: 10px;
        padding-inline: 10px;
        word-break: break-all;
        border-radius: 8px;
        cursor: pointer;

        .content {
          width: 80%;
          overflow: hidden;
          font-size: 0.9em;
          opacity: 0.8;
        }

        .icon {
          width: 20px;
        }

        &:hover {
          background-color: var(--bg-color);
        }
      }
    }
  }
  .account {
    width: 100%;
    height: 50px;
    background-color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 10px;
    background-color: var(--chat-color);
    cursor: pointer;
    border-radius: 8px;
    padding-inline: 10px;
  }
`;
