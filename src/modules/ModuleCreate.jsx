import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function ModuleCreate({onModuleCreated}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState(false);

  const handleModuleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const instance = axios.create({
      baseURL: "http://localhost:8080/modules",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });


    const body = {
      name,
      description,
    };

    try {
      const result = await instance.post("http://localhost:8080/modules", body);
      console.log(result);
      setSuccess(true); // Set success state to true after successful submission
      onModuleCreated();
      // Automatically hide the alert after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating modules:", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 4, paddingX: 3 }}>
      <Typography variant="h4" mb={2}>
        Module Management
      </Typography>
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          The Module has been successfully added.
        </Alert>
      )}
      <form onSubmit={handleModuleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Name of the Module:</Typography>
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
              <Typography>Description:</Typography>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
