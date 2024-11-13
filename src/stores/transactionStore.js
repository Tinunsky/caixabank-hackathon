import { atom } from "nanostores";

const initialTransactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

export const transactionsStore = atom(initialTransactions);

export const setTransactions = (transactions) => {
  transactionsStore.set(transactions);
  localStorage.setItem("transactions", JSON.stringify(transactions));
};

export const addTransaction = (transaction) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = [...currentTransactions, transaction];
  setTransactions(updatedTransactions);
};

export const deleteTransaction = (id) => {
  const currentTransactions = transactionsStore.get();
  const updatedTransactions = currentTransactions.filter(
    (transaction) => transaction.id !== id
  );
  setTransactions(updatedTransactions);
};

export const calculateFinancials = () => {
  const transactions = transactionsStore.get();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
};
