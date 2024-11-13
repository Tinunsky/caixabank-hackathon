import { render, screen } from "@testing-library/react";
import BalanceOverTime from "./BalanceOverTime";

test("renders balance over time chart", () => {
  render(<BalanceOverTime />);
  expect(screen.getByText(/Balance Over Time/i)).toBeInTheDocument();
});
