import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginPage from "../pages/Login";
import { MemoryRouter } from "react-router-dom";
import { isSignInWithEmailLink, sendSignInLinkToEmail, signInWithEmailLink } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

jest.mock("firebase/auth", () => ({
  isSignInWithEmailLink: jest.fn(() => false),
  sendSignInLinkToEmail: jest.fn(() => Promise.resolve()),
  signInWithEmailLink: jest.fn(),
  deleteUser: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  auth: {},
}));

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: false });
  });

  it("renders login form correctly", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    expect(screen.getByText("Teller Login")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send email link login/i })).toBeInTheDocument();
  });

  it("disables button for invalid email", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "invalid-email" } });

    expect(screen.getByRole("button", { name: /send email link login/i })).toBeDisabled();
  });

  it("shows success snackbar when email is valid and sent", async () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });

    const button = screen.getByRole("button", { name: /send email link login/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(sendSignInLinkToEmail).toHaveBeenCalled();
    });

    expect(screen.getByText(/email sent successfully/i)).toBeInTheDocument();
  });

  it("shows error snackbar when email sending fails", async () => {
    (sendSignInLinkToEmail as jest.Mock).mockRejectedValueOnce(new Error("Error sending link"));
  
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  
    const input = screen.getByLabelText("Email");
    fireEvent.change(input, { target: { value: "test@example.com" } });
  
    const button = screen.getByRole("button", { name: /send email link login/i });
    fireEvent.click(button);
  
    await waitFor(() => {
      expect(sendSignInLinkToEmail).toHaveBeenCalled();
    });
  
    expect(await screen.findByText(/Error sending link/i)).toBeInTheDocument();
  });

  it("redirects to homepage if already authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({ isAuthenticated: true });
  
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
