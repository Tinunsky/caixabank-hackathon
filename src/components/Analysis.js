import React, { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ExportButton from "./ExportButton";
import { userSettingsStore } from "../stores/userSettingsStore";

function Analysis() {
  const transactions = useStore(transactionsStore);
  const userSettings = useStore(userSettingsStore);
  const { totalBudgetLimit } = userSettings;
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [reportType, setReportType] = useState("trend");

  const [trendData, setTrendData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    if (transactions.length > 0) {
      const groupedData = groupTransactionsByTimeFrame(transactions, timeFrame);
      setTrendData(groupedData.trendData);
      setBudgetData(groupedData.budgetData);
    }
  }, [transactions, timeFrame]);

  const groupTransactionsByTimeFrame = (transactions, timeFrame) => {
    const trendMap = {};
    const budgetMap = {};

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      let key;

      switch (timeFrame) {
        case "daily":
          key = date.toLocaleDateString();
          break;
        case "weekly":
          const weekStart = new Date(
            date.setDate(date.getDate() - date.getDay())
          );
          key = weekStart.toLocaleDateString();
          break;
        case "monthly":
          key = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });
          break;
        case "yearly":
          key = date.getFullYear();
          break;
        default:
          key = date.toLocaleDateString();
      }

      if (!trendMap[key]) {
        trendMap[key] = { key, income: 0, expense: 0 };
      }
      if (transaction.type === "income") {
        trendMap[key].income += transaction.amount;
      } else {
        trendMap[key].expense += transaction.amount;
      }

      if (!budgetMap[key]) {
        budgetMap[key] = { key, budget: 0, actual: 0 };
      }
      budgetMap[key].actual += transaction.amount;
      budgetMap[key].budget = totalBudgetLimit;
    });

    return {
      trendData: Object.values(trendMap),
      budgetData: Object.values(budgetMap),
    };
  };

  return (
    <Box sx={{ mt: 4, p: { xs: 2, md: 4 }, bgcolor: "background.default" }}>
      <Typography variant="h4" gutterBottom color="primary">
        Advanced Analysis
      </Typography>

      {transactions.length === 0 && (
        <Typography variant="h6" color="text.secondary">
          No transactions available.
        </Typography>
      )}

      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="timeframe-select-label">Time Frame</InputLabel>
            <Select
              labelId="timeframe-select-label"
              id="timeframe-select"
              label="Time Frame"
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel id="report-type-select-label">Report Type</InputLabel>
            <Select
              labelId="report-type-select-label"
              id="report-type-select"
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              <MenuItem value="trend">Trend Analysis</MenuItem>
              <MenuItem value="budget">Budget vs. Actual</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <ExportButton
            data={reportType === "trend" ? trendData : budgetData}
            filename={`${reportType}-report.csv`}
            headers={
              reportType === "trend"
                ? ["Date", "Income", "Expense"]
                : ["Date", "Budget", "Actual"]
            }
          />
        </Grid>
      </Grid>

      {reportType === "trend" && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Income and Expenses Trend
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="#28B463"
                    name="Income"
                  />
                  <Line
                    type="monotone"
                    dataKey="expense"
                    stroke="#E74C3C"
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      {reportType === "budget" && (
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="text.secondary">
                Budget vs Actual Expenses
              </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={budgetData}>
                  <XAxis dataKey="key" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="budget" fill="#3498DB" name="Budget" />
                  <Bar dataKey="actual" fill="#E74C3C" name="Actual" />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      )}

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Savings Goals
            </Typography>
            <Typography>No savings goals set.</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom color="text.secondary">
              Net Worth Over Time
            </Typography>
            <Typography>No net worth data available.</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Analysis;
