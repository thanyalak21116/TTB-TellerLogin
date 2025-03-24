import React, { useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const { resetCustomer } = useCustomer();

  useEffect(() => {
    resetCustomer();
  }, [resetCustomer]);

  return (
    <Container maxWidth="md">
      <Box mt={6}>
        <Paper elevation={3} sx={{ p: 7, borderRadius: 12, textAlign: "center" }}>
          <Typography variant="h3" gutterBottom>
            Success!
          </Typography>
          <Typography variant="h6" sx={{ color: "#757575", mt: 2 }}>
            Thank you for completing the process.
            <br />
            Your information has been successfully saved.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 5, backgroundColor: "#F7A552", borderRadius: "50px", height: "60px" }}
            onClick={() => navigate("/")}
          >
            Back to Homepage
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SuccessPage;