import React from "react";
import ReactDOM from "react-dom";
import { theme } from "./style/theme";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { Provider } from 'react-redux'
import { RecoilRoot } from "recoil";
import store from "./redux-store/store";

ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
        <Provider store={store}>
          <App />
          </Provider>
        </RecoilRoot>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
