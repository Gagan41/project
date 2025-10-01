// app/refund/page.tsx
"use client";

import RefundContent from "@/components/RefundContent";
import Link from "next/link";

export default function RefundPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="bg-gray-900 shadow-lg rounded-2xl p-8 border border-gray-700">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">
          Refund Policy
        </h1>
        <RefundContent />

        <div className="mt-8 flex justify-end">
          <Link
            href="/"
            className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-yellow-500 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
