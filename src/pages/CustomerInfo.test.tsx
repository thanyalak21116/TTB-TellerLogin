
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CustomerInfo from "../pages/CustomerInfo";
import { CustomerProvider } from "../context/CustomerContext";
import { MemoryRouter } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("CustomerInfo Page", () => {
  const container = () =>
    render(
      <CustomerProvider>
        <MemoryRouter>
          <CustomerInfo />
        </MemoryRouter>
      </CustomerProvider>
    );

  it("renders form inputs", () => {
    container();
    expect(screen.getByLabelText(/Firstname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Lastname/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Thai Citizen ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Account Number/i)).toBeInTheDocument();
  });

  it("validates empty fields on submit", async () => {
    container();
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton).toBeDisabled();
  });

  it("shows validation error for invalid citizen ID", async () => {
    container();
    fireEvent.change(screen.getByLabelText(/Thai Citizen ID/i), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByLabelText(/Thai Citizen ID/i));
    await waitFor(() => {
      expect(screen.getByText(/Invalid Citizen ID/i)).toBeInTheDocument();
    });
  });

  it("shows validation error for invalid account number", async () => {
    container();
    fireEvent.change(screen.getByLabelText(/Account Number/i), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByLabelText(/Account Number/i));
  
    await waitFor(() => {
      expect(
        screen.getByText(/Account number must be 10–12 digits/i)
      ).toBeInTheDocument();
    });
  });
  

  it("shows success dialog on valid submit", async () => {
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockReturnValue(mockNavigate);

    container();

    fireEvent.change(screen.getByLabelText(/Firstname/i), {
      target: { value: "Firstname" },
    });
    fireEvent.change(screen.getByLabelText(/Lastname/i), {
      target: { value: "Lastname" },
    });
    fireEvent.change(screen.getByLabelText(/Thai Citizen ID/i), {
      target: { value: "1101700230701" },
    });
    fireEvent.change(screen.getByLabelText(/Account Number/i), {
      target: { value: "1234567890" },
    });

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    await waitFor(() => expect(confirmButton).toBeEnabled());

    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Customer information saved successfully/i)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/upload-documents");
    });
  });

  it("opens cancel dialog when clicking Cancel", () => {
    container();
    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(
      screen.getByText(/Are you sure you want to cancel/i)
    ).toBeInTheDocument();
  });
});
