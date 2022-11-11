import ChatView from "./ChatView";
import LandingPage from "./LandingPage";
import { AuthContext } from "../../context/AuthContext.js";
import { useContext } from "react";

const Home = () => {
  const { auth} = useContext(AuthContext)

  return (
    <>
      {!auth && <LandingPage/>}
      {auth && <ChatView /> }
    </>
  )
}

export default Home;