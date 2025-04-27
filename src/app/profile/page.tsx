'use client';

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getData, postData } from "../../utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ToasterClient from "@/components/ToasterClient";
import { ArrowLeft } from 'lucide-react'

export default function ProfilePage() {
  const { token, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [initialName, setInitialName] = useState("");
  const [initialEmail, setInitialEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    async function fetchProfile() {
      try {
        const data = await getData("/api/user/profile", token || undefined);
        setName(data.name);
        setEmail(data.email);
        setInitialName(data.name);
        setInitialEmail(data.email);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("You are not logged in.");

    if (name === initialName && email === initialEmail) {
      return toast("No changes detected.", { icon: "⚠️" });
    }

    try {
      await postData("/api/user/profile", { name, email }, token || undefined);
      toast.success("Profile updated!");
      setInitialName(name);
      setInitialEmail(email);
      router.refresh();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-gray-100">
        <p>Loading…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center px-4 py-8">
      <ToasterClient />
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
      >
        <button
          onClick={() => router.push('/')}
          className="flex items-center text-sm text-purple-400 hover:text-white transition"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Home
        </button>
        <h1 className="text-2xl font-bold text-center">Your Profile</h1>

        <div className="text-sm text-gray-400">
          <p className="mb-1">Current Name: <span className="font-semibold text-white">{initialName}</span></p>
          <p className="mb-1">Current Email: <span className="font-semibold text-white">{initialEmail}</span></p>
          {/* 👇 Only show Role if it's ADMIN */}
          {user?.role === 'admin' && (
            <p className="mb-1">Role: <span className="font-semibold text-white capitalize">{user.role}</span></p>
          )}
        </div>

        <label className="block">
          <span className="text-sm text-gray-300">Edit Name</span>
          <input
            type="text"
            placeholder="Enter New Name"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 rounded focus:outline-purple-400"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-300">Edit Email</span>
          <input
            type="email"
            placeholder="Enter New Email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 bg-gray-700 rounded focus:outline-purple-400"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 rounded hover:bg-purple-700 transition text-white font-semibold"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
