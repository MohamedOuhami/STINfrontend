import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import PrepaCreate from "./PrepaCreate";
import PrepaUpdate from "./PrepaUpdate";

export default function PrepaList() {
  const [rows, setRows] = React.useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updatingPrepa, setUpdatingPrepa] = React.useState(null);

  const fetchPrepas = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/prepaStudents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Prepas:", error);
    }
  };

  const handleEdit = async (Prepa) => {
    setUpdatingPrepa(Prepa);
    setUpdating(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/prepaStudents/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // If deletion is successful, fetch the updated list of Prepas
      fetchPrepas();
      setDeleteConfirmationOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting Prepa:", error);
    }
  };

  const handlePrepaCreated = () => {
    fetchPrepas();
  };

  React.useEffect(() => {
    fetchPrepas();
  }, []); // Fetch Prepas when component mounts

  const handleDeleteConfirmationOpen = (id) => {
    setDeleteTargetId(id);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmationClose = () => {
    setDeleteTargetId(null);
    setDeleteConfirmationOpen(false);
  };

  const handleAssignGroups = async () => {
    const token = localStorage.getItem("token");

    try {
      const result = await axios.get(
        "http://localhost:8080/prepaStudents/assignGroups",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
      console.log("Students assigned to groups successfully");
    } catch (error) {
      console.error("Error assigning students to groups:", error);
    }
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
      field: "semestre",
      headerName: "Semestre",
      width: 300,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center" height="100%">
            <Typography>Semestre {params.row.semestre.count}</Typography>
          </Box>
        );
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
    <>
      {!updating && <PrepaCreate onPrepaCreated={handlePrepaCreated} />}
      {updating && (
        <PrepaUpdate
          onPrepaCreated={handlePrepaCreated}
          Prepa={updatingPrepa}
          setUpdating={setUpdating}
        />
      )}
      <Button onClick={handleAssignGroups}>
        Assign the groups and section
      </Button>

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
        <DialogTitle id="delete-dialog-title">{"Delete Prepa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this Prepa?
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
    </>
  );
}
