"use client";

import { ArrowLeft, Clock3, Package, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];

export default function DistributorApplicationPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage("");
    setError("");
    try {
      const response = await fetch("/api/distributor/applications", { method: "POST", body: new FormData(event.currentTarget) });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error || "Unable to submit your application.");
        return;
      }
      setMessage("Application submitted successfully. Our team will contact you after review.");
      event.currentTarget.reset();
    } catch {
      setError("Unable to submit your application right now.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="overflow-hidden bg-white">
      <section className="page-hero-background relative min-h-44 overflow-hidden sm:min-h-52">
        <div className="relative mx-auto flex min-h-44 max-w-7xl items-center px-6 py-6 sm:min-h-52 sm:py-8">
          <div>
            <p className="mb-3 text-xs font-semibold text-white/80">Home <span className="mx-2 text-accent">›</span> Distributor <span className="mx-2 text-accent">›</span> Application</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Distributor <span className="text-accent">Application</span></h1>
            <p className="mt-3 max-w-lg text-sm font-medium leading-relaxed text-white/90">Share your business details and take the first step toward a trusted partnership.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.25fr_0.75fr] lg:py-16">
          <div>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl font-extrabold text-primary">Become a <span className="text-accent">Partner</span></h2>
                <div className="mt-3 h-1 w-12 bg-accent" />
              </div>
              <Link href="/distributor" className="hidden items-center gap-2 text-sm font-semibold text-primary transition hover:text-accent sm:inline-flex"><ArrowLeft size={16} /> Back</Link>
            </div>
            <p className="mt-5 text-sm leading-7 text-gray-600">Fill in the details below to become our authorized distributor.</p>

            <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-8 grid gap-4 md:grid-cols-2">
              {message && <p className="md:col-span-2 border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">{message}</p>}
              {error && <p className="md:col-span-2 border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</p>}
              <label className="text-sm font-medium text-slate-700">
                Business / Firm Name
                <input required name="businessName" minLength={2} autoComplete="organization" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Business / Firm Name" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Owner Name
                <input required name="ownerName" minLength={2} autoComplete="name" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Owner Name" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Mobile Number
                <input required name="mobile" type="tel" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} title="Enter a valid 10-digit Indian mobile number" autoComplete="tel" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="10-digit mobile number" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Email Address
                <input required name="email" type="email" pattern="[a-zA-Z0-9._%+-]+@gmail\.com" title="Enter a valid Gmail address" autoComplete="email" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="yourname@gmail.com" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                GST Number
                <input required name="gstNumber" minLength={15} maxLength={15} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase outline-none focus:border-blue-500" placeholder="GST Number" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                PAN Number
                <input required name="panNumber" minLength={10} maxLength={10} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm uppercase outline-none focus:border-blue-500" placeholder="PAN Number" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                State
                <select required name="state" defaultValue="" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option value="" disabled>Select State</option>
                  {indianStates.map((state) => <option key={state} value={state}>{state}</option>)}
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                City
                <input required name="city" minLength={2} autoComplete="address-level2" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="City" />
              </label>
              <label className="text-sm font-medium text-slate-700 md:col-span-2">
                Complete Address
                <textarea required name="address" minLength={10} autoComplete="street-address" className="mt-1 min-h-24 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Complete Address" />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Business Type
                <select required name="businessType" defaultValue="" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option value="" disabled>Select Business Type</option>
                  <option>Retailer</option><option>Wholesaler</option><option>Distributor</option><option>Dealer</option><option>Contractor</option>
                </select>
              </label>
              <label className="text-sm font-medium text-slate-700">
                Years in Business
                <select required name="yearsInBusiness" defaultValue="" className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500">
                  <option value="" disabled>Select</option>
                  <option>Less than 1 year</option><option>1-3 years</option><option>4-10 years</option><option>More than 10 years</option>
                </select>
              </label>
             
              <label className="text-sm font-medium text-slate-700">
                Brand Focus
                <input required name="brandFocus" minLength={2} className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-blue-500" placeholder="Preferred brand" />
              </label>
              
             
              <label className="text-sm font-medium text-slate-700 md:col-span-2">
                Upload Documents
                <input required name="documents" type="file" accept=".pdf,.jpg,.jpeg,.png" className="mt-1 block w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm text-slate-600 outline-none focus:border-blue-500" />
              </label>
              <button type="submit" disabled={submitting} className="mt-2 w-full rounded-full bg-accent px-4 py-3 text-sm font-bold text-white transition hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2">
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>

          </div>

          <aside className="space-y-4">
            <div className="border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-accent"><Package size={18} /></div>
                <div className="text-sm font-bold text-primary">1. Submit Application</div>
              </div>
              <p className="text-xs leading-5 text-slate-600">Fill in your details and upload required documents.</p>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-accent"><Clock3 size={18} /></div>
                <div className="text-sm font-bold text-primary">2. Under Review</div>
              </div>
              <p className="text-xs leading-5 text-slate-600">Our team will review your information and get back to you.</p>
            </div>

            <div className="border border-gray-200 bg-gray-50 p-5">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-accent"><ShieldCheck size={18} /></div>
                <div className="text-sm font-bold text-primary">3. Approval</div>
              </div>
              <p className="text-xs leading-5 text-slate-600">Once approved, your distributorship is activated.</p>
            </div>
          </aside>
      </section>
    </main>
  );
}
