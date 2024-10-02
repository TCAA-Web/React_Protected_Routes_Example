import React from "react";
import style from "./Navbar.module.scss";

export const Navbar = ({ children }) => {
  return <nav className={style.navbarStyle}>{children}</nav>;
};
