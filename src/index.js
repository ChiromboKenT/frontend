import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import "./index.css";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
