import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

//images
import SendIcon from "@mui/icons-material/Send";
import Person2Icon from "@mui/icons-material/Person2";
import ChatGPTIcon from "../Assets/chatgpt.png";

//components
import Loading from "./Loading";

function ChatContainer({ newChat, setNewChat, setHistory }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previousMsgs, setPreviousMsgs] = useState([]);
  const [typedMsg, setTypedMsg] = useState("");
  const [title, setTitle] = useState("");

  const onEnter = (e) => {
    onSendMsgClick(e);
  };

  const onNewChatClick = () => {
    setTypedMsg("");
    setTitle("");
    setMessage("");
    setNewChat(false);
  };

  const onSendMsgClick = (e) => {
    e.preventDefault();
    if (typedMsg) {
      setLoading(true);
      if (!title) {
        setTitle(typedMsg);
        setHistory((prev) => [...prev, typedMsg]);
      }

      document.getElementById("chat-input").value = "";
      axios
        .post("http://localhost:8080/completion", {
          msg: typedMsg,
        })
        .then((res) => {
          setMessage(res.data.choices[0].message);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.error("Type a query first");
    }
  };

  useEffect(() => {
    if (title && typedMsg && message) {
      setPreviousMsgs((prev) => [
        ...prev,
        {
          title: title,
          role: "user",
          content: typedMsg,
        },
        {
          title: title,
          role: message.role,
          content: message.content,
        },
      ]);
    }

    if (newChat) {
      onNewChatClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, title, newChat]);

  return (
    <Container>
      <div className="chat-container">
        {title ? (
          <div className="chat">
            {previousMsgs.length !== 0 &&
              previousMsgs.map((msg, index) => (
                <div className="chat-ind" key={index}>
                  {msg.role === "user" && msg.title === title ? (
                    <div className="chat-me">
                      <div className="content">{msg.content}</div>
                      <Person2Icon className="user-icon" />
                    </div>
                  ) : (
                    <React.Fragment>
                      {msg.title === title ? (
                        <div className="chat-bot">
                          <img src={ChatGPTIcon} alt="chat-gpt-icon" />
                          <div className="content">{msg.content}</div>
                        </div>
                      ) : (
                        <React.Fragment></React.Fragment>
                      )}
                    </React.Fragment>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <div className="startup">
            <div className="heading">
              ChatGPT <span>Clone</span>
            </div>
          </div>
        )}
      </div>
      <div className="input-container">
        {loading ? (
          <div className="loading-container">
            <Loading />
          </div>
        ) : (
          <React.Fragment></React.Fragment>
        )}
        <div className="input">
          <input
            type="text"
            id="chat-input"
            className="chat-input"
            placeholder="Send a Message"
            onChange={(e) => setTypedMsg(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? onEnter(e) : "")}
          />
          <SendIcon className="send-icon" onClick={(e) => onSendMsgClick(e)} />
        </div>
        <div className="footer">
          <span>ChatGPT Clone</span>
          <span>&copy; Venura Warnaosooriya</span>
          <span>29th July 2023</span>
          <span>OpenAI API</span>
        </div>
      </div>
    </Container>
  );
}

export default ChatContainer;

const Container = styled.div`
  width: calc(100vw - 320px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .chat-container {
    padding-inline: 30px;
    height: 85vh;
    width: 100%;
    height: 82vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    overflow: overlay;

    .startup {
      .heading {
        font-size: 3rem;
        font-weight: 700;
        color: var(--input-text);

        span {
          font-size: 1rem;
          text-transform: uppercase;
        }
      }
    }

    .chat {
      width: 80%;
      height: 100%;

      .chat-ind {
        width: 100%;
        height: max-content;
        position: relative;
        margin-bottom: 20px;

        .chat-me {
          width: 100%;
          margin-bottom: 20px;
          height: max-content;
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;

          .user-icon {
            width: 40px;
          }

          .content {
            padding: 10px 20px;
            background-color: var(--panel-color);
            color: var(--input-text);
            border-radius: 12px;
            border-bottom-right-radius: 0px;
            font-size: 0.9rem;
          }
        }

        .chat-bot {
          width: max-content;
          max-width: 80%;
          height: max-content;
          display: flex;
          align-items: center;
          column-gap: 15px;
          align-items: flex-end;

          .content {
            max-height: max-content;
            background-color: var(--chat-color);
            padding: 10px 10px;
            border-radius: 12px;
            border-bottom-left-radius: 0px;
          }

          img {
            width: 20px;
          }
        }
      }
    }
  }

  .input-container {
    width: 100%;
    height: 15vh;
    padding-inline: 10vw;
    background-image: linear-gradient(to top, var(--panel-color), transparent);
    position: relative;
    z-index: 0;

    .loading-container {
      position: absolute;
      top: -40px;
      z-index: 100;
      right: 50%;
      transform: translateX(50%);
    }

    .input {
      width: 100%;
      position: relative;

      input {
        width: 100%;
        height: 60px;
        border-radius: 12px;
        border: none;
        background-color: var(--input-color);
        box-shadow: 0 0 2px 0 var(--panel-color);
        outline: none;
        padding-inline: 20px;
        color: var(--input-text);
        font-size: 1rem;
        padding-right: 60px;

        &::placeholder {
          font-weight: 600;
          font-size: 1rem;
          color: var(--input-text);
        }
      }

      .send-icon {
        position: absolute;
        right: 20px;
        top: 18px;
        cursor: pointer;
      }
    }

    .footer {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      column-gap: 20px;
      color: var(--input-text);
      pointer-events: none;
    }
  }
`;
