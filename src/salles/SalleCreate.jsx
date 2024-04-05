import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function SalleCreate({onRoomCreated}) {
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSalleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const instance = axios.create({
      baseURL: "http://localhost:8080/salles",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });

    const max_capacity = parseInt(capacity);

    const body = {
      name,
      max_capacity,
    };

    try {
      const result = await instance.post("http://localhost:8080/salles", body);
      console.log(result);
      setSuccess(true); // Set success state to true after successful submission
      onRoomCreated();
      // Automatically hide the alert after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 4, paddingX: 3 }}>
      <Typography variant="h4" mb={2}>
        Room Management
      </Typography>
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          The room has been successfully added.
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
            Create
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
