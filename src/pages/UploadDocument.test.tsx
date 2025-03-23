import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UploadDocuments from "./UploadDocuments";
import { CustomerProvider } from "../context/CustomerContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UploadDocuments Page", () => {
  const setup = () => {
    render(
      <MemoryRouter>
        <CustomerProvider>
          <UploadDocuments />
        </CustomerProvider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Upload Document title and customer info fields", () => {
    setup();
    expect(screen.getByText("Upload Document")).toBeInTheDocument();
    expect(screen.getByText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Thai Citizen ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Number:/i)).toBeInTheDocument();
  });

  it("disables Confirm button when required customer info or file is missing", () => {
    setup();
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton).toBeDisabled();
  });

  it("opens cancel dialog when Cancel is clicked", () => {
    setup();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByText("Confirm Cancel")).toBeInTheDocument();
  });

  it("opens back dialog when Back to Previous Page is clicked", () => {
    setup();
    fireEvent.click(screen.getByText(/Back to Previous Page/i));
    expect(screen.getByText("Confirm Go Back")).toBeInTheDocument();
  });

  it("uploads a file and shows the filename", async () => {
    setup();

    const file = new File(["test"], "test-file.pdf", { type: "application/pdf" });

    const fileInput = screen.getByLabelText("Please upload your thai ID / passport *");
    fireEvent.change(fileInput, { target: { files: [file] } });

    await screen.findByText(/Current file:/i);
    await screen.findByText(/test-file.pdf/i);
  });
});
