import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  calculateExceededCategories,
  userSettingsStore,
} from "../stores/userSettingsStore";
import { transactionsStore } from "../stores/transactionStore";
import { Alert } from "@mui/material";
import { budgetAlertStore } from "../stores/budgetAlertStore";
import { formatMoney } from "../utils/formatMoney";
import { authStore } from "../stores/authStore";

const BudgetAlert = () => {
  const userSettings = useStore(userSettingsStore);
  const transactions = useStore(transactionsStore);
  const { totalBudgetLimit, categoryLimits } = userSettings;
  const auth = useStore(authStore);

  const totalExpense = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  const exceededCategories = calculateExceededCategories(transactions);

  const isTotalBudgetExceeded = totalExpense > totalBudgetLimit;
  const isAnyCategoryExceeded = exceededCategories.length > 0;
  const budgetExceeded = isTotalBudgetExceeded || isAnyCategoryExceeded;
  const budgetAlert = useStore(budgetAlertStore);
  const budgetMessage = `You have exceeded your budget limit of ${totalBudgetLimit}. Total expenses: ${formatMoney(
    totalExpense
  )}`;
  const exceededCatString = exceededCategories
    .map(
      (category) => ` ${category} (${formatMoney(categoryLimits[category])})`
    )
    .join(", ");
  const categoryMessage = `You have exceeded your category limit for: ${exceededCatString}.`;
  const completeMessage = `Warning: ${
    isTotalBudgetExceeded ? budgetMessage : ""
  } ${isAnyCategoryExceeded ? categoryMessage : ""}`;

  useEffect(() => {
    if (budgetExceeded) {
      if (!budgetAlert.isVisible || completeMessage !== budgetAlert.message) {
        budgetAlertStore.set({
          isVisible: true,
          message: completeMessage,
        });
      }
    } else {
      if (budgetAlert.isVisible) {
        budgetAlertStore.set({
          isVisible: false,
          message: ``,
        });
      }
    }
  }, [
    budgetExceeded,
    categoryLimits,
    exceededCategories,
    totalBudgetLimit,
    totalExpense,
    budgetAlert,
    isTotalBudgetExceeded,
    isAnyCategoryExceeded,
  ]);

  return budgetAlert.isVisible && auth.isAuthenticated ? (
    <Alert severity="warning">{budgetAlert.message}</Alert>
  ) : null;
};

export default BudgetAlert;
