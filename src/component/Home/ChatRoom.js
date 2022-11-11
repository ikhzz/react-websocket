import { Button, Card, Form, InputGroup, ListGroup, } from "react-bootstrap";
import { ChatContext } from "../../context/ChatContext.js";
import { useContext, useState } from "react";


const ChatRoom = () => {
  const { chatRoom, sendChat, currentChatData, setCurrentChatData} = useContext(ChatContext)
  const [chatText, setChatText] = useState("")

  const handleChat = () => {
    sendChat(chatRoom.id, chatText)
    const id = localStorage.getItem("id")
    const a = {
      "CreatedAt" : new Date,
      "FormatedCreatedAt" : "",
      "Message": chatText,
      "SendBy": id,
    }
    const chatSlice = currentChatData.Chat
    chatSlice.push(a)
    setCurrentChatData({Chat: chatSlice})
    
    setChatText("")
  }
  return (
    <Card>
        <Card.Header>
          <Card.Img style={{"borderRadius": "50%", "marginRight": "5px", "height": "60px", "width": "60px"}} variant="left" src="https://source.unsplash.com/random/" />
                { chatRoom && chatRoom.username}
        </Card.Header>
        <Card.Body className="chat-cardbody" >
            {currentChatData && currentChatData.Chat.slice(0).reverse().map((v, key) => (
        
              <ListGroup.Item key={key} className={chatRoom.id != v.SendBy ? "chat chat-main": "chat chat-reply"} onClick={()=> {
                
              }}>
                <Card>
                  <Card.Body>{v.Message}</Card.Body>
                </Card>
              </ListGroup.Item>
            ))}
          
        </Card.Body>
        <Card.Footer>
          <InputGroup >
          <Form.Control className="chat_input"
            aria-describedby="basic-addon2"
            onChange={(e)=> setChatText(e.target.value)}
            value={chatText}
          />
          <Button variant="outline-secondary" id="button-addon2" onClick={handleChat} >
            Send
          </Button>
        </InputGroup>
        </Card.Footer>
      </Card>
  )
}

export default ChatRoom;