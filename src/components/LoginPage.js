import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../stores/authStore";
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Stack,
} from "@mui/material";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showCredentials, setShowCredentials] = useState(false);
  const navigate = useNavigate();

  const defaultCredentials = {
    email: "default@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    if (
      email === defaultCredentials.email &&
      password === defaultCredentials.password
    ) {
      login();
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

  const handleShowDefaultCredentials = () => {
    setEmail(defaultCredentials.email);
    setPassword(defaultCredentials.password);
    setShowCredentials(true);
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
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          Login
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {showCredentials && (
        <Alert severity="info" sx={{ mt: 2 }}>
          <strong>Email:</strong> {defaultCredentials.email}
          <br />
          <strong>Password:</strong> {defaultCredentials.password}
        </Alert>
      )}

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
        <Button onClick={handleShowDefaultCredentials} color="secondary">
          Show Default Credentials
        </Button>
        <Button onClick={() => navigate("/password")} color="secondary">
          Forgot Password?
        </Button>
        <Button onClick={() => navigate("/register")} color="secondary">
          Register
        </Button>
      </Stack>
    </Box>
  );
}

export default LoginPage;
