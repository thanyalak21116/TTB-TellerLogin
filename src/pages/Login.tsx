import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Alert,
  Snackbar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  deleteUser,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "context/AuthContext";
import { isValidEmail } from "../utils/validation";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const checkMagicLink = async () => {
      const emailLink = window.location.href;

      if (isSignInWithEmailLink(auth, emailLink)) {
        let emailForLink = window.localStorage.getItem("emailForSignIn");

        try {
          const result = await signInWithEmailLink(auth, emailForLink || "", emailLink);
          const user = result.user;

          const creationTime = user.metadata.creationTime;
          const lastSignInTime = user.metadata.lastSignInTime;

          const isNewUser = creationTime === lastSignInTime;

          if (isNewUser) {
            await deleteUser(user);
            alert(
              "This email is not authorized to access the system. Please contact the administrator."
            );
            navigate("/login", { replace: true });

            return;
          }

          window.localStorage.removeItem("emailForSignIn");

          alert("Login Success!");
          navigate("/", { replace: true });

        } catch (error: any) {
          console.error("Login error:", error);
          setErrorMsg("Login failed!");
          setStatus("error");
        }
      }
    };

    checkMagicLink();
  }, [navigate]);

  const handleSendLink = useCallback(async () => {
    if (!email) return;

    const actionCodeSettings = {
      url: window.location.origin + "/login",
      handleCodeInApp: true,
    };

    try {
      setStatus("sending");

      await sendSignInLinkToEmail(auth, email, actionCodeSettings);

      window.localStorage.setItem("emailForSignIn", email);

      setStatus("sent");
      setOpenSnackbar(true);
    } catch (error: any) {
      console.error("Error sending link:", error);

      setErrorMsg(error.message || "Something Went Wrong!");
      setStatus("error");
      setOpenErrorSnackbar(true)
    }
  }, [email]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: "#ffffff",
        minHeight: "100vh",
        minWidth: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src="/images/login.jpg"
          alt="ttb login"
          sx={{
            width: "35vw",
            height: "auto",
            display: "block",
          }}
        />
        <Paper
          elevation={3}
          sx={{
            padding: 10,
            borderRadius: 12,
            minHeight: "70vh",
            minWidth: "30vw",
            height: "auto",
            display: "block",
            alignContent: "center",
            backgroundColor: "#5268F7",
          }}
        >
          <Typography align="center" variant="h2" gutterBottom sx={{ color: '#ffffff' }}>
            Teller Login
          </Typography>

          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              sx: {
                borderRadius: "50px",
                backgroundColor: "#fff",
              },
            }}
            sx={{ marginBottom: 3 }}
            error={email !== "" && !isValidEmail(email)}
            helperText={
              email !== "" && !isValidEmail(email)
                ? "Invalid email format."
                : " "
            }
          />

          <Button
            variant="contained"
            fullWidth
            onClick={handleSendLink}
            disabled={!email || !isValidEmail(email) || status === "sending"}
            sx={{ backgroundColor: "#F7A552", borderRadius: "50px", height: '50px' }}
          >
            {status === "sending" ? "Sending..." : "Send Email Link Login"}
          </Button>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              Email sent successfully!
            </Alert>
          </Snackbar>
          <Snackbar
            open={openErrorSnackbar}
            autoHideDuration={4000}
            onClose={() => setOpenErrorSnackbar(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error" sx={{ width: "100%" }}>
              {errorMsg}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;
