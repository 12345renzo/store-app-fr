"use client";
import NavbarAdminView from "@/view/NavbarAdminView";
import pal from "../../../styles/principal.module.css";
import React from "react";
import FooterView from "@/view/FooterView";
function layout({ children }) {
  return (
    <div className={pal.todo}>
      <NavbarAdminView/>
      <div style={{ marginTop: "4.3rem" }}>{children}</div>
      <FooterView/>
    </div>
  );
}

export default layout;
