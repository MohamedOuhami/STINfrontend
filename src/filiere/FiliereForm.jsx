import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Navigate } from "react-router-dom";
import { fetchFilieres } from "../fetchElements/fetchFiliere";
import { useUserData } from "../contexts/userDataContext";
import axios from "axios";

export default function EtudiantForm({ open, filiereToUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updateFilieres, path } = useUserData();

  const handleCloseModal = () => {
    <Navigate to="/dashboard/filieres" />;
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (filiereToUpdate) {
      setName(filiereToUpdate.name || "");
      setDescription(filiereToUpdate.description || "");
    }
  }, [filiereToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (filiereToUpdate) {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.put(
            `${path}/filieres/${filiereToUpdate.id}`,
            {
              name,
              description,
            }
          );

          if (response.status === 200) {
            fetchFilieres(path, updateFilieres);
            setSuccessMessage("Updated successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement de la filiere", error);
          setErrorMessage(error.response.data.message);
          setSuccessMessage("");
        }
      } else {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.post(`${path}/filieres`, {
            name,
            description,
          });

          if (response.status === 200) {
            const filiere_ = response.data;
            fetchFilieres(path, updateFilieres);
            console.log("Nouveau etudiant enregistré :", filiere_);
            setSuccessMessage("Registration successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement de la filiere ",
            error
          );
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
      case "name":
        setName(value);
        break;
      case "description":
        setDescription(value);
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
            name="name"
            value={name}
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
