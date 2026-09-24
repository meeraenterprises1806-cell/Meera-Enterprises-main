"use client";

import AdminShell from "@/components/admin/AdminShell";
import { FormEvent, useEffect, useState } from "react";

type Distributor = { id: string; name: string; email: string; company: string; phone: string };
type Application = {
  id: string; businessName: string; ownerName: string; mobile: string; email: string;
  gstNumber: string; panNumber: string; state: string; city: string; address: string;
  businessType: string; yearsInBusiness: string; brandFocus: string; documentsName: string;
  status: string; createdAt: string;
};
type Credentials = { email: string; password: string };

const statuses = ["pending", "hold", "approve", "reject"];
const statusStyles: Record<string, string> = {
  pending: "bg-amber-50 text-amber-700", hold: "bg-slate-100 text-slate-700",
  approve: "bg-emerald-50 text-emerald-700", reject: "bg-red-50 text-red-700",
};

export default function AdminDistributorsPage() {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [selected, setSelected] = useState<Application | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("pending");
  const [credentials, setCredentials] = useState<Credentials | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", phone: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/distributors").then((response) => response.ok ? response.json() : []).then(setDistributors).catch(() => setDistributors([]));
    fetch("/api/distributor/applications").then((response) => response.ok ? response.json() : []).then(setApplications).catch(() => setApplications([]));
  }, []);

  const createDistributor = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/admin/distributors", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await response.json();
    if (!response.ok) { setError(data.error || "Unable to create distributor."); return; }
    setDistributors((current) => [...current, data]);
    setForm({ name: "", email: "", password: "", company: "", phone: "" });
  };

  const openApplication = (application: Application) => {
    setSelected(application);
    setSelectedStatus(application.status);
    setError("");
  };

  const submitStatus = async () => {
    if (!selected) return;
    setSaving(true);
    setError("");
    const response = await fetch("/api/distributor/applications", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selected.id, status: selectedStatus }) });
    const data = await response.json().catch(() => null) as { error?: string; credentials?: Credentials; account?: Distributor } | null;
    setSaving(false);
    if (!response.ok) { setError(data?.error || "Unable to update application status."); return; }
    setApplications((current) => current.map((application) => application.id === selected.id ? { ...application, status: selectedStatus } : application));
    setSelected({ ...selected, status: selectedStatus });
    if (data?.account) setDistributors((current) => current.some((item) => item.id === data.account?.id) ? current : [...current, data.account as Distributor]);
    if (data?.credentials) setCredentials(data.credentials);
  };

  return (
    <>
      {selected && <ApplicationModal application={selected} status={selectedStatus} saving={saving} error={error} onStatusChange={setSelectedStatus} onSubmit={() => { void submitStatus(); }} onClose={() => setSelected(null)} />}
      {credentials && <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-950/65 px-4"><div className="w-full max-w-md bg-white p-6 shadow-2xl"><h2 className="text-xl font-extrabold text-primary">Distributor Login Created</h2><p className="mt-2 text-sm text-slate-600">Application approved and added to Active Distributors.</p><div className="mt-5 space-y-3 border border-emerald-200 bg-emerald-50 p-4"><Detail label="Login Email" value={credentials.email} /><Detail label="Password" value={credentials.password} /></div><p className="mt-4 text-xs text-slate-500">Share these credentials with the distributor.</p><button type="button" onClick={() => setCredentials(null)} className="mt-5 w-full bg-primary px-4 py-3 text-sm font-bold text-white">Done</button></div></div>}
      <AdminShell title="Distributors" description="Create distributor access and manage who receives assigned inquiries.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <form onSubmit={createDistributor} className="border border-slate-200 bg-white p-5 shadow-sm"><h2 className="text-lg font-bold text-slate-950">Create Distributor Login</h2><p className="mt-1 text-sm text-slate-500">Share these email and password credentials with the distributor.</p>{error && !selected && <p className="mt-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<div className="mt-5 space-y-3">{(["name", "company", "email", "phone", "password"] as const).map((field) => <input key={field} required={field === "name" || field === "email" || field === "password"} type={field === "password" ? "password" : field === "email" ? "email" : "text"} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} placeholder={field.charAt(0).toUpperCase() + field.slice(1)} className="w-full border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-primary" />)}</div><button className="mt-5 w-full bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-primary-dark">Create Login</button></form>
          <div className="border border-slate-200 bg-white shadow-sm"><div className="border-b border-slate-100 px-5 py-4"><h2 className="text-lg font-bold text-slate-950">Active Distributors</h2></div>{distributors.length === 0 ? <p className="p-5 text-sm text-slate-500">No distributor accounts created yet.</p> : <div className="divide-y divide-slate-100">{distributors.map((distributor) => <div key={distributor.id} className="flex items-center justify-between gap-4 px-5 py-4"><div><p className="font-semibold text-slate-900">{distributor.name}</p><p className="text-xs text-slate-500">{distributor.company || distributor.email}</p></div><span className="text-xs text-slate-500">{distributor.phone || "Active"}</span></div>)}</div>}</div>
        </div>
        <section className="mt-8 border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><div><h2 className="text-lg font-bold text-slate-950">Distributor Applications</h2><p className="mt-1 text-sm text-slate-500">Click an application to review its details and submit a status.</p></div><span className="text-xs font-semibold text-primary">{applications.length} submitted</span></div>{applications.length === 0 ? <p className="p-8 text-center text-sm text-slate-500">No distributor applications yet.</p> : <div className="divide-y divide-slate-100">{applications.map((application) => <button type="button" key={application.id} onClick={() => openApplication(application)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-slate-50"><span><span className="block font-semibold text-slate-900">{application.businessName}</span><span className="mt-1 block text-xs text-slate-500">{application.ownerName} · {application.city}, {application.state} · {application.mobile}</span></span><span className={`shrink-0 px-2.5 py-1 text-xs font-semibold ${statusStyles[application.status] || statusStyles.pending}`}>{application.status.charAt(0).toUpperCase() + application.status.slice(1)}</span></button>)}</div>}</section>
      </AdminShell>
    </>
  );
}

function ApplicationModal({ application, status, saving, error, onStatusChange, onSubmit, onClose }: { application: Application; status: string; saving: boolean; error: string; onStatusChange: (status: string) => void; onSubmit: () => void; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 px-4" onClick={onClose}><div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-start justify-between border-b border-slate-100 px-6 py-5"><div><p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Distributor Application</p><h2 className="mt-1 text-2xl font-extrabold text-slate-950">{application.businessName}</h2><p className="mt-1 text-sm text-slate-500">{application.ownerName} · Submitted {new Date(application.createdAt).toLocaleDateString("en-IN")}</p></div><button type="button" onClick={onClose} className="text-2xl text-slate-400 hover:text-slate-700" aria-label="Close application">×</button></div><div className="grid gap-5 px-6 py-6 text-sm sm:grid-cols-3"><Detail label="Email" value={application.email} /><Detail label="Mobile" value={application.mobile} /><Detail label="GST" value={application.gstNumber} /><Detail label="PAN" value={application.panNumber} /><Detail label="Business Type" value={application.businessType} /><Detail label="Years in Business" value={application.yearsInBusiness} /><Detail label="Brand Focus" value={application.brandFocus} /><Detail label="Documents" value={application.documentsName || "Uploaded"} /><div className="sm:col-span-2"><Detail label="Address" value={`${application.address}, ${application.city}, ${application.state}`} /></div></div><div className="border-t border-slate-100 bg-slate-50 px-6 py-5">{error && <p className="mb-3 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<label className="block text-sm font-bold text-slate-800">Application Status<select value={status} onChange={(event) => onStatusChange(event.target.value)} className="mt-2 w-full border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold outline-none focus:border-primary sm:max-w-xs">{statuses.map((item) => <option key={item} value={item}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>)}</select></label><button type="button" disabled={saving} onClick={onSubmit} className="mt-4 bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primary-dark disabled:opacity-60">{saving ? "Submitting..." : "Submit Status"}</button></div></div></div>;
}

function Detail({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 wrap-break-word font-medium text-slate-800">{value}</p></div>;
}
