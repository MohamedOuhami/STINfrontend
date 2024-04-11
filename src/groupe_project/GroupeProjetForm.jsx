import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import { fetchFilieres } from "../fetchElements/fetchFiliere";
import { useUserData } from "../contexts/userDataContext";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { fetchGroupeProjets } from "../fetchElements/fetchGroupeProjet";
import { useTheme } from "@mui/material/styles";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function GroupeProjetForm({ open, groupeToUpdate }) {
  const [modalIsOpen, setModalIsOpen] = useState(open);
  const [pfa, setPfa] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start_date, setStart_date] = useState(null);
  const [end_date, setEnd_date] = useState(null);
  const [encadrant, setEncadrant] = useState(null);
  const [students, setStudents] = useState([]);
  const [filiereSemestre, setFiliereSemestre] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    path,
    updateGroupeProjets,
    professors,
    etudiantIngenieurs,
    filiereSemestres,
  } = useUserData();

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const theme = useTheme();

  function getStyles(name, etudiantName, theme) {
    return {
      fontWeight:
        etudiantName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  useEffect(() => {
    if (groupeToUpdate) {
      setPfa(groupeToUpdate.pfa ? groupeToUpdate.pfa.id : null);
      setEncadrant(
        groupeToUpdate.encadrant ? groupeToUpdate.encadrant.id : null
      );
      setStudents(
        groupeToUpdate.students
          ? groupeToUpdate.students.map((student) => student.id)
          : []
      );
      setFiliereSemestre(
        groupeToUpdate.filiereSemestre
          ? groupeToUpdate.filiereSemestre.id
          : null
      );
      setTitle(groupeToUpdate.pfa.title || "");
      setDescription(groupeToUpdate.pfa.description || "");
      setStart_date(groupeToUpdate.pfa.start_date || null);
      setEnd_date(groupeToUpdate.pfa.end_date || null);
    }
  }, [groupeToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("date : ", start_date);
    let sts = [];
    for (let st of students) {
      sts.push({ id: st });
    }
    try {
      if (groupeToUpdate) {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.put(
          `${path}/groupe_projects/${groupeToUpdate.id}`,
          {
            pfa: { id: pfa },
            encadrant: { id: encadrant },
            filiereSemestre: { id: filiereSemestre },
            students: sts,
          }
        );

        if (response.status === 200) {
          fetchGroupeProjets(path, updateGroupeProjets);
          setSuccessMessage("Updated successful!");
          setErrorMessage("");
          setModalIsOpen(false);
        }
      } else {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.post(`${path}/pfas`, {
          title,
          description,
          start_date,
          end_date,
        });

        if (response.status === 200) {
          const response2 = await axios.post(`${path}/groupe_projects`, {
            pfa: { id: response.data.id },
            filiereSemestre: { id: filiereSemestre },
            students: sts,
          });

          if (response2.status === 200) {
            fetchGroupeProjets(path, updateGroupeProjets);
            setSuccessMessage("Registration successful!");
            setErrorMessage("");
            setModalIsOpen(false);
          }
        }
      }
    } catch (error) {
      console.error("Erreur generale", error);
      setErrorMessage(error.response.data.message);
      setSuccessMessage("");
    }
  };

  const handleChangeStudents = (event) => {
    const {
      target: { value },
    } = event;
    setStudents(typeof value === "string" ? value.split(",") : value);
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
            label="Titre PFA"
            name="title"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ margin: "8px" }}
            required
          />
          <TextField
            label="Description"
            name="description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            sx={{ margin: "8px" }}
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
          {groupeToUpdate && (
            <FormControl style={{ width: 150 }}>
              <InputLabel id="demo-simple-select-label">
                Nom encadrant
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={encadrant}
                label="Nom encadrant"
                onChange={(e) => setEncadrant(e.target.value)}
              >
                {professors.map((prof) => (
                  <MenuItem key={prof.id} value={prof.id}>
                    {prof.firstName} {prof.lastName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <FormControl style={{ width: 150 }}>
            <InputLabel id="demo-simple-select-label1">Semestre</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="semestre-filiere"
              value={filiereSemestre}
              label="Le semestre"
              onChange={(e) => setFiliereSemestre(e.target.value)}
            >
              {filiereSemestres.map((fs) => (
                <MenuItem key={fs.id} value={fs.id}>
                  {fs.filiere.name} {fs.semestre.count}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-Etudiants-label">
              Etudiants
            </InputLabel>
            <Select
              labelId="demo-multiple-Etudiants-label"
              id="demo-multiple-Etudiants"
              multiple
              value={students}
              onChange={handleChangeStudents}
              input={
                <OutlinedInput
                  id="select-multiple-Etudiants"
                  label="Etudiants"
                />
              }
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {etudiantIngenieurs.map((name) => (
                <MenuItem
                  key={name.id}
                  value={name.id}
                  style={getStyles(name, students, theme)}
                >
                  {`${name.firstName} ${name.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
