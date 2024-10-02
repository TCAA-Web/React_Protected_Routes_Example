import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./layout/MainLayout";
import { Signin } from "./pages/Signin";
import { Home } from "./pages/Home";
import { ProtectedRoute } from "./layout/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SingleBlog } from "./pages/SingleBlog";
import { UpdateBlog } from "./pages/UpdateBlog";

// Initializer en ny QueryClient
const queryClient = new QueryClient();

function App() {
  // State til at gemme user data fra serveren
  const [user, setUser] = useState();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route
                path="/signin"
                element={<Signin setUser={setUser} user={user} />}
              />
              <Route
                path={`single/:slug`}
                element={<SingleBlog user={user} />}
              />
              <Route element={<ProtectedRoute user={user} />}>
                <Route
                  path="/update/:slug"
                  element={<UpdateBlog user={user} />}
                />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
