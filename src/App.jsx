import { useState } from "react";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatInput";
import { useMutation } from "react-query";
import { fetchResponse } from "./api";
import {Animated} from "react-animated-css";


function App() {
  const [chat, setChat] = useState([]);
  const [alt, setAlt] = useState(null)
  const [larg, setLarg] = useState(null)
  const [ani1, setAni1] = useState("slideInUp")
  const [ani2, setAni2] = useState("slideInDown")

  setInterval(() => {
    var altura = window.screen.height;
    var largura = window.screen.width;
    setAlt(altura)
    setLarg(largura)
  }, 100)

  setInterval(() => {
    if(ani1 === "slideInDown"){
      setAni1("slideInUp")
    }else{
      setAni1("slideInDown")
    }

    if(ani2 === "slideInUp"){
      setAni2("slideInDown")
    }else{
      setAni2("slideInUp")
    }
  }, 10000)

  const mutation = useMutation({
    mutationFn: () => {
      return fetchResponse(chat);
    },
    onSuccess: (data) =>
      setChat((prev) => [
        ...prev,
        { sender: "ai", message: data.message.replace(/^\n\n/, "") },
      ]),
  });

  const sendMessage = async (message) => {
    await Promise.resolve(setChat((prev) => [...prev, message]));
    mutation.mutate();
  };

  return (
    <div className="bg-[#000] h-screen py-6 relative sm:px-16 px-12 text-white overflow-hidden flex flex-col justify-between  align-middle">
      {/* gradients */}

      {larg > 821 &&
        <>
          <Animated animationIn="bounceIn"  isVisible={true} animationInDuration ={1000}  className="gradient-01 z-0 absolute"></Animated>
          <Animated animationIn="bounceIn"  isVisible={true} animationInDuration ={1000} className="gradient-02 z-0 absolute"></Animated>
          <Animated animationIn="bounceIn" isVisible={true} animationInDuration ={1000} className="gradient-03 z-0 absolute"></Animated>
          <Animated animationIn="bounceIn"  isVisible={true} animationInDuration ={1000} className="gradient-04 z-0 absolute"></Animated>
        </>
      }

      {larg < 821 &&
        <>
          <Animated animationIn={ani1}  isVisible={true} animationInDuration ={10000}  className="gradient-01 z-0 absolute"></Animated>
          <Animated animationIn={ani2}  isVisible={true} animationInDuration ={10000} className="gradient-02 z-0 absolute"></Animated>
          <Animated animationIn={ani1} isVisible={true} animationInDuration ={10000} className="gradient-03 z-0 absolute"></Animated>
          <Animated animationIn={ani2}  isVisible={true} animationInDuration ={10000} className="gradient-04 z-0 absolute"></Animated>
        </>
      }

      {/* header */}
     
        <div className="uppercase font-bold  text-2xl text-center mb-3">
          Summon 💬
        </div>
       

      {/* body */}
      <div
        className="h-[80%] overflow-auto w-full max-w-4xl min-w-[20rem] py-8 px-4 self-center
      scrollbar-thumb-slate-400 scrollbar-thin scrollbar-track-gray-tranparent scrollbar-thumb-rounded-md
      "
      >
        <ChatBody chat={chat} />
      </div>

      {/* input */}
      <div className="w-full max-w-4xl min-w-[20rem] self-center">
        <ChatInput sendMessage={sendMessage} loading={mutation.isLoading} />
      </div>
    </div>
  );
}

export default App;
