import React from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { Paper, Typography } from "@mui/material";

function Statistics() {
  const transactions = useStore(transactionsStore);

  const expenses = transactions.filter(
    (transaction) => transaction.type === "expense"
  );

  const uniqueDates = [...new Set(expenses.map((expense) => expense.date))];
  const totalExpenses = expenses?.reduce((total, expense) => total + expense.amount, 0) || 0;
  const averageDailyExpense = uniqueDates?.length
    ? totalExpenses / uniqueDates.length
    : 0; 

  const categoryExpenses = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  let maxCategory = Object.keys(categoryExpenses).reduce(
    (max, category) =>
      categoryExpenses[category] > (categoryExpenses[max] || 0)
        ? category
        : max,
    null
  );

  return (
    <Paper sx={{ padding: 2, mt: 2 }}>
      <Typography variant="h6">Key Statistics</Typography>
      <Typography>
        Average Daily Expense: {averageDailyExpense?.toFixed(2)} €
      </Typography>
      <Typography>
        Highest Spending Category:{" "}
        {maxCategory
          ? `${maxCategory} (${categoryExpenses[maxCategory].toFixed(2)} €)`
          : "No data available"}
      </Typography>
    </Paper>
  );
}

export default Statistics;
