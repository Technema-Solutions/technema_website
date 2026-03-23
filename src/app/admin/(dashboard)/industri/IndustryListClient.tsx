"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import Badge from "@/components/admin/ui/Badge";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { toggleIndustryPagePublish, deleteIndustryPage } from "@/lib/actions/industry-pages";

type IndustryPageItem = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  isPublished: boolean;
  sortOrder: number;
  updatedAt: Date;
};

export default function IndustryListClient({
  pages,
}: {
  pages: IndustryPageItem[];
}) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTogglePublish = async (id: string, current: boolean) => {
    await toggleIndustryPagePublish(id, !current);
    toast.success(current ? "Industri di-unpublish" : "Industri dipublikasikan");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    await deleteIndustryPage(deleteId);
    toast.success("Industri dihapus");
    setDeleteId(null);
    setLoading(false);
    router.refresh();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Industri</h1>
          <p className="text-sm text-gray-500">Kelola halaman industri Technema</p>
        </div>
        <Link
          href="/admin/industri/baru"
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah Industri
        </Link>
      </div>

      <DataTable
        data={pages}
        searchKey="name"
        searchPlaceholder="Cari industri..."
        columns={[
          { key: "name", label: "Nama", sortable: true },
          { key: "slug", label: "Slug" },
          {
            key: "isPublished",
            label: "Status",
            render: (item) =>
              item.isPublished ? (
                <Badge variant="success">Published</Badge>
              ) : (
                <Badge variant="warning">Draft</Badge>
              ),
          },
          {
            key: "updatedAt",
            label: "Diperbarui",
            render: (item) =>
              new Date(item.updatedAt).toLocaleDateString("id-ID"),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleTogglePublish(item.id, item.isPublished)}
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
              href={`/admin/industri/${item.id}`}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <Edit className="h-4 w-4" />
            </Link>
            <button
              onClick={() => setDeleteId(item.id)}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        )}
      />

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus industri ini? Semua data terkait (tantangan, solusi, fitur, dll) juga akan dihapus."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
