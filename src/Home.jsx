// import './home.css'
import "./styles.css";
// import { useUserData } from './contexts/userDataContext';
// import Transition from '../constants/transition';
// import { Card, Col, Container, Row } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

function Home() {
  //   const { userData } = useUserData()
  return (
    // <Transition>
    <div
      className="home-container"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>Hello world</p>
      
    </div>
    // </Transition>
  );
}

export default Home;
