import React, { useRef } from "react";
import autoAnimate from "@formkit/auto-animate";
import { useEffect } from "react";


const ChatBody = ({ chat }) => {
  const aiStyle =
    "card2 backdrop-blur-lg dropshadow-md mr-auto indent-8";

    const parent = useRef(null);
    const bottomRef = useRef(null);

    // only for aut animations
    useEffect(()=>{
        parent.current && autoAnimate(parent.current);
    }, [parent])

    //for scrolling bottom
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({behavior: "smooth"})
    }, [chat])

  return (
    <div className="flex flex-col gap-4 m-5" ref={parent}>
      {chat.map((message, i) => {
        return (
          <div
            key={i}
            className={`break-words rounded-xl self-end px-3 py-3 max-w-[80%] ${
              message.sender === "ai" && aiStyle
            }`}
          ><div class={`card ${
            message.sender === "ai" && aiStyle
          }`}>
            <div class="card-info">
            <pre className="whitespace-pre-wrap">
              <span>{message.message}</span>
            </pre>
          </div></div></div>
        );
      })}

      <div ref={bottomRef} className="h-3"></div>
    </div>
  );
};

export default ChatBody;