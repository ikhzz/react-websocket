import { useContext, useEffect, useState } from 'react';
import { Modal, ListGroup, Card } from 'react-bootstrap';
import { ChatContext } from "../../context/ChatContext.js";

const PersonalModal = ({contactModal, cmShow}) => {
  const { getListUser, listUser, currentChatRoom} = useContext(ChatContext)

  const handlePersonalModal = (data) => {
    contactModal(data)
  }

  const handleChatRoom = (v) => {
    contactModal(false)
    currentChatRoom(v)
  }

  useEffect(()=> {
    const handleGetChatRoom = async () => {
      await getListUser()
    }
    handleGetChatRoom()
  },[])
  
  return (
      <Modal
        size="md"
        show={cmShow}
        onHide={() => handlePersonalModal(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Personal contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {listUser && listUser.map(v => (
              <ListGroup.Item key={v.id} className="app-hover" onClick={()=> {
                handleChatRoom(v)
              }}>
                <Card.Img style={{"borderRadius": "50%", "marginRight": "5px", "height": "80px", "width": "80px"}} variant="left" src="https://source.unsplash.com/random/" />
                {v.username}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
      </Modal>
  )
}

export default PersonalModal;