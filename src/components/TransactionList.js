import React, { useState, useMemo, useCallback } from "react";
import { useStore } from "@nanostores/react";
import {
  transactionsStore,
  addTransaction,
  deleteTransaction as storeDeleteTransaction,
} from "../stores/transactionStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import TransactionRow from "./TransactionRow";
import TransactionForm from "./TransactionForm";
import { allCategories } from "../constants/categories";

function TransactionList() {
  const transactions = useStore(transactionsStore);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortField, setSortField] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);

  const handleDialogOpen = (transaction = null) => {
    setTransactionToEdit(transaction);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setTransactionToEdit(null);
  };

  const deleteTransaction = useCallback((id) => {
    storeDeleteTransaction(id);
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const matchesCategory = filterCategory
          ? transaction.category === filterCategory
          : true;
        const matchesType = filterType ? transaction.type === filterType : true;
        return matchesCategory && matchesType;
      })
      .sort((a, b) => {
        if (sortField === "amount") {
          return a.amount - b.amount;
        } else if (sortField === "date") {
          return new Date(a.date) - new Date(b.date);
        }
        return 0;
      });
  }, [transactions, filterCategory, filterType, sortField]);

  const exportToCSV = () => {
    const csvRows = [
      ["Description", "Amount (€)", "Type", "Category", "Date"],
      ...filteredTransactions.map((transaction) => [
        transaction.description,
        transaction.amount.toFixed(2),
        transaction.type,
        transaction.category,
        new Date(transaction.date).toLocaleDateString(),
      ]),
    ];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "transactions.csv");
    a.click();
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Transaction List
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleDialogOpen()}
        >
          Add Transaction
        </Button>
        <Button variant="contained" color="secondary" onClick={exportToCSV}>
          Export to CSV
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: 2, my: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="filter-category-label">Category</InputLabel>
          <Select
            labelId="filter-category-label"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <MenuItem value={""}>All</MenuItem>
            {allCategories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="filter-type-label">Type</InputLabel>
          <Select
            labelId="filter-type-label"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel id="sort-field-label">Sort By</InputLabel>
          <Select
            labelId="sort-field-label"
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="amount">Amount</MenuItem>
            <MenuItem value="date">Date</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ marginBottom: "50px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={() => handleDialogOpen(transaction)}
                onDelete={() => deleteTransaction(transaction.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TransactionForm
        open={dialogOpen}
        transactionToEdit={transactionToEdit}
        onClose={handleDialogClose}
      />
    </Box>
  );
}

export default TransactionList;
