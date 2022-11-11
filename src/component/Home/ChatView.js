import { Col } from "react-bootstrap"
import Sidebar from "./Sidebar";
import { ChatContext } from "../../context/ChatContext.js";
import { useContext, useEffect } from "react";
import ChatRoom from "./ChatRoom";

const ChatView = () => {
  const { chatRoom, setChatRoom} = useContext(ChatContext)
  
  useEffect(() =>{
    setChatRoom([])
  } ,[])

  return (
    <>
      <Col xs={4}>
        <Sidebar/>
      </Col>
      <Col xs={8} className="px-0" >
        {chatRoom.length == 0 && <img
          className="d-block h-100 w-100" 
          
          src="https://source.unsplash.com/random/600x278"
          alt="First slide"
        />} 
        {chatRoom.id && <ChatRoom/>} 
      </Col>
    </>
  )
}

export default ChatView;