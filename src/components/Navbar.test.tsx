import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Navbar from "./Navbar";
import { MemoryRouter } from "react-router-dom";

const logoutMock = jest.fn();
const mockNavigate = jest.fn();

jest.mock("../context/AuthContext", () => ({
  useAuth: () => ({
    user: { email: "test@bank.com" },
    logout: logoutMock,
  }),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Navbar", () => {
  it("renders TTMS and avatar", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("TTMS")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("opens menu and shows email", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));
    expect(await screen.findByText("Signed in as")).toBeInTheDocument();
    expect(screen.getByText("test@bank.com")).toBeInTheDocument();
  });

  it("opens logout dialog and cancels logout", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(await screen.findByText("Logout"));

    expect(await screen.findByText("Confirm Logout")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Cancel"));

    await waitFor(() =>
      expect(screen.queryByText("Confirm Logout")).not.toBeInTheDocument()
    );
  });

  it("confirms logout and navigates to /login", async () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
  
    const avatarButton = screen.getByRole("button");
    fireEvent.click(avatarButton);
  
    await waitFor(() => {
      expect(screen.getByText("Logout")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("Logout"));
  
    await waitFor(() => {
      expect(screen.getByText("Are you sure you want to logout?")).toBeInTheDocument();
    });
  
    const confirmBtn = screen.getByText("Yes, Logout");
    fireEvent.click(confirmBtn);
  
    await waitFor(() => {
      expect(logoutMock).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
  
});
