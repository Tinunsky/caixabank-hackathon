import React, { Suspense } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import CircularProgress from "@mui/material/CircularProgress";

function AnalysisGraphContent() {
  const transactions = useStore(transactionsStore);

  const categories = [...new Set(transactions.map((tx) => tx.category))];

  const data = categories.map((category) => {
    const categoryTransactions = transactions.filter(
      (tx) => tx.category === category
    );
    const income = categoryTransactions
      .filter((tx) => tx.type === "income")
      .reduce((acc, tx) => acc + tx.amount, 0);
    const expense = categoryTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, tx) => acc + tx.amount, 0);
    return { category, Income: income, Expense: expense };
  });

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Income" stackId="a" fill="#82ca9d" />
        <Bar dataKey="Expense" stackId="a" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default function AnalysisGraph() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <AnalysisGraphContent />
    </Suspense>
  );
}
