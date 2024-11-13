import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import { CircularProgress, Typography, Paper } from "@mui/material";
import dayjs from "dayjs";

function Recommendations() {
  const transactions = useStore(transactionsStore);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      try {
        const shouldFail = false;

        if (shouldFail) {
          throw new Error("Failed to fetch data");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const calculateMonthlyExpenses = (transactions) => {
    const currentMonth = dayjs().month();
    const currentYear = dayjs().year();

    let expenseThisMonth = 0;
    let expenseLastMonth = 0;

    transactions.forEach((transaction) => {
      const transactionDate = dayjs(transaction.date);

      if (transaction.type === "expense") {
        if (
          transactionDate.month() === currentMonth &&
          transactionDate.year() === currentYear
        ) {
          expenseThisMonth += transaction.amount;
        } else if (
          transactionDate.month() === currentMonth - 1 &&
          transactionDate.year() === currentYear
        ) {
          expenseLastMonth += transaction.amount;
        }
      }
    });

    return { expenseThisMonth, expenseLastMonth };
  };

  const { expenseThisMonth, expenseLastMonth } =
    calculateMonthlyExpenses(transactions);

  let message = "";

  if (!expenseThisMonth) {
    message = "Start recording your first expenses of this month!";
  }

  if (expenseThisMonth && !expenseLastMonth) {
    message = "No recorded expenses last month! Keep it up!";
  }

  if (expenseLastMonth && expenseThisMonth > expenseLastMonth) {
    const increasePercentage =
      ((expenseThisMonth - expenseLastMonth) / expenseLastMonth) * 100;
    message = `Your expenses have increased by ${increasePercentage.toFixed(
      2
    )}%. Consider reviewing your spending.`;
  }

  if (expenseThisMonth && expenseThisMonth < expenseLastMonth) {
    const decreasePercentage =
      ((expenseLastMonth - expenseThisMonth) / expenseLastMonth) * 100;
    message = `Congratulations! Your expenses have decreased by ${decreasePercentage.toFixed(
      2
    )}%. Keep it up!`;
  }

  const expensesExist = expenseThisMonth && expenseLastMonth;
  if (expensesExist && expenseThisMonth === expenseLastMonth) {
    message = "Your spending hasn't changed compared to last month.";
  }

  return (
    <Paper sx={{ padding: 2, mt: 2 }}>
      <Typography variant="h5">Recommendations</Typography>
      <Typography>{message}</Typography>
    </Paper>
  );
}

export default Recommendations;
