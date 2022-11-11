import { useContext, useState } from 'react';
import { Button, Modal, Form, InputGroup, Toast } from 'react-bootstrap';
import { AuthContext } from "../../context/AuthContext.js";

const NavbarModal = ({setSmShow, smShow}) => {
  // auth
  const { signIn, authError, auth, signOut} = useContext(AuthContext)
  const [login, setLogin] = useState({ email : "", pass : "" })

  const [passType, setPassType] = useState({
    icon: "fa-solid fa-eye",
    typePass: "password"
  });
  const [toastToggle, setToastToggle] = useState(false);

  const changeType = () => {
    if (passType.typePass == "password") {
      setPassType({
        icon: "fa-solid fa-eye-slash",
        typePass: "text"
      })      
    } else {
      setPassType({
          icon: "fa-solid fa-eye",
          typePass: "password"
      })
    }
  }

  const handleLogin = () => {
    signIn(login.email, login.pass)
    setLogin({ email : "", pass : "" })
  } 

  const handleShow = (data) => {
    setSmShow(data)
  }

  return (
    
      <Modal
        size="sm"
        show={smShow}
        onHide={() => handleShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" value={login.email}
              onChange={(e)=> setLogin(prev => ({...prev, email : e.target.value}))}
             />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="inputPassword5">Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type={passType.typePass}
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                value={login.pass}
                onChange={(e)=> setLogin(prev => ({...prev, pass : e.target.value}))}
              />
              <InputGroup.Text onClick={changeType} className="app-hover"><i className={passType.icon}></i></InputGroup.Text>
            </InputGroup>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setToastToggle(true)}>
            Sign up
          </Button>
          
          <Button variant="primary" onClick={()=> {
            handleShow(false)
            handleLogin()
          }}>
            Login
          </Button>
        </Modal.Footer>
        <Toast show={toastToggle} onClose={() => setToastToggle(false)}>
          <Toast.Header >
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>Sign up is not implemented yet!</Toast.Body>
        </Toast>
      </Modal>
  )
}

export default NavbarModal;