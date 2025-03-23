import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../context/CustomerContext";

const UploadDocuments: React.FC = () => {
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openBackDialog, setOpenBackDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const navigate = useNavigate();
  const { customer, setCustomer } = useCustomer();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setCustomer({ ...customer, documentFile: selectedFile });
  };

  const handleSubmit = () => {
    if (!customer.documentFile) {
      setOpenErrorDialog(true);
      setError("Please upload your identification document before proceeding.");
      return;
    }

    setOpenSuccessDialog(true);
  };

  const handleSuccessConfirm = () => {
    setOpenSuccessDialog(false);
    navigate("/review-info");
  };

  const handleCancel = () => {
    setOpenDialog(true);
  };

  const confirmCancel = () => {
    setCustomer({
      firstName: "",
      lastName: "",
      citizenId: "",
      accountNumber: "",
      documentFile: null,
    });
    navigate("/");
  };

  const handleBack = () => {
    setOpenBackDialog(true);
  };

  const confirmBack = () => {
    setCustomer({ ...customer, documentFile: null });
    navigate("/customer-info");
  };

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
              Upload Document
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, color: "#757575" }}>
              <strong>First Name:</strong> {customer.firstName}
              <br />
              <strong>Last Name:</strong> {customer.lastName}
              <br />
              <strong>Thai Citizen ID:</strong> {customer.citizenId || "-"}
              <br />
              <strong>Account Number:</strong> {customer.accountNumber || "-"}
            </Typography>

            <label htmlFor="document-upload">
              <Typography variant="h5" sx={{ mt: 6, mb: 1, fontWeight: 700 }}>
                Please upload your thai ID / passport *
              </Typography>
            </label>
            <Box>
              <input
                id="document-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                style={{ padding: "8px 0" }}
                required
              />
              {customer.documentFile && (
                <Typography sx={{ mt: 1, color: "#757575" }}>
                  Current file: <strong>{customer.documentFile.name}</strong>
                </Typography>
              )}
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              disabled={
                !customer.documentFile ||
                !customer.firstName ||
                !customer.lastName ||
                !customer.citizenId ||
                !customer.accountNumber
              }
              sx={{
                mt: 4,
                backgroundColor: "#F7A552",
                borderRadius: "50px",
                height: "60px",
              }}
            >
              Confirm
            </Button>
            <Button
              variant="outlined"
              fullWidth
              color="secondary"
              onClick={handleCancel}
              sx={{
                mt: 2,
                borderColor: "#F7A552",
                borderRadius: "50px",
                height: "60px",
              }}
            >
              Cancel
            </Button>
          </Paper>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Confirm Cancel</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to cancel and return to the homepage?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="inherit">
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
            <Typography>
              Do you want to go back? Your uploaded file will be cleared.
            </Typography>
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
        <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
          <DialogTitle>Upload Successful</DialogTitle>
          <DialogContent>
            <Typography>Your document has been uploaded successfully.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSuccessConfirm} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openErrorDialog} onClose={() => setOpenErrorDialog(false)}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <Typography>{error}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenErrorDialog(false)} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default UploadDocuments;
