import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { industries } from "../src/data/industries";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ── Admin User ──
  const passwordHash = await hash("admin123", 12);
  await prisma.user.upsert({
    where: { email: "admin@technema.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@technema.com",
      passwordHash,
      role: "admin",
    },
  });
  console.log("✅ Admin user created (admin@technema.com / admin123)");

  // ── Site Settings ──
  await prisma.siteSettings.upsert({
    where: { id: "default" },
    update: {},
    create: {
      id: "default",
      siteName: "Technema Solutions",
      siteDescription:
        "Technema Solutions adalah perusahaan layanan TI terdepan yang menyediakan solusi teknologi inovatif untuk bisnis modern.",
      siteUrl: "https://technema.com",
      logo: "/logo_technema.svg",
      contactPhone: "+1 (800) 843-5466",
      contactEmail: "info@technema.com",
      contactAddress:
        "Jl. Teknologi No. 42, Jakarta Selatan, DKI Jakarta 12870",
      contactMapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2!2d106.82!3d-6.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTUnMzYuMCJTIDEwNsKwNDknMTIuMCJF!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
      heroHeading: "Solusi Teknologi Untuk Bisnis Yang Siap",
      heroSubheading:
        "Technema Solutions menghadirkan layanan TI terdepan yang dirancang khusus untuk membantu bisnis Anda bertransformasi, berinovasi, dan unggul di era digital.",
      heroTypingWords: ["Berkembang", "Bertumbuh"],
    },
  });
  console.log("✅ Site settings created");

  // ── Services ──
  const servicesData = [
    {
      icon: "AppWindow",
      title: "Aplikasi Web/Mobile",
      description:
        "Kami membangun aplikasi web dan mobile yang responsif, cepat, dan mudah digunakan untuk mendukung operasional bisnis Anda secara digital.",
    },
    {
      icon: "BrainCircuit",
      title: "Integrasi Kecerdasan Buatan (AI)",
      description:
        "Manfaatkan teknologi AI untuk mengotomasi proses, menganalisis data, dan mengambil keputusan bisnis yang lebih cerdas dan akurat.",
    },
    {
      icon: "LayoutDashboard",
      title: "ERP Odoo",
      description:
        "Kelola seluruh proses bisnis Anda dalam satu aplikasi terintegrasi mulai dari inventaris, keuangan, hingga SDM dengan Aplikasi ERP Odoo.",
    },
    {
      icon: "DatabaseZap",
      title: "Data Integrasi",
      description:
        "Hubungkan dan sinkronkan data dari berbagai sistem secara otomatis dari Synchro, agar informasi bisnis Anda selalu terpusat, akurat, dan real-time.",
    },
    {
      icon: "Handshake",
      title: "Konsultasi Bisnis",
      description:
        "Dapatkan pendampingan strategis dari tim ahli kami untuk merancang solusi teknologi yang tepat sesuai kebutuhan dan tujuan bisnis Anda.",
    },
  ];
  await prisma.service.deleteMany();
  for (let i = 0; i < servicesData.length; i++) {
    await prisma.service.create({
      data: { ...servicesData[i], sortOrder: i },
    });
  }
  console.log("✅ Services seeded");

  // ── Clients ──
  const clientsData = [
    { name: "AROUNGER", icon: "ArrowUpRight" },
    { name: "GRASKEEN", icon: "" },
    { name: "Webcom", icon: "Monitor" },
    { name: "DELLUCH", icon: "" },
    { name: "FLAVOUR", icon: "Star" },
    { name: "NEXTRA", icon: "Hexagon" },
  ];
  await prisma.client.deleteMany();
  for (let i = 0; i < clientsData.length; i++) {
    await prisma.client.create({
      data: { ...clientsData[i], sortOrder: i },
    });
  }
  console.log("✅ Clients seeded");

  // ── Stats ──
  const statsData = [
    { value: 150, suffix: "+", label: "Proyek Selesai", icon: "FolderCheck" },
    { value: 80, suffix: "+", label: "Klien Puas", icon: "Users" },
    { value: 5, suffix: "+", label: "Tahun Pengalaman", icon: "Award" },
    { value: 99.9, suffix: "%", label: "Uptime Layanan", icon: "ShieldCheck" },
  ];
  await prisma.stat.deleteMany();
  for (let i = 0; i < statsData.length; i++) {
    await prisma.stat.create({
      data: { ...statsData[i], sortOrder: i },
    });
  }
  console.log("✅ Stats seeded");

  // ── Why Choose Us ──
  const whyChooseData = [
    {
      icon: "Users",
      title: "Tim Berpengalaman",
      description:
        "Didukung oleh para ahli yang menguasai berbagai teknologi modern dan siap menghadirkan solusi terbaik.",
    },
    {
      icon: "TrendingUp",
      title: "Solusi Terukur",
      description:
        "Setiap solusi dirancang fleksibel dan dapat disesuaikan dengan skala pertumbuhan bisnis Anda.",
    },
    {
      icon: "Headset",
      title: "Dukungan Responsif",
      description:
        "Tim support kami selalu siap membantu kapanpun Anda membutuhkan, dengan respons cepat dan solutif.",
    },
    {
      icon: "ShieldCheck",
      title: "Keamanan Terjamin",
      description:
        "Menerapkan standar keamanan data tingkat enterprise untuk melindungi aset digital bisnis Anda.",
    },
  ];
  await prisma.whyChooseItem.deleteMany();
  for (let i = 0; i < whyChooseData.length; i++) {
    await prisma.whyChooseItem.create({
      data: { ...whyChooseData[i], sortOrder: i },
    });
  }
  console.log("✅ Why Choose Us seeded");

  // ── Process Steps ──
  const processData = [
    {
      icon: "ClipboardList",
      title: "Analisis Kebutuhan",
      description:
        "Kami mengumpulkan dan menganalisis kebutuhan proyek Anda untuk membangun fondasi yang kokoh.",
    },
    {
      icon: "Palette",
      title: "Desain UI/UX",
      description:
        "Merancang antarmuka yang intuitif dan pengalaman pengguna yang mulus untuk produk Anda.",
    },
    {
      icon: "Smartphone",
      title: "Prototipe",
      description:
        "Membangun prototipe interaktif untuk memvalidasi konsep sebelum pengembangan penuh.",
    },
    {
      icon: "Code",
      title: "Pengembangan",
      description:
        "Mengubah desain menjadi solusi yang tangguh, skalabel, dan berkinerja tinggi.",
    },
  ];
  await prisma.processStep.deleteMany();
  for (let i = 0; i < processData.length; i++) {
    await prisma.processStep.create({
      data: { ...processData[i], sortOrder: i },
    });
  }
  console.log("✅ Process Steps seeded");

  // ── FAQ ──
  const faqData = [
    {
      question: "Apa saja layanan yang ditawarkan Technema?",
      answer:
        "Technema menyediakan 5 layanan inti: Pengembangan Web & Mobile, Kecerdasan Buatan (AI), Implementasi ERP Odoo, Data Integrasi, dan Konsultasi Bisnis. Setiap layanan dirancang untuk membantu bisnis Anda bertransformasi secara digital dengan solusi yang tepat guna.",
    },
    {
      question: "Produk apa saja yang dimiliki Technema?",
      answer:
        "Kami memiliki 4 produk unggulan: Arsip Pintar untuk manajemen dokumen digital berbasis AI, Databot sebagai asisten data cerdas, Risto POS untuk sistem kasir restoran, dan POS Solutions untuk kebutuhan point-of-sale berbagai jenis usaha. Semua produk dirancang untuk meningkatkan efisiensi operasional bisnis Anda.",
    },
    {
      question: "Berapa lama proses pengembangan aplikasi?",
      answer:
        "Durasi pengembangan tergantung pada kompleksitas proyek. Untuk website standar, prosesnya sekitar 4–8 minggu, sementara aplikasi yang lebih kompleks bisa memakan waktu 2–4 bulan. Setiap proyek melalui 4 tahap: analisis kebutuhan, desain, prototipe, dan pengembangan hingga peluncuran.",
    },
    {
      question:
        "Apakah Technema menyediakan layanan konsultasi sebelum proyek dimulai?",
      answer:
        "Ya, kami menyediakan sesi konsultasi gratis untuk memahami kebutuhan bisnis Anda secara mendalam. Melalui konsultasi ini, kami akan mengidentifikasi tantangan yang dihadapi dan merekomendasikan solusi teknologi yang paling sesuai sebelum proyek dimulai.",
    },
    {
      question:
        "Bagaimana proses integrasi AI ke dalam sistem bisnis yang sudah ada?",
      answer:
        "Prosesnya dimulai dengan audit sistem yang sudah berjalan, dilanjutkan dengan identifikasi peluang penerapan AI yang paling berdampak. Integrasi dilakukan secara bertahap agar tidak mengganggu operasional bisnis Anda. Tim kami memastikan transisi berjalan mulus dengan pelatihan dan pendampingan penuh.",
    },
    {
      question:
        "Apakah solusi ERP Odoo bisa disesuaikan dengan kebutuhan bisnis saya?",
      answer:
        "Tentu! Odoo adalah platform ERP modular yang sangat fleksibel. Kami dapat mengkustomisasi modul sesuai kebutuhan bisnis Anda, mulai dari inventaris, keuangan, SDM, hingga CRM. Setiap implementasi disesuaikan agar selaras dengan proses bisnis yang sudah ada.",
    },
  ];
  await prisma.faqItem.deleteMany();
  for (let i = 0; i < faqData.length; i++) {
    await prisma.faqItem.create({
      data: { ...faqData[i], sortOrder: i },
    });
  }
  console.log("✅ FAQ seeded");

  // ── Testimonials ──
  const testimonialsData = [
    {
      name: "Alexandra Smith",
      role: "CEO",
      company: "TechVentures",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      content:
        "Technema Solutions mengubah seluruh infrastruktur digital kami. Tim mereka memberikan hasil melampaui ekspektasi dengan efisiensi dan keahlian yang luar biasa. Kami melihat peningkatan uptime sistem sebesar 60%.",
      rating: 5,
    },
    {
      name: "Mark Johnson",
      role: "CTO",
      company: "DataFlow Inc.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      content:
        "Konsultan TI terbaik yang pernah kami ajak bekerja sama. Layanan migrasi cloud mereka menghemat 40% biaya operasional kami dalam kuartal pertama. Benar-benar luar biasa.",
      rating: 5,
    },
    {
      name: "Sarah Williams",
      role: "Director of Engineering",
      company: "PixelCraft Studios",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      content:
        "Profesional, responsif, dan sangat berpengetahuan. Solusi keamanan siber dari Technema Solutions telah menjadi terobosan dalam melindungi data klien dan operasional bisnis kami.",
      rating: 5,
    },
    {
      name: "David Chen",
      role: "VP of Operations",
      company: "NovaBridge Global",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      content:
        "Dari konsultasi awal hingga deployment, Technema Solutions menunjukkan keahlian mendalam dalam arsitektur enterprise. Mereka menyederhanakan alur kerja kami dan mengurangi waktu deployment hingga 70%.",
      rating: 5,
    },
    {
      name: "Priya Patel",
      role: "Head of IT",
      company: "Meridian Healthcare",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
      content:
        "Di industri kesehatan, keamanan dan kepatuhan adalah segalanya. Technema Solutions membangun infrastruktur yang sesuai HIPAA dan melampaui semua persyaratan regulasi kami.",
      rating: 5,
    },
    {
      name: "James Morrison",
      role: "Founder",
      company: "Apex Logistics",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      content:
        "Technema Solutions membangun platform pelacakan real-time kami dari nol. Sistem ini menangani lebih dari 50.000 transaksi harian tanpa kendala. Kualitas engineering mereka kelas dunia.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "CMO",
      company: "Stellar Finance",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
      content:
        "Bekerja dengan Technema Solutions terasa seperti memiliki tim internal sendiri. Mereka langsung memahami tantangan fintech kami dan menghadirkan solusi pemrosesan pembayaran yang aman dan skalabel.",
      rating: 5,
    },
    {
      name: "Robert Kim",
      role: "Managing Director",
      company: "Quantum Retail",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
      content:
        "Platform e-commerce kami membutuhkan perombakan total. Technema Solutions tidak hanya memodernisasi stack teknologi kami, tetapi juga meningkatkan kecepatan muat halaman hingga 3x lipat. Pendapatan meningkat 25% setelah peluncuran.",
      rating: 5,
    },
    {
      name: "Amanda Foster",
      role: "COO",
      company: "Greenfield Energy",
      avatar:
        "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face",
      content:
        "Integrasi IoT dari Technema Solutions untuk pemantauan smart grid kami berjalan sempurna. Tim mereka mengelola seluruh siklus proyek dengan presisi dan menyelesaikannya lebih cepat dari jadwal.",
      rating: 5,
    },
  ];
  await prisma.testimonial.deleteMany();
  for (let i = 0; i < testimonialsData.length; i++) {
    await prisma.testimonial.create({
      data: { ...testimonialsData[i], sortOrder: i },
    });
  }
  console.log("✅ Testimonials seeded");

  // ── Projects ──
  const projectsData = [
    {
      title: "Desain Produk Digital",
      category: "Perangkat Lunak",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=500&fit=crop",
      description:
        "Desain produk menyeluruh mulai dari ide hingga prototipe dengan ketelitian tinggi.",
    },
    {
      title: "Proyek Pemasaran Digital",
      category: "Perangkat Lunak",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=500&fit=crop",
      description:
        "Kampanye pemasaran digital komprehensif dengan integrasi analitik lengkap.",
    },
    {
      title: "Solusi Perangkat Lunak Enterprise",
      category: "Perangkat Lunak",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&h=500&fit=crop",
      description:
        "Solusi perangkat lunak enterprise yang dibangun untuk skalabilitas dan performa tinggi.",
    },
    {
      title: "Sistem Manajemen Konten",
      category: "Perangkat Lunak",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=500&fit=crop",
      description:
        "Sistem manajemen konten yang disesuaikan dengan alur kerja bisnis.",
    },
    {
      title: "Aplikasi Lintas Platform",
      category: "Perangkat Lunak",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=500&fit=crop",
      description:
        "Aplikasi mobile lintas platform dengan pengalaman pengguna yang mulus.",
    },
  ];
  await prisma.project.deleteMany();
  for (let i = 0; i < projectsData.length; i++) {
    await prisma.project.create({
      data: { ...projectsData[i], sortOrder: i },
    });
  }
  console.log("✅ Projects seeded");

  // ── Navigation ──
  const navData = [
    { label: "Beranda", href: "/", megaMenu: null },
    { label: "Produk", href: "#products", megaMenu: "products" },
    { label: "Industri", href: "#industries", megaMenu: "industries" },
    { label: "Artikel", href: "/artikel", megaMenu: null },
    { label: "Kontak", href: "/kontak", megaMenu: null },
  ];
  await prisma.navigationLink.deleteMany();
  for (let i = 0; i < navData.length; i++) {
    await prisma.navigationLink.create({
      data: { ...navData[i], sortOrder: i },
    });
  }

  await prisma.industry.deleteMany();
  const industriesData = [
    { name: "Kesehatan", icon: "HeartPulse" },
    { name: "Keuangan & Perbankan", icon: "Landmark" },
    { name: "Manufaktur", icon: "Factory" },
    { name: "Pendidikan", icon: "GraduationCap" },
    { name: "Ritel & E-Commerce", icon: "ShoppingCart" },
    { name: "Logistik", icon: "Truck" },
    { name: "Pemerintahan", icon: "Building2" },
    { name: "Energi", icon: "Zap" },
  ];
  for (let i = 0; i < industriesData.length; i++) {
    await prisma.industry.create({
      data: { ...industriesData[i], href: "#industries", sortOrder: i },
    });
  }
  console.log("✅ Navigation seeded");

  // ── Footer ──
  await prisma.footerLink.deleteMany();
  await prisma.footerColumn.deleteMany();
  await prisma.socialLink.deleteMany();
  const col1 = await prisma.footerColumn.create({
    data: { title: "Tautan Berguna", sortOrder: 0 },
  });
  const col1Links = [
    { label: "Beranda", href: "/" },
    { label: "Produk", href: "#products" },
    { label: "Artikel", href: "/artikel" },
    { label: "Hubungi Kami", href: "/kontak" },
  ];
  for (let i = 0; i < col1Links.length; i++) {
    await prisma.footerLink.create({
      data: { ...col1Links[i], columnId: col1.id, sortOrder: i },
    });
  }

  const col2 = await prisma.footerColumn.create({
    data: { title: "Layanan.", sortOrder: 1 },
  });
  const col2Links = [
    { label: "Aplikasi Web/Mobile", href: "#" },
    { label: "Integrasi Kecerdasan Buatan", href: "#" },
    { label: "ERP Odoo", href: "#" },
    { label: "Data Integrasi", href: "#" },
    { label: "Konsultasi Bisnis", href: "#" },
  ];
  for (let i = 0; i < col2Links.length; i++) {
    await prisma.footerLink.create({
      data: { ...col2Links[i], columnId: col2.id, sortOrder: i },
    });
  }

  const socialData = [
    { platform: "Facebook", href: "#", icon: "Facebook" },
    { platform: "Twitter", href: "#", icon: "Twitter" },
    { platform: "Instagram", href: "#", icon: "Instagram" },
    { platform: "LinkedIn", href: "#", icon: "Linkedin" },
  ];
  for (let i = 0; i < socialData.length; i++) {
    await prisma.socialLink.create({
      data: { ...socialData[i], sortOrder: i },
    });
  }
  console.log("✅ Footer seeded");

  // ── Products (with all details) ──
  await seedProducts();
  console.log("✅ Products seeded");

  // ── Blog Posts ──
  await seedBlogPosts();
  console.log("✅ Blog posts seeded");

  console.log("\n🎉 Seeding complete!");
}

async function seedProducts() {
  // Clear existing products and all child entities (cascade)
  await prisma.productFeatureHighlight.deleteMany();
  await prisma.productCapability.deleteMany();
  await prisma.productStep.deleteMany();
  await prisma.productUseCase.deleteMany();
  await prisma.productStat.deleteMany();
  await prisma.productPricingPlan.deleteMany();
  await prisma.productTestimonial.deleteMany();
  await prisma.productIntegration.deleteMany();
  await prisma.productFaq.deleteMany();
  await prisma.product.deleteMany();

  // ── Arsip Pintar ──
  const arsipPintar = await prisma.product.create({
    data: {
      slug: "arsip-pintar",
      name: "Arsip Pintar",
      tagline: "Sistem pengarsipan digital dan manajemen dokumen yang cerdas",
      description:
        "Arsip Pintar mengubah cara organisasi Anda mengelola dokumen. Dengan teknologi AI dan penyimpanan cloud yang aman, temukan dokumen apa pun dalam hitungan detik — bukan menit. Cocok untuk perusahaan yang ingin beralih dari arsip fisik ke digital tanpa repot.",
      features: [
        "Pengarsipan otomatis",
        "Pencarian teks lengkap",
        "Penyimpanan cloud aman",
      ],
      icon: "FolderOpen",
      logo: "/images/product_logo/arsip_pintar.png",
      category: "document-management",
      isPublished: true,
      sortOrder: 0,
      relatedSlugs: ["databot", "risto-pos", "pos-solutions"],
    },
  });

  // Feature Highlights
  const arsipFeatures = [
    {
      icon: "Search",
      title: "Pencarian Cerdas Full-Text",
      description:
        "Temukan dokumen apa pun dalam hitungan detik dengan mesin pencari full-text yang didukung AI. Cari berdasarkan judul, isi dokumen, metadata, atau bahkan teks di dalam gambar berkat teknologi OCR bawaan.",
    },
    {
      icon: "ShieldCheck",
      title: "Keamanan & Enkripsi Berlapis",
      description:
        "Setiap dokumen dienkripsi saat transit dan saat disimpan. Kontrol akses berbasis peran memastikan hanya orang yang berwenang yang bisa melihat, mengedit, atau menghapus dokumen sensitif.",
    },
    {
      icon: "Cloud",
      title: "Penyimpanan Cloud Tanpa Batas",
      description:
        "Simpan jutaan dokumen tanpa khawatir kehabisan ruang. Infrastruktur cloud kami skalabel secara otomatis seiring pertumbuhan arsip Anda, dengan backup harian ke multiple data center.",
    },
    {
      icon: "GitBranch",
      title: "Workflow & Approval Otomatis",
      description:
        "Buat alur kerja persetujuan dokumen yang sesuai dengan struktur organisasi Anda. Notifikasi otomatis, tracking status, dan audit trail lengkap untuk setiap dokumen.",
    },
  ];
  for (let i = 0; i < arsipFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({
      data: { ...arsipFeatures[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Capabilities
  const arsipCapabilities = [
    { icon: "FileText", title: "Arsip Digital", description: "Konversi dokumen fisik ke digital dalam sekejap" },
    { icon: "Search", title: "OCR Scanning", description: "Ekstraksi teks otomatis dari gambar dan PDF scan" },
    { icon: "Tags", title: "Auto-Tagging", description: "Kategorisasi dokumen otomatis dengan AI" },
    { icon: "Clock", title: "Version History", description: "Lacak setiap perubahan dengan riwayat versi lengkap" },
    { icon: "Users", title: "Kolaborasi Tim", description: "Edit dan komentar dokumen secara real-time bersama tim" },
    { icon: "Lock", title: "Kontrol Akses", description: "Atur siapa yang bisa lihat, edit, atau hapus dokumen" },
    { icon: "Download", title: "Ekspor Massal", description: "Unduh banyak dokumen sekaligus dalam berbagai format" },
    { icon: "Bell", title: "Notifikasi Pintar", description: "Pengingat otomatis untuk dokumen yang perlu ditindaklanjuti" },
    { icon: "BarChart3", title: "Laporan & Analitik", description: "Dashboard penggunaan dan statistik arsip real-time" },
    { icon: "Smartphone", title: "Akses Mobile", description: "Kelola arsip dari mana saja via aplikasi mobile" },
    { icon: "RefreshCw", title: "Sinkronisasi", description: "Sinkronisasi otomatis lintas perangkat dan tim" },
    { icon: "Trash2", title: "Retensi Otomatis", description: "Hapus otomatis dokumen sesuai kebijakan retensi" },
  ];
  for (let i = 0; i < arsipCapabilities.length; i++) {
    await prisma.productCapability.create({
      data: { ...arsipCapabilities[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // How It Works
  const arsipSteps = [
    { step: 1, icon: "Upload", title: "Unggah Dokumen", description: "Upload dokumen fisik atau digital ke platform. Mendukung PDF, gambar, Word, Excel, dan 50+ format lainnya." },
    { step: 2, icon: "Cpu", title: "Pemrosesan AI", description: "Sistem AI kami secara otomatis mengekstrak teks, mengkategorikan, dan menandai setiap dokumen." },
    { step: 3, icon: "FolderOpen", title: "Organisasi Otomatis", description: "Dokumen tersusun rapi dalam folder dan kategori yang bisa dikustomisasi sesuai kebutuhan." },
    { step: 4, icon: "Search", title: "Cari & Temukan", description: "Gunakan pencarian cerdas untuk menemukan dokumen apa pun dalam hitungan detik." },
  ];
  for (let i = 0; i < arsipSteps.length; i++) {
    await prisma.productStep.create({
      data: { ...arsipSteps[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Use Cases
  const arsipUseCases = [
    { icon: "Building2", title: "Instansi Pemerintah", description: "Digitalisasi arsip surat menyurat, SK, dan dokumen regulasi dengan compliance penuh." },
    { icon: "Scale", title: "Kantor Hukum", description: "Kelola ribuan dokumen perkara, kontrak, dan surat kuasa dengan pencarian instan." },
    { icon: "GraduationCap", title: "Institusi Pendidikan", description: "Arsip data mahasiswa, transkrip, ijazah, dan dokumen akademik secara digital." },
    { icon: "Landmark", title: "Perbankan & Keuangan", description: "Penyimpanan dokumen KYC, kontrak kredit, dan laporan audit yang aman dan terenkripsi." },
  ];
  for (let i = 0; i < arsipUseCases.length; i++) {
    await prisma.productUseCase.create({
      data: { ...arsipUseCases[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Impact Stats
  const arsipStats = [
    { value: "90%", label: "Lebih Cepat Mencari Dokumen" },
    { value: "70%", label: "Hemat Ruang Penyimpanan Fisik" },
    { value: "99.9%", label: "Uptime & Ketersediaan Data" },
  ];
  for (let i = 0; i < arsipStats.length; i++) {
    await prisma.productStat.create({
      data: { ...arsipStats[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Pricing Plans
  const arsipPricing = [
    { name: "Starter", price: "499.000", currency: "Rp", period: "/bulan", description: "Cocok untuk tim kecil dan UMKM yang baru mulai digitalisasi", features: ["Hingga 10.000 dokumen", "3 pengguna", "Pencarian full-text", "Penyimpanan 50 GB", "Dukungan email"], ctaLabel: "Mulai Gratis", ctaHref: "/kontak", isPopular: false },
    { name: "Professional", price: "1.499.000", currency: "Rp", period: "/bulan", description: "Untuk perusahaan menengah dengan kebutuhan arsip yang lebih besar", features: ["Dokumen tak terbatas", "20 pengguna", "OCR & auto-tagging AI", "Penyimpanan 500 GB", "Workflow approval", "API access", "Dukungan prioritas"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Enterprise", price: null, currency: "Rp", period: "/bulan", description: "Solusi khusus untuk organisasi besar dengan kebutuhan compliance", features: ["Semua fitur Professional", "Pengguna tak terbatas", "Penyimpanan tak terbatas", "SSO & LDAP integration", "Dedicated account manager", "SLA 99.9%", "On-premise option"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < arsipPricing.length; i++) {
    await prisma.productPricingPlan.create({
      data: { ...arsipPricing[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Testimonials
  await prisma.productTestimonial.create({ data: { productId: arsipPintar.id, name: "Dr. Rina Hartono", role: "Kepala Bagian Tata Usaha", company: "Dinas Pendidikan DKI Jakarta", content: "Arsip Pintar mengubah total cara kami mengelola surat menyurat. Dulu butuh 30 menit mencari satu dokumen, sekarang cukup 10 detik. Luar biasa!", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: arsipPintar.id, name: "Ahmad Faisal, SH", role: "Managing Partner", company: "Faisal & Rekan Law Firm", content: "Dengan ribuan dokumen perkara yang harus dikelola, Arsip Pintar benar-benar menyelamatkan produktivitas tim kami. Fitur pencarian OCR-nya sangat akurat.", sortOrder: 1 } });

  // Integrations
  const arsipIntegrations = [
    { name: "Google Drive", icon: "Cloud" },
    { name: "Microsoft 365", icon: "FileText" },
    { name: "Dropbox", icon: "HardDrive" },
    { name: "Slack", icon: "MessageSquare" },
    { name: "SAP", icon: "Database" },
    { name: "REST API", icon: "Code" },
  ];
  for (let i = 0; i < arsipIntegrations.length; i++) {
    await prisma.productIntegration.create({
      data: { ...arsipIntegrations[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // FAQs
  const arsipFaqs = [
    { question: "Apakah Arsip Pintar bisa memindai dokumen fisik?", answer: "Ya, Arsip Pintar mendukung pemindaian langsung dari scanner yang terhubung ke komputer Anda. Sistem OCR kami akan secara otomatis mengekstrak teks dari hasil scan sehingga bisa dicari." },
    { question: "Bagaimana keamanan data dokumen saya?", answer: "Semua dokumen dienkripsi menggunakan AES-256 saat disimpan dan TLS 1.3 saat ditransfer. Kami juga menyediakan backup harian ke multiple data center di Indonesia." },
    { question: "Berapa lama proses migrasi dari sistem lama?", answer: "Proses migrasi biasanya memakan waktu 1-4 minggu tergantung volume dokumen. Tim kami akan mendampingi seluruh proses migrasi tanpa biaya tambahan." },
    { question: "Apakah bisa diakses dari perangkat mobile?", answer: "Ya, Arsip Pintar memiliki aplikasi web responsive yang bisa diakses dari smartphone dan tablet. Aplikasi native untuk iOS dan Android juga tersedia untuk paket Professional ke atas." },
    { question: "Apakah ada batasan ukuran file?", answer: "Untuk paket Starter, batas ukuran per file adalah 100 MB. Untuk Professional dan Enterprise, batasnya 1 GB per file. Format yang didukung meliputi PDF, Word, Excel, gambar, dan 50+ format lainnya." },
    { question: "Bagaimana jika saya ingin berhenti berlangganan?", answer: "Anda bisa mengekspor semua dokumen Anda dalam format asli kapan saja. Tidak ada lock-in contract — Anda bisa berhenti kapan saja dengan pemberitahuan 30 hari." },
  ];
  for (let i = 0; i < arsipFaqs.length; i++) {
    await prisma.productFaq.create({
      data: { ...arsipFaqs[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // ── Databot ──
  const databot = await prisma.product.create({
    data: {
      slug: "databot",
      name: "Databot",
      tagline: "Platform analitik data dan chatbot berbasis kecerdasan buatan",
      description: "Databot mengubah data mentah bisnis Anda menjadi insight yang actionable. Dengan AI yang bisa Anda ajak bicara, cukup tanyakan apa yang ingin Anda ketahui — Databot akan menyajikan jawabannya dalam bentuk grafik, tabel, atau laporan otomatis.",
      features: ["Insight berbasis AI", "Laporan otomatis", "Dasbor real-time"],
      icon: "Bot",
      logo: "/images/product_logo/databot.png",
      category: "ai",
      isPublished: true,
      sortOrder: 1,
      relatedSlugs: ["arsip-pintar", "risto-pos", "pos-solutions"],
    },
  });

  // Databot Feature Highlights
  const databotFeatures = [
    { icon: "MessageCircle", title: "Chatbot Analitik AI", description: "Tanyakan apa saja tentang data bisnis Anda dalam bahasa natural. 'Berapa penjualan bulan ini?' atau 'Produk mana yang paling laris?' — Databot langsung menjawab dengan visualisasi yang informatif." },
    { icon: "BarChart3", title: "Dashboard Real-Time", description: "Dashboard interaktif yang update otomatis setiap menit. Pantau KPI bisnis, tren penjualan, performa tim, dan metrik penting lainnya dalam satu layar." },
    { icon: "FileBarChart", title: "Laporan Otomatis Terjadwal", description: "Atur jadwal pembuatan laporan — harian, mingguan, atau bulanan. Databot akan generate dan kirim laporan ke email Anda tanpa perlu intervensi manual." },
    { icon: "Sparkles", title: "Prediksi & Anomaly Detection", description: "AI Databot tidak hanya melihat masa lalu — tapi juga memprediksi tren masa depan dan mendeteksi anomali sebelum menjadi masalah besar bagi bisnis Anda." },
  ];
  for (let i = 0; i < databotFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({ data: { ...databotFeatures[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Capabilities
  const databotCaps = [
    { icon: "MessageCircle", title: "Natural Language Query", description: "Tanya data pakai bahasa sehari-hari" },
    { icon: "BarChart3", title: "Dashboard Builder", description: "Buat dashboard kustom drag-and-drop" },
    { icon: "PieChart", title: "Visualisasi Otomatis", description: "Chart dan grafik yang dipilih AI secara cerdas" },
    { icon: "FileBarChart", title: "Scheduled Reports", description: "Laporan otomatis ke email terjadwal" },
    { icon: "TrendingUp", title: "Forecasting", description: "Prediksi tren penjualan dan performa" },
    { icon: "AlertTriangle", title: "Anomaly Detection", description: "Deteksi dini data yang tidak wajar" },
    { icon: "Database", title: "Multi-Source", description: "Hubungkan berbagai sumber data sekaligus" },
    { icon: "Share2", title: "Share & Embed", description: "Bagikan dashboard via link atau embed" },
    { icon: "Lock", title: "Data Governance", description: "Kontrol akses data per tim atau departemen" },
    { icon: "Zap", title: "Real-Time Sync", description: "Sinkronisasi data setiap menit" },
    { icon: "Download", title: "Export Fleksibel", description: "Export ke PDF, Excel, CSV, atau API" },
    { icon: "Webhook", title: "Webhook & Alert", description: "Notifikasi otomatis saat threshold tercapai" },
  ];
  for (let i = 0; i < databotCaps.length; i++) {
    await prisma.productCapability.create({ data: { ...databotCaps[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Steps
  const databotSteps = [
    { step: 1, icon: "Database", title: "Hubungkan Data", description: "Integrasikan database, spreadsheet, atau API bisnis Anda. Databot mendukung MySQL, PostgreSQL, Google Sheets, dan 20+ sumber data lainnya." },
    { step: 2, icon: "Cpu", title: "AI Memproses", description: "Databot secara otomatis menganalisis struktur data, menemukan pola, dan membangun model prediktif." },
    { step: 3, icon: "MessageCircle", title: "Tanya & Jawab", description: "Ajukan pertanyaan dalam bahasa natural. 'Bagaimana tren penjualan Q3?' — Databot langsung menjawab dengan visualisasi." },
    { step: 4, icon: "Bell", title: "Insight Proaktif", description: "Databot mengirim alert otomatis saat menemukan anomali atau peluang baru dalam data Anda." },
  ];
  for (let i = 0; i < databotSteps.length; i++) {
    await prisma.productStep.create({ data: { ...databotSteps[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Use Cases
  const databotUseCases = [
    { icon: "ShoppingCart", title: "E-Commerce & Ritel", description: "Analisis pola pembelian, prediksi stok, dan optimasi harga secara otomatis." },
    { icon: "Landmark", title: "Keuangan & Perbankan", description: "Monitoring risiko real-time, deteksi fraud, dan laporan compliance otomatis." },
    { icon: "HeartPulse", title: "Kesehatan", description: "Analisis data pasien, prediksi kebutuhan obat, dan optimasi jadwal tenaga medis." },
    { icon: "Factory", title: "Manufaktur", description: "Pantau efisiensi produksi, prediksi maintenance, dan optimasi supply chain." },
  ];
  for (let i = 0; i < databotUseCases.length; i++) {
    await prisma.productUseCase.create({ data: { ...databotUseCases[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Stats, Pricing, Testimonials, Integrations, FAQs
  const databotStats = [
    { value: "3x", label: "Lebih Cepat Mengambil Keputusan" },
    { value: "50%", label: "Hemat Waktu Pembuatan Laporan" },
    { value: "25%", label: "Peningkatan Revenue Rata-Rata" },
  ];
  for (let i = 0; i < databotStats.length; i++) {
    await prisma.productStat.create({ data: { ...databotStats[i], productId: databot.id, sortOrder: i } });
  }

  const databotPricing = [
    { name: "Starter", price: "799.000", currency: "Rp", period: "/bulan", description: "Untuk tim kecil yang ingin mulai memanfaatkan data", features: ["1 data source", "3 pengguna", "5 dashboard", "Chatbot AI basic", "Laporan mingguan", "Dukungan email"], ctaLabel: "Mulai Gratis", ctaHref: "/kontak", isPopular: false },
    { name: "Professional", price: "2.499.000", currency: "Rp", period: "/bulan", description: "Untuk perusahaan yang serius dengan analitik data", features: ["10 data source", "20 pengguna", "Dashboard tak terbatas", "Chatbot AI advanced", "Forecasting & anomaly detection", "Scheduled reports", "API access", "Dukungan prioritas"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Enterprise", price: null, currency: "Rp", period: "/bulan", description: "Solusi analitik penuh untuk organisasi enterprise", features: ["Semua fitur Professional", "Data source tak terbatas", "Pengguna tak terbatas", "Custom AI model training", "On-premise deployment", "Dedicated support engineer", "SLA 99.9%"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < databotPricing.length; i++) {
    await prisma.productPricingPlan.create({ data: { ...databotPricing[i], productId: databot.id, sortOrder: i } });
  }

  await prisma.productTestimonial.create({ data: { productId: databot.id, name: "Budi Santoso", role: "Head of Business Intelligence", company: "PT. Retail Nusantara", content: "Databot mengubah cara tim BI kami bekerja. Dulu butuh 3 hari untuk membuat laporan bulanan, sekarang cukup 2 jam. AI chatbot-nya luar biasa intuitif.", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: databot.id, name: "Lisa Permata", role: "CFO", company: "Fintech Sejahtera", content: "Fitur anomaly detection Databot menyelamatkan kami dari potensi fraud senilai ratusan juta. ROI-nya terasa langsung di bulan pertama.", sortOrder: 1 } });

  const databotIntegrations = [
    { name: "MySQL", icon: "Database" }, { name: "PostgreSQL", icon: "Database" }, { name: "Google Sheets", icon: "FileSpreadsheet" }, { name: "Microsoft Excel", icon: "FileSpreadsheet" }, { name: "REST API", icon: "Code" }, { name: "Zapier", icon: "Zap" },
  ];
  for (let i = 0; i < databotIntegrations.length; i++) {
    await prisma.productIntegration.create({ data: { ...databotIntegrations[i], productId: databot.id, sortOrder: i } });
  }

  const databotFaqs = [
    { question: "Apakah saya perlu keahlian teknis untuk menggunakan Databot?", answer: "Tidak. Databot dirancang untuk pengguna bisnis non-teknis. Anda cukup mengetik pertanyaan dalam bahasa Indonesia atau Inggris, dan Databot akan menyajikan jawabannya dalam bentuk yang mudah dipahami." },
    { question: "Data apa saja yang bisa dihubungkan?", answer: "Databot mendukung database SQL (MySQL, PostgreSQL, SQL Server), spreadsheet (Google Sheets, Excel), layanan cloud (AWS, GCP), dan API custom. Tim kami juga bisa membantu integrasi dengan sistem yang belum didukung." },
    { question: "Seberapa akurat prediksi AI Databot?", answer: "Akurasi prediksi tergantung pada kualitas dan volume data. Dengan data yang cukup (minimal 6 bulan data historis), model forecasting kami mencapai akurasi 85-95% untuk prediksi jangka pendek." },
    { question: "Apakah data saya aman?", answer: "Sangat aman. Semua data dienkripsi end-to-end, disimpan di data center bersertifikasi ISO 27001 di Indonesia. Kami tidak pernah menggunakan data klien untuk melatih model AI." },
    { question: "Bisa diintegrasikan dengan BI tools yang sudah ada?", answer: "Ya. Databot bisa berjalan berdampingan dengan tools seperti Tableau, Power BI, atau Metabase. Anda juga bisa embed dashboard Databot ke aplikasi internal via iframe atau API." },
  ];
  for (let i = 0; i < databotFaqs.length; i++) {
    await prisma.productFaq.create({ data: { ...databotFaqs[i], productId: databot.id, sortOrder: i } });
  }

  // ── Risto POS ──
  const ristoPOS = await prisma.product.create({
    data: {
      slug: "risto-pos",
      name: "Risto POS",
      tagline: "Sistem point-of-sale restoran yang dirancang khusus untuk F&B",
      description: "Risto POS adalah sistem kasir yang dibangun khusus untuk restoran, kafe, dan bisnis F&B. Dari manajemen meja hingga kitchen display, dari split bill hingga laporan penjualan real-time — semua dalam satu platform yang mudah digunakan.",
      features: ["Manajemen meja", "Tampilan dapur", "Kustomisasi menu"],
      icon: "Coffee",
      logo: "/images/product_logo/risto_pos.png",
      category: "pos",
      isPublished: true,
      sortOrder: 2,
      relatedSlugs: ["pos-solutions", "arsip-pintar", "databot"],
    },
  });

  // Risto POS Feature Highlights
  const ristoFeatures = [
    { icon: "LayoutGrid", title: "Manajemen Meja Visual", description: "Lihat status semua meja secara real-time dalam tampilan visual drag-and-drop. Ketahui meja mana yang kosong, terisi, atau menunggu pembayaran. Sempurna untuk restoran dengan banyak lantai atau area." },
    { icon: "ChefHat", title: "Kitchen Display System (KDS)", description: "Pesanan langsung muncul di layar dapur saat dikirim dari meja. Prioritas pesanan otomatis, timer memasak, dan notifikasi saat makanan siap diantar. Eliminasi kertas bon dari dapur Anda." },
    { icon: "UtensilsCrossed", title: "Menu Builder Fleksibel", description: "Buat dan kelola menu dengan mudah — termasuk variasi (ukuran, topping, level pedas), paket combo, menu seasonal, dan happy hour pricing. Perubahan langsung aktif di semua terminal." },
    { icon: "Receipt", title: "Split Bill & Multi-Payment", description: "Bagi tagihan per orang, per item, atau persentase. Terima pembayaran campuran — tunai + QRIS + kartu kredit dalam satu transaksi. Semua tercatat otomatis." },
  ];
  for (let i = 0; i < ristoFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({ data: { ...ristoFeatures[i], productId: ristoPOS.id, sortOrder: i } });
  }

  // Risto POS Capabilities
  const ristoCaps = [
    { icon: "LayoutGrid", title: "Floor Plan Visual", description: "Layout meja drag-and-drop multi-lantai" },
    { icon: "ChefHat", title: "Kitchen Display", description: "Order langsung ke layar dapur" },
    { icon: "UtensilsCrossed", title: "Menu Management", description: "Menu, variasi, combo, dan seasonal pricing" },
    { icon: "Receipt", title: "Split Bill", description: "Bagi tagihan per orang atau per item" },
    { icon: "CreditCard", title: "Multi-Payment", description: "Cash, QRIS, kartu kredit dalam satu transaksi" },
    { icon: "Users", title: "Staff Management", description: "Absensi, shift, dan hak akses per role" },
    { icon: "Package", title: "Inventory Tracking", description: "Stok bahan baku real-time dengan alert" },
    { icon: "Truck", title: "Supplier Management", description: "Kelola pesanan dan hutang ke supplier" },
    { icon: "BarChart3", title: "Sales Analytics", description: "Laporan penjualan, item terlaris, jam sibuk" },
    { icon: "Percent", title: "Promo & Diskon", description: "Kupon, happy hour, dan program loyalty" },
    { icon: "Smartphone", title: "Waiter App", description: "Ambil pesanan dari tablet atau smartphone" },
    { icon: "Printer", title: "Auto-Print", description: "Cetak otomatis ke printer kasir dan dapur" },
  ];
  for (let i = 0; i < ristoCaps.length; i++) {
    await prisma.productCapability.create({ data: { ...ristoCaps[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoSteps = [
    { step: 1, icon: "Settings", title: "Setup Menu & Meja", description: "Masukkan menu restoran Anda dan atur layout meja. Tim kami akan membantu setup awal agar semuanya siap dalam 1 hari." },
    { step: 2, icon: "Smartphone", title: "Ambil Pesanan", description: "Pelayan mengambil pesanan dari tablet atau smartphone. Pesanan otomatis masuk ke kitchen display dan printer." },
    { step: 3, icon: "ChefHat", title: "Dapur Terima Order", description: "Dapur melihat pesanan di layar KDS dengan prioritas dan timer. Tandai selesai saat makanan siap diantar." },
    { step: 4, icon: "CreditCard", title: "Pembayaran Mudah", description: "Proses pembayaran cepat dengan split bill dan multi-payment. Laporan penjualan otomatis ter-generate." },
  ];
  for (let i = 0; i < ristoSteps.length; i++) {
    await prisma.productStep.create({ data: { ...ristoSteps[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoUseCases = [
    { icon: "Coffee", title: "Kafe & Coffee Shop", description: "Operasi cepat dengan antrian yang efisien, menu customizable, dan program loyalty pelanggan." },
    { icon: "UtensilsCrossed", title: "Restoran Full-Service", description: "Manajemen meja, kitchen display, dan split bill untuk pengalaman dining yang mulus." },
    { icon: "Flame", title: "Restoran Cepat Saji", description: "Kecepatan transaksi tinggi dengan antrian counter dan self-service kiosk." },
    { icon: "Wine", title: "Bar & Lounge", description: "Tab management, happy hour pricing, dan inventory tracking untuk minuman." },
  ];
  for (let i = 0; i < ristoUseCases.length; i++) {
    await prisma.productUseCase.create({ data: { ...ristoUseCases[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoStats = [
    { value: "40%", label: "Lebih Cepat Waktu Pelayanan" },
    { value: "25%", label: "Peningkatan Table Turnover" },
    { value: "95%", label: "Akurasi Pesanan" },
  ];
  for (let i = 0; i < ristoStats.length; i++) {
    await prisma.productStat.create({ data: { ...ristoStats[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoPricing = [
    { name: "Starter", price: "349.000", currency: "Rp", period: "/bulan", description: "Untuk kafe kecil dan food stall dengan 1 outlet", features: ["1 terminal", "Menu management", "Pembayaran cash & QRIS", "Laporan harian", "Dukungan email"], ctaLabel: "Mulai Gratis", ctaHref: "/kontak", isPopular: false },
    { name: "Professional", price: "899.000", currency: "Rp", period: "/bulan", description: "Untuk restoran dan kafe dengan kebutuhan lengkap", features: ["5 terminal", "Kitchen Display System", "Manajemen meja", "Split bill & multi-payment", "Inventory tracking", "Staff management", "Laporan analytics", "Dukungan prioritas"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Enterprise", price: null, currency: "Rp", period: "/bulan", description: "Untuk chain restoran dan franchise multi-outlet", features: ["Semua fitur Professional", "Terminal tak terbatas", "Multi-outlet dashboard", "Central menu management", "Custom integration", "Dedicated account manager", "SLA 99.9%"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < ristoPricing.length; i++) {
    await prisma.productPricingPlan.create({ data: { ...ristoPricing[i], productId: ristoPOS.id, sortOrder: i } });
  }

  await prisma.productTestimonial.create({ data: { productId: ristoPOS.id, name: "Chef Arman", role: "Owner & Head Chef", company: "Warung Nusantara", content: "Kitchen Display System dari Risto POS menghilangkan semua kekacauan kertas bon di dapur kami. Pesanan lebih terorganisir dan waktu memasak berkurang 30%.", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: ristoPOS.id, name: "Dewi Anggraini", role: "Operations Manager", company: "Kopi Kenangan Lokal", content: "Sejak pakai Risto POS, table turnover kami naik 25%. Fitur manajemen meja dan split bill sangat membantu di jam-jam sibuk.", sortOrder: 1 } });

  const ristoIntegrations = [
    { name: "GoPay", icon: "Smartphone" }, { name: "OVO", icon: "Smartphone" }, { name: "DANA", icon: "Smartphone" }, { name: "QRIS", icon: "QrCode" }, { name: "GrabFood", icon: "Bike" }, { name: "GoFood", icon: "Bike" },
  ];
  for (let i = 0; i < ristoIntegrations.length; i++) {
    await prisma.productIntegration.create({ data: { ...ristoIntegrations[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoFaqs = [
    { question: "Apakah Risto POS bisa dipakai offline?", answer: "Ya! Risto POS bisa beroperasi penuh saat internet mati. Semua transaksi tersimpan di perangkat lokal dan otomatis sync ke cloud saat koneksi pulih. Anda tidak akan kehilangan satu transaksi pun." },
    { question: "Perangkat apa saja yang dibutuhkan?", answer: "Risto POS berjalan di tablet Android, iPad, atau laptop/PC. Untuk kitchen display, kami rekomendasikan tablet 10 inch. Printer kasir thermal 80mm kompatibel dengan semua merek populer." },
    { question: "Berapa lama proses setup?", answer: "Setup dasar bisa selesai dalam 1 hari. Tim kami akan datang ke lokasi untuk instalasi, input menu, atur layout meja, dan training staff. Untuk chain restoran, biasanya 3-5 hari per outlet." },
    { question: "Apakah bisa integrasi dengan food delivery platform?", answer: "Ya, Risto POS terintegrasi dengan GrabFood, GoFood, dan ShopeeFood. Pesanan delivery otomatis masuk ke sistem POS dan kitchen display tanpa input manual." },
    { question: "Bagaimana jika perangkat rusak?", answer: "Data Anda aman di cloud. Cukup login di perangkat baru dan semua data langsung tersedia. Untuk paket Professional ke atas, kami sediakan perangkat pengganti dalam 24 jam." },
    { question: "Apakah ada biaya setup awal?", answer: "Tidak ada biaya setup untuk paket Starter dan Professional. Untuk Enterprise, biaya setup disesuaikan dengan jumlah outlet dan kebutuhan kustomisasi." },
  ];
  for (let i = 0; i < ristoFaqs.length; i++) {
    await prisma.productFaq.create({ data: { ...ristoFaqs[i], productId: ristoPOS.id, sortOrder: i } });
  }

  // ── POS Solutions ──
  const posSolutions = await prisma.product.create({
    data: {
      slug: "pos-solutions",
      name: "POS Solutions",
      tagline: "Platform POS ritel lengkap untuk toko modern",
      description: "POS Solutions adalah platform point-of-sale yang dirancang untuk bisnis ritel modern. Dari toko kecil hingga jaringan multi-cabang, kelola inventaris, penjualan, dan pelanggan dalam satu sistem terintegrasi dengan berbagai payment gateway.",
      features: ["Pelacakan inventaris", "Dukungan multi-toko", "Integrasi pembayaran"],
      icon: "Monitor",
      logo: "/images/product_logo/pos_solutions.png",
      category: "pos",
      isPublished: true,
      sortOrder: 3,
      relatedSlugs: ["risto-pos", "arsip-pintar", "databot"],
    },
  });

  const posFeatures = [
    { icon: "Package", title: "Inventory Management Real-Time", description: "Pantau stok barang di semua cabang secara real-time. Notifikasi otomatis saat stok menipis, auto-reorder ke supplier, dan barcode scanning untuk penerimaan barang yang cepat dan akurat." },
    { icon: "Store", title: "Multi-Store Dashboard", description: "Kelola banyak toko dari satu dashboard. Bandingkan performa antar cabang, transfer stok antar toko, dan terapkan promo serentak di semua outlet dengan sekali klik." },
    { icon: "CreditCard", title: "Integrasi Payment Gateway Lengkap", description: "Terima pembayaran dari semua metode — tunai, kartu debit/kredit, e-wallet (GoPay, OVO, DANA), QRIS, dan cicilan. Semua tercatat otomatis di laporan keuangan." },
    { icon: "UserCheck", title: "CRM & Program Loyalty", description: "Kenali pelanggan Anda lebih baik. Sistem membership, poin reward, birthday voucher, dan analisis customer behavior untuk strategi marketing yang lebih efektif." },
  ];
  for (let i = 0; i < posFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({ data: { ...posFeatures[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posCaps = [
    { icon: "Package", title: "Inventory Real-Time", description: "Stok akurat di semua cabang setiap saat" },
    { icon: "Store", title: "Multi-Store", description: "Kelola banyak toko dalam satu platform" },
    { icon: "CreditCard", title: "Payment Gateway", description: "Semua metode pembayaran terintegrasi" },
    { icon: "UserCheck", title: "CRM & Loyalty", description: "Membership, poin, dan voucher pelanggan" },
    { icon: "Barcode", title: "Barcode & SKU", description: "Scan barcode untuk transaksi dan stok" },
    { icon: "ArrowLeftRight", title: "Transfer Stok", description: "Kirim stok antar cabang dengan mudah" },
    { icon: "Truck", title: "Purchase Order", description: "Auto-reorder ke supplier saat stok menipis" },
    { icon: "BarChart3", title: "Sales Report", description: "Laporan penjualan harian hingga tahunan" },
    { icon: "Users", title: "Staff Management", description: "Absensi, komisi, dan hak akses per karyawan" },
    { icon: "Percent", title: "Promo Engine", description: "Diskon, bundle, dan promo flash sale" },
    { icon: "FileText", title: "Accounting Integration", description: "Export ke Jurnal, Accurate, atau Xero" },
    { icon: "Globe", title: "E-Commerce Sync", description: "Sinkronisasi stok dengan toko online" },
  ];
  for (let i = 0; i < posCaps.length; i++) {
    await prisma.productCapability.create({ data: { ...posCaps[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posSteps = [
    { step: 1, icon: "Upload", title: "Input Produk & Stok", description: "Masukkan katalog produk via spreadsheet atau barcode scanning. Tim kami bantu migrasi data dari sistem lama Anda." },
    { step: 2, icon: "Store", title: "Atur Cabang & Staff", description: "Tambahkan toko, atur hak akses karyawan, dan hubungkan perangkat POS. Setup multi-cabang bisa selesai dalam 1 hari." },
    { step: 3, icon: "ShoppingBag", title: "Mulai Berjualan", description: "Scan barcode, proses pembayaran, dan cetak struk dalam hitungan detik. Stok otomatis berkurang di semua channel." },
    { step: 4, icon: "BarChart3", title: "Analisis & Grow", description: "Gunakan laporan dan insight untuk optimasi stok, identifikasi produk terlaris, dan rencanakan strategi pertumbuhan." },
  ];
  for (let i = 0; i < posSteps.length; i++) {
    await prisma.productStep.create({ data: { ...posSteps[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posUseCases = [
    { icon: "ShoppingBag", title: "Fashion & Apparel", description: "Kelola variasi ukuran & warna, seasonal collection, dan program membership pelanggan setia." },
    { icon: "Pill", title: "Apotek & Toko Kesehatan", description: "Tracking batch number, expiry date, dan integrasi dengan sistem resep elektronik." },
    { icon: "ShoppingCart", title: "Minimarket & Supermarket", description: "High-volume scanning, manajemen supplier, dan promo otomatis berbasis data." },
    { icon: "Wrench", title: "Toko Bangunan & Hardware", description: "Manajemen produk ribuan SKU, penjualan satuan dan grosir, serta kredit pelanggan." },
  ];
  for (let i = 0; i < posUseCases.length; i++) {
    await prisma.productUseCase.create({ data: { ...posUseCases[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posStats = [
    { value: "60%", label: "Lebih Efisien Kelola Inventaris" },
    { value: "35%", label: "Peningkatan Repeat Customer" },
    { value: "100+", label: "Payment Method Terintegrasi" },
  ];
  for (let i = 0; i < posStats.length; i++) {
    await prisma.productStat.create({ data: { ...posStats[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posPricing = [
    { name: "Starter", price: "299.000", currency: "Rp", period: "/bulan", description: "Untuk toko tunggal dengan kebutuhan POS dasar", features: ["1 outlet", "1 terminal", "Inventory management", "Pembayaran cash & QRIS", "Laporan dasar", "Dukungan email"], ctaLabel: "Mulai Gratis", ctaHref: "/kontak", isPopular: false },
    { name: "Professional", price: "699.000", currency: "Rp", period: "/bulan", description: "Untuk bisnis ritel dengan kebutuhan multi-channel", features: ["3 outlet", "5 terminal per outlet", "CRM & loyalty program", "Multi-payment gateway", "E-commerce sync", "Purchase order automation", "Advanced analytics", "Dukungan prioritas"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Enterprise", price: null, currency: "Rp", period: "/bulan", description: "Untuk chain ritel dan franchise berskala besar", features: ["Semua fitur Professional", "Outlet tak terbatas", "Terminal tak terbatas", "Custom integration", "White-label option", "Dedicated account manager", "SLA 99.9%"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < posPricing.length; i++) {
    await prisma.productPricingPlan.create({ data: { ...posPricing[i], productId: posSolutions.id, sortOrder: i } });
  }

  await prisma.productTestimonial.create({ data: { productId: posSolutions.id, name: "Hendra Wijaya", role: "Owner", company: "Fashion Hub (12 Cabang)", content: "POS Solutions menyatukan 12 cabang kami dalam satu dashboard. Transfer stok antar toko jadi mudah dan laporan penjualan real-time membantu kami buat keputusan lebih cepat.", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: posSolutions.id, name: "Apt. Sari Indah", role: "Pemilik", company: "Apotek Sehat Selalu", content: "Fitur tracking expiry date dan batch number sangat critical untuk apotek. Sejak pakai POS Solutions, kami zero waste untuk obat kadaluarsa.", sortOrder: 1 } });

  const posIntegrations = [
    { name: "Tokopedia", icon: "ShoppingCart" }, { name: "Shopee", icon: "ShoppingCart" }, { name: "Jurnal", icon: "FileText" }, { name: "Accurate", icon: "FileText" }, { name: "QRIS", icon: "QrCode" }, { name: "Midtrans", icon: "CreditCard" },
  ];
  for (let i = 0; i < posIntegrations.length; i++) {
    await prisma.productIntegration.create({ data: { ...posIntegrations[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posFaqs = [
    { question: "Apakah POS Solutions cocok untuk toko kecil?", answer: "Sangat cocok! Paket Starter kami dirancang khusus untuk toko kecil dengan 1 outlet. Anda bisa mulai dengan fitur dasar dan upgrade seiring pertumbuhan bisnis." },
    { question: "Bagaimana cara sinkronisasi dengan toko online?", answer: "POS Solutions terintegrasi langsung dengan Tokopedia, Shopee, dan Lazada. Stok otomatis terupdate di semua channel saat ada penjualan — baik di toko fisik maupun online." },
    { question: "Apakah bisa tracking stok per batch dan expiry?", answer: "Ya, fitur batch tracking dan expiry date alert tersedia di semua paket. Sangat penting untuk apotek, toko kosmetik, dan bisnis yang menjual produk dengan masa kadaluarsa." },
    { question: "Berapa biaya per transaksi?", answer: "Tidak ada biaya per transaksi dari POS Solutions. Anda hanya bayar biaya langganan bulanan. Biaya payment gateway (QRIS, kartu kredit) mengikuti tarif masing-masing provider." },
    { question: "Apakah bisa import data dari sistem POS lama?", answer: "Ya, tim kami akan membantu migrasi data produk, pelanggan, dan riwayat transaksi dari sistem lama Anda. Proses migrasi biasanya selesai dalam 1-3 hari." },
    { question: "Bagaimana jika internet mati?", answer: "POS Solutions bisa beroperasi offline. Transaksi dicatat secara lokal dan otomatis sync ke cloud saat internet pulih. Fitur offline tersedia di semua paket." },
  ];
  for (let i = 0; i < posFaqs.length; i++) {
    await prisma.productFaq.create({ data: { ...posFaqs[i], productId: posSolutions.id, sortOrder: i } });
  }
}

async function seedBlogPosts() {
  await prisma.blogPost.deleteMany();
  const posts = [
    { slug: "memanfaatkan-solusi-deskriptif-untuk-pertumbuhan-bisnis", title: "Memanfaatkan Solusi Deskriptif untuk Pertumbuhan Bisnis.", excerpt: "Pelajari bagaimana solusi teknologi inovatif dapat membantu bisnis Anda berkembang di era digital yang kompetitif dan terus berubah.", category: "Bisnis", image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop", author: "James Wilson", authorRole: "Business Consultant", readTime: "5 menit baca", isPublished: true, publishedAt: new Date("2024-06-20"), body: [{ id: "pentingnya-solusi-deskriptif", heading: "Pentingnya Solusi Deskriptif di Era Digital", content: "Di era digital yang berkembang pesat, perusahaan membutuhkan pendekatan berbasis data untuk mengambil keputusan strategis. Solusi deskriptif memungkinkan bisnis memahami apa yang telah terjadi melalui analisis data historis, memberikan gambaran jelas tentang performa operasional.\n\nDengan memanfaatkan teknologi analitik modern, perusahaan dapat mengidentifikasi pola dan tren yang sebelumnya tidak terlihat. Hal ini menjadi fondasi penting untuk strategi pertumbuhan yang berkelanjutan." }, { id: "implementasi-dalam-bisnis", heading: "Implementasi dalam Bisnis Modern", content: "Implementasi solusi deskriptif dimulai dari pengumpulan data yang terstruktur. Setiap titik data dari operasional harian, interaksi pelanggan, hingga performa keuangan perlu dikumpulkan dan diorganisir dengan baik.\n\nDashboard interaktif dan laporan otomatis memungkinkan pemangku kepentingan untuk memantau KPI secara real-time. Visualisasi data yang efektif membantu tim manajemen memahami kondisi bisnis tanpa harus mendalami detail teknis." }, { id: "studi-kasus-pertumbuhan", heading: "Studi Kasus: Pertumbuhan Melalui Data", content: "Sebuah perusahaan ritel menengah di Indonesia berhasil meningkatkan penjualan sebesar 35% setelah mengimplementasikan solusi analitik deskriptif. Mereka menganalisis pola pembelian pelanggan untuk mengoptimalkan stok dan strategi promosi.\n\nPerusahaan logistik lainnya mengurangi biaya operasional hingga 20% dengan memantau dan menganalisis data pengiriman secara deskriptif, mengidentifikasi rute yang tidak efisien dan waktu tunggu yang berlebihan." }, { id: "teknologi-pendukung", heading: "Teknologi Pendukung yang Direkomendasikan", content: "Beberapa teknologi utama yang mendukung solusi deskriptif meliputi platform Business Intelligence seperti Power BI dan Tableau, serta tools data warehousing modern seperti BigQuery dan Snowflake.\n\nIntegrasi dengan sistem ERP dan CRM yang sudah ada menjadi kunci keberhasilan implementasi. API dan middleware modern memungkinkan aliran data yang seamless antar sistem." }, { id: "langkah-memulai", heading: "Langkah Memulai Transformasi", content: "Mulailah dengan audit data yang komprehensif untuk memahami sumber data apa saja yang tersedia. Identifikasi pertanyaan bisnis kunci yang ingin dijawab, lalu pilih tools yang sesuai dengan skala dan kebutuhan organisasi Anda.\n\nPenting untuk membangun budaya data-driven di seluruh organisasi. Pelatihan tim dan penetapan data governance yang jelas akan memastikan keberhasilan jangka panjang dari investasi teknologi ini." }] },
    { slug: "cara-membuat-situs-web-modern-untuk-bisnis-anda", title: "Cara Membuat Situs Web Modern untuk Bisnis Anda.", excerpt: "Panduan lengkap membangun situs web yang responsif, cepat, dan menarik untuk meningkatkan kehadiran digital bisnis Anda.", category: "Teknologi", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop", author: "Sarah Johnson", authorRole: "Frontend Engineer", readTime: "4 menit baca", isPublished: true, publishedAt: new Date("2024-06-20"), body: [{ id: "mengapa-situs-web-modern", heading: "Mengapa Situs Web Modern Penting?", content: "Situs web adalah wajah digital bisnis Anda. Di era di mana 80% konsumen mencari informasi secara online sebelum membeli, memiliki situs web yang modern dan profesional bukan lagi pilihan melainkan keharusan.\n\nSitus web modern tidak hanya tentang tampilan yang menarik, tetapi juga performa, aksesibilitas, dan pengalaman pengguna yang optimal di semua perangkat." }, { id: "memilih-teknologi-tepat", heading: "Memilih Teknologi yang Tepat", content: "Framework modern seperti Next.js, Nuxt, dan Remix menawarkan performa luar biasa dengan fitur seperti server-side rendering dan static site generation. Pemilihan teknologi harus disesuaikan dengan kebutuhan spesifik bisnis Anda.\n\nUntuk bisnis yang membutuhkan update konten berkala, headless CMS seperti Strapi atau Contentful menjadi pilihan ideal yang memisahkan backend dari frontend." }, { id: "desain-responsif", heading: "Prinsip Desain Responsif", content: "Pendekatan mobile-first memastikan situs web Anda terlihat sempurna di semua ukuran layar. Gunakan CSS modern seperti Flexbox dan Grid untuk layout yang fleksibel.\n\nPerhatikan tipografi, whitespace, dan hierarki visual untuk menciptakan pengalaman baca yang nyaman. Konsistensi desain di seluruh halaman membangun kepercayaan dan profesionalisme." }, { id: "optimasi-performa", heading: "Optimasi Performa Web", content: "Core Web Vitals dari Google menjadi standar pengukuran performa website. Fokus pada Largest Contentful Paint (LCP), First Input Delay (FID), dan Cumulative Layout Shift (CLS).\n\nOptimasi gambar, lazy loading, code splitting, dan caching yang tepat dapat meningkatkan kecepatan loading secara signifikan. Tools seperti Lighthouse membantu mengidentifikasi area yang perlu ditingkatkan." }] },
    { slug: "strategi-transformasi-digital-untuk-perusahaan", title: "Strategi Transformasi Digital untuk Perusahaan.", excerpt: "Temukan strategi transformasi digital yang terbukti efektif untuk meningkatkan efisiensi operasional dan daya saing perusahaan Anda.", category: "Teknologi", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop", author: "Michael Chen", authorRole: "Technology Consultant", readTime: "6 menit baca", isPublished: true, publishedAt: new Date("2024-06-20"), body: [{ id: "mengapa-transformasi-digital", heading: "Mengapa Transformasi Digital Penting?", content: "Transformasi digital bukan sekadar tren, melainkan kebutuhan strategis bagi perusahaan yang ingin bertahan dan berkembang. Perusahaan yang lambat beradaptasi berisiko tertinggal dari kompetitor yang lebih agile.\n\nMenurut riset McKinsey, perusahaan yang berhasil melakukan transformasi digital mengalami peningkatan revenue hingga 20-30% dan efisiensi operasional yang signifikan." }, { id: "pilar-transformasi-digital", heading: "Empat Pilar Transformasi Digital", content: "Transformasi digital yang berhasil bertumpu pada empat pilar utama: teknologi, proses, manusia, dan budaya. Keempat pilar ini harus dikembangkan secara bersamaan untuk hasil yang optimal.\n\nTeknologi mencakup infrastruktur cloud, automasi, dan platform digital. Proses melibatkan redesain workflow untuk efisiensi. Manusia membutuhkan upskilling dan change management. Budaya harus mendukung inovasi dan eksperimentasi." }] },
    { slug: "keamanan-siber-melindungi-aset-digital-perusahaan", title: "Keamanan Siber: Melindungi Aset Digital Perusahaan Anda.", excerpt: "Ancaman siber semakin canggih. Pelajari langkah-langkah penting untuk melindungi data dan infrastruktur digital perusahaan Anda dari serangan.", category: "Keamanan", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop", author: "Rina Kusuma", authorRole: "Cybersecurity Specialist", readTime: "7 menit baca", isPublished: true, publishedAt: new Date("2024-07-15"), body: [{ id: "lanskap-ancaman-siber", heading: "Lanskap Ancaman Siber Terkini", content: "Ancaman siber terus berkembang dengan kecepatan yang mengkhawatirkan. Serangan ransomware meningkat 150% dalam dua tahun terakhir, sementara phishing tetap menjadi vektor serangan paling umum dengan tingkat keberhasilan yang signifikan." }] },
    { slug: "mengoptimalkan-infrastruktur-cloud-untuk-skalabilitas", title: "Mengoptimalkan Infrastruktur Cloud untuk Skalabilitas.", excerpt: "Cloud computing menjadi tulang punggung bisnis modern. Ketahui cara mengoptimalkan infrastruktur cloud agar efisien dan mudah diskalakan.", category: "Cloud", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop", author: "Budi Santoso", authorRole: "Cloud Architect", readTime: "5 menit baca", isPublished: true, publishedAt: new Date("2024-07-28"), body: [{ id: "evolusi-cloud-computing", heading: "Evolusi Cloud Computing", content: "Cloud computing telah berevolusi dari sekadar hosting virtual menjadi platform komprehensif yang mendukung seluruh lifecycle aplikasi." }] },
    { slug: "ai-dan-machine-learning-dalam-dunia-bisnis", title: "AI dan Machine Learning dalam Dunia Bisnis.", excerpt: "Kecerdasan buatan mengubah cara perusahaan beroperasi. Temukan aplikasi praktis AI dan ML yang dapat langsung diterapkan di bisnis Anda.", category: "AI", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop", author: "Sarah Johnson", authorRole: "AI Research Lead", readTime: "8 menit baca", isPublished: true, publishedAt: new Date("2024-08-10"), body: [{ id: "revolusi-ai-bisnis", heading: "Revolusi AI dalam Dunia Bisnis", content: "Artificial Intelligence bukan lagi konsep futuristik — ini adalah realitas bisnis saat ini." }] },
    { slug: "panduan-memilih-erp-yang-tepat-untuk-ukm", title: "Panduan Memilih ERP yang Tepat untuk UKM.", excerpt: "Sistem ERP dapat meningkatkan efisiensi operasional secara signifikan. Pelajari cara memilih solusi ERP yang sesuai dengan kebutuhan dan anggaran UKM.", category: "Bisnis", image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop", author: "James Wilson", authorRole: "Business Consultant", readTime: "6 menit baca", isPublished: true, publishedAt: new Date("2024-08-22"), body: [{ id: "apa-itu-erp", heading: "Apa Itu ERP dan Mengapa UKM Membutuhkannya?", content: "Enterprise Resource Planning (ERP) mengintegrasikan seluruh proses bisnis ke dalam satu platform terpadu." }] },
    { slug: "tren-pengembangan-aplikasi-mobile-2024", title: "Tren Pengembangan Aplikasi Mobile 2024.", excerpt: "Dari cross-platform hingga super apps, ketahui tren terbaru dalam pengembangan aplikasi mobile yang wajib diikuti oleh developer dan bisnis.", category: "Teknologi", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop", author: "Dewi Anggraini", authorRole: "Mobile Developer Lead", readTime: "4 menit baca", isPublished: true, publishedAt: new Date("2024-09-05"), body: [{ id: "lanskap-mobile-2024", heading: "Lanskap Mobile Development 2024", content: "Pasar aplikasi mobile terus tumbuh dengan lebih dari 5 juta aplikasi tersedia di App Store dan Play Store." }] },
    { slug: "membangun-tim-it-yang-solid-dan-produktif", title: "Membangun Tim IT yang Solid dan Produktif.", excerpt: "Kunci keberhasilan proyek teknologi terletak pada tim. Pelajari strategi membangun dan mengelola tim IT yang solid, kolaboratif, dan produktif.", category: "Manajemen", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop", author: "Michael Chen", authorRole: "Engineering Manager", readTime: "5 menit baca", isPublished: true, publishedAt: new Date("2024-09-18"), body: [{ id: "fondasi-tim-solid", heading: "Fondasi Tim IT yang Solid", content: "Tim IT yang solid dibangun di atas fondasi kepercayaan, komunikasi terbuka, dan tujuan yang jelas." }] },
  ];

  for (const post of posts) {
    await prisma.blogPost.create({ data: post });
  }

  // ── Industry Pages ──
  await seedIndustryPages();
}

async function seedIndustryPages() {
  for (let idx = 0; idx < industries.length; idx++) {
    const ind = industries[idx];
    const existing = await prisma.industryPage.findUnique({ where: { slug: ind.slug } });
    if (existing) {
      console.log(`⏭️  IndustryPage "${ind.name}" already exists, skipping`);
      continue;
    }

    await prisma.industryPage.create({
      data: {
        slug: ind.slug,
        name: ind.name,
        icon: ind.icon,
        tagline: ind.tagline,
        heroHeading: ind.heroHeading,
        heroHighlight: ind.heroHighlight,
        heroDescription: ind.heroDescription,
        metaTitle: ind.metaTitle || null,
        metaDescription: ind.metaDescription || null,
        isPublished: true,
        sortOrder: idx,
        // Case Study
        caseStudyTag: ind.caseStudy?.tag || null,
        caseStudyTitle: ind.caseStudy?.title || null,
        caseStudyPartnerName: ind.caseStudy?.partnerName || null,
        caseStudyPartnerLogo: ind.caseStudy?.partnerLogo || null,
        caseStudyNarrative: ind.caseStudy?.narrative || null,
        caseStudyVideoUrl: ind.caseStudy?.videoUrl || null,
        caseStudyResults: ind.caseStudy?.results || [],
        // Testimonials
        testimonials: {
          create: ind.testimonials.map((t, i) => ({
            name: t.name,
            role: t.role,
            company: t.company,
            content: t.content,
            sortOrder: i,
          })),
        },
        // Child relations
        challenges: {
          create: ind.challenges.map((c, i) => ({
            icon: c.icon,
            title: c.title,
            description: c.description,
            sortOrder: i,
          })),
        },
        solutions: {
          create: ind.solutions.map((s, i) => ({
            icon: s.icon,
            title: s.title,
            description: s.description,
            features: s.features,
            image: s.image || null,
            sortOrder: i,
          })),
        },
        process: {
          create: ind.process.map((p, i) => ({
            icon: p.icon,
            title: p.title,
            description: p.description,
            sortOrder: i,
          })),
        },
        features: {
          create: ind.features.map((f, i) => ({
            icon: f.icon,
            title: f.title,
            description: f.description,
            sortOrder: i,
          })),
        },
        stats: {
          create: ind.stats.map((s, i) => ({
            value: s.value,
            suffix: s.suffix,
            label: s.label,
            icon: s.icon,
            sortOrder: i,
          })),
        },
        faqs: {
          create: ind.faqs.map((f, i) => ({
            question: f.question,
            answer: f.answer,
            sortOrder: i,
          })),
        },
      },
    });
    console.log(`✅ IndustryPage "${ind.name}" seeded`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
