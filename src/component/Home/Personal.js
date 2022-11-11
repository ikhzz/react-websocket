import { useContext, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import {ChatContext} from "../../context/ChatContext";
import PersonalModal from "../ModalList/PersonalModal";

const Personal = () => {
  const [smShow, setSmShow] = useState(false);
  const { listChatHistory, currentChatRoom} = useContext(ChatContext)
  const handleChatRoom = (v) => {
    setSmShow(false)
    currentChatRoom(v)
  }

  return (
    <Row>
      <Row>
        <Col className="py-2">
          <Button onClick={() => setSmShow(true)} variant="outline-primary">Contact</Button>
        </Col>
      </Row>
      <Row>
        {listChatHistory && listChatHistory.map(v => (
          <ListGroup.Item key={v.id} className="app-hover mt-2" 
            onClick={()=> { handleChatRoom(v) }}>
            <Card.Img style={{"borderRadius": "50%", "marginRight": "5px", "height": "80px", "width": "80px"}} variant="left" src="https://source.unsplash.com/random/" />
            {v.username}
          </ListGroup.Item>
        ))}
      </Row>
      <PersonalModal contactModal={setSmShow} cmShow={smShow} />
    </Row>
  )
}

export default Personal;