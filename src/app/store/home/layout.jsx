"use client";
import pal from "../../../styles/principal.module.css";
import React from 'react'
import FooterView from '@/view/FooterView';
import NavbarView from "@/view/NavbarView";
import CardComponents from "@/components/CardComponents";

function layout({ children }) {
  
  return (
    <div className={pal.todo}>
      <NavbarView />
      <div style={{ marginTop: "4.3rem" }}>{children}</div>
      <CardComponents />
      <FooterView />
    </div>
  );
}

export default layout