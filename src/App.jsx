import "./App.css";
import LoginPage from "./auth/LoginPage";
// import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import SalleList from "./salles/SalleList";
// import SalleCreate from "./salles/SalleCreate";
import ModuleList from "./modules/ModuleList";
import ElementList from "./elements/ElementList";
import ProfessorList from "./professors/ProfessorList";
import PrepaList from "./prepaStudents/PrepaList";
import { AuthProvider } from "./contexts/authContext";
import { UserDataProvider } from "./contexts/userDataContext";
import Dashboard from "./dashboard/dashboard";
import Home from "./Home";
import FiliereList from './filiere/FiliereList'
import EtudiantIngenieurList from "./etdiant_ing/EtudiantIngenieurList";
import GroupeProjetList from "./groupe_project/GroupeProjetList";
import StageList from "./stage/StageList";
function App() {
  return (
    <AuthProvider>
      <UserDataProvider>
        {/* <Header /> */}
        <div className='app-container'>
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="salles" Component={SalleList} />
            <Route path="modules" Component={ModuleList} />
            <Route path="elements" Component={ElementList} />
            <Route path="professeurs" Component={ProfessorList} />
            <Route path="prepas" Component={PrepaList} />
            <Route path="filieres" Component={FiliereList} />
            <Route path="ingenieurs" Component={EtudiantIngenieurList} />
            <Route path="groupeProjets" Component={GroupeProjetList} />
            <Route path="stages" Component={StageList} />
          </Route>
        </Routes>
        </div>
      </UserDataProvider>
    </AuthProvider>
  );
}

export default App;
