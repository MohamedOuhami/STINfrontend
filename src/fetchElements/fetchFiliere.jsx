import axios from "axios";

export const fetchFilieres = async (path,updateFilieres) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/filieres`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateFilieres(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des filieres :', error);
    }
  };

  export const fetchFiliere = async (path,updateFiliere,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/filieres/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateFiliere(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de la filiere :', error);
    }
  };