"use client";

import { FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface CertificateUploadProps {
  currentFile: string;
  onFileSelect: (url: string) => void;
}

export default function CertificateUpload({ currentFile, onFileSelect }: CertificateUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileName = currentFile.split("?")[0].split("/").pop() || "Uploaded certificate";

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "certifications");

      const response = await fetch("/api/upload", { method: "POST", body: formData });
      const result = (await response.json().catch(() => null)) as { url?: string; error?: string } | null;
      if (!response.ok || !result?.url) throw new Error(result?.error || "Upload failed.");
      onFileSelect(result.url);
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-slate-700">Certificate file *</span>
      {currentFile ? (
        <div className="flex items-center justify-between gap-3 border border-slate-200 bg-slate-50 p-3">
          <a href={currentFile} target="_blank" rel="noreferrer" className="flex min-w-0 items-center gap-2 text-sm font-medium text-primary hover:underline">
            <FileText size={18} className="shrink-0" />
            <span className="truncate">{fileName}</span>
          </a>
          <button type="button" onClick={() => onFileSelect("")} aria-label="Remove certificate file" className="shrink-0 p-1 text-slate-500 hover:text-red-600">
            <X size={18} />
          </button>
        </div>
      ) : (
        <div className="border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
          <Upload size={22} className="mx-auto mb-2 text-slate-500" />
          <button type="button" onClick={() => inputRef.current?.click()} disabled={uploading} className="text-sm font-semibold text-primary hover:text-primary-dark disabled:opacity-60">
            {uploading ? "Uploading..." : "Choose a certificate file"}
          </button>
          <p className="mt-1 text-xs text-slate-500">PDF, images, or Office documents. Maximum 15 MB.</p>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/jpeg,image/png,image/webp,image/gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleFileChange}
        disabled={uploading}
        className="hidden"
      />
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
    </div>
  );
}