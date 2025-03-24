import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UploadDocuments from "./UploadDocuments";
import { CustomerContext, CustomerProvider } from "../context/CustomerContext";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UploadDocuments Page", () => {
  const mockCustomer = {
    firstName: "firstName",
    lastName: "lastName",
    citizenId: "1234567890123",
    accountNumber: "1234567890",
    documentFile: new File(["dummy"], "test-id.pdf", { type: "application/pdf" }),
  };

  const mockSetCustomer = jest.fn();
  const mockResetCustomer = jest.fn();

  const renderWithMockContext = () => {
    return render(
      <MemoryRouter>
        <CustomerContext.Provider
          value={{
            customer: mockCustomer,
            setCustomer: mockSetCustomer,
            resetCustomer: mockResetCustomer,
          }}
        >
          <UploadDocuments />
        </CustomerContext.Provider>
      </MemoryRouter>
    );
  };

  const container = () => {
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
    container();
    expect(screen.getByText("Upload Document")).toBeInTheDocument();
    expect(screen.getByText(/First Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name:/i)).toBeInTheDocument();
    expect(screen.getByText(/Thai Citizen ID:/i)).toBeInTheDocument();
    expect(screen.getByText(/Account Number:/i)).toBeInTheDocument();
  });

  it("disables Confirm button when required customer info or file is missing", () => {
    container();
    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    expect(confirmButton).toBeDisabled();
  });

  it("uploads a file and shows the filename", async () => {
    container();

    const file = new File(["test"], "test-file.pdf", { type: "application/pdf" });

    const fileInput = screen.getByLabelText("Please upload your thai ID / passport *");
    fireEvent.change(fileInput, { target: { files: [file] } });

    await screen.findByText(/Current file:/i);
    await screen.findByText(/test-file.pdf/i);
  });

  it("navigates to review information after successful file upload and clicking OK", async () => {
    renderWithMockContext();

    const confirmButton = screen.getByRole("button", { name: /confirm/i });
    fireEvent.click(confirmButton);

    const dialog = await screen.findByText(/Upload Successful/i);
    expect(dialog).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /ok/i }));

    expect(mockNavigate).toHaveBeenCalledWith("/review-info");
  });

  it("opens cancel dialog when Cancel is clicked", () => {
    container();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.getByText("Confirm Cancel")).toBeInTheDocument();
  });

  it("opens back dialog when Back to Previous Page is clicked", () => {
    container();
    fireEvent.click(screen.getByText(/Back to Previous Page/i));
    expect(screen.getByText("Confirm Go Back")).toBeInTheDocument();
  });

});
