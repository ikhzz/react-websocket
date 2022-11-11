import { useState } from "react";
import { Row, Nav, Col } from "react-bootstrap"
import Group from "./Group";
import Personal from "./Personal";


const Sidebar = () => {
  let [active, setActive] = useState("personal");

  return (
    <Row >
      <Col className="px-0">
        <Nav justify variant="tabs" defaultActiveKey={"/personal"}>
          <Nav.Item>
            <Nav.Link eventKey="link-1" active onClick={()=> setActive("personal")} >Personal</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="link-2" onClick={()=> setActive("group")} >Group</Nav.Link>
          </Nav.Item>
        </Nav>
      </Col>
      {active == "personal" && <Personal/>}
      {active == "group" &&  <Group />}
    </Row>
  )
}

export default Sidebar;

