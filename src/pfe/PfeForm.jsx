import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
// import "./style.css";
import { Navigate } from "react-router-dom";
import { fetchPFEs } from "../fetchElements/fetchPFE";
import { useUserData } from "../contexts/userDataContext";
import axios from "axios";

export default function PFEForm({ open, PFEToUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { updatePFEs, path, etudiantIngenieur } = useUserData();

  const handleCloseModal = () => {
    <Navigate to="/dashboard/filieres" />;
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (PFEToUpdate) {
      setTitle(PFEToUpdate.title || "");
      setDescription(PFEToUpdate.description || "");
      setStart_date(PFEToUpdate.start_date || null);
      setEnd_date(PFEToUpdate.end_date || null);
    }
  }, [PFEToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (PFEToUpdate) {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.put(`${path}/pfes/${PFEToUpdate.id}`, {
            title,
            description,
            start_date,
            end_date,
          });

          if (response.status === 200) {
            fetchPFEs(path, updatePFEs);
            setSuccessMessage("Updated successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement de la PFE", error);
          setErrorMessage(error.response.data.message);
          setSuccessMessage("");
        }
      } else {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.post(
            `${path}/ingStudents/admin/addPFE/${etudiantIngenieur.id}`,
            {
              title,
              description,
              start_date,
              end_date,
            }
          );

          if (response.status === 200) {
            const PFE_ = response.data;
            fetchPFEs(path, updatePFEs);
            console.log("Nouveau etudiant enregistré :", PFE_);
            setSuccessMessage("Registration successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement du PFE ", error);
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
          <TextField
            label="Début"
            name="start_date"
            value={start_date}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Fin"
            name="end_date"
            value={end_date}
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
