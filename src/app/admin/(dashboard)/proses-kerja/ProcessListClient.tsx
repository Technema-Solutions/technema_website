"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import CollapseTransition from "@/components/admin/ui/CollapseTransition";
import IconPicker from "@/components/admin/ui/IconPicker";
import {
  createProcessStep,
  updateProcessStep,
  deleteProcessStep,
} from "@/lib/actions/workingProcess";

type ProcessStep = {
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

const emptyForm = { icon: "", title: "", description: "" };

export default function ProcessListClient({
  steps,
}: {
  steps: ProcessStep[];
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!addForm.icon || !addForm.title || !addForm.description) {
      toast.error("Semua field harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createProcessStep(addForm);
      toast.success("Langkah berhasil ditambahkan");
      setAddForm(emptyForm);
      setShowAdd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan langkah");
    }
    setLoading(false);
  };

  const handleEdit = (item: ProcessStep) => {
    setEditId(item.id);
    setEditForm({
      icon: item.icon,
      title: item.title,
      description: item.description,
    });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateProcessStep(editId, editForm);
      toast.success("Langkah berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui langkah");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteProcessStep(deleteId);
      toast.success("Langkah berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus langkah");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Proses Kerja</h1>
          <p className="text-sm text-gray-500">
            Kelola langkah-langkah proses kerja
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah Langkah
        </button>
      </div>

      <CollapseTransition show={showAdd}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">
            Tambah Langkah Baru
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <IconPicker
              value={addForm.icon}
              onChange={(icon) => setAddForm({ ...addForm, icon })}
              placeholder="Pilih ikon"
            />
            <input
              type="text"
              placeholder="Judul langkah"
              value={addForm.title}
              onChange={(e) =>
                setAddForm({ ...addForm, title: e.target.value })
              }
              className={inputClass}
            />
            <div className="sm:col-span-2">
              <textarea
                placeholder="Deskripsi"
                value={addForm.description}
                onChange={(e) =>
                  setAddForm({ ...addForm, description: e.target.value })
                }
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

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className="rounded-lg border border-gray-200 bg-white p-4"
          >
            {editId === step.id ? (
              <div className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <IconPicker
                    value={editForm.icon}
                    onChange={(icon) => setEditForm({ ...editForm, icon })}
                  />
                  <input
                    type="text"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm({ ...editForm, title: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Judul langkah"
                  />
                </div>
                <textarea
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  rows={3}
                  className={inputClass}
                  placeholder="Deskripsi"
                />
                <div className="flex gap-2">
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
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                  >
                    <X className="h-4 w-4" />
                    Batal
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#3D7EAA] text-sm font-bold text-white">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {step.title}
                      </h3>
                      <p className="font-mono text-xs text-gray-400">
                        {step.icon}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(step)}
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(step.id)}
                        className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {step.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
        {steps.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            Belum ada data proses kerja
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus langkah ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
