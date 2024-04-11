import axios from "axios";

export const fetchStages = async (path,updateStages) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/stages`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateStages(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de stage :', error);
    }
  };

  export const fetchStage = async (path,updateStage,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/stages/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateStage(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de stage :', error);
    }
  };

  export const fetchStagesByStudent = async (path,updateStages,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/stages/byStudent/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updateStages(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de stage :', error);
    }
  };