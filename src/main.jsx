import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="107802788162-3s8ugmlt66td56mn922j246prle7jegh.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router}></RouterProvider>
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>
);
