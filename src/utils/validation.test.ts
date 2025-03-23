import {
    isValidEmail,
    isValidCitizenId,
    isValidAccountNumber,
  } from "./validation";
  
  describe("Validation Utils", () => {
    describe("isValidEmail", () => {
      it("should return true for valid email", () => {
        expect(isValidEmail("example@email.com")).toBe(true);
      });
  
      it("should return false for invalid email", () => {
        expect(isValidEmail("invalid-email")).toBe(false);
        expect(isValidEmail("missing@domain")).toBe(false);
        expect(isValidEmail("missing.com")).toBe(false);
      });
    });
  
    describe("isValidCitizenId", () => {
      it("should return true for valid 13-digit Thai citizen ID", () => {
        expect(isValidCitizenId("1234567890123")).toBe(true);
      });
  
      it("should return false for ID not 13 digits", () => {
        expect(isValidCitizenId("1234567890")).toBe(false);
        expect(isValidCitizenId("")).toBe(false);
      });
  
      it("should return false for ID with letters", () => {
        expect(isValidCitizenId("1234567890abc")).toBe(false);
      });
    });
  
    describe("isValidAccountNumber", () => {
      it("should return true for 10–12 digit account number", () => {
        expect(isValidAccountNumber("1234567890")).toBe(true);
        expect(isValidAccountNumber("123456789012")).toBe(true);
      });
  
      it("should return false for less than 10 digits", () => {
        expect(isValidAccountNumber("12345678")).toBe(false);
      });
  
      it("should return false for more than 12 digits", () => {
        expect(isValidAccountNumber("123456789012345")).toBe(false);
      });
  
      it("should return false for non-numeric values", () => {
        expect(isValidAccountNumber("12345abcde")).toBe(false);
      });
    });
  });
  