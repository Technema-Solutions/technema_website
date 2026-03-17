"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Trash2, Mail, MailOpen, X } from "lucide-react";
import { toast } from "sonner";
import DataTable from "@/components/admin/ui/DataTable";
import Badge from "@/components/admin/ui/Badge";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import { markMessageRead, deleteMessage } from "@/lib/actions/contact";

type Message = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
};

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function PesanClient({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewId, setViewId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const viewMessage = messages.find((m) => m.id === viewId);

  const handleMarkRead = async (id: string) => {
    try {
      await markMessageRead(id);
      toast.success("Pesan ditandai sudah dibaca");
      router.refresh();
    } catch {
      toast.error("Gagal memperbarui status pesan");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setLoading(true);
    try {
      await deleteMessage(deleteId);
      toast.success("Pesan berhasil dihapus");
      setDeleteId(null);
      if (viewId === deleteId) setViewId(null);
      router.refresh();
    } catch {
      toast.error("Gagal menghapus pesan");
    }
    setLoading(false);
  };

  const handleView = async (item: Message) => {
    setViewId(item.id);
    if (!item.isRead) {
      await handleMarkRead(item.id);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pesan Masuk</h1>
        <p className="text-sm text-gray-500">
          {unreadCount > 0
            ? `${unreadCount} pesan belum dibaca dari total ${messages.length} pesan`
            : `Total ${messages.length} pesan`}
        </p>
      </div>

      {/* Message Detail Modal */}
      {viewMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {viewMessage.subject || "(Tanpa Subjek)"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Dari: {viewMessage.name} ({viewMessage.email})
                </p>
                {viewMessage.phone && (
                  <p className="text-sm text-gray-500">
                    Telepon: {viewMessage.phone}
                  </p>
                )}
                <p className="text-xs text-gray-400">
                  {formatDate(viewMessage.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setViewId(null)}
                className="rounded p-1.5 text-gray-400 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-4">
              <p className="whitespace-pre-wrap text-sm text-gray-700">
                {viewMessage.message}
              </p>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(viewMessage.id)}
                className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
              <button
                onClick={() => setViewId(null)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      <DataTable
        data={messages}
        searchKey="name"
        searchPlaceholder="Cari berdasarkan nama..."
        columns={[
          {
            key: "name",
            label: "Nama",
            sortable: true,
            render: (item) => (
              <div className="flex items-center gap-2">
                {!item.isRead && (
                  <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#3D7EAA]" />
                )}
                <span
                  className={
                    item.isRead
                      ? "text-gray-600"
                      : "font-semibold text-gray-900"
                  }
                >
                  {item.name}
                </span>
              </div>
            ),
          },
          {
            key: "email",
            label: "Email",
            render: (item) => (
              <span className="text-gray-500">{item.email}</span>
            ),
          },
          {
            key: "subject",
            label: "Subjek",
            render: (item) => (
              <span
                className={
                  item.isRead
                    ? "text-gray-500"
                    : "font-medium text-gray-900"
                }
              >
                {item.subject || "(Tanpa Subjek)"}
              </span>
            ),
          },
          {
            key: "createdAt",
            label: "Tanggal",
            sortable: true,
            render: (item) => (
              <span className="text-xs text-gray-400">
                {formatDate(item.createdAt)}
              </span>
            ),
          },
          {
            key: "isRead",
            label: "Status",
            render: (item) =>
              item.isRead ? (
                <Badge variant="default">Dibaca</Badge>
              ) : (
                <Badge variant="warning">Belum Dibaca</Badge>
              ),
          },
        ]}
        actions={(item) => (
          <div className="flex items-center justify-end gap-1">
            <button
              onClick={() => handleView(item)}
              className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              title="Lihat pesan"
            >
              <Eye className="h-4 w-4" />
            </button>
            {!item.isRead && (
              <button
                onClick={() => handleMarkRead(item.id)}
                className="rounded p-1.5 text-gray-400 hover:bg-gray-100 hover:text-[#3D7EAA]"
                title="Tandai sudah dibaca"
              >
                <MailOpen className="h-4 w-4" />
              </button>
            )}
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
        message="Yakin ingin menghapus pesan ini? Pesan yang sudah dihapus tidak dapat dikembalikan."
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={loading}
      />
    </div>
  );
}
