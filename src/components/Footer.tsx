"use client";

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Only render footer on the home page (pathname === '/')
  if (pathname !== "/") {
    return null;
  }

  return (
    <footer className="py-6 text-center text-gray-500">
      © {new Date().getFullYear()} CourseSite. All rights reserved.
    </footer>
  );
}
