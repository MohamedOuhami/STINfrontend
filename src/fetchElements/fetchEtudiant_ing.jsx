import axios from "axios";

export const fetchEtudiantIngenieurs = async (path,updateEtudiantIngenieurs) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/ingStudents/admin/all`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateEtudiantIngenieurs(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'etudiant :', error);
    }
  };

  export const fetchEtudiantIngenieur = async (path,updateEtudiantIngenieur,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/ingStudents/admin/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateEtudiantIngenieur(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'etudiant :', error);
    }
  };