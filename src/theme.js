import {createMuiTheme} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007d2d",
    },
    secondary: {
      main: "#D4AF37",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h5: {
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#555",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
        margin: "8px 0",
      },
    },
    MuiTextField: {
      root: {
        margin: "8px 0",
      },
    },
    MuiPaper: {
      root: {
        padding: "16px",
        marginTop: "16px",
        marginBottom: "16px",
      },
    },
  },
});

export default theme;
