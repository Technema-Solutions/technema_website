import { prisma } from "@/lib/prisma";
import {
  Package,
  FileText,
  FolderKanban,
  Users,
  MessageSquareQuote,
  Mail,
  Image,
  BarChart3,
} from "lucide-react";

async function getDashboardStats() {
  const [
    products,
    posts,
    projects,
    testimonials,
    clients,
    messages,
    unreadMessages,
    media,
  ] = await Promise.all([
    prisma.product.count(),
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.testimonial.count(),
    prisma.client.count(),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { isRead: false } }),
    prisma.mediaFile.count(),
  ]);

  return {
    products,
    posts,
    projects,
    testimonials,
    clients,
    messages,
    unreadMessages,
    media,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Produk",
      value: stats.products,
      icon: Package,
      href: "/admin/produk",
      color: "bg-blue-500",
    },
    {
      label: "Artikel",
      value: stats.posts,
      icon: FileText,
      href: "/admin/artikel",
      color: "bg-emerald-500",
    },
    {
      label: "Proyek",
      value: stats.projects,
      icon: FolderKanban,
      href: "/admin/proyek",
      color: "bg-purple-500",
    },
    {
      label: "Testimoni",
      value: stats.testimonials,
      icon: MessageSquareQuote,
      href: "/admin/testimoni",
      color: "bg-amber-500",
    },
    {
      label: "Klien",
      value: stats.clients,
      icon: Users,
      href: "/admin/klien",
      color: "bg-pink-500",
    },
    {
      label: "Media",
      value: stats.media,
      icon: Image,
      href: "/admin/media",
      color: "bg-cyan-500",
    },
    {
      label: "Pesan Masuk",
      value: stats.messages,
      icon: Mail,
      href: "/admin/pesan",
      color: "bg-red-500",
      badge: stats.unreadMessages > 0 ? stats.unreadMessages : undefined,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Ringkasan konten website Technema Solutions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <a
              key={card.label}
              href={card.href}
              className="group relative rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {card.label}
                  </p>
                  <p className="mt-1 text-3xl font-bold text-gray-900">
                    {card.value}
                  </p>
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${card.color}`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
              </div>
              {card.badge && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {card.badge}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}
