import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";

export default function ModuleUpdate({ onModuleCreated, module,setUpdating }) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (module) {
      setName(module.name || ""); // Set name to module.name if available, otherwise empty string
      setCapacity(module.max_capacity || ""); // Set capacity to module.max_capacity if available, otherwise empty string
    }
  }, [module]); // Trigger effect when module changes

  const handleSalleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const instance = axios.create({
      baseURL: "http://localhost:8080/modules",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });

    const max_capacity = parseInt(capacity);

    const body = {
      name,
      max_capacity,
    };

    try {
      const result = await instance.put(`http://localhost:8080/modules/${module.id}`, body);

      console.log(result);
      setSuccess(true);
      setUpdating(false);
      onModuleCreated();
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 4, paddingX: 3 }}>
      <Typography variant="h4" mb={2}>
        Module Management
      </Typography>
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          The room has been successfully updated.
        </Alert>
      )}
      <form onSubmit={handleSalleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Name of the room:</Typography>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Capacity of the room:</Typography>
              <input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Button variant="contained" type="submit">
            Update
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
