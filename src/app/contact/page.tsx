"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="h-screen w-screen bg-black text-white flex items-center justify-center overflow-hidden px-4">
      <div className="w-full max-w-lg bg-neutral-900 p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8 text-yellow-400 text-center">
          Contact Us
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-400">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base"
              required
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-2 text-sm font-medium text-yellow-400">
              Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm sm:text-base resize-none"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-lg shadow-md hover:bg-yellow-500 transition text-sm sm:text-base"
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>

          {/* Status message */}
          {status === "success" && (
            <p className="text-green-400 mt-3 text-center text-sm sm:text-base">
              ✅ Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="text-red-400 mt-3 text-center text-sm sm:text-base">
              ❌ Something went wrong. Try again.
            </p>
          )}
        </form>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link href="/" className="text-yellow-400 hover:underline font-medium text-sm sm:text-base">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
