import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import BounceLoader from "react-spinners/BounceLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));
const override = {
  margin: "0 auto",
  marginTop: "25%",
};
root.render(
  <Provider store={store}>
    <PersistGate
      loading={
        <BounceLoader
          loading={true}
          color={"#ffffff"}
          cssOverride={override}
        ></BounceLoader>
      }
      persistor={persistor}
    >
      <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
