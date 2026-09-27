"use client";

import { Bell, ClipboardList, Eye, EyeOff, LayoutDashboard, LogOut, Menu, MessageCircle, Package, ShieldCheck, UserCircle, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  quantity: string;
  productName: string;
  product?: { name: string } | null;
  status: string;
  isRead: boolean;
  createdAt: string;
};

type Distributor = { id?: string; name: string; email: string; company: string; phone?: string; createdAt?: string };
type Order = { id: string; status: string; createdAt: string; inquiry: Inquiry };

const statusStyles: Record<string, string> = {
  new: "bg-emerald-50 text-emerald-700",
  accepted: "bg-blue-50 text-blue-700",
  "follow-up": "bg-violet-50 text-violet-700",
  converted: "bg-blue-50 text-blue-700",
  rejected: "bg-red-50 text-red-700",
};

function formatStatus(status: string) {
  return status.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function DistributorDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<Distributor | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [activeView, setActiveView] = useState<"dashboard" | "assigned" | "leads" | "orders" | "profile">("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionError, setActionError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);

  useEffect(() => {
    fetch("/api/distributor/me")
      .then(async (authResponse) => {
        if (!authResponse.ok) { router.replace("/distributor/login"); return null; }
        const authData = await authResponse.json();
        setUser(authData.user);
        return Promise.all([fetch("/api/distributor/inquiries"), fetch("/api/distributor/orders")]);
      })
      .then(async (responses) => {
        if (responses) {
          if (responses[0].ok) setInquiries(await responses[0].json());
          if (responses[1].ok) setOrders(await responses[1].json());
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [router]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    setActionError("");
    const response = await fetch("/api/distributor/inquiries", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const data = await response.json().catch(() => null) as { error?: string; order?: Order | null } | null;
    if (!response.ok) {
      setActionError(data?.error || "Unable to accept this lead. Please try again.");
      setUpdatingId(null);
      return;
    }
    setInquiries((current) => current.map((inquiry) => inquiry.id === id ? { ...inquiry, status, isRead: true } : inquiry));
    setSelected((current) => current?.id === id ? { ...current, status, isRead: true } : current);
    if (status === "accepted") {
      if (data?.order) setOrders((current) => [data.order as Order, ...current.filter((order) => order.id !== data.order?.id)]);
      setSelected(null);
      setActiveView("orders");
    }
    setUpdatingId(null);
  };

  const logout = async () => {
    await fetch("/api/distributor/logout", { method: "POST" });
    router.replace("/distributor/login");
  };

  const changePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordSaving(true);
    const response = await fetch("/api/distributor/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ currentPassword: passwordForm.currentPassword, newPassword: passwordForm.newPassword }) });
    const data = await response.json().catch(() => null) as { error?: string } | null;
    setPasswordSaving(false);
    if (!response.ok) {
      setPasswordError(data?.error || "Unable to change password.");
      return;
    }
    setPasswordMessage("Password changed successfully.");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  const newLeads = inquiries.filter((inquiry) => inquiry.status === "new").length;
  const activeLeads = inquiries.filter((inquiry) => inquiry.status === "follow-up").length;
  const sidebar = (
    <aside className="flex h-full flex-col bg-[#081f49] text-white">
      <div className="border-b border-white/10 px-5 py-5">
        <Link href="/distributor/dashboard" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center bg-white"><Image src="/Logo.png" alt="Meera Enterprises" width={36} height={28} className="h-7 w-9 object-contain" /></span>
          <span className="text-sm font-extrabold leading-tight">Meera<br /><span className="text-accent">Enterprises</span></span>
        </Link>
      </div>
      <div className="border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20"><UserCircle size={25} /></span><span className="min-w-0"><span className="block truncate text-sm font-bold">{user?.company || user?.name || "Sub-Dealer"}</span><span className="block text-[11px] text-white/60">Sub-Dealer</span></span></div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-6">
        <SideNavButton active={activeView === "dashboard"} onClick={() => setActiveView("dashboard")} icon={<LayoutDashboard size={17} />}>Dashboard</SideNavButton>
        <SideNavButton active={activeView === "assigned"} onClick={() => setActiveView("assigned")} icon={<ClipboardList size={17} />}>Assigned Leads</SideNavButton>
        <SideNavButton active={activeView === "leads"} onClick={() => setActiveView("leads")} icon={<Users size={17} />}>Leads</SideNavButton>
        <SideNavButton active={activeView === "orders"} onClick={() => setActiveView("orders")} icon={<Package size={17} />}>Orders</SideNavButton>
        <SideNavButton active={activeView === "profile"} onClick={() => setActiveView("profile")} icon={<UserCircle size={17} />}>Profile</SideNavButton>
        <button className="flex w-full items-center gap-3 px-3 py-3 text-sm text-white/75 hover:bg-white/10"><MessageCircle size={17} /> Support</button>
      </nav>
      <button onClick={logout} className="flex items-center gap-3 border-t border-white/10 px-5 py-5 text-sm text-white/75 hover:text-white"><LogOut size={17} /> Logout</button>
    </aside>
  );

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      {actionError && <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-8"><div className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{actionError}</div></div>}
      {selected && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4" onClick={() => setSelected(null)}><div className="w-full max-w-2xl bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}><div className="flex items-center justify-between border-b border-slate-100 px-6 py-4"><div><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Assigned Lead</p><h2 className="mt-1 text-xl font-extrabold text-slate-900">{selected.company || selected.name}</h2></div><button onClick={() => setSelected(null)} aria-label="Close"><X size={20} /></button></div><div className="grid gap-5 px-6 py-6 sm:grid-cols-2"><Info label="Contact" value={selected.name} /><Info label="Phone" value={selected.phone} /><Info label="Email" value={selected.email || "-"} /><Info label="Product" value={selected.product?.name || selected.productName || "General inquiry"} /><Info label="Quantity" value={selected.quantity || "-"} /><Info label="Received" value={new Date(selected.createdAt).toLocaleString("en-IN")} /></div><div className="border-t border-slate-100 px-6 py-5"><p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Requirement</p><p className="text-sm leading-6 text-slate-600">{selected.message || "No additional requirement provided."}</p></div><div className="flex flex-wrap gap-3 border-t border-slate-100 px-6 py-4">{selected.status === "new" && <button disabled={updatingId === selected.id} onClick={() => void updateStatus(selected.id, "accepted")} className="bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">{updatingId === selected.id ? "Accepting..." : "Accept Lead"}</button>}<button disabled={updatingId === selected.id} onClick={() => void updateStatus(selected.id, "follow-up")} className="bg-violet-600 px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60">Mark Follow-up</button><button disabled={updatingId === selected.id} onClick={() => void updateStatus(selected.id, "rejected")} className="border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 disabled:opacity-60">Reject Lead</button></div></div></div>}

      <div className="lg:grid lg:grid-cols-[280px_1fr]">
        <div className={`fixed inset-y-0 left-0 z-40 w-72 transform transition-transform lg:static lg:block lg:min-h-screen lg:w-auto lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>{sidebar}</div>
        {sidebarOpen && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-900/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}
        <section className="min-h-screen min-w-0 border-l border-slate-200">
          <header className="sticky top-0 z-30 flex min-h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-8"><div className="flex min-w-0 items-center gap-3"><button className="inline-flex h-10 w-10 items-center justify-center border border-slate-200 text-slate-700 hover:bg-slate-50 lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="min-w-0"><p className="truncate text-sm font-semibold text-slate-900">{activeView === "dashboard" ? `Welcome, ${user?.name || "Sub-Dealer"}` : formatStatus(activeView)}</p><p className="hidden truncate text-xs text-slate-500 sm:block">{user?.company || "Sub-Dealer management portal"}</p></div></div><div className="flex items-center gap-4"><Bell size={19} className="text-slate-500" /><span className="hidden max-w-52 truncate text-sm font-semibold text-slate-700 sm:block">{user?.company || user?.email}</span></div></header>
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-8 sm:py-8">
            {loading ? <div className="h-64 animate-pulse bg-white" /> : <>
              {activeView === "profile" && <ProfilePanel user={user} form={passwordForm} setForm={setPasswordForm} onSubmit={changePassword} saving={passwordSaving} message={passwordMessage} error={passwordError} />}
              {activeView === "dashboard" && <>
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4"><Stat label="New Leads" value={newLeads} color="text-blue-700" /><Stat label="Active Leads" value={activeLeads} color="text-emerald-600" /><Stat label="Orders" value={orders.length} color="text-violet-700" /><Stat label="Total Assigned" value={inquiries.length} color="text-accent" /></div>
                <LeadList title="Recent Assigned Leads" items={inquiries.slice(0, 10)} onSelect={setSelected} />
              </>}
              {activeView === "assigned" && <LeadList title="Assigned Leads" items={inquiries} onSelect={setSelected} />}
              {activeView === "leads" && <LeadList title="Current Leads" items={inquiries.filter((inquiry) => inquiry.status !== "accepted")} onSelect={setSelected} empty="No current leads. New inquiries transferred by the owner will appear here." />}
              {activeView === "orders" && <OrderList orders={orders} />}
            </>}
          </div>
        </section>
      </div>
    </main>
  );
}

function SideNavButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return <button onClick={onClick} className={`flex w-full items-center gap-3 px-3 py-3 text-sm font-semibold ${active ? "bg-blue-600 text-white" : "text-white/75 hover:bg-white/10"}`}>{icon}{children}</button>;
}

function LeadList({ title, items, onSelect, empty = "No assigned leads yet." }: { title: string; items: Inquiry[]; onSelect: (inquiry: Inquiry) => void; empty?: string }) {
  return <section className="mt-6 border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-extrabold text-slate-900">{title}</h2><span className="text-xs font-semibold text-blue-600">{items.length} total</span></div>{items.length === 0 ? <div className="px-5 py-16 text-center"><Users className="mx-auto text-slate-300" size={36} /><p className="mt-3 text-sm font-semibold text-slate-600">{empty}</p></div> : <div className="divide-y divide-slate-100">{items.map((inquiry) => <button key={inquiry.id} onClick={() => onSelect(inquiry)} className="grid w-full grid-cols-[1.1fr_1fr_1.2fr_auto] items-center gap-3 px-5 py-4 text-left text-xs transition hover:bg-slate-50"><span className="font-bold text-blue-800">#{inquiry.id.slice(-6).toUpperCase()}<span className="mt-1 block font-normal text-slate-500">{inquiry.company || inquiry.name}</span></span><span className="text-slate-600">{inquiry.phone}</span><span className="text-slate-600">{inquiry.product?.name || inquiry.productName || "General inquiry"}</span><span className={`px-2.5 py-1 text-[10px] font-bold ${statusStyles[inquiry.status] || statusStyles.new}`}>{formatStatus(inquiry.status)}</span></button>)}</div>}</section>;
}

function OrderList({ orders }: { orders: Order[] }) {
  return <section className="mt-6 border border-slate-200 bg-white"><div className="flex items-center justify-between border-b border-slate-100 px-5 py-4"><h2 className="text-sm font-extrabold text-slate-900">Orders</h2><span className="text-xs font-semibold text-blue-600">{orders.length} total</span></div>{orders.length === 0 ? <div className="px-5 py-16 text-center"><Package className="mx-auto text-slate-300" size={36} /><p className="mt-3 text-sm font-semibold text-slate-600">No accepted leads yet</p><p className="mt-1 text-xs text-slate-400">Accept a lead to create an order.</p></div> : <div className="divide-y divide-slate-100">{orders.map((order) => <div key={order.id} className="grid gap-3 px-5 py-4 text-xs sm:grid-cols-[1fr_1fr_1.2fr_auto] sm:items-center"><span className="font-bold text-blue-800">#{order.id.slice(-6).toUpperCase()}<span className="mt-1 block font-normal text-slate-500">{order.inquiry.company || order.inquiry.name}</span></span><span className="text-slate-600">{order.inquiry.phone}</span><span className="text-slate-600">{order.inquiry.product?.name || order.inquiry.productName || "General order"}</span><span className="bg-blue-50 px-2.5 py-1 text-center font-bold text-blue-700">{formatStatus(order.status)}</span></div>)}</div>}</section>;
}

function Stat({ label, value, color }: { label: string; value: number; color: string }) {
  return <div className="border border-slate-200 bg-white p-4"><p className="text-[11px] font-semibold text-slate-500">{label}</p><p className={`mt-2 text-2xl font-extrabold ${color}`}>{value.toString().padStart(2, "0")}</p></div>;
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{label}</p><p className="mt-1 text-sm font-semibold text-slate-800">{value}</p></div>;
}

function ProfilePanel({
  user,
  form,
  setForm,
  onSubmit,
  saving,
  message,
  error,
}: {
  user: Distributor | null;
  form: { currentPassword: string; newPassword: string; confirmPassword: string };
  setForm: (form: { currentPassword: string; newPassword: string; confirmPassword: string }) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  saving: boolean;
  message: string;
  error: string;
}) {
  return <div className="mx-auto max-w-5xl">
    <div className="mb-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Account Center</p><h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Sub-Dealer Profile</h1><p className="mt-2 text-sm text-slate-500">Manage your company information and portal security.</p></div>
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 bg-linear-to-r from-[#082c50] to-[#0d4d78] px-6 py-7 text-white"><div className="flex items-center gap-4"><div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15"><UserCircle size={32} /></div><div><p className="text-xs font-semibold uppercase tracking-wider text-white/65">Authorized Sub-Dealer</p><h2 className="mt-1 text-xl font-extrabold">{user?.company || "Company Profile"}</h2><p className="mt-1 text-sm text-white/75">{user?.name || "Sub-Dealer"}</p></div></div></div>
        <dl className="divide-y divide-slate-100 px-6">
          <ProfileRow label="Contact person" value={user?.name || "-"} />
          <ProfileRow label="Company" value={user?.company || "-"} />
          <ProfileRow label="Email" value={user?.email || "-"} />
          <ProfileRow label="Mobile" value={user?.phone || "-"} />
          <ProfileRow label="Account status" value="Active" accent />
        </dl>
      </section>
      <section className="border border-slate-200 bg-white p-6 shadow-sm"><div className="mb-5 flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center bg-orange-50 text-accent"><ShieldCheck size={21} /></div><div><h2 className="text-base font-extrabold text-slate-900">Change Password</h2><p className="text-xs text-slate-500">Use at least 8 characters.</p></div></div><form onSubmit={onSubmit} className="space-y-4"><PasswordField label="Current password" value={form.currentPassword} onChange={(value) => setForm({ ...form, currentPassword: value })} /><PasswordField label="New password" value={form.newPassword} onChange={(value) => setForm({ ...form, newPassword: value })} minLength={8} /><PasswordField label="Confirm new password" value={form.confirmPassword} onChange={(value) => setForm({ ...form, confirmPassword: value })} minLength={8} />{error && <p className="border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}{message && <p className="border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">{message}</p>}<button type="submit" disabled={saving} className="w-full bg-primary px-4 py-3 text-sm font-bold text-white transition hover:bg-primary-dark disabled:opacity-60">{saving ? "Updating..." : "Update Password"}</button></form></section>
    </div>
  </div>;
}

function ProfileRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="flex items-center justify-between gap-4 py-4"><dt className="text-sm text-slate-500">{label}</dt><dd className={`text-right text-sm font-semibold ${accent ? "text-emerald-600" : "text-slate-900"}`}>{value}</dd></div>;
}

function PasswordField({ label, value, onChange, minLength }: { label: string; value: string; onChange: (value: string) => void; minLength?: number }) {
  const [visible, setVisible] = useState(false);
  return <label className="block text-sm font-semibold text-slate-700">{label}<span className="relative mt-1 block"><input required minLength={minLength} type={visible ? "text" : "password"} value={value} onChange={(event) => onChange(event.target.value)} className="w-full border border-slate-200 px-3 py-2.5 pr-10 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15" /><button type="button" onClick={() => setVisible((current) => !current)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700" aria-label={visible ? "Hide password" : "Show password"}>{visible ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>;
}
