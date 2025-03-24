// src/pages/ReviewInfo.tsx
import React, { useCallback } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const ReviewInfo: React.FC = () => {
  const navigate = useNavigate();
  const { customer, resetCustomer } = useCustomer();
  const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [openBackDialog, setOpenBackDialog] = React.useState(false);

  const handleConfirm = useCallback(() => {
    setOpenConfirmDialog(true);
  }, []);

  const handleDialogConfirm = useCallback(() => {
    resetCustomer();
    navigate("/success");
  }, []);

  const handleCancel = useCallback(() => {
    setOpenCancelDialog(true);
  }, []);

  const confirmCancel = useCallback(() => {
    resetCustomer();
    navigate("/");
  }, []);

  const handleBack = useCallback(() => {
    setOpenBackDialog(true);
  }, []);

  const confirmBack = useCallback(() => {
    navigate("/upload-documents");
  }, []);

  const {
    firstName,
    lastName,
    citizenId,
    accountNumber,
    documentFile,
  } = customer;

  const isValid = firstName && lastName && citizenId && accountNumber && documentFile;

  if (!isValid) {
    return (
      <Container maxWidth="sm">
        <Box mt={10} textAlign="center">
          <Alert severity="error">
            Something Went Wrong!
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Button color="inherit" onClick={handleBack} sx={{ mb: 5 }}>
        <Typography color="#fff" variant="body1" sx={{ flexGrow: 1 }}>
          Back to Previous Page
        </Typography>
      </Button>
      <Container maxWidth="md">
        <Box mt={6}>
          <Paper elevation={3} sx={{ p: 7, borderRadius: 12 }}>
            <Typography variant="h3" gutterBottom>
              Review Information
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ color: "#757575" }}>
              <strong>Firstname:</strong> {firstName}
              <br />
              <strong>Lastname:</strong> {lastName}
              <br />
              <strong>Thai Citizen ID:</strong> {citizenId}
              <br />
              <strong>Account Number:</strong> {accountNumber}
              <br />
              <strong>Document File:</strong> {documentFile?.name || "None"}
            </Typography>

            <Stack spacing={2} mt={5}>
              <Button
                variant="contained"
                fullWidth
                onClick={handleConfirm}
                sx={{ backgroundColor: "#F7A552", borderRadius: "50px", height: "60px" }}
              >
                Confirm All Information
              </Button>
              <Button
                variant="outlined"
                fullWidth
                color="secondary"
                onClick={handleCancel}
                sx={{ borderRadius: "50px", height: "60px",  }}
              >
                Cancel
              </Button>
            </Stack>
          </Paper>
        </Box>

        <Dialog open={openConfirmDialog} onClose={() => setOpenConfirmDialog(false)}>
          <DialogTitle>Confirm Submission</DialogTitle>
          <DialogContent>
            <Typography>Are you sure you want to confirm and submit this information?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmDialog(false)} color="inherit">
              No
            </Button>
            <Button onClick={handleDialogConfirm} color="primary">
              Yes, Confirm
            </Button>
          </DialogActions>
        </Dialog>

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

        <Dialog open={openBackDialog} onClose={() => setOpenBackDialog(false)}>
          <DialogTitle>Confirm Go Back</DialogTitle>
          <DialogContent>
            <Typography>Do you want to go back and recheck the uploaded file?</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenBackDialog(false)} color="inherit">
              No
            </Button>
            <Button onClick={confirmBack} color="primary">
              Yes, Go Back
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ReviewInfo;
