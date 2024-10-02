import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";

export const MainLayout = () => {
  // Layout fil med Navbar i toppen
  return (
    <div>
      <Navbar>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/signin">Sign in</NavLink>
      </Navbar>
      <Outlet />
    </div>
  );
};
