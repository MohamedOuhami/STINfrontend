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
import ElementCreate from "./ElementCreate";
import ElementUpdate from "./ElementUpdate";

export default function ElementList() {
  const [rows, setRows] = React.useState([]);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
    React.useState(false);
  const [deleteTargetId, setDeleteTargetId] = React.useState(null);
  const [updating, setUpdating] = React.useState(false);
  const [updatingElement, setUpdatingElement] = React.useState(null);

  const fetchElements = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/elements", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching Elements:", error);
    }
  };

  const handleEdit = async (Element) => {
    setUpdatingElement(Element);
    setUpdating(true);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:8080/elements/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // If deletion is successful, fetch the updated list of Elements
      fetchElements();
      setDeleteConfirmationOpen(false); // Close the confirmation dialog
    } catch (error) {
      console.error("Error deleting Element:", error);
    }
  };

  const handleElementCreated = () => {
    fetchElements();
  };

  React.useEffect(() => {
    fetchElements();
  }, []); // Fetch Elements when component mounts

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
      field: "description",
      headerName: "Description",
      width: 300,
      editable: true,
    },
    {
      field: "module",
      headerName: "Module",
      width: 300,
      renderCell: (params) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            height="100%"
          >
            <Typography>{params.row.module.name}</Typography>
          </Box>
        );
      },
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
      {!updating && <ElementCreate onElementCreated={handleElementCreated} />}
      {updating && (
        <ElementUpdate
          onElementCreated={handleElementCreated}
          Element={updatingElement}
          setUpdating={setUpdating}
        />
      )}
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
        <DialogTitle id="delete-dialog-title">{"Delete Element"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this Element?
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
