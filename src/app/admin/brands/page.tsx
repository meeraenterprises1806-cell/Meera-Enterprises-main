"use client";

import AdminShell from "@/components/admin/AdminShell";
import ImageUpload from "@/components/ImageUpload";
import { Edit3, Plus, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Brand = { id: string; name: string; image: string };
const emptyForm = { name: "", image: "" };

export default function AdminBrandsPage() {
  const router = useRouter();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadBrands() {
      try {
        const auth = await fetch("/api/auth/me");
        if (auth.status === 401) {
          router.replace("/admin/login");
          return;
        }

        const response = await fetch("/api/brands");
        const data = await response.json().catch(() => null) as Brand[] | { error?: string } | null;
        if (cancelled) return;
        if (!response.ok) {
          setError(data && !Array.isArray(data) ? data.error || "Unable to load brands." : "Unable to load brands.");
          return;
        }

        setBrands(Array.isArray(data) ? data : []);
        setError("");
      } catch {
        if (!cancelled) setError("Unable to load brands.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadBrands();
    return () => { cancelled = true; };
  }, [router]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (brand: Brand) => {
    setForm({ name: brand.name, image: brand.image });
    setEditId(brand.id);
    setShowForm(true);
    setError("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch(editId ? `/api/brands/${editId}` : "/api/brands", {
        method: editId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), image: form.image }),
      });
      const data = await response.json().catch(() => null) as Brand | { error?: string } | null;
      if (!response.ok) {
        setError(data && "error" in data ? data.error || "Unable to save brand." : "Unable to save brand.");
        return;
      }

      const brand = data as Brand;
      setBrands((current) => editId
        ? current.map((item) => item.id === brand.id ? brand : item)
        : [...current, brand]);
      resetForm();
    } catch {
      setError("Unable to save brand.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (brand: Brand) => {
    if (!confirm(`Delete ${brand.name}?`)) return;
    const response = await fetch(`/api/brands/${brand.id}`, { method: "DELETE" });
    if (response.ok) {
      setBrands((current) => current.filter((item) => item.id !== brand.id));
      if (editId === brand.id) resetForm();
      return;
    }
    const data = await response.json().catch(() => null) as { error?: string } | null;
    setError(data?.error || "Unable to delete brand.");
  };

  return (
    <AdminShell
      title="Brands"
      description="Manage the brand names and logos shown on the public Brands page."
      action={
        <button onClick={() => { setForm(emptyForm); setEditId(null); setShowForm(true); setError(""); }} className="inline-flex w-full items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark sm:w-auto">
          <Plus size={16} /> Add Brand
        </button>
      }
    >
      {error && <p className="mb-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      {showForm && (
        <section className="mb-6 border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">{editId ? "Edit Brand" : "New Brand"}</h2>
              <p className="text-sm text-slate-500">Add a brand name and its logo.</p>
            </div>
            <button type="button" onClick={resetForm} aria-label="Close brand form" className="text-slate-400 hover:text-slate-700"><X size={20} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Brand Name *</label>
              <input required maxLength={120} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="admin-input" />
            </div>
            <ImageUpload folder="brands" currentImage={form.image} onImageSelect={(image) => setForm({ ...form, image })} label="Brand Logo *" />
            <div className="flex flex-col gap-2 sm:col-span-2 sm:flex-row">
              <button type="submit" disabled={saving || !form.image} className="bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60">
                {saving ? "Saving..." : editId ? "Update Brand" : "Add Brand"}
              </button>
              <button type="button" onClick={resetForm} className="border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
            </div>
          </form>
        </section>
      )}

      {loading ? (
        <div className="h-48 animate-pulse border border-slate-200 bg-white" />
      ) : brands.length === 0 ? (
        <div className="border border-dashed border-slate-300 bg-white px-5 py-16 text-center text-sm text-slate-500">No brands yet.</div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <article key={brand.id} className="border border-slate-200 bg-white p-4 shadow-sm">
              <div className="relative mb-4 h-36 bg-slate-50">
                <Image src={brand.image} alt={brand.name} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" unoptimized className="object-contain p-4" />
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-4">
                <h2 className="font-semibold text-slate-950">{brand.name}</h2>
                <div className="flex shrink-0 gap-3">
                  <button onClick={() => handleEdit(brand)} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark"><Edit3 size={15} /> Edit</button>
                  <button onClick={() => void handleDelete(brand)} className="inline-flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700"><Trash2 size={15} /> Delete</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}