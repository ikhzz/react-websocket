import { useContext, useState } from 'react';
import { Container, Navbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext.js";
import NavbarModal from './ModalList/NavbarModal.js';

const Navbars = () => {
  const { signIn, authError, auth, signOut} = useContext(AuthContext)
  const [smShow, setSmShow] = useState(false); 
  

  return (
    <Container fluid className='px-0'>
      <Navbar expand="lg" bg="dark" variant="dark" className="d-flex justify-content-between">
          <Link to="/home"><Navbar.Brand >Websocket</Navbar.Brand></Link>
          { 
            !auth && <Button onClick={() => setSmShow(true)} variant="outline-primary">Login</Button>
          }
          { 
            auth && <Button onClick={signOut} variant="outline-primary">Logout</Button>
          }
      </Navbar>
      <NavbarModal setSmShow={setSmShow} smShow={smShow}/>
    </Container>
  )
}

export default Navbars;