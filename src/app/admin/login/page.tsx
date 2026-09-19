"use client";

import { companyInfo } from "@/data/company";
import { ArrowRight, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      {/* Increased max-width to 480px and padding to p-12 */}
      <section className="w-full max-w-[480px] bg-white p-12 rounded-3xl shadow-2xl shadow-gray-200/60 border border-gray-100">
        {/* Header - Larger sizing */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl shadow-gray-900/10">
            <Image
              src="/Logo.png"
              alt={companyInfo.name}
              width={48}
              height={48}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-base text-gray-500 mt-2">
            Sign in to your Meera Enterprises admin panel
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-100 text-red-600 text-sm font-bold px-6 py-4 rounded-xl animate-in fade-in">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
              Email
            </label>
            <div className="relative group">
              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-400 group-focus-within:text-accent transition-colors"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                placeholder="admin@radiatech.in"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="relative group">
              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-400 group-focus-within:text-accent transition-colors"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 pl-12 pr-4 text-base font-medium focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-black text-white py-4 rounded-2xl text-base font-bold flex items-center justify-center gap-3 transition-all mt-8 shadow-lg shadow-gray-900/20 disabled:opacity-70 active:scale-[0.98] active:shadow-md cursor-pointer"
          >
            {loading ? "Authenticating..." : "Sign In"}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>
      </section>
    </main>
  );
}
