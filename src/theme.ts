import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#F4F6F8",
    },
    primary: {
      main: "#005BAC", // ฟ้า ttb
    },
    secondary: {
      main: "#FF6F00", // ส้ม ttb
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
