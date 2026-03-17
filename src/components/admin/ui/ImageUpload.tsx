"use client";

import { useState, useRef } from "react";
import { Upload, X, RefreshCw, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload gagal");
      }

      const data = await res.json();
      onChange(data.url);
      toast.success("Gambar berhasil diupload");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengupload gambar");
    }
    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {!value && !uploading && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-8 text-sm text-gray-500 transition hover:border-[#3D7EAA] hover:bg-gray-100"
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <span>{label || "Klik untuk upload gambar"}</span>
        </button>
      )}

      {uploading && (
        <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#3D7EAA] bg-blue-50 px-4 py-8">
          <Loader2 className="h-8 w-8 animate-spin text-[#3D7EAA]" />
          <span className="text-sm text-[#3D7EAA]">Mengupload...</span>
        </div>
      )}

      {value && !uploading && (
        <div className="relative inline-block">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-auto rounded-lg border border-gray-200 object-cover"
          />
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
            >
              <RefreshCw className="h-3 w-3" />
              Ganti
            </button>
            <button
              type="button"
              onClick={() => onChange("")}
              className="flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
            >
              <X className="h-3 w-3" />
              Hapus
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
