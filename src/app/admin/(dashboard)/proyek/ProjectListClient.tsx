"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import CollapseTransition from "@/components/admin/ui/CollapseTransition";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import { createProject, updateProject, deleteProject } from "@/lib/actions/projects";

type Project = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

const emptyForm = { title: "", category: "", image: "", description: "" };

export default function ProjectListClient({
  projects,
}: {
  projects: Project[];
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!addForm.title || !addForm.category) {
      toast.error("Judul dan kategori harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createProject(addForm);
      toast.success("Proyek berhasil ditambahkan");
      setAddForm(emptyForm);
      setShowAdd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan proyek");
    }
    setLoading(false);
  };

  const handleEdit = (item: Project) => {
    setEditId(item.id);
    setEditForm({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
    });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateProject(editId, editForm);
      toast.success("Proyek berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui proyek");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteProject(deleteId);
      toast.success("Proyek berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus proyek");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proyek</h1>
          <p className="text-sm text-gray-500">Kelola portofolio proyek</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah Proyek
        </button>
      </div>

      <CollapseTransition show={showAdd}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah Proyek Baru</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Judul proyek"
              value={addForm.title}
              onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Kategori"
              value={addForm.category}
              onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
              className={inputClass}
            />
            <div className="sm:col-span-2">
              <ImageUpload
                value={addForm.image}
                onChange={(url) => setAddForm({ ...addForm, image: url })}
                label="Upload gambar proyek"
              />
            </div>
            <div className="sm:col-span-2">
              <textarea
                placeholder="Deskripsi proyek"
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                rows={3}
                className={inputClass}
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

      <CollapseTransition show={!!editId}>
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Edit Proyek</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Judul proyek"
              value={editForm.title}
              onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Kategori"
              value={editForm.category}
              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
              className={inputClass}
            />
            <div className="sm:col-span-2">
              <ImageUpload
                value={editForm.image}
                onChange={(url) => setEditForm({ ...editForm, image: url })}
                label="Upload gambar proyek"
              />
            </div>
            <div className="sm:col-span-2">
              <textarea
                placeholder="Deskripsi proyek"
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              Simpan
            </button>
            <button
              onClick={() => setEditId(null)}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>
          </div>
        </div>
      </CollapseTransition>

      <DataTable
        data={projects}
        searchKey="title"
        searchPlaceholder="Cari proyek..."
        columns={[
          { key: "title", label: "Judul", sortable: true },
          { key: "category", label: "Kategori" },
          {
            key: "image",
            label: "Gambar",
            render: (item) =>
              item.image ? (
                <div className="relative h-10 w-16 overflow-hidden rounded">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <span className="text-gray-400">-</span>
              ),
          },
          {
            key: "description",
            label: "Deskripsi",
            render: (item) => (
              <span className="text-gray-500">
                {item.description.length > 60
                  ? item.description.slice(0, 60) + "..."
                  : item.description}
              </span>
            ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
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
          </div>
        )}
      />

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus proyek ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
