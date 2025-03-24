import { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface CustomerInfo {
  firstName: string;
  lastName: string;
  citizenId: string;
  accountNumber: string;
  documentFile?: File | null;
}

interface CustomerContextType {
  customer: CustomerInfo;
  setCustomer: (data: Partial<CustomerInfo>) => void;
  resetCustomer: () => void;
}

const defaultCustomer: CustomerInfo = {
  firstName: "",
  lastName: "",
  citizenId: "",
  accountNumber: "",
  documentFile: null,
};

export const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomerState] = useState<CustomerInfo>(defaultCustomer);

  const setCustomer = useCallback((data: Partial<CustomerInfo>) => {
    setCustomerState((prev) => ({ ...prev, ...data }));
  }, []);

  const resetCustomer = useCallback(() => setCustomerState(defaultCustomer), []);

  return (
    <CustomerContext.Provider value={{ customer, setCustomer, resetCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomer = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomer must be used within a CustomerProvider");
  }
  return context;
};
