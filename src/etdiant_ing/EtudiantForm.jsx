import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./style.css";
import { Navigate } from "react-router-dom";
import { fetchEtudiantIngenieurs } from "../fetchElements/fetchEtudiant_ing";
import { useUserData } from "../contexts/userDataContext";
import axios from "axios";

export default function EtudiantForm({ open, userToUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateNaissance, setDateNaissance] = useState("");
  const [lieuNaissance, setLieuNaissance] = useState("");
  const [cin, setCin] = useState("");
  const [cne, setCne] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [roles, setRoles] = useState([]);
  const { updateEtudiantIngenieurs, path } = useUserData();

  const handleCloseModal = () => {
    <Navigate to="/dashboard/ingenieurs" />;
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (userToUpdate) {
      setFirstName(userToUpdate.firstName || "");
      setLastName(userToUpdate.lastName || "");
      setUsername(userToUpdate.username || "");
      setEmail(userToUpdate.email || "");
      setPassword(userToUpdate.password || "");
      setTelephone(userToUpdate.telephone || "");
      setDateNaissance(userToUpdate.dateNaissance || "");
      setLieuNaissance(userToUpdate.lieuNaissance || "");
      setCin(userToUpdate.cin);
      setCne(userToUpdate.cne);
      setRoles(userToUpdate.roles || []);
    }
  }, [userToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().slice(0, 10);
    try {
      const parsedCreatedAt = new Date();
      const createdAt = parsedCreatedAt.toISOString().split("T")[0];
      const updatedAt = parsedCreatedAt.toISOString().split("T")[0];

      // const user = {
      //   firstName,
      //   lastName,
      //   username,
      //   email,
      //   cin,
      //   cne,
      //   password,
      //   telephone,
      //   isEnabled: 1,
      //   updatedAt,
      //   dateNaissance,
      //   roles: [
      //     {
      //       id: 2,
      //     },
      //   ],
      // };
      if (userToUpdate) {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.put(
            `${path}/ingStudents/admin/update/${userToUpdate.id}`,
            {
              firstName,
              lastName,
              username,
              email,
              cin,
              cne,
              password,
              telephone,
              isEnabled: 1,
              updatedAt,
              dateNaissance,
              roles: [
                {
                  id: 1,
                  name:"ROLE_ETUDIANT"
                },
              ],
            }
          );

          if (response.status === 200) {
            fetchEtudiantIngenieurs(path, updateEtudiantIngenieurs);
            setSuccessMessage("Updated successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error(
            "Erreur lors de l'enregistrement de l'etudiant ingenieur",
            error
          );
          setErrorMessage(error.response.data.message);
          setSuccessMessage("");
        }
      } else {
        try {
          const token = localStorage.getItem("token");
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          const response = await axios.post(
            `${path}/ingStudents/admin/save?createdAt=${today}`,
            {
              firstName,
              lastName,
              username,
              email,
              cin,
              cne,
              password,
              telephone,
              isEnabled: 1,
              updatedAt,
              dateNaissance,
              roles: [
                {
                  id: 2,
                },
              ],
            }
          );

          if (response.status === 200) {
            const etudiantIng = response.data;
            fetchEtudiantIngenieurs(path, updateEtudiantIngenieurs);
            console.log("Nouveau etudiant enregistré :", etudiantIng);
            setSuccessMessage("Registration successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        } catch (error) {
          console.error("Erreur lors de l'enregistrement de l'etudiant", error);
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
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "telephone":
        setTelephone(value);
        break;
      case "dateNaissance":
        setDateNaissance(value);
        break;
      case "lieuNaissance":
        setLieuNaissance(value);
        break;
      case "cin":
        setCin(value);
        break;
      case "cne":
        setCne(value);
        break;
      default:
        break;
    }
  };

  return (
    <Dialog open={modalIsOpen} onClose={handleCloseModal} fullWidth>
      <DialogTitle>User Form</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <TextField
            label="First Name"
            name="firstName"
            value={firstName}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={lastName}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Username"
            name="username"
            value={username}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="CIN"
            name="cin"
            type="text"
            value={cin}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="CNE"
            name="cne"
            type="text"
            value={cne}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Telephone"
            name="telephone"
            type="tel"
            value={telephone}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Date of Birth"
            name="dateNaissance"
            type="date"
            value={dateNaissance}
            onChange={handleInputChange}
            fullWidth
            sx={{ marginBottom: "16px" }}
            required
          />
          <TextField
            label="Place of Birth"
            name="lieuNaissance"
            value={lieuNaissance}
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
