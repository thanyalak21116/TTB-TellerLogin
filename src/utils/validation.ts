export const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  export const isValidCitizenId = (id: string): boolean => {
    return /^\d{13}$/.test(id);
  };
  
  export const isValidAccountNumber = (account: string): boolean => {
    return /^\d{10,12}$/.test(account);
  };