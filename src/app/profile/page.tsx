"use client";

import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getData, postData } from "../../utils/api";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ToasterClient from "@/components/ToasterClient";
import { ArrowLeft, User, Mail, Shield } from "lucide-react";

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
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-black via-purple-900/20 to-black text-gray-100">
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg blur opacity-25 animate-pulse"></div>
          <p className="relative px-4 py-2">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black text-gray-100 flex items-center justify-center px-4 py-8">
      <ToasterClient />

      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1),transparent_50%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <form
        onSubmit={handleUpdate}
        className="relative w-full max-w-md space-y-6"
      >
        {/* Glass Card Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
        <div className="relative bg-gray-900/80 backdrop-blur-xl p-8 rounded-xl border border-cyan-500/20 shadow-2xl">
          <button
            onClick={() => router.push("/")}
            className="flex items-center text-sm text-cyan-400 hover:text-white transition-all duration-300 group mb-6"
          >
            <ArrowLeft className="mr-1 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Your Profile
          </h1>

          {/* Current Info Section */}
          <div className="space-y-4 mb-8 p-4 bg-gray-800/50 rounded-lg border border-cyan-500/10">
            <div className="flex items-center gap-3 text-gray-300">
              <User className="w-5 h-5 text-cyan-400" />
              <p>
                Name:{" "}
                <span className="font-semibold text-white">{initialName}</span>
              </p>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-cyan-400" />
              <p>
                Email:{" "}
                <span className="font-semibold text-white">{initialEmail}</span>
              </p>
            </div>
            {user?.role === "admin" && (
              <div className="flex items-center gap-3 text-gray-300">
                <Shield className="w-5 h-5 text-cyan-400" />
                <p>
                  Role:{" "}
                  <span className="font-semibold text-white capitalize">
                    {user.role}
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Edit Form */}
          <div className="space-y-6">
            <label className="block group">
              <span className="text-sm text-cyan-400 mb-2 block">
                Edit Name
              </span>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter New Name"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 outline-none"
                  required
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </label>

            <label className="block group">
              <span className="text-sm text-cyan-400 mb-2 block">
                Edit Email
              </span>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter New Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-800/50 rounded-lg border border-cyan-500/20 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all duration-300 outline-none"
                  required
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            </label>

            <button
              type="submit"
              className="relative w-full py-3 rounded-lg overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:from-cyan-600 group-hover:to-purple-600 transition-all duration-300"></span>
              <span className="relative z-10 text-white font-semibold">
                Save Changes
              </span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
