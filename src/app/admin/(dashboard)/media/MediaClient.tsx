"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2, Image as ImageIcon, FileText } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { deleteMedia } from "@/lib/actions/media";

type MediaItem = {
  id: string;
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  width: number | null;
  height: number | null;
  alt: string;
  createdAt: Date;
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function MediaClient({ media }: { media: MediaItem[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteMedia(deleteId);
      toast.success("File berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus file");
    }
    setLoading(false);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to API
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Upload gagal");
      }
      toast.success("File berhasil diupload");
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      router.refresh();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Gagal mengupload file");
    }
    setUploading(false);
  };

  const isImage = (mimeType: string) => mimeType.startsWith("image/");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Media</h1>
          <p className="text-sm text-gray-500">
            Kelola file media yang digunakan di website
          </p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Mengupload..." : "Upload File"}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Upload Preview */}
      {preview && (
        <div className="mb-6 rounded-lg border border-dashed border-gray-300 bg-white p-6">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            {uploading ? "Mengupload..." : "Preview Upload"}
          </h3>
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="h-32 w-32 rounded-lg border border-gray-200 object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                </div>
              )}
            </div>
            {!uploading && (
              <div className="flex-1">
                <button
                  onClick={() => {
                    setPreview(null);
                    if (fileInputRef.current) fileInputRef.current.value = "";
                  }}
                  className="mt-2 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Hapus Preview
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-white py-16">
          <ImageIcon className="mb-3 h-12 w-12 text-gray-300" />
          <p className="text-gray-400">Belum ada file media</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {media.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square bg-gray-50">
                {isImage(item.mimeType) ? (
                  <img
                    src={item.url}
                    alt={item.alt || item.filename}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <FileText className="h-12 w-12 text-gray-300" />
                  </div>
                )}
                {/* Delete overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                  <button
                    onClick={() => setDeleteId(item.id)}
                    className="rounded-full bg-white p-2 text-red-600 shadow-lg transition hover:bg-red-50"
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <p
                  className="truncate text-sm font-medium text-gray-900"
                  title={item.filename}
                >
                  {item.filename}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-400">
                  <span>{formatFileSize(item.size)}</span>
                  <span>·</span>
                  <span>{item.mimeType.split("/")[1]?.toUpperCase()}</span>
                </div>
                {item.width && item.height && (
                  <p className="mt-0.5 text-xs text-gray-400">
                    {item.width} x {item.height}
                  </p>
                )}
                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(item.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus file ini? File yang sudah dihapus tidak dapat dikembalikan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
