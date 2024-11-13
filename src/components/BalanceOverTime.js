import React, { memo } from "react";
import { useStore } from "@nanostores/react";
import { transactionsStore } from "../stores/transactionStore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceOverTime = memo(() => {
  const transactions = useStore(transactionsStore);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let cumulativeBalance = 0;
  const data = sortedTransactions.map((transaction) => {
    cumulativeBalance +=
      transaction.type === "income" ? transaction.amount : -transaction.amount;
    return {
      date: new Date(transaction.date).toLocaleDateString("en-US"),
      Balance: cumulativeBalance,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Balance" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
});

export default BalanceOverTime;
