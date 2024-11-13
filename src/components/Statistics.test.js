import { render, screen } from "@testing-library/react";
import Statistics from "./Statistics";

test("displays average daily expense and highest spending category", () => {
  render(<Statistics />);
  expect(screen.getByText(/Average Daily Expense/i)).toBeInTheDocument();
  expect(screen.getByText(/Highest Spending Category/i)).toBeInTheDocument();
});
