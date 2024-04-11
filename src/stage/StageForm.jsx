import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import "./style.css";
import { Navigate } from "react-router-dom";
import { fetchStages } from "../fetchElements/fetchStage";
import { useUserData } from "../contexts/userDataContext";
import axios from "axios";
import { Box, Typography } from "@mui/material";

export default function StageForm({ open, stageToUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updateStages, updateStage, path, etudiantIngenieur } = useUserData();
  const handleCloseModal = () => {
    <Navigate to="/dashboard/stages" />;
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (stageToUpdate) {
      setTitle(stageToUpdate.title || "");
      setDescription(stageToUpdate.description || "");
      setStart_date(stageToUpdate.start_date || null);
      setEnd_date(stageToUpdate.end_date || null);
    }
  }, [stageToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (stageToUpdate) {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.put(
            `${path}/stages/${stageToUpdate.id}`,
            {
              ingStudent: etudiantIngenieur,
              title,
              description,
              start_date,
              end_date,
            }
          );

          if (response.status === 200) {
            fetchStages(path, updateStages);
            setSuccessMessage("Updated successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement de la stage", error);
          setErrorMessage(error.response.data.message);
          setSuccessMessage("");
        }
      } else {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.post(`${path}/ingStudents/admin/addStage/${etudiantIngenieur.id}`, {
            title,
            description,
            start_date,
            end_date,
          });

          if (response.status === 200) {
            const stage = response.data;
            fetchStages(path, updateStages);
            console.log("Nouveau etudiant enregistré :", stage);
            setSuccessMessage("Registration successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement du stage ", error);
          setErrorMessage(error.response.data.message);
          setSuccessMessage("");
        }
      }
    } catch (error) {
      console.error("Erreur generale", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "start_date":
        setStart_date(value);
        break;
      case "end_date":
        setEnd_date(value);
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={modalIsOpen} onClose={handleCloseModal} fullWidth>
      <DialogTitle>Filiere Form</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <TextField
            label="Libelle"
            name="title"
            value={title}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <Box>
            <Typography>Début:</Typography>
            <input
              type="date"
              name="start_date"
              value={start_date}
              onChange={(e) => setStart_date(e.target.value)}
              style={{ margin: "8px" }}
            />
          </Box>
          <Box>
            <Typography>Fin :</Typography>
            <input
              type="date"
              name="end_date"
              value={end_date}
              onChange={(e) => setEnd_date(e.target.value)}
              style={{ margin: "8px" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            type="submit"
            variant="contained"
            style={{ backgroundColor: "green", color: "white" }}
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
