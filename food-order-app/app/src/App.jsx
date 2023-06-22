import { Route, Routes } from "react-router-dom";
import { UserContextProvider, UserContext } from "./context/UserContext";
import { useContext, useEffect } from "react";

import "./App.css";

import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import MenuAdministrationPage from "./pages/MenuAdministrationPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CreateMenuPage from "./pages/CreateMenuPage";
import CreateMealPage from "./pages/CreateMealPage";
import EditMeal from "./pages/EditMealPage";
import EditMenu from "./pages/EditMenuPage";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn, isAdmin, getLoggedIn } = useContext(UserContext);

  useEffect(() => {
    getLoggedIn();
  }, []);

  if (loggedIn === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/" element={loggedIn ? <Layout /> : <LoginPage />}>
        <>
          <Route index element={<IndexPage />} />
          <>
            <Route
              path="/MenuAdministrationPage"
              element={<MenuAdministrationPage />}
            />
            <Route path="/CreateMenuPage" element={<CreateMenuPage />} />
            <Route path="/CreateMealPage" element={<CreateMealPage />} />
            <Route path="/EditMealPage/:id" element={<EditMeal />} />
            <Route path="/EditMenuPage/:id" element={<EditMenu />} />
          </>
        </>
      </Route>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default function AppWrapper() {
  return (
    <UserContextProvider>
      <App />
    </UserContextProvider>
  );
}
