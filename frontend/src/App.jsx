import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./layout/ProtectedRoute";

function App() {
  const [user, setUser] = useState();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route
              path="/signin"
              element={<Signin setUser={setUser} user={user} />}
            />
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
