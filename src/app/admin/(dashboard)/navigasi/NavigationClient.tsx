"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import Badge from "@/components/admin/ui/Badge";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import {
  createNavigationLink,
  updateNavigationLink,
  deleteNavigationLink,
  createIndustry,
  updateIndustry,
  deleteIndustry,
} from "@/lib/actions/navigation";

type NavLink = {
  id: string;
  label: string;
  href: string;
  megaMenu: string | null;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type Industry = {
  id: string;
  name: string;
  icon: string;
  href: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function NavigationClient({
  navLinks,
  industries,
}: {
  navLinks: NavLink[];
  industries: Industry[];
}) {
  const router = useRouter();

  // Nav links state
  const [showAddNav, setShowAddNav] = useState(false);
  const [addNavForm, setAddNavForm] = useState({ label: "", href: "", megaMenu: "" });
  const [editNavId, setEditNavId] = useState<string | null>(null);
  const [editNavForm, setEditNavForm] = useState({ label: "", href: "", megaMenu: "" });
  const [deleteNavId, setDeleteNavId] = useState<string | null>(null);

  // Industries state
  const [showAddInd, setShowAddInd] = useState(false);
  const [addIndForm, setAddIndForm] = useState({ name: "", icon: "", href: "#industries" });
  const [editIndId, setEditIndId] = useState<string | null>(null);
  const [editIndForm, setEditIndForm] = useState({ name: "", icon: "", href: "" });
  const [deleteIndId, setDeleteIndId] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  // Nav link handlers
  const handleCreateNav = async () => {
    if (!addNavForm.label || !addNavForm.href) {
      toast.error("Label dan href harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createNavigationLink({
        label: addNavForm.label,
        href: addNavForm.href,
        megaMenu: addNavForm.megaMenu || undefined,
      });
      toast.success("Link navigasi berhasil ditambahkan");
      setAddNavForm({ label: "", href: "", megaMenu: "" });
      setShowAddNav(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan link navigasi");
    }
    setLoading(false);
  };

  const handleEditNav = (item: NavLink) => {
    setEditNavId(item.id);
    setEditNavForm({
      label: item.label,
      href: item.href,
      megaMenu: item.megaMenu || "",
    });
  };

  const handleUpdateNav = async () => {
    if (!editNavId) return;
    setLoading(true);
    try {
      await updateNavigationLink(editNavId, {
        label: editNavForm.label,
        href: editNavForm.href,
        megaMenu: editNavForm.megaMenu || null,
      });
      toast.success("Link navigasi berhasil diperbarui");
      setEditNavId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui link navigasi");
    }
    setLoading(false);
  };

  const handleDeleteNav = async () => {
    if (!deleteNavId) return;
    setLoading(true);
    try {
      await deleteNavigationLink(deleteNavId);
      toast.success("Link navigasi berhasil dihapus");
      setDeleteNavId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus link navigasi");
    }
    setLoading(false);
  };

  // Industry handlers
  const handleCreateInd = async () => {
    if (!addIndForm.name || !addIndForm.icon) {
      toast.error("Nama dan ikon harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createIndustry(addIndForm);
      toast.success("Industri berhasil ditambahkan");
      setAddIndForm({ name: "", icon: "", href: "#industries" });
      setShowAddInd(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan industri");
    }
    setLoading(false);
  };

  const handleEditInd = (item: Industry) => {
    setEditIndId(item.id);
    setEditIndForm({ name: item.name, icon: item.icon, href: item.href });
  };

  const handleUpdateInd = async () => {
    if (!editIndId) return;
    setLoading(true);
    try {
      await updateIndustry(editIndId, editIndForm);
      toast.success("Industri berhasil diperbarui");
      setEditIndId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui industri");
    }
    setLoading(false);
  };

  const handleDeleteInd = async () => {
    if (!deleteIndId) return;
    setLoading(true);
    try {
      await deleteIndustry(deleteIndId);
      toast.success("Industri berhasil dihapus");
      setDeleteIndId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus industri");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      {/* Navigation Links Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Navigasi</h1>
            <p className="text-sm text-gray-500">Kelola link navigasi utama</p>
          </div>
          <button
            onClick={() => setShowAddNav(!showAddNav)}
            className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
          >
            <Plus className="h-4 w-4" />
            Tambah Link
          </button>
        </div>

        {showAddNav && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah Link Baru</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Label"
                value={addNavForm.label}
                onChange={(e) => setAddNavForm({ ...addNavForm, label: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Href"
                value={addNavForm.href}
                onChange={(e) => setAddNavForm({ ...addNavForm, href: e.target.value })}
                className={inputClass}
              />
              <select
                value={addNavForm.megaMenu}
                onChange={(e) => setAddNavForm({ ...addNavForm, megaMenu: e.target.value })}
                className={inputClass}
              >
                <option value="">Tanpa Mega Menu</option>
                <option value="products">Products</option>
                <option value="industries">Industries</option>
              </select>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleCreateNav}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Simpan
              </button>
              <button
                onClick={() => setShowAddNav(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <DataTable
          data={navLinks}
          columns={[
            {
              key: "label",
              label: "Label",
              render: (item) =>
                editNavId === item.id ? (
                  <input
                    type="text"
                    value={editNavForm.label}
                    onChange={(e) => setEditNavForm({ ...editNavForm, label: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="font-medium text-gray-900">{item.label}</span>
                ),
            },
            {
              key: "href",
              label: "Href",
              render: (item) =>
                editNavId === item.id ? (
                  <input
                    type="text"
                    value={editNavForm.href}
                    onChange={(e) => setEditNavForm({ ...editNavForm, href: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="font-mono text-xs text-gray-500">{item.href}</span>
                ),
            },
            {
              key: "megaMenu",
              label: "Mega Menu",
              render: (item) =>
                editNavId === item.id ? (
                  <select
                    value={editNavForm.megaMenu}
                    onChange={(e) => setEditNavForm({ ...editNavForm, megaMenu: e.target.value })}
                    className={inputClass}
                  >
                    <option value="">Tanpa Mega Menu</option>
                    <option value="products">Products</option>
                    <option value="industries">Industries</option>
                  </select>
                ) : item.megaMenu ? (
                  <Badge>{item.megaMenu}</Badge>
                ) : (
                  <span className="text-gray-400">-</span>
                ),
            },
          ]}
          actions={(item) => (
            <div className="flex items-center justify-end gap-1">
              {editNavId === item.id ? (
                <>
                  <button
                    onClick={handleUpdateNav}
                    disabled={loading}
                    className="rounded p-1.5 text-green-600 hover:bg-green-50"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setEditNavId(null)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditNav(item)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteNavId(item.id)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          )}
        />
      </section>

      {/* Industries Section */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Industri</h2>
            <p className="text-sm text-gray-500">Kelola daftar industri di mega menu</p>
          </div>
          <button
            onClick={() => setShowAddInd(!showAddInd)}
            className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
          >
            <Plus className="h-4 w-4" />
            Tambah Industri
          </button>
        </div>

        {showAddInd && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
            <h3 className="mb-3 text-sm font-semibold text-gray-700">Tambah Industri Baru</h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Nama industri"
                value={addIndForm.name}
                onChange={(e) => setAddIndForm({ ...addIndForm, name: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Nama ikon (Lucide)"
                value={addIndForm.icon}
                onChange={(e) => setAddIndForm({ ...addIndForm, icon: e.target.value })}
                className={inputClass}
              />
              <input
                type="text"
                placeholder="Href"
                value={addIndForm.href}
                onChange={(e) => setAddIndForm({ ...addIndForm, href: e.target.value })}
                className={inputClass}
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleCreateInd}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Simpan
              </button>
              <button
                onClick={() => setShowAddInd(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <DataTable
          data={industries}
          searchKey="name"
          searchPlaceholder="Cari industri..."
          columns={[
            {
              key: "name",
              label: "Nama",
              sortable: true,
              render: (item) =>
                editIndId === item.id ? (
                  <input
                    type="text"
                    value={editIndForm.name}
                    onChange={(e) => setEditIndForm({ ...editIndForm, name: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="font-medium text-gray-900">{item.name}</span>
                ),
            },
            {
              key: "icon",
              label: "Ikon",
              render: (item) =>
                editIndId === item.id ? (
                  <input
                    type="text"
                    value={editIndForm.icon}
                    onChange={(e) => setEditIndForm({ ...editIndForm, icon: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="font-mono text-xs text-gray-500">{item.icon}</span>
                ),
            },
            {
              key: "href",
              label: "Href",
              render: (item) =>
                editIndId === item.id ? (
                  <input
                    type="text"
                    value={editIndForm.href}
                    onChange={(e) => setEditIndForm({ ...editIndForm, href: e.target.value })}
                    className={inputClass}
                  />
                ) : (
                  <span className="font-mono text-xs text-gray-500">{item.href}</span>
                ),
            },
          ]}
          actions={(item) => (
            <div className="flex items-center justify-end gap-1">
              {editIndId === item.id ? (
                <>
                  <button
                    onClick={handleUpdateInd}
                    disabled={loading}
                    className="rounded p-1.5 text-green-600 hover:bg-green-50"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setEditIndId(null)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEditInd(item)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteIndId(item.id)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>
          )}
        />
      </section>

      <ConfirmDialog
        open={deleteNavId !== null}
        message="Yakin ingin menghapus link navigasi ini?"
        onConfirm={handleDeleteNav}
        onCancel={() => setDeleteNavId(null)}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteIndId !== null}
        message="Yakin ingin menghapus industri ini?"
        onConfirm={handleDeleteInd}
        onCancel={() => setDeleteIndId(null)}
        loading={loading}
      />
    </div>
  );
}
