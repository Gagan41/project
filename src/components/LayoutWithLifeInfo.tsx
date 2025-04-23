"use client";

import { usePathname } from "next/navigation";
import LifeInfo from "./LifeInfo";

export default function LayoutWithLifeInfo() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return isHomePage ? <LifeInfo /> : null;
}
