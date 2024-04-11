import axios from 'axios';
export const fetchProfessors = async(path,updateProfessors) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${path}/professors`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateProfessors(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Professors:", error);
    }
  };