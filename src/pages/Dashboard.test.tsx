
import { render, screen, fireEvent } from "@testing-library/react";
import DashboardPage from "../pages/Dashboard";
import { MemoryRouter } from "react-router-dom";

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { email: "test@bank.com" },
  }),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const originalModule = jest.requireActual("react-router-dom");
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  };
});

describe("DashboardPage", () => {
  it("renders welcome message and TTMS title", () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Welcome test@bank.com/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Teller Transaction Management System/i)
    ).toBeInTheDocument();
  });

  it("navigates to customer info page when button is clicked", () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    );

    const button = screen.getByRole("button", {
      name: /Customer Registration/i,
    });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/customer-info");
  });
});
