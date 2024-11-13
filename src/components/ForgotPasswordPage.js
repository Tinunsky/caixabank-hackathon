import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    if (email === "user@example.com") {
      setMessage("A password reset link has been sent to your email.");
    } else {
      setMessage("Email not found. Please try again.");
    }
  };

  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Forgot Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" type="submit">
          Send Reset Link
        </Button>
      </form>
      {message && (
        <Typography color="secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
}

export default ForgotPasswordPage;
