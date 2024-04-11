import axios from "axios";

export const fetchFiliereSemestres = async (path,updateFiliereSemestres) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/filiere_semestre`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateFiliereSemestres(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des filiere semestre :', error);
    }
  };

  export const fetchFiliereSemestre = async (path,updateFiliereSemestre,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/filiere_semestre/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateFiliereSemestre(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données du filiere semestre :', error);
    }
  };

  export const fetchFiliereSemestreBySemestre = async (path,updateFiliereSemestre,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/filiere_semestre/semestre/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateFiliereSemestre(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données du filiere semestre par semestre :', error);
    }
  };

  export const fetchFiliereSemestreByFiliere = async (path,updateFiliereSemestre,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/filiere_semestre/filiere/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateFiliereSemestre(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données du filiere semestre par filiere :', error);
    }
  };