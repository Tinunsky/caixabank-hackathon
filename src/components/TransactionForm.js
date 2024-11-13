import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { setTransactions, transactionsStore } from "../stores/transactionStore";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { categoryKeywords } from "../constants/categoryKeywords";
import { expenseCategories, incomeCategories } from "../constants/categories";
import { UtraReusableSelect } from "./UltraReusableSelect";

const TransactionForm = React.memo(({ open, transactionToEdit, onClose }) => {
  const transactions = useStore(transactionsStore);

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const assignCategory = (desc) => {
    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some((keyword) => desc.toLowerCase().includes(keyword))) {
        return category;
      }
    }
    return "Other Expenses";
  };

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount);
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category);
      setDate(transactionToEdit.date.split("T")[0]);
    } else {
      const autoCategory = assignCategory(description);
      setCategory(autoCategory);
    }
  }, [transactionToEdit, description]);

  const handleOnClose = () => {
    onClose();
    setDescription("");
    setAmount("");
    setType("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount || !type || !category || !date) {
      alert("Please fill in all fields.");
      return;
    }

    const transactionData = {
      id: transactionToEdit ? transactionToEdit.id : Date.now(), // Use Date.now() as a unique ID for new transactions
      description,
      amount: parseFloat(amount),
      type,
      category,
      date,
    };

    if (transactionToEdit) {
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === transactionToEdit.id ? transactionData : transaction
      );

      setTransactions(updatedTransactions);
    } else {
      setTransactions([...transactions, transactionData]);
    }

    handleOnClose();
  };

  return (
    <Dialog open={open} onClose={handleOnClose}>
      <Paper elevation={0}>
        <DialogTitle>
          {transactionToEdit ? "Edit Transaction" : "Add Transaction"}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  name="description"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Amount (€)"
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  slotProps={{ htmlInput: { min: 0, step: "0.01" } }}
                  name="amount"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <UtraReusableSelect
                  label="Type"
                  value={type}
                  setFunction={(e) => setType(e.target.value)}
                >
                  <MenuItem value="income">Income</MenuItem>
                  <MenuItem value="expense">Expense</MenuItem>
                </UtraReusableSelect>
              </Grid>

              <Grid item xs={12} sm={6}>
                <UtraReusableSelect
                  label="Category"
                  value={category}
                  setFunction={(e) => setCategory(e.target.value)}
                >
                  {type === "income" &&
                    incomeCategories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  {type === "expense" &&
                    expenseCategories.map((cat) => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                </UtraReusableSelect>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  fullWidth
                  margin="normal"
                  required
                  name="date"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                p: 2,
              }}
            >
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                data-testid="add-transaction-button"
              >
                {transactionToEdit ? "Update" : "Add"}
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Paper>
    </Dialog>
  );
});

export default TransactionForm;
