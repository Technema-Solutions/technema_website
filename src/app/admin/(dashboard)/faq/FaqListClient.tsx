"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import CollapseTransition from "@/components/admin/ui/CollapseTransition";
import {
  createFaqItem,
  updateFaqItem,
  deleteFaqItem,
} from "@/lib/actions/faq";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

const emptyForm = { question: "", answer: "" };

export default function FaqListClient({
  faqItems,
}: {
  faqItems: FaqItem[];
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [addForm, setAddForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!addForm.question || !addForm.answer) {
      toast.error("Pertanyaan dan jawaban harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createFaqItem(addForm);
      toast.success("FAQ berhasil ditambahkan");
      setAddForm(emptyForm);
      setShowAdd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan FAQ");
    }
    setLoading(false);
  };

  const handleEdit = (item: FaqItem) => {
    setEditId(item.id);
    setEditForm({ question: item.question, answer: item.answer });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateFaqItem(editId, editForm);
      toast.success("FAQ berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui FAQ");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteFaqItem(deleteId);
      toast.success("FAQ berhasil dihapus");
      setDeleteId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus FAQ");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">FAQ</h1>
          <p className="text-sm text-gray-500">Kelola pertanyaan yang sering diajukan</p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          Tambah FAQ
        </button>
      </div>

      <CollapseTransition show={showAdd}>
        <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah FAQ Baru</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Pertanyaan"
              value={addForm.question}
              onChange={(e) => setAddForm({ ...addForm, question: e.target.value })}
              className={inputClass}
            />
            <textarea
              placeholder="Jawaban"
              value={addForm.answer}
              onChange={(e) => setAddForm({ ...addForm, answer: e.target.value })}
              rows={4}
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

      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <div
            key={item.id}
            className="rounded-lg border border-gray-200 bg-white"
          >
            {editId === item.id ? (
              <div className="p-4">
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editForm.question}
                    onChange={(e) =>
                      setEditForm({ ...editForm, question: e.target.value })
                    }
                    className={inputClass}
                    placeholder="Pertanyaan"
                  />
                  <textarea
                    value={editForm.answer}
                    onChange={(e) =>
                      setEditForm({ ...editForm, answer: e.target.value })
                    }
                    rows={4}
                    className={inputClass}
                    placeholder="Jawaban"
                  />
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
            ) : (
              <>
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={() =>
                      setExpandedId(expandedId === item.id ? null : item.id)
                    }
                    className="flex flex-1 items-center gap-3 text-left"
                  >
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#3D7EAA] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">
                      {item.question}
                    </span>
                    {expandedId === item.id ? (
                      <ChevronUp className="ml-auto h-4 w-4 flex-shrink-0 text-gray-400" />
                    ) : (
                      <ChevronDown className="ml-auto h-4 w-4 flex-shrink-0 text-gray-400" />
                    )}
                  </button>
                  <div className="ml-2 flex gap-1">
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
                </div>
                {expandedId === item.id && (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <p className="whitespace-pre-wrap text-sm text-gray-600">
                      {item.answer}
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
        {faqItems.length === 0 && (
          <div className="py-12 text-center text-gray-400">
            Belum ada data FAQ
          </div>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        message="Yakin ingin menghapus FAQ ini?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
