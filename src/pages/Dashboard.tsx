import React, { useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleToCustomerInfo = useCallback(() => {
    navigate("/customer-info")
  }, [navigate]);

  return (
    <Box display='flex' height='75vh' alignItems='center'>
    <Box>
      <Typography variant="h5" sx={{ color: '#fff', marginBottom: 3 }}>
        Welcome {user?.email},
      </Typography>
      <Typography variant="h3" sx={{ color: '#fff', marginBottom: 15 }}>
        Teller Transaction Management System (TTMS)
      </Typography>
      <Button
        variant="outlined"
        onClick={handleToCustomerInfo}
        sx={{ height: '70px', border: '3px solid #F7A552' }}
      >
        <Typography variant="h6" sx={{ color: '#F7A552' }}>
          Customer Registration
        </Typography>
      </Button>
    </Box>
    </Box>
  );
};

export default DashboardPage;
