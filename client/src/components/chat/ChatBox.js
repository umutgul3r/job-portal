import React, { useEffect, useRef, useState } from "react";

import { Button } from "primereact/button";
import Chat from "../../assets/icons/help.png";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

const ENDPOINT = window.location.host.indexOf("localhost") >= 0 ? "http://127.0.0.1:5000" : window.location.host;

export default function ChatBox() {
  const auth = useSelector((state) => state.auth);
  const { user, isAdmin } = auth;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([{ name: "Destek", body: "Merhaba Lütfen Sorununuzu Belirtiniz" }]);

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: user._id,
        name: user.name,
        isAdmin: isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket, user, isAdmin]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    if (e.key === "Enter" && messageBody !== "") {
      setMessages([...messages, { body: messageBody, name: user.name }]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: user.name,
          isAdmin: isAdmin,
          _id: user._id,
        });
      }, 1000);
    }
  };

  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="text-black bg-blue-300 rounded-2xl fixed right-4 bottom-3 z-20 max-w-[350px]">
      {!isOpen ? (
        <button
          type="button"
          className="bg-white"
          onClick={supportHandler}
        >
          <img
            className="h-16 w-16"
            src={Chat}
            alt=""
          />
        </button>
      ) : (
        <div>
          <div className="supportAreas">
            <Button
              onClick={closeHandler}
              className="absolute h-9 w-16 right-8 bg-blue-500 bottom-4 cursor-pointer text-white rounded-xl"
            >
              Bitir
            </Button>
          </div>
          <ul
            className="overflow-auto max-h-[20rem] min-h-[100px] m-1 p-4"
            ref={uiMessagesRef}
          >
            {messages.map((msg, index) => (
              <li
                className="mb-4"
                key={index}
              >
                <strong>{`${msg.name}: `}</strong> {msg.body}
              </li>
            ))}
          </ul>
          <div>
            <div className="supportArea">
              <input
                value={messageBody}
                className="p-1 w-3/5 m-4 rounded-sm border-black border-2"
                onChange={(e) => setMessageBody(e.target.value)}
                onKeyUp={submitHandler}
                type="text"
                placeholder="Merhaba..."
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
