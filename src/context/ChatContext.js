import { createContext, useContext, useState } from "react";
import $ from 'jquery';
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext(),
// Chat context
ChatContextProvider = (props) => {
  const [listUser, setListUser] = useState([]);
  const [listChatHistory, setListChatHistory] = useState([]);
  const [listAllChat, setListAllChat] = useState([])
  const [currentChatData, setCurrentChatData] = useState([])
  const [chatRoom, setChatRoom] = useState([]);
  const { wsObject } = useContext(AuthContext)

  // get list user method
  const getListUser = async () => {
    const token = localStorage.getItem("token")
    const settings = {
        "url": "http://localhost:7070/v1/getUser",
        "method": "GET",
        "timeout": 0,
        "headers": {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
    };
      
    $.ajax(settings).always(function (response) {
        if(response ) {
            const tempHIstory = []
            setListUser(response.data)
            for(let i of response.data){
              if(i.is_history == 1){
                tempHIstory.push(i)
              }
            }
            setListChatHistory(tempHIstory)
        }
    });
  }

  const currentChatRoom = async (v) => {
    setChatRoom(v)
    for (const i of listAllChat) {
      if(i.Id == v.id){
        setCurrentChatData(i)
      }
    } 
  }

  const sendChat = (id, chat) => {
    console.log("send")
    wsObject.send(JSON.stringify({
      Id: id,
      Message: chat
    }))
  }

  if(wsObject){
    wsObject.onmessage = function (event) {
      let res = JSON.parse(event.data)

      if (res.Type == "HISTORY"){
        setListAllChat(res.Data)
      } else if(res.Type == "NEW_MESSAGE"){
        const newListAllChat = listAllChat.map((v, i) => {
          if (v.Id == res.Data['SendBy']) {
            v.Chat.push(res.Data)
            return v
          } else {
            return v
          }
        })
        setListAllChat(newListAllChat)
        getListUser()
      }
    }
  }
  
  

  return (
    <ChatContext.Provider value={{
      getListUser, listUser, chatRoom, currentChatRoom, sendChat, setChatRoom, listChatHistory, setListChatHistory,
      currentChatData, setCurrentChatData
      }}>
      {props.children}
    </ChatContext.Provider>
  )
}

export default ChatContextProvider;
