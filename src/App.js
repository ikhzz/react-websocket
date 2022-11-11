import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbars from './component/Navbar';
import LandingPage from "./component/Home/LandingPage";
import Home from "./component/Home/Home";
import { Container, Row } from 'react-bootstrap';
import AuthContextProvider from "./context/AuthContext";
import ChatContextProvider from "./context/ChatContext";

function App() {
  return (
    <BrowserRouter >
      <AuthContextProvider>
        <ChatContextProvider>
          <Container fluid className="min-vh-100">
            <Row>
              <Navbars></Navbars>
            </Row>
            <Row>
              {/* prepare multiple page */}
              <Switch>
                <Route path="/">
                  <Home />  
                </Route>
              </Switch>
            </Row>
          </Container>
        </ChatContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;