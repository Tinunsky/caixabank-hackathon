import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  userSettingsStore,
  updateUserSettings,
} from "../stores/userSettingsStore";
import {
  budgetAlertStore,
  updateBudgetAlert,
} from "../stores/budgetAlertStore"; // Importar el store de alertas
import {
  Box,
  Typography,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Grid,
  Paper,
  Alert,
} from "@mui/material";
import { expenseCategories } from "../constants/categories";
import { transactionsStore } from "../stores/transactionStore";

function Settings() {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);

  const [budgetExceeded, setBudgetExceeded] = useState(
    userSettings.budgetExceeded
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [totalBudgetLimit, setTotalBudgetLimit] = useState(
    userSettings.totalBudgetLimit
  );
  const [alertsEnabled, setAlertsEnabled] = useState(
    userSettings.alertsEnabled
  );
  const [categoryLimits, setCategoryLimits] = useState(
    userSettings.categoryLimits
  );

  const handleCategoryLimitChange = (category) => (event) => {
    const value = parseFloat(event.target.value) || 0;
    setCategoryLimits((prev) => ({ ...prev, [category]: value }));
  };

  const handleSave = () => {
    const totalCategoryLimit = Object.values(categoryLimits).reduce(
      (acc, limit) => acc + limit,
      0
    );

    if (totalCategoryLimit > totalBudgetLimit) {
      setError("Total category limits exceed the total budget limit.");
      setBudgetExceeded(false);
      return;
    }

    setError("");
    updateUserSettings({ totalBudgetLimit, categoryLimits, alertsEnabled });

    const totalExpenses = transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    setSuccessMessage("Settings saved successfully!");
  };

  useEffect(() => {
    setBudgetExceeded(userSettings.budgetExceeded);
  }, [userSettings.budgetExceeded]);

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Settings
      </Typography>

      <FormControlLabel
        control={
          <Switch
            color="primary"
            checked={alertsEnabled}
            onChange={() => setAlertsEnabled((prev) => !prev)}
          />
        }
        label="Enable Alerts"
      />

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Total Budget Limit (€)
        </Typography>
        <TextField
          type="number"
          name="totalBudgetLimit"
          value={totalBudgetLimit}
          onChange={(e) => setTotalBudgetLimit(parseFloat(e.target.value) || 0)}
          fullWidth
          margin="normal"
          inputProps={{ min: 0, step: "0.01" }}
          sx={{ mt: 1 }}
        />
      </Paper>

      <Paper sx={{ padding: 2, mt: 2, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Category Budget Limits (€)
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {expenseCategories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category}>
              <TextField
                label={category}
                type="number"
                value={categoryLimits[category] || ""}
                onChange={handleCategoryLimitChange(category)}
                fullWidth
                margin="normal"
                inputProps={{ min: 0, step: "0.01" }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ boxShadow: 2 }}
          onClick={handleSave}
        >
          Save Settings
        </Button>
      </Box>

      {budgetExceeded && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          You have exceeded your budget limit of {totalBudgetLimit} €!
        </Alert>
      )}

      {successMessage && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {successMessage}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Settings;
