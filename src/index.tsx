import React from "react";
import ReactDOM from "react-dom";
import { theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);
