"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function LayoutWithNavbar() {
  const pathname = usePathname();
  // Show navbar only on home page
  const isHomePage = pathname === "/";
  // Hide navbar on login-related pages
  const hideNavbar = ["/login", "/register", "/login-portal"].includes(
    pathname
  );

  return isHomePage && !hideNavbar ? <Navbar /> : null;
}
