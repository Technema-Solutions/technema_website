"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Save, X } from "lucide-react";
import { toast } from "sonner";
import { updateStat } from "@/lib/actions/stats";

type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function StatListClient({ stats }: { stats: StatItem[] }) {
  const router = useRouter();
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    value: 0,
    suffix: "",
    label: "",
    icon: "",
  });
  const [loading, setLoading] = useState(false);

  const handleEdit = (item: StatItem) => {
    setEditId(item.id);
    setEditForm({
      value: item.value,
      suffix: item.suffix,
      label: item.label,
      icon: item.icon,
    });
  };

  const handleUpdate = async () => {
    if (!editId) return;
    setLoading(true);
    try {
      await updateStat(editId, editForm);
      toast.success("Statistik berhasil diperbarui");
      setEditId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui statistik");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Statistik</h1>
        <p className="text-sm text-gray-500">
          Edit statistik yang ditampilkan di homepage
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="rounded-lg border border-gray-200 bg-white p-6"
          >
            {editId === stat.id ? (
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Nilai
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={editForm.value}
                      onChange={(e) =>
                        setEditForm({
                          ...editForm,
                          value: parseFloat(e.target.value) || 0,
                        })
                      }
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">
                      Sufiks
                    </label>
                    <input
                      type="text"
                      value={editForm.suffix}
                      onChange={(e) =>
                        setEditForm({ ...editForm, suffix: e.target.value })
                      }
                      className={inputClass}
                      placeholder="+ atau %"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Label
                  </label>
                  <input
                    type="text"
                    value={editForm.label}
                    onChange={(e) =>
                      setEditForm({ ...editForm, label: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">
                    Ikon (Lucide)
                  </label>
                  <input
                    type="text"
                    value={editForm.icon}
                    onChange={(e) =>
                      setEditForm({ ...editForm, icon: e.target.value })
                    }
                    className={inputClass}
                  />
                </div>
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
              <div className="flex items-start justify-between">
                <div>
                  <div className="mb-1 text-3xl font-bold text-[#3D7EAA]">
                    {stat.value}
                    {stat.suffix}
                  </div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="mt-1 font-mono text-xs text-gray-400">
                    Ikon: {stat.icon}
                  </p>
                </div>
                <button
                  onClick={() => handleEdit(stat)}
                  className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        ))}
        {stats.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400">
            Belum ada data statistik
          </div>
        )}
      </div>
    </div>
  );
}
