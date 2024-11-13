import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { login } from "../stores/authStore";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const existingUser = localStorage.getItem(email);
    if (existingUser) {
      setError("Email is already registered");
      return;
    }

    localStorage.setItem(email, JSON.stringify({ email, password }));

    login();

    setSuccess(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 8,
        p: 2,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Email"
          type="email"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Account created successfully! Redirecting to login...
        </Alert>
      )}
    </Box>
  );
}

export default RegisterPage;
