"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import CollapseTransition from "@/components/admin/ui/CollapseTransition";
import { createService, updateService, deleteService } from "@/lib/actions/services";

type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function ServiceListClient({
  services,
}: {
  services: Service[];
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState({ icon: "", title: "", description: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ icon: "", title: "", description: "" });
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!addForm.icon || !addForm.title || !addForm.description) {
      toast.error("Semua field harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createService(addForm);
      toast.success("Layanan berhasil ditambahkan");
      setAddForm({ icon: "", title: "", description: "" });
      setShowAdd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan layanan");
    }
    setLoading(false);
  };

  const handleEdit = (item: Service) => {
    setEditId(item.id);
    setEditForm({ icon: item.icon, title: item.title, description: item.description });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateService(editId, editForm);
      toast.success("Layanan berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui layanan");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteService(deleteId);
      toast.success("Layanan berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus layanan");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Layanan</h1>
          <p className="text-sm text-gray-500">Kelola layanan yang ditampilkan di homepage</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah Layanan
        </button>
      </div>

      <CollapseTransition show={showAdd}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah Layanan Baru</h3>
          <div className="grid gap-3 sm:grid-cols-3">
            <input
              type="text"
              placeholder="Nama ikon (Lucide)"
              value={addForm.icon}
              onChange={(e) => setAddForm({ ...addForm, icon: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Judul layanan"
              value={addForm.title}
              onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Deskripsi"
              value={addForm.description}
              onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
              className={inputClass}
            />
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleCreate}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Simpan
            </button>
            <button
              onClick={() => setShowAdd(false)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>
          </div>
        </div>
      </CollapseTransition>

      <DataTable
        data={services}
        searchKey="title"
        searchPlaceholder="Cari layanan..."
        columns={[
          {
            key: "icon",
            label: "Ikon",
            render: (item) =>
              editId === item.id ? (
                <input
                  type="text"
                  value={editForm.icon}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  className={inputClass}
                />
              ) : (
                <span className="font-mono text-xs text-gray-600">{item.icon}</span>
              ),
          },
          {
            key: "title",
            label: "Judul",
            sortable: true,
            render: (item) =>
              editId === item.id ? (
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className={inputClass}
                />
              ) : (
                <span className="font-medium text-gray-900">{item.title}</span>
              ),
          },
          {
            key: "description",
            label: "Deskripsi",
            render: (item) =>
              editId === item.id ? (
                <input
                  type="text"
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className={inputClass}
                />
              ) : (
                <span className="text-gray-500">
                  {item.description.length > 80
                    ? item.description.slice(0, 80) + "..."
                    : item.description}
                </span>
              ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            {editId === item.id ? (
              <>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="rounded p-1.5 text-green-600 hover:bg-green-50"
                  title="Simpan"
                >
                  <Save className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100"
                  title="Batal"
                >
                  <X className="h-4 w-4" />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeleteId(item.id)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  title="Hapus"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        )}
      />

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus layanan ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
