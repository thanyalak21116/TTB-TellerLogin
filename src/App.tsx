import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Container, Box, CircularProgress } from "@mui/material";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import UploadDocuments from "./pages/UploadDocuments";
import ReviewInfo from "./pages/ReviewInfo";
import SuccessPage from "pages/SuccessPage";
import { AuthProvider, useAuth } from "context/AuthContext";
import CustomerInfo from "./pages/CustomerInfo";
import ProtectedRoute from "routes/ProtectedRoute";
import DashboardPage from "pages/Dashboard";
import { CustomerProvider } from "./context/CustomerContext";

const AppContent: React.FC = () => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login"
  const { loading } = useAuth();

  if (loading) return <CircularProgress />;

  return (
    <>
      {hideNavbar ? (
        <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      ) : (
        <Box sx={{ backgroundColor: "#5268F7", minHeight: "100vh" }}>
          {!hideNavbar && <Navbar />}
          <Container sx={{ pt: 4, pb: 4 }}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute />
                }
              >
                <Route path="/" element={<DashboardPage />} />
                <Route path="/customer-info" element={<CustomerInfo />} />
                <Route path="/upload-documents" element={<UploadDocuments />} />
                <Route path="/review-info" element={<ReviewInfo />} />
                <Route path="/success" element={<SuccessPage />} />
              </Route>
            </Routes>
          </Container>
        </Box>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CustomerProvider>
        <AppContent />
      </CustomerProvider>
    </AuthProvider>
  );
};

export default App;
