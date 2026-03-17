"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X, Building2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import CollapseTransition from "@/components/admin/ui/CollapseTransition";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import { createClient, updateClient, deleteClient } from "@/lib/actions/clients";

type ClientItem = {
  id: string;
  name: string;
  icon: string;
  logo: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

const emptyForm = { name: "", icon: "", logo: "" };

export default function ClientListClient({
  clients,
}: {
  clients: ClientItem[];
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!addForm.name) {
      toast.error("Nama klien harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createClient({
        name: addForm.name,
        icon: addForm.icon,
        logo: addForm.logo || undefined,
      });
      toast.success("Klien berhasil ditambahkan");
      setAddForm(emptyForm);
      setShowAdd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan klien");
    }
    setLoading(false);
  };

  const handleEdit = (item: ClientItem) => {
    setEditId(item.id);
    setEditForm({ name: item.name, icon: item.icon, logo: item.logo || "" });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateClient(editId, {
        name: editForm.name,
        icon: editForm.icon,
        logo: editForm.logo || undefined,
      });
      toast.success("Klien berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui klien");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteClient(deleteId);
      toast.success("Klien berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus klien");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Klien</h1>
          <p className="text-sm text-gray-500">Kelola logo klien di homepage</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah Klien
        </button>
      </div>

      <CollapseTransition show={showAdd}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah Klien Baru</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nama klien"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Nama ikon (Lucide)"
              value={addForm.icon}
              onChange={(e) => setAddForm({ ...addForm, icon: e.target.value })}
              className={inputClass}
            />
            <div className="sm:col-span-2">
              <ImageUpload
                value={addForm.logo}
                onChange={(url) => setAddForm({ ...addForm, logo: url })}
                label="Upload logo klien (opsional)"
              />
            </div>
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => (
          <div
            key={client.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            {editId === client.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className={inputClass}
                  placeholder="Nama klien"
                />
                <input
                  type="text"
                  value={editForm.icon}
                  onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                  className={inputClass}
                  placeholder="Nama ikon (Lucide)"
                />
                <ImageUpload
                  value={editForm.logo}
                  onChange={(url) => setEditForm({ ...editForm, logo: url })}
                  label="Upload logo klien (opsional)"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleUpdate}
                    disabled={loading}
                    className="flex items-center gap-1 rounded-lg bg-[#3D7EAA] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
                  >
                    <Save className="h-3 w-3" />
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <X className="h-3 w-3" />
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Building2 className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{client.name}</p>
                    {client.icon && (
                      <p className="font-mono text-xs text-gray-400">{client.icon}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(client)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteId(client.id)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    title="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {clients.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400">
            Belum ada data klien
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus klien ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
