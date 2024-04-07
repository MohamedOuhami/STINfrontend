import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ElementCreate({ onElementCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [moduleList, setModuleList] = useState([]);
  const [module, setModule] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleElementSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const instance = axios.create({
      baseURL: "http://localhost:8080/elements",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });

    const body = {
      name,
      description,
      module : {id:module}
    };
    console.log(body);

    try {
      const result = await instance.post(
        "http://localhost:8080/elements",
        body
      );
      console.log(result);
      setSuccess(true);
      onElementCreated();
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating elements:", error);
    }
  };

  const fetch_modules = async () => {
    const token = localStorage.getItem("token");

    const module_instance = axios.create({
      baseURL: "http://localhost:8080/modules",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });

    try {
      const module_list = await module_instance.get();
      setModuleList(module_list.data);
    } catch (error) {
      console.error("Error fetching modules:", error.message);
    }
  };

  useEffect(() => {
    fetch_modules();
  }, []);

  return (
    <Box sx={{ paddingTop: 4, paddingX: 3 }}>
      <Typography variant="h4" mb={2}>
        Element Management
      </Typography>
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          The Element has been successfully added.
        </Alert>
      )}
      <form onSubmit={handleElementSubmit}>
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Name of the Element:</Typography>
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

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Module:</Typography>
              <select
                id="module"
                value={module}
                onChange={(e) => setModule(e.target.value)}
                style={{ marginLeft: "8px" }}
              >
                <option value="">Select a module</option>
                {moduleList.map((module) => {
                  console.log(module); // Move console.log outside of JSX block
                  return (
                    <option key={module} value={module.id}>
                      {module.name}
                    </option>
                  );
                })}
              </select>
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
