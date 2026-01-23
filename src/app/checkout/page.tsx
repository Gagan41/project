"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { postData } from "@/utils/api";

export default function CheckoutPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const [form, setForm] = useState({ name: "", address: "", phone: "" });

  if (!user) {
    router.push("/login");
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await postData("/api/checkout", {
      ...form,
      courseId: "COURSE_ID",
    });
    // redirect to payment gateway or show confirmation
    console.log(res);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
        className="w-full p-3 rounded bg-gray-800 text-gray-100"
      />
      <input
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        required
        className="w-full p-3 rounded bg-gray-800 text-gray-100"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="w-full p-3 rounded bg-gray-800 text-gray-100"
      />
      <button
        type="submit"
        className="w-full px-8 py-4 bg-yellow-400 text-black font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:bg-black hover:text-white hover:shadow-lg hover:shadow-gray-900/25"
      >
        Pay Now
      </button>
    </form>
  );
}
