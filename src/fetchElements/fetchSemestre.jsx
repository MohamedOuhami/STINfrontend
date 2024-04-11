import axios from "axios";

export const fetchSemestres = async (path,updateSemestres) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/semestres`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateSemestres(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des semestres :', error);
    }
  };

  export const fetchSemestre = async (path,updateSemestre,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/semestres/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateSemestre(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données du semestre :', error);
    }
  };