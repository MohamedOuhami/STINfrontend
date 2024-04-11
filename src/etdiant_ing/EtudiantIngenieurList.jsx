import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
// import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
// import ProfessorCreate from "./ProfessorCreate";
// import ProfessorUpdate from "./ProfessorUpdate";
import { useUserData } from "../contexts/userDataContext";
import EtudiantForm from "./EtudiantForm";
import { fetchEtudiantIngenieurs } from "../fetchElements/fetchEtudiant_ing";
import { fetchStage, fetchStagesByStudent } from "../fetchElements/fetchStage";

export default function EtudiantIngenieurList() {
  const [create, setCreate] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updatingEtudiant, setUpdatingEtudiant] = React.useState(null);
  const {
    etudiantIngenieurs,
    etudiantIngenieur,
    updateEtudiantIngenieurs,
    updateEtudiantIngenieur,
    path,
    updateStages,
  } = useUserData();
  const navigate = useNavigate();

  const handleEdit = async (Professor) => {
    setCreate(false);
    setUpdatingEtudiant(Professor);
    setUpdating(!updating);
  };

  const fCreate = async () => {
    setUpdating(false);
    setCreate(!create);
  };

  const handleStage = async (user) => {
    updateEtudiantIngenieur(user);
    await fetchStagesByStudent(path, updateStages, user.id);
    navigate("/dashboard/stages");
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/ingStudents/admin/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleEtudiantIngCreated();
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting Professor:", error);
    }
  };

  const handleEtudiantIngCreated = () => {
    fetchEtudiantIngenieurs(path, updateEtudiantIngenieurs);
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
      field: "firstName",
      headerName: "First Name",
      width: 100,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 100,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 100,
      editable: true,
    },
    {
      field: "dateNaissance",
      headerName: "Birthday",
      width: 100,
      editable: true,
    },
    {
      headerName: "Actions",
      width: 300,
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

              <Box sx={{ marginX: 1 }}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDeleteConfirmationOpen(params.row.id)}
                >
                  Delete
                </Button>
              </Box>
              <Box sx={{ marginX: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleStage(params.row)}
                >
                  stages
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
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={etudiantIngenieurs}
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
        <DialogTitle id="delete-dialog-title">{"Delete Professor"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this Professor?
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
      {create && <EtudiantForm open={create} />}
      {updating && (
        <EtudiantForm open={updating} userToUpdate={updatingEtudiant} />
      )}
    </div>
  );
}
