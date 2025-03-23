// src/pages/ReviewInfo.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ReviewInfo from "../pages/ReviewInfo";
import { CustomerContext } from "../context/CustomerContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("ReviewInfo Page", () => {
  const fullCustomer = {
    firstName: "Fern",
    lastName: "Tester",
    citizenId: "1234567890123",
    accountNumber: "0987654321",
    documentFile: new File(["test"], "id-card.pdf", { type: "application/pdf" }),
  };

  const renderWithContext = (customer = fullCustomer) => {
    const contextValue = {
      customer,
      setCustomer: jest.fn(),
      resetCustomer: jest.fn(),
    };

    return render(
      <CustomerContext.Provider value={contextValue}>
        <MemoryRouter>
          <ReviewInfo />
        </MemoryRouter>
      </CustomerContext.Provider>
    );
  };

  it("renders customer information correctly", () => {
    renderWithContext();
    expect(screen.getByText(/Review Information/i)).toBeInTheDocument();
    expect(screen.getByText(/Fern/)).toBeInTheDocument();
    expect(screen.getByText(/Tester/)).toBeInTheDocument();
    expect(screen.getByText(/1234567890123/)).toBeInTheDocument();
    expect(screen.getByText(/0987654321/)).toBeInTheDocument();
    expect(screen.getByText(/id-card.pdf/)).toBeInTheDocument();
  });

  it("shows error if required data is missing", () => {
    renderWithContext({} as any);
    expect(screen.getByText(/Something Went Wrong/i)).toBeInTheDocument();
  });

  it("opens confirm dialog and navigates to /success", () => {
    renderWithContext();
    fireEvent.click(screen.getByText(/Confirm All Information/i));
    expect(screen.getByText(/Confirm Submission/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes, Confirm/i));
    expect(mockNavigate).toHaveBeenCalledWith("/success");
  });

  it("opens cancel dialog and navigates to /", () => {
    renderWithContext();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByText(/Confirm Cancel/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes, Cancel/i));
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("opens back dialog and navigates to /upload-documents", () => {
    renderWithContext();
    fireEvent.click(screen.getByText(/Back to Previous Page/i));
    expect(screen.getByText(/Confirm Go Back/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Yes, Go Back/i));
    expect(mockNavigate).toHaveBeenCalledWith("/upload-documents");
  });
});
