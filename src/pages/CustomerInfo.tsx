import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";
import { useForm } from "react-hook-form";
import {
  isValidCitizenId,
  isValidAccountNumber,
} from "../utils/validation";

interface CustomerFormData {
  firstName: string;
  lastName: string;
  citizenId: string;
  accountNumber: string;
}

const CustomerInfo: React.FC = () => {
  const navigate = useNavigate();
  const { customer, setCustomer } = useCustomer();
  const [openCancelDialog, setOpenCancelDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<CustomerFormData>({ mode: "onChange" });

  useEffect(() => {
    reset({
      firstName: customer.firstName,
      lastName: customer.lastName,
      citizenId: customer.citizenId,
      accountNumber: customer.accountNumber,
    });
  }, [customer, reset]);

  const onSubmit = useCallback((data: CustomerFormData) => {
    setCustomer({ ...customer, ...data });
    setOpenSuccessDialog(true);
  }, [customer, setCustomer]);

  const handleSuccessConfirm = useCallback(() => {
    setOpenSuccessDialog(false);
    navigate("/upload-documents");
  }, [navigate]);

  const handleCancel = useCallback(() => {
    setOpenCancelDialog(true);
  }, []);

  const confirmCancel = useCallback(() => {
    reset();
    setCustomer({
      firstName: "",
      lastName: "",
      citizenId: "",
      accountNumber: "",
    });
    navigate("/");
  }, [navigate, reset, setCustomer]);

  return (
    <Container maxWidth="md">
      <Box mt={6}>
        <Paper elevation={3} sx={{ p: 7, borderRadius: 12 }}>
          <Typography variant="h3" gutterBottom>
            Customer Information
          </Typography>

          <Divider sx={{ my: 3 }} />

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              fullWidth
              required
              label="Firstname"
              {...register("firstName", { required: "Please enter your first name." })}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
              sx={{ mt: 2 }}
              inputProps={{ maxLength: 140 }}
              InputProps={{
                sx: {
                  borderRadius: "50px",
                  backgroundColor: "#fff",
                  paddingX: 2,
                },
              }}
            />

            <TextField
              fullWidth
              required
              label="Lastname"
              {...register("lastName", { required: "Please enter your last name." })}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
              sx={{ mt: 3 }}
              inputProps={{ maxLength: 140 }}
              InputProps={{
                sx: {
                  borderRadius: "50px",
                  backgroundColor: "#fff",
                  paddingX: 2,
                },
              }}
            />

            <TextField
              fullWidth
              required
              label="Thai Citizen ID"
              {...register("citizenId", {
                required: "Please enter your Citizen ID.",
                validate: (value) =>
                  isValidCitizenId(value) || "Invalid Citizen ID (must be 13 digits).",
              })}
              error={!!errors.citizenId}
              helperText={errors.citizenId?.message}
              sx={{ mt: 3 }}
              inputProps={{ maxLength: 13 }}
              InputProps={{
                sx: {
                  borderRadius: "50px",
                  backgroundColor: "#fff",
                  paddingX: 2,
                },
              }}
            />

            <TextField
              fullWidth
              required
              label="Account Number"
              {...register("accountNumber", {
                required: "Please enter your account number.",
                validate: (value) =>
                  isValidAccountNumber(value) || "Account number must be 10–12 digits.",
              })}
              error={!!errors.accountNumber}
              helperText={errors.accountNumber?.message}
              sx={{ mt: 3 }}
              inputProps={{ maxLength: 12 }}
              InputProps={{
                sx: {
                  borderRadius: "50px",
                  backgroundColor: "#fff",
                  paddingX: 2,
                },
              }}
            />

            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ mt: 5, backgroundColor: "#F7A552", borderRadius: "50px", height: '60px' }}
              disabled={!isValid}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={handleCancel}
              sx={{ mt: 2, borderColor: "#F7A552", borderRadius: "50px", height: '60px' }}
            >
              Cancel
            </Button>
          </form>
        </Paper>
      </Box>
      <Dialog open={openCancelDialog} onClose={() => setOpenCancelDialog(false)}>
        <DialogTitle>Confirm Cancel</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to cancel and return to the homepage?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCancelDialog(false)} color="inherit">
            No
          </Button>
          <Button onClick={confirmCancel} color="error">
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
        <DialogTitle>Save Successful</DialogTitle>
        <DialogContent>
          <Typography>Customer information saved successfully.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSuccessConfirm} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CustomerInfo;