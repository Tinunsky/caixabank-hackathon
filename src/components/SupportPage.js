import React, { useState, useEffect, Profiler, Suspense } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  List,
  TextField,
  Alert,
} from "@mui/material";
import { onRenderCallback } from "../utils/onRenderCallback";
import UltraReusableUserListItem from "./UltraResusableUserListItem";

function SupportPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Profiler id="SupportPage" onRender={onRenderCallback}>
      <Box sx={{ mt: 4, p: { xs: 0, md: 4 }, bgcolor: "background.default" }}>
        <Typography
          variant={{ xs: "h6", md: "h4" }}
          gutterBottom
          color="primary"
        >
          Support Contacts
        </Typography>

        <TextField
          label="Search by Name"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />

        <Suspense fallback={<CircularProgress />}>
          <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
            <List>
              {filteredUsers.map((user) => (
                <UltraReusableUserListItem user={user} />
              ))}
            </List>
          </Paper>
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default SupportPage;
