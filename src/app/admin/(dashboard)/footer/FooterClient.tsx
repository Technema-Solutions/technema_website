"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import IconPicker from "@/components/admin/ui/IconPicker";
import {
  createFooterColumn,
  deleteFooterColumn,
  createFooterLink,
  updateFooterLink,
  deleteFooterLink,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "@/lib/actions/footer";

type FooterLink = {
  id: string;
  columnId: string;
  label: string;
  href: string;
  sortOrder: number;
};

type FooterColumn = {
  id: string;
  title: string;
  links: FooterLink[];
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

type SocialLink = {
  id: string;
  platform: string;
  href: string;
  icon: string;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]";

export default function FooterClient({
  columns,
  socialLinks,
}: {
  columns: FooterColumn[];
  socialLinks: SocialLink[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Column state
  const [showAddColumn, setShowAddColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [deleteColumnId, setDeleteColumnId] = useState<string | null>(null);

  // Link state
  const [addLinkColumnId, setAddLinkColumnId] = useState<string | null>(null);
  const [addLinkForm, setAddLinkForm] = useState({ label: "", href: "" });
  const [editLinkId, setEditLinkId] = useState<string | null>(null);
  const [editLinkForm, setEditLinkForm] = useState({ label: "", href: "" });
  const [deleteLinkId, setDeleteLinkId] = useState<string | null>(null);

  // Social state
  const [showAddSocial, setShowAddSocial] = useState(false);
  const [addSocialForm, setAddSocialForm] = useState({ platform: "", href: "", icon: "" });
  const [editSocialId, setEditSocialId] = useState<string | null>(null);
  const [editSocialForm, setEditSocialForm] = useState({ platform: "", href: "", icon: "" });
  const [deleteSocialId, setDeleteSocialId] = useState<string | null>(null);

  // Column handlers
  const handleCreateColumn = async () => {
    if (!newColumnTitle) {
      toast.error("Judul kolom harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createFooterColumn({ title: newColumnTitle });
      toast.success("Kolom footer berhasil ditambahkan");
      setNewColumnTitle("");
      setShowAddColumn(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan kolom");
    }
    setLoading(false);
  };

  const handleDeleteColumn = async () => {
    if (!deleteColumnId) return;
    setLoading(true);
    try {
      await deleteFooterColumn(deleteColumnId);
      toast.success("Kolom footer berhasil dihapus");
      setDeleteColumnId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus kolom");
    }
    setLoading(false);
  };

  // Link handlers
  const handleCreateLink = async (columnId: string) => {
    if (!addLinkForm.label || !addLinkForm.href) {
      toast.error("Label dan href harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createFooterLink({ columnId, ...addLinkForm });
      toast.success("Link berhasil ditambahkan");
      setAddLinkForm({ label: "", href: "" });
      setAddLinkColumnId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan link");
    }
    setLoading(false);
  };

  const handleUpdateLink = async () => {
    if (!editLinkId) return;
    setLoading(true);
    try {
      await updateFooterLink(editLinkId, editLinkForm);
      toast.success("Link berhasil diperbarui");
      setEditLinkId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui link");
    }
    setLoading(false);
  };

  const handleDeleteLink = async () => {
    if (!deleteLinkId) return;
    setLoading(true);
    try {
      await deleteFooterLink(deleteLinkId);
      toast.success("Link berhasil dihapus");
      setDeleteLinkId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus link");
    }
    setLoading(false);
  };

  // Social handlers
  const handleCreateSocial = async () => {
    if (!addSocialForm.platform || !addSocialForm.href || !addSocialForm.icon) {
      toast.error("Semua field harus diisi");
      return;
    }
    setLoading(true);
    try {
      await createSocialLink(addSocialForm);
      toast.success("Social link berhasil ditambahkan");
      setAddSocialForm({ platform: "", href: "", icon: "" });
      setShowAddSocial(false);
      router.refresh();
    } catch {
      toast.error("Gagal menambahkan social link");
    }
    setLoading(false);
  };

  const handleUpdateSocial = async () => {
    if (!editSocialId) return;
    setLoading(true);
    try {
      await updateSocialLink(editSocialId, editSocialForm);
      toast.success("Social link berhasil diperbarui");
      setEditSocialId(null);
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui social link");
    }
    setLoading(false);
  };

  const handleDeleteSocial = async () => {
    if (!deleteSocialId) return;
    setLoading(true);
    try {
      await deleteSocialLink(deleteSocialId);
      toast.success("Social link berhasil dihapus");
      setDeleteSocialId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus social link");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-10">
      {/* Footer Columns */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Footer</h1>
            <p className="text-sm text-gray-500">Kelola kolom dan link footer</p>
          </div>
          <button
            onClick={() => setShowAddColumn(!showAddColumn)}
            className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
          >
            <Plus className="h-4 w-4" />
            Tambah Kolom
          </button>
        </div>

        {showAddColumn && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Judul kolom"
                value={newColumnTitle}
                onChange={(e) => setNewColumnTitle(e.target.value)}
                className={inputClass}
              />
              <button
                onClick={handleCreateColumn}
                disabled={loading}
                className="flex-shrink-0 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
              >
                Simpan
              </button>
              <button
                onClick={() => setShowAddColumn(false)}
                className="flex-shrink-0 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          {columns.map((col) => (
            <div
              key={col.id}
              className="rounded-lg border border-gray-200 bg-white"
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <h3 className="font-semibold text-gray-900">{col.title}</h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      setAddLinkColumnId(col.id);
                      setAddLinkForm({ label: "", href: "" });
                    }}
                    className="rounded p-1.5 text-[#3D7EAA] hover:bg-blue-50"
                    title="Tambah link"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setDeleteColumnId(col.id)}
                    className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                    title="Hapus kolom"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {addLinkColumnId === col.id && (
                <div className="border-b border-gray-100 bg-gray-50 p-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Label"
                      value={addLinkForm.label}
                      onChange={(e) =>
                        setAddLinkForm({ ...addLinkForm, label: e.target.value })
                      }
                      className={inputClass}
                    />
                    <input
                      type="text"
                      placeholder="Href"
                      value={addLinkForm.href}
                      onChange={(e) =>
                        setAddLinkForm({ ...addLinkForm, href: e.target.value })
                      }
                      className={inputClass}
                    />
                    <button
                      onClick={() => handleCreateLink(col.id)}
                      disabled={loading}
                      className="flex-shrink-0 rounded-lg bg-[#3D7EAA] px-3 py-2 text-xs font-medium text-white hover:bg-[#2D6890] disabled:opacity-50"
                    >
                      <Save className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setAddLinkColumnId(null)}
                      className="flex-shrink-0 rounded-lg border border-gray-300 px-3 py-2 text-xs text-gray-500 hover:bg-gray-50"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}

              <div className="divide-y divide-gray-50">
                {col.links.map((link) => (
                  <div key={link.id} className="flex items-center justify-between px-4 py-2">
                    {editLinkId === link.id ? (
                      <div className="flex flex-1 gap-2">
                        <input
                          type="text"
                          value={editLinkForm.label}
                          onChange={(e) =>
                            setEditLinkForm({ ...editLinkForm, label: e.target.value })
                          }
                          className={inputClass}
                        />
                        <input
                          type="text"
                          value={editLinkForm.href}
                          onChange={(e) =>
                            setEditLinkForm({ ...editLinkForm, href: e.target.value })
                          }
                          className={inputClass}
                        />
                        <button
                          onClick={handleUpdateLink}
                          disabled={loading}
                          className="flex-shrink-0 rounded p-1 text-green-600 hover:bg-green-50"
                        >
                          <Save className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => setEditLinkId(null)}
                          className="flex-shrink-0 rounded p-1 text-gray-400 hover:bg-gray-100"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <span className="text-sm text-gray-700">{link.label}</span>
                          <span className="ml-2 font-mono text-xs text-gray-400">
                            {link.href}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              setEditLinkId(link.id);
                              setEditLinkForm({ label: link.label, href: link.href });
                            }}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          >
                            <Edit className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteLinkId(link.id)}
                            className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {col.links.length === 0 && (
                  <div className="px-4 py-3 text-center text-xs text-gray-400">
                    Belum ada link
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Social Links</h2>
            <p className="text-sm text-gray-500">Kelola link media sosial</p>
          </div>
          <button
            onClick={() => setShowAddSocial(!showAddSocial)}
            className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890]"
          >
            <Plus className="h-4 w-4" />
            Tambah Social
          </button>
        </div>

        {showAddSocial && (
          <div className="mb-4 rounded-lg border border-gray-200 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <input
                type="text"
                placeholder="Platform (Facebook, Twitter, dll)"
                value={addSocialForm.platform}
                onChange={(e) =>
                  setAddSocialForm({ ...addSocialForm, platform: e.target.value })
                }
                className={inputClass}
              />
              <input
                type="text"
                placeholder="URL"
                value={addSocialForm.href}
                onChange={(e) =>
                  setAddSocialForm({ ...addSocialForm, href: e.target.value })
                }
                className={inputClass}
              />
              <IconPicker
                value={addSocialForm.icon}
                onChange={(icon) => setAddSocialForm({ ...addSocialForm, icon })}
                placeholder="Pilih ikon"
              />
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={handleCreateSocial}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                Simpan
              </button>
              <button
                onClick={() => setShowAddSocial(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Batal
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left font-medium text-gray-600">Platform</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">URL</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Ikon</th>
                <th className="px-4 py-3 text-right font-medium text-gray-600">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {socialLinks.map((link) => (
                <tr key={link.id} className="border-b border-gray-100 last:border-0">
                  {editSocialId === link.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editSocialForm.platform}
                          onChange={(e) =>
                            setEditSocialForm({ ...editSocialForm, platform: e.target.value })
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={editSocialForm.href}
                          onChange={(e) =>
                            setEditSocialForm({ ...editSocialForm, href: e.target.value })
                          }
                          className={inputClass}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <IconPicker
                          value={editSocialForm.icon}
                          onChange={(icon) => setEditSocialForm({ ...editSocialForm, icon })}
                        />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={handleUpdateSocial}
                            disabled={loading}
                            className="rounded p-1.5 text-green-600 hover:bg-green-50"
                          >
                            <Save className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setEditSocialId(null)}
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3 font-medium text-gray-900">{link.platform}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{link.href}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{link.icon}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => {
                              setEditSocialId(link.id);
                              setEditSocialForm({
                                platform: link.platform,
                                href: link.href,
                                icon: link.icon,
                              });
                            }}
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => setDeleteSocialId(link.id)}
                            className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {socialLinks.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-gray-400">
                    Belum ada social link
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <ConfirmDialog
        open={deleteColumnId !== null}
        message="Yakin ingin menghapus kolom footer ini? Semua link di dalamnya juga akan dihapus."
        onConfirm={handleDeleteColumn}
        onCancel={() => setDeleteColumnId(null)}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteLinkId !== null}
        message="Yakin ingin menghapus link ini?"
        onConfirm={handleDeleteLink}
        onCancel={() => setDeleteLinkId(null)}
        loading={loading}
      />

      <ConfirmDialog
        open={deleteSocialId !== null}
        message="Yakin ingin menghapus social link ini?"
        onConfirm={handleDeleteSocial}
        onCancel={() => setDeleteSocialId(null)}
        loading={loading}
      />
    </div>
  );
}
