import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom"; // Utilisez Outlet pour rendre les routes imbriquées

import { useAuth } from "../contexts/authContext";
import { useUserData } from "../contexts/userDataContext";
import SideBar from "../Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import axios from "axios";
import { fetchEtudiantIngenieurs } from "../fetchElements/fetchEtudiant_ing";
import { fetchFilieres } from "../fetchElements/fetchFiliere";
import { fetchGroupeProjets } from "../fetchElements/fetchGroupeProjet";
import { fetchFiliereSemestres } from "../fetchElements/fetchFiliereSemestre";
import { fetchProfessors } from "../fetchElements/fetchProfesseur";
// import '../globals.css'
import "../styles.css";

function Dashboard() {
  const { isLoggedIn, logout } = useAuth();
  const { updateUserData, updateEtudiantIngenieurs } = useUserData();
  const {
    updateFilieres,
    updateFiliereSemestres,
    updateGroupeProjets,
    updateProfessors,
  } = useUserData();

  const [sidermenu, setSiderMenu] = useState([]);
  const { path } = useUserData();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      try {
        const response = await axios.get(`${path}/api/v1/auth/userinfo`);
        updateUserData(response.data);
        localStorage.setItem("user", response.data);

        setSiderMenu(sidebar_menu);
        fetchEtudiantIngenieurs(path, updateEtudiantIngenieurs);
        fetchFilieres(path, updateFilieres);
        fetchFiliereSemestres(path, updateFiliereSemestres);
        fetchGroupeProjets(path, updateGroupeProjets);
        fetchProfessors(path, updateProfessors);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
        logout();
        return <Navigate to="/login" />;
      }
    };

    fetchUserData();
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard-container">
      <SideBar menu={sidermenu} />
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
