"use client";

import { useState, useCallback, type ReactNode } from "react";
import { ChevronUp, ChevronDown, Pencil, Trash2, Plus, Save, X, Package } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

interface SubEntityEditorProps<T> {
  items: T[];
  onSave: (items: T[]) => Promise<void>;
  renderForm: (
    item: T,
    onChange: (field: string, value: unknown) => void
  ) => ReactNode;
  renderPreview: (item: T, index: number) => ReactNode;
  createEmpty: () => T;
  addLabel?: string;
  emptyLabel?: string;
}

export default function SubEntityEditor<T>({
  items: initialItems,
  onSave,
  renderForm,
  renderPreview,
  createEmpty,
  addLabel = "Tambah Item",
  emptyLabel = "Belum ada item",
}: SubEntityEditorProps<T>) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  const markDirty = useCallback(() => setDirty(true), []);

  function addItem() {
    const newItem = createEmpty();
    const newItems = [...items, newItem];
    setItems(newItems);
    setEditingIndex(newItems.length - 1);
    markDirty();
  }

  function updateItem(index: number, field: string, value: unknown) {
    setItems((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
    markDirty();
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
    setEditingIndex(null);
    setDeleteIndex(null);
    markDirty();
  }

  function moveItem(index: number, direction: -1 | 1) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= items.length) return;
    setItems((prev) => {
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
    if (editingIndex === index) setEditingIndex(newIndex);
    else if (editingIndex === newIndex) setEditingIndex(index);
    markDirty();
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onSave(items);
      setDirty(false);
      setEditingIndex(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3 sm:px-6">
        <p className="text-sm text-gray-500">{items.length} item</p>
        <button
          type="button"
          onClick={addItem}
          className="inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>

      {/* Items List */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
          <Package className="mb-3 h-10 w-10 text-gray-300" />
          <p className="text-sm text-gray-400">{emptyLabel}</p>
          <button
            type="button"
            onClick={addItem}
            className="mt-3 text-sm font-medium text-[#3D7EAA] hover:underline"
          >
            {addLabel}
          </button>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map((item, index) => (
            <div key={index} className="group">
              {/* Preview Row */}
              <div className="flex items-center gap-2 px-4 py-3 sm:px-6">
                {/* Reorder buttons */}
                <div className="flex flex-shrink-0 flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                    className="rounded p-0.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                    aria-label="Pindah ke atas"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === items.length - 1}
                    className="rounded p-0.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                    aria-label="Pindah ke bawah"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </div>

                {/* Preview */}
                <div className="min-w-0 flex-1">{renderPreview(item, index)}</div>

                {/* Action buttons */}
                <div className="flex flex-shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setEditingIndex(editingIndex === index ? null : index)
                    }
                    className="min-h-[44px] min-w-[44px] rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#3D7EAA]"
                    aria-label="Edit"
                  >
                    {editingIndex === index ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteIndex(index)}
                    className="min-h-[44px] min-w-[44px] rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label="Hapus"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Edit Form (collapsible) */}
              {editingIndex === index && (
                <div className="border-t border-dashed border-gray-200 bg-gray-50/50 px-4 py-4 sm:px-6">
                  <div className="space-y-4">
                    {renderForm(item, (field, value) =>
                      updateItem(index, field, value)
                    )}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setEditingIndex(null)}
                      className="min-h-[44px] rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                      Tutup
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Save Footer */}
      {items.length > 0 && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4 sm:px-6">
          {dirty && (
            <p className="text-xs text-amber-600">Ada perubahan belum disimpan</p>
          )}
          {!dirty && <span />}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !dirty}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#3D7EAA] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmDialog
        open={deleteIndex !== null}
        message="Item ini akan dihapus. Perubahan disimpan saat Anda klik Simpan Perubahan."
        onConfirm={() => deleteIndex !== null && removeItem(deleteIndex)}
        onCancel={() => setDeleteIndex(null)}
      />
    </div>
  );
}
