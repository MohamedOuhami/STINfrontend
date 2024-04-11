import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import StageForm from './StageForm';
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
import { fetchStages } from "../fetchElements/fetchStage";

export default function StageList() {
  const [create, setCreate] = React.useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updateStage, setupdateStage] = React.useState(null);
  const {
    stages,
    updateStages,
    etudiantIngenieur,
    path,
  } = useUserData();

  const handleEdit = async (filiere) => {
    setCreate(false);
    setupdateStage(filiere);
    setUpdating(!updating);
  };

  const fCreate = async () => {
    setUpdating(false);
    setCreate(!create);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:8080/stages/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleFiliereCreated();
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error("Error deleting filiere:", error);
    }
  };

  const handleFiliereCreated = () => {
    fetchStages(path, updateStages);
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
      field: "title",
      headerName: "Libelle",
      width: 150,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      width: 250,
      editable: true,
    },
    {
      field: "start_date",
      headerName: "Début",
      width: 150,
      editable: true,
    },
    {
      field: "end_date",
      headerName: "Fin",
      width: 150,
      editable: true,
    }
    ,
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
            rows={stages}
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
        <DialogTitle id="delete-dialog-title">{"Delete filiere"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this filiere?
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
      {create && <StageForm open={create} />}
      {updating && (
        <StageForm open={updating} stageToUpdate={updateStage} />
      )}
    </div>
  );
}
