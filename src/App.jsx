import { useState } from "react";
import "./App.css";
import LoginPage from "./LoginPage";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import { Login } from "@mui/icons-material";
import SalleList from "./salles/SalleList";
import SalleCreate from "./salles/SalleCreate";
import ModuleList from "./modules/ModuleList";
import ElementList from "./elements/ElementList";
import ProfessorList from "./professors/ProfessorList";
import PrepaList from "./prepaStudents/PrepaList";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" Component={LoginPage} />
        <Route path="/salle" Component={SalleList} />
        <Route path="/module" Component={ModuleList} />
        <Route path="/element" Component={ElementList} />
        <Route path="/professors" Component={ProfessorList} />
        <Route path="/prepaStudents" Component={PrepaList} />
        <Route path="/salle/create" Component={SalleCreate} />
      </Routes>
    </>
  );
}

export default App;
