import React, { useEffect } from "react";
import Header from "./components/shared/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./Routes";
import { Provider } from "react-redux";
import { initStore } from "./store";
import { AuthProvider, useAuth } from "providers/AuthProvider";
import { MapProvider } from "providers/MapProvider";
import { ToastContainer } from "react-toastify";

const store = initStore();

const Providers = ({ children }) => (
  <Provider store={store}>
    <AuthProvider>
      <MapProvider apiKey="mt6Bm54nngplDPhfdnw2HrsbnqR6K7op">
        {children}
      </MapProvider>
    </AuthProvider>
  </Provider>
);

const BwmApp = () => {
  const authService = useAuth();
  useEffect(() => {
    authService.checkAuthState();
  }, [authService]);

  return (
    <Router>
      <Header logout={authService.signOut} />
      <Routes />
    </Router>
  );
};

// Explaining how everyhing works (:
const App = () => {
  return (
    <Providers>
      <ToastContainer />
      <BwmApp />
    </Providers>
  );
};

export default App;
