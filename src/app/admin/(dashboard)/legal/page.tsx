import Link from "next/link";
import { FileText, Pencil } from "lucide-react";
import { getLegalPages } from "@/lib/actions/legal";

export default async function LegalPagesAdmin() {
  const pages = await getLegalPages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Halaman Legal</h1>
        <p className="text-sm text-gray-500">
          Kelola konten Syarat &amp; Ketentuan dan Kebijakan Privasi
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <div
            key={page.id}
            className="rounded-xl border border-gray-200 bg-white p-6 flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
                <FileText className="h-5 w-5 text-[#3D7EAA]" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{page.title}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  /{page.slug} · Diperbarui{" "}
                  {new Date(page.updatedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
            <Link
              href={`/admin/legal/${page.id}`}
              className="flex items-center gap-2 rounded-lg bg-[#3D7EAA] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2D6890] shrink-0"
            >
              <Pencil className="h-4 w-4" />
              Edit
            </Link>
          </div>
        ))}

        {pages.length === 0 && (
          <div className="sm:col-span-2 text-center py-12 text-gray-400 text-sm">
            Belum ada halaman legal. Jalankan seed database untuk membuat halaman default.
          </div>
        )}
      </div>
    </div>
  );
}
