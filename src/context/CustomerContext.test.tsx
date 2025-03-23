import React from "react";
import { render, act, screen } from "@testing-library/react";
import { CustomerProvider, useCustomer } from "../context/CustomerContext";

// 🔹 Component สำหรับทดสอบ
const TestComponent = () => {
  const { customer, setCustomer, resetCustomer } = useCustomer();

  return (
    <div>
      <p data-testid="firstName">{customer.firstName}</p>
      <button onClick={() => setCustomer({ firstName: "Baifern" })}>
        Set First Name
      </button>
      <button onClick={resetCustomer}>Reset</button>
    </div>
  );
};

describe("CustomerContext", () => {
  it("should provide default customer values", () => {
    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>
    );

    expect(screen.getByTestId("firstName").textContent).toBe("");
  });

  it("should update customer values with setCustomer", () => {
    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>
    );

    act(() => {
      screen.getByText("Set First Name").click();
    });

    expect(screen.getByTestId("firstName").textContent).toBe("Baifern");
  });

  it("should reset customer to default values", () => {
    render(
      <CustomerProvider>
        <TestComponent />
      </CustomerProvider>
    );

    act(() => {
      screen.getByText("Set First Name").click();
    });

    expect(screen.getByTestId("firstName").textContent).toBe("Baifern");

    act(() => {
      screen.getByText("Reset").click();
    });

    expect(screen.getByTestId("firstName").textContent).toBe("");
  });

  it("should throw error when used outside provider", () => {
    const consoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const BrokenComponent = () => {
      useCustomer();
      return <div />;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      "useCustomer must be used within a CustomerProvider"
    );

    consoleError.mockRestore();
  });
});
