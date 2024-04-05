import { useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import { Login } from "@mui/icons-material";
import SalleList from "./salles/SalleList";
import SalleCreate from "./salles/SalleCreate";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" Component={LoginPage}/>
        <Route path="/salle" Component={SalleList}/>
        <Route path="/salle/create" Component={SalleCreate}/>
      </Routes>
    </>
  );
}

export default App;
