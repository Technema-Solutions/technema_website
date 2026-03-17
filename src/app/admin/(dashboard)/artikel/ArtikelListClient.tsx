"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import Badge from "@/components/admin/ui/Badge";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { toggleBlogPostPublish, deleteBlogPost } from "@/lib/actions/blog";

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  isPublished: boolean;
  publishedAt: Date | null;
  updatedAt: Date;
};

export default function ArtikelListClient({
  posts,
}: {
  posts: BlogPost[];
}) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    setLoading(true);
    try {
      await toggleBlogPostPublish(id, !currentStatus);
      toast.success(
        currentStatus ? "Artikel berhasil di-unpublish" : "Artikel berhasil dipublish"
      );
      router.refresh();
    } catch {
      toast.error("Gagal mengubah status artikel");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteBlogPost(deleteId);
      toast.success("Artikel berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus artikel");
    }
    setLoading(false);
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Artikel</h1>
          <p className="text-sm text-gray-500">Kelola artikel blog</p>
        </div>
        <Link
          href="/admin/artikel/baru"
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Artikel Baru
        </Link>
      </div>

      <DataTable
        data={posts}
        searchKey="title"
        searchPlaceholder="Cari artikel..."
        columns={[
          {
            key: "title",
            label: "Judul",
            sortable: true,
            render: (item) => (
              <span className="font-medium text-gray-900">
                {item.title.length > 60
                  ? item.title.slice(0, 60) + "..."
                  : item.title}
              </span>
            ),
          },
          {
            key: "category",
            label: "Kategori",
            sortable: true,
            render: (item) => (
              <span className="text-gray-600">{item.category}</span>
            ),
          },
          {
            key: "isPublished",
            label: "Status",
            render: (item) => (
              <Badge variant={item.isPublished ? "success" : "default"}>
                {item.isPublished ? "Published" : "Draft"}
              </Badge>
            ),
          },
          {
            key: "publishedAt",
            label: "Tanggal Publish",
            sortable: true,
            render: (item) => (
              <span className="text-gray-500">{formatDate(item.publishedAt)}</span>
            ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleTogglePublish(item.id, item.isPublished)}
              disabled={loading}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title={item.isPublished ? "Unpublish" : "Publish"}
            >
              {item.isPublished ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            <Link
              href={`/admin/artikel/${item.id}`}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Edit"
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setDeleteId(item.id)}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
              title="Hapus"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
