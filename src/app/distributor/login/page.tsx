"use client";

import { ArrowLeft, Eye, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function DistributorLoginPage() {
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
      const response = await fetch("/api/distributor/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (!response.ok) { setError(data.error || "Invalid credentials"); return; }
      router.push("/distributor/dashboard");
    } catch {
      setError("Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="overflow-hidden bg-white">
      <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
        <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Distributor <span className="mx-2 text-accent">›</span> Login</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Distributor <span className="text-accent">Login</span></h1>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/90">Access your distributor portal and stay connected with your business.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div className="page-hero-background relative hidden min-h-155 overflow-hidden lg:block">
            <div className="relative z-10 flex h-full flex-col justify-end p-8 text-white">
              <div className="max-w-sm">
                <h2 className="text-3xl font-extrabold">Your Partner Portal</h2>
                <p className="mt-3 text-sm leading-6 text-white/85">Login to access your dashboard and manage leads, orders and commission.</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center bg-gray-50 p-6 sm:p-10">
            <div className="w-full max-w-md border border-gray-200 bg-white p-6 sm:p-8">
              <div className="mb-5 flex items-center justify-between gap-4">
                <h2 className="text-3xl font-extrabold text-primary">Distributor <span className="text-accent">Portal</span></h2>
                <Link href="/distributor" className="hidden items-center gap-1 text-xs font-semibold text-primary hover:text-accent sm:inline-flex"><ArrowLeft size={14} /> Back</Link>
              </div>
              <p className="mt-2 text-sm text-slate-600">Login to access your dashboard and manage assigned inquiries.</p>

              {error && <p className="mt-5 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-1 block">Mobile / Email</span>
                  <div className="flex items-center rounded-md border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500">
                    <Mail size={16} className="mr-2 text-slate-400" />
                    <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Enter your email" />
                  </div>
                </label>

                <label className="block text-sm font-medium text-slate-700">
                  <span className="mb-1 block">Password</span>
                  <div className="flex items-center rounded-md border border-slate-300 bg-white px-3 py-2.5 focus-within:border-blue-500">
                    <Lock size={16} className="mr-2 text-slate-400" />
                    <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Enter your password" />
                    <Eye size={16} className="ml-2 text-slate-400" />
                  </div>
                </label>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <label className="inline-flex items-center gap-2"><input type="checkbox" className="h-4 w-4" /> Remember Me</label>
                  <span className="text-slate-400">Contact the owner to reset access</span>
                </div>

                <button type="submit" disabled={loading} className="w-full rounded-full bg-accent px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-dark disabled:opacity-60">
                  {loading ? "Signing in..." : "Login"}
                </button>

                <Link href="/distributor/application" className="mt-2 block w-full rounded-full border border-accent bg-white px-4 py-3 text-center text-sm font-bold text-accent transition hover:bg-orange-50">
                  New Distributor? Apply Here
                </Link>
              </form>
            </div>
          </div>
      </section>
    </main>
  );
}
