"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X, Star } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import CollapseTransition from "@/components/admin/ui/CollapseTransition";
import ImageUpload from "@/components/admin/ui/ImageUpload";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/lib/actions/testimonials";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

const emptyForm = {
  name: "",
  role: "",
  company: "",
  avatar: "",
  content: "",
  rating: 5,
};

export default function TestimonialListClient({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!addForm.name || !addForm.content) {
      toast.error("Nama dan konten harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createTestimonial(addForm);
      toast.success("Testimoni berhasil ditambahkan");
      setAddForm(emptyForm);
      setShowAdd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan testimoni");
    }
    setLoading(false);
  };

  const handleEdit = (item: Testimonial) => {
    setEditId(item.id);
    setEditForm({
      name: item.name,
      role: item.role,
      company: item.company,
      avatar: item.avatar,
      content: item.content,
      rating: item.rating,
    });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateTestimonial(editId, editForm);
      toast.success("Testimoni berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui testimoni");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteTestimonial(deleteId);
      toast.success("Testimoni berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus testimoni");
    }
    setLoading(false);
  };

  const renderStars = (rating: number) => (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Testimoni</h1>
          <p className="text-sm text-gray-500">Kelola testimoni klien</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah Testimoni
        </button>
      </div>

      <CollapseTransition show={showAdd}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah Testimoni Baru</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nama"
              value={addForm.name}
              onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Jabatan"
              value={addForm.role}
              onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Perusahaan"
              value={addForm.company}
              onChange={(e) => setAddForm({ ...addForm, company: e.target.value })}
              className={inputClass}
            />
            <ImageUpload
              value={addForm.avatar}
              onChange={(url) => setAddForm({ ...addForm, avatar: url })}
              label="Upload avatar"
            />
            <div className="sm:col-span-2">
              <textarea
                placeholder="Konten testimoni"
                value={addForm.content}
                onChange={(e) => setAddForm({ ...addForm, content: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
            <select
              value={addForm.rating}
              onChange={(e) => setAddForm({ ...addForm, rating: Number(e.target.value) })}
              className={inputClass}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Bintang
                </option>
              ))}
            </select>
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
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Edit Testimoni</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nama"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Jabatan"
              value={editForm.role}
              onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
              className={inputClass}
            />
            <input
              type="text"
              placeholder="Perusahaan"
              value={editForm.company}
              onChange={(e) => setEditForm({ ...editForm, company: e.target.value })}
              className={inputClass}
            />
            <ImageUpload
              value={editForm.avatar}
              onChange={(url) => setEditForm({ ...editForm, avatar: url })}
              label="Upload avatar"
            />
            <div className="sm:col-span-2">
              <textarea
                placeholder="Konten testimoni"
                value={editForm.content}
                onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                rows={3}
                className={inputClass}
              />
            </div>
            <select
              value={editForm.rating}
              onChange={(e) => setEditForm({ ...editForm, rating: Number(e.target.value) })}
              className={inputClass}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Bintang
                </option>
              ))}
            </select>
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
        data={testimonials}
        searchKey="name"
        searchPlaceholder="Cari testimoni..."
        columns={[
          { key: "name", label: "Nama", sortable: true },
          { key: "role", label: "Jabatan" },
          { key: "company", label: "Perusahaan" },
          {
            key: "rating",
            label: "Rating",
            render: (item) => renderStars(item.rating),
          },
          {
            key: "content",
            label: "Konten",
            render: (item) => (
              <span className="text-gray-500">
                {item.content.length > 60
                  ? item.content.slice(0, 60) + "..."
                  : item.content}
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
        message="Yakin ingin menghapus testimoni ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
