import React from "react";
import { TableRow, TableCell, Button, Box } from "@mui/material";
import { formatMoney } from "../utils/formatMoney";

function TransactionRow({ transaction, onEdit, onDelete }) {
  return (
    <TableRow key={transaction.id}>
      <TableCell>{transaction.description}</TableCell>
      <TableCell>{formatMoney(transaction.amount)}</TableCell>
      <TableCell>
        {transaction.type === "income" ? "Income" : "Expense"}
      </TableCell>
      <TableCell>{transaction.category}</TableCell>
      <TableCell>
        {new Date(transaction.date).toLocaleDateString("en-US")}
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="outlined" color="primary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="outlined" color="error" onClick={onDelete}>
            Delete
          </Button>
        </Box>
      </TableCell>
    </TableRow>
  );
}

export default TransactionRow;
