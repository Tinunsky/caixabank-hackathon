import { atom } from "nanostores";

export const userSettingsStore = atom({
  totalBudgetLimit: 1000,
  categoryLimits: {},
  alertsEnabled: true,
  budgetExceeded: false,
});

if (process.env.NODE_ENV === "development") {
  window.userSettingsStore = userSettingsStore;
}

export function updateUserSettings(newSettings) {
  userSettingsStore.set({
    ...userSettingsStore.get(),
    ...newSettings,
  });
}

export function calculateExceededCategories(transactions) {
  const categoryLimits = userSettingsStore.get().categoryLimits;

  const categoryExpenses = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = 0;
    }
    acc[transaction.category] += transaction.amount;
    return acc;
  }, {});

  const exceededCategories = Object.keys(categoryExpenses).filter(
    (category) => {
      if (!categoryLimits[category]) return false;
      return categoryExpenses[category] > categoryLimits[category];
    }
  );

  return exceededCategories;
}
