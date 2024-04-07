import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import ProfessorCreate from "./ProfessorCreate";
import ProfessorUpdate from "./ProfessorUpdate";

export default function ProfessorList() {
  const [rows, setRows] = React.useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updatingProfessor, setUpdatingProfessor] = React.useState(null);

  const fetchProfessors = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/professors", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Professors:", error);
    }
  };

  const handleEdit = async (Professor) => {
    setUpdatingProfessor(Professor);
    setUpdating(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/professors/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // If deletion is successful, fetch the updated list of Professors
      fetchProfessors();
      setDeleteConfirmationOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting Professor:", error);
    }
  };

  const handleProfessorCreated = () => {
    fetchProfessors();
  };

  React.useEffect(() => {
    fetchProfessors();
  }, []); // Fetch Professors when component mounts

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
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 150,
      editable: true,
    },
    {
      field: "username",
      headerName: "Username",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      width: 150,
      editable: true,
    },
    {
      field: "dateNaissance",
      headerName: "Birthday",
      width: 150,
      editable: true,
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
    <>
      {!updating && <ProfessorCreate onProfessorCreated={handleProfessorCreated} />}
      {updating && <ProfessorUpdate onProfessorCreated={handleProfessorCreated} Professor={updatingProfessor} setUpdating={setUpdating}/>}
      <Box sx={{ padding: 3 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
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
          <Button onClick={() => handleDelete(deleteTargetId)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
