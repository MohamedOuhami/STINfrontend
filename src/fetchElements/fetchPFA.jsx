import axios from "axios";

export const fetchPFAs = async (path,updatePFAs) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/pfas`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updatePFAs(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données de pfas :', error);
    }
  };

  export const fetchStage = async (path,updatePFA,id) => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get(`${path}/pfas/${id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      updatePFA(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données du pfa :', error);
    }
  };