import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

beforeAll(() => {
  Object.defineProperty(globalThis.performance, "getEntriesByType", {
    configurable: true,
    writable: true,
    value: () => [
      {
        type: "navigate",
        duration: 0,
        entryType: "navigation",
        name: "mock",
        startTime: 0,
        toJSON: () => ({}),
      },
    ],
  });
});

describe("App Routing - Login Page", () => {
  jest.resetModules();

  jest.mock("context/AuthContext", () => ({
    useAuth: () => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      logout: jest.fn(),
    }),
  }));

  it("renders Login page when on /login route", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(await screen.findByText(/teller login/i)).toBeInTheDocument();
  });
});

describe("App Routing - Protected Routes", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  jest.mock("context/AuthContext", () => ({
    useAuth: () => ({
      user: { email: "test@bank.com" },
      isAuthenticated: true,
      loading: false,
      logout: jest.fn(),
    }),
  }));

  it("shows navbar on protected pages", async () => {
    render(
      <MemoryRouter initialEntries={["/review-info"]}>
        <App />
      </MemoryRouter>
    );
    const navbarTitle = await screen.findAllByText(/ttms/i);
    expect(navbarTitle.length).toBeGreaterThan(0);
  });
});
