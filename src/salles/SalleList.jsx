import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import SalleCreate from "./SalleCreate";
import SalleUpdate from "./SalleUpdate";

export default function SalleList() {
  const [rows, setRows] = React.useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updatingSalle, setUpdatingSalle] = React.useState(null);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/salles", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  const handleEdit = async (salle) => {
    setUpdatingSalle(salle);
    setUpdating(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/salles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // If deletion is successful, fetch the updated list of rooms
      fetchRooms();
      setDeleteConfirmationOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting room:", error);
    }
  };

  const handleRoomCreated = () => {
    fetchRooms();
  };

  React.useEffect(() => {
    fetchRooms();
  }, []); // Fetch rooms when component mounts

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
      field: "name",
      headerName: "Libelle",
      width: 200,
      editable: true,
    },
    {
      field: "max_capacity",
      headerName: "Capacite Maximale",
      width: 300,
      editable: true,
    },
    {
      headerName: "Actions",
      width: 400,
      renderCell: (params) => {
        return (
          <div>
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
      {!updating && <SalleCreate onRoomCreated={handleRoomCreated} />}
      {updating && <SalleUpdate onRoomCreated={handleRoomCreated} salle={updatingSalle} setUpdating={setUpdating}/>}
      <Box sx={{ padding: 3 }}>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </Box>

      <Dialog
        open={deleteConfirmationOpen}
        onClose={handleDeleteConfirmationClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">{"Delete Room"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this room?
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
