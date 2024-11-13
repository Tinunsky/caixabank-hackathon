import React, { Profiler, Suspense } from "react";
import { useStore } from "@nanostores/react";
import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import ExportButton from "./ExportButton";
import DownloadProfilerData from "./DownloadProfilerData";
import { onRenderCallback } from "../utils/onRenderCallback";
import {
  calculateFinancials,
  transactionsStore,
} from "../stores/transactionStore";
import { formatMoney } from "../utils/formatMoney";

const AnalysisGraph = React.lazy(() => import("./AnalysisGraph"));
const BalanceOverTime = React.lazy(() => import("./BalanceOverTime"));
const Statistics = React.lazy(() => import("./Statistics"));
const Recommendations = React.lazy(() => import("./Recommendations"));
const RecentTransactions = React.lazy(() => import("./RecentTransactions"));

function Dashboard() {
  const transactions = useStore(transactionsStore);

  const { totalIncome, totalExpense, balance } = calculateFinancials();
  return (
    <Profiler id="Dashboard" onRender={onRenderCallback}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom color="primary">
          Financial Summary
        </Typography>

        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={12} md={3}>
            <ExportButton
              data={transactions}
              filename="transactions.csv"
              headers={["Description", "Amount", "Type", "Category", "Date"]}
              label="Export Transactions"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}></Grid>
          <Grid item xs={12} sm={12} md={3} sx={{ textAlign: "right" }}>
            <DownloadProfilerData />{" "}
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "0px" }}>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Income
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-income"
                color="success"
              >
                {formatMoney(totalIncome)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h5" data-testid="total-income" color="error">
                {formatMoney(totalExpense)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: 3,
                borderRadius: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Balance
              </Typography>
              <Typography
                variant="h5"
                data-testid="total-income"
                color={balance >= 0 ? "success" : "error"}
              >
                {formatMoney(balance)}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Suspense fallback={<CircularProgress />}>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Income and Expenses by Category
                </Typography>
                <AnalysisGraph />
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ padding: 2, boxShadow: 3, borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Balance Over Time
                </Typography>
                <BalanceOverTime />
              </Paper>
            </Grid>
          </Grid>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Statistics></Statistics>
            </Grid>

            <Grid item xs={12} md={6}>
              <Recommendations></Recommendations>
            </Grid>
          </Grid>

          <RecentTransactions transactions={transactions} />
        </Suspense>
      </Box>
    </Profiler>
  );
}

export default Dashboard;
