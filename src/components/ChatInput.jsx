import React from "react";
import { useState } from "react";
import { Player} from '@lottiefiles/react-lottie-player';

const ChatInput = ({ sendMessage, loading }) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value === "") return;
    sendMessage({ sender: "user", message: value });
    setValue("");
  };
  return (
    <div
      className="w-full bg-white bg-opacity-10 max-h-40 rounded-lg px-4
    py-4 overflow-auto relative"
    >
      {loading ? (
        <Player
        autoplay
        loop
        src="https://lottie.host/f4492fcd-a7e3-4953-85b5-b92754ffea8d/ZCwNs61vjC.json"
        style={{ height: '30px', width: '30px' }}
      />
      ) : (
        <>
          <textarea
            onKeyDown={(e) => {
              e.keyCode === 13 && e.shiftKey === false && handleSubmit();
            }}
            rows={1}
            className="border-0 bg-transparent outline-none w-11/12"
            value={value}
            type="text"
            placeholder="Escreva algo aqui..."
            onChange={(e) => setValue(e.target.value)}
          />

          <img
            onClick={handleSubmit}
            src="https://firebasestorage.googleapis.com/v0/b/teste-5e945.appspot.com/o/Logos%2Fsend.png?alt=media&token=3f2fd8ea-ebb0-4115-937b-58138ee4b5cb"
            width={20}
            alt="send-button"
            className="absolute top-4
            right-3 hover:cursor-pointer ease-in duration-100 hover:scale-125
            "
          />
        </>
      )}
    </div>
  );
};

export default ChatInput;