import { useState } from "react";
import axios from "axios";
import { Box, Button, Stack, Typography, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function ProfessorCreate({ onProfessorCreated }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [birthday, setBirthday] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleProfessorSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const instance = axios.create({
      baseURL: "http://localhost:8080/professors",
      timeout: 1000,
      headers: { Authorization: "Bearer " + token },
    });

    const parsedCreatedAt = new Date();
    const createdAt = parsedCreatedAt.toISOString().split("T")[0];
    const updatedAt = parsedCreatedAt.toISOString().split("T")[0];

    const body = {
      firstName,
      lastName,
      username,
      email,
      password,
      telephone,
      isEnabled: 1,
      updatedAt,
      dateNaissance: birthday,
      roles : [{
        id:2
      }]
    };

    console.log(body);
    const today = new Date().toISOString().slice(0, 10); // Get today's date in yyyy-mm-dd format

    try {
      const result = await instance.post(
        `http://localhost:8080/professors?createdAt=${today}`, // Include createdAt as a query parameter in the URL
        body
      );
      console.log(result);
      setSuccess(true); // Set success state to true after successful submission
      onProfessorCreated();
      // Automatically hide the alert after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating professors:", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 4, paddingX: 3 }}>
      <Typography variant="h4" mb={2}>
        Professor Management
      </Typography>
      {success && (
        <Alert severity="success" sx={{ marginBottom: 2 }}>
          The Professor has been successfully added.
        </Alert>
      )}
      <form onSubmit={handleProfessorSubmit}>
        <Stack spacing={2}>
          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>First Name:</Typography>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Last Name:</Typography>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Username:</Typography>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Email:</Typography>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Password:</Typography>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Telephone:</Typography>
              <input
                type="text"
                id="telephone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                style={{ marginLeft: "8px" }}
              />
            </Stack>
          </Box>

          <Box>
            <Stack direction="row" alignItems="center">
              <Typography>Birthday:</Typography>
              <input
                type="date"
                id="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
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
