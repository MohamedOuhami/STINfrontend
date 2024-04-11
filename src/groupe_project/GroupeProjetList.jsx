import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import GroupeProjetForm from "./GroupeProjetForm";
import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useUserData } from "../contexts/userDataContext";
import { fetchGroupeProjets } from "../fetchElements/fetchGroupeProjet";

export default function GroupeProjetList() {
  const [create, setCreate] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updateGroupeProjet, setUpdateGroupeProjet] = React.useState(null);
  const { groupeProjets, updateGroupeProjets, path } = useUserData();

  const handleEdit = async (groupeProjet) => {
    setCreate(false);
    setUpdateGroupeProjet(groupeProjet);
    setUpdating(!updating);
  };

  const fCreate = async () => {
    setUpdating(false);
    setCreate(!create);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/groupe_projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handlegroupeProjetCreated();
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting groupe Projet:", error);
    }
  };

  const handlegroupeProjetCreated = () => {
    fetchGroupeProjets(path, updateGroupeProjets);
  };

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteTargetId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteTargetId(null);
    setDeleteConfirmationOpen(false);
  };

  const columns = [
    {
      field: "pfa",
      headerName: "Titre Pfa",
      width: 150,
      renderCell: (params) => {
        const title = params.row.pfa.title;
        return <div>{title}</div>;
      },
    },
    {
      field: "encadrant",
      headerName: "Encadrant",
      width: 150,
      renderCell: (params) => {
        if (params.row.encadrant) {
          const nom = params.row.encadrant.firstName;
          const prenom = params.row.encadrant.lastName;
          return (
            <Box>
              {nom} {prenom}
            </Box>
          );
        } else {
          return <Box>Pas encadrant</Box>;
        }
      },
    },
    {
      field: "students",
      headerName: "Etudiants",
      width: 300,
      renderCell: (params) => {
        const etudiants = params.row.students;
        return (
          <Box>
              {etudiants.map((etudiant, index) => (
                  <span key={index}>{etudiant.firstName} {etudiant.lastName} , </span>
              ))}
          </Box>
        );
      },
    },
    {
      field: "filiereSemestre",
      headerName: "Filiere",
      width: 100,
      renderCell: (params) => {
        const filiere = params.row.filiereSemestre.filiere.name;
        const semestre = params.row.filiereSemestre.semestre.count;
        return <Box>{`${filiere} ${semestre}`}</Box>;
      },
    },
    {
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div key={params.row.id}>
            <Stack direction={"row"}>
              <Box sx={{ marginX: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleEdit(params.row)}
                >
                  Edit
                </Button>
              </Box>

              <Box>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteConfirmationOpen(params.row.id)}
                >
                  Delete
                </Button>
              </Box>
            </Stack>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ width: "10%", padding: "8px" }}>
          <Button onClick={() => fCreate()} variant="contained" color="primary">
            create
          </Button>
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={groupeProjets}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
          />
        </Box>
      </Box>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          {"Delete groupeProjet"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this groupe Projet?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmationClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleDelete(deleteTargetId)}
            color="error"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {create && <GroupeProjetForm open={create} />}
      {updating && (
        <GroupeProjetForm open={updating} groupeToUpdate={updateGroupeProjet} />
      )}
    </div>
  );
}
