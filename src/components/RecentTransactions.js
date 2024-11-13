import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function RecentTransactions({ transactions }) {
  // Recent transactions
  // Instructions:
  // - Sort the transactions by date, showing the most recent first.
  // - Extract only the last 5 transactions for display.
  const recentTransactions = Array.isArray(transactions)
    ? transactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5)
    : [];
  return (
    <div>
      <h3>Recent Transactions</h3>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Amount (€)</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  {transaction.amount.toFixed(2)}{" "}
                  {/* Format amount to two decimal places */}
                </TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>
                  {new Date(transaction.date).toLocaleDateString()}
                </TableCell>{" "}
                {/* Format date */}
              </TableRow>
            ))}
            {/* Instructions:
                            - Map over the recentTransactions array and render each transaction in a table row.
                            - For each row, display the transaction's description, amount, type (income/expense), category, and date.
                            - Ensure that the amount is formatted to two decimal places. */}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default RecentTransactions;
