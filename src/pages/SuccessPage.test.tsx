import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SuccessPage from "../pages/SuccessPage";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const resetCustomerMock = jest.fn();
jest.mock("../context/CustomerContext", () => ({
  useCustomer: () => ({
    resetCustomer: resetCustomerMock,
  }),
}));

describe("SuccessPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders success message", () => {
    render(
      <MemoryRouter>
        <SuccessPage />
      </MemoryRouter>
    );

    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(
      screen.getByText(/Thank you for completing the process/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Back to Dashboard/i })
    ).toBeInTheDocument();
  });

  it("calls resetCustomer on mount", () => {
    render(
      <MemoryRouter>
        <SuccessPage />
      </MemoryRouter>
    );

    expect(resetCustomerMock).toHaveBeenCalledTimes(1);
  });

  it("navigates to dashboard when button clicked", () => {
    render(
      <MemoryRouter>
        <SuccessPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", { name: /Back to Dashboard/i });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
