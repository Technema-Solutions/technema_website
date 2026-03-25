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

  // ── Legal Pages ──
  await prisma.legalPage.deleteMany();
  await prisma.legalPage.createMany({
    data: [
      {
        slug: "syarat-ketentuan",
        title: "Syarat & Ketentuan",
        body: "<h2 id=\"pendahuluan\">Pendahuluan</h2><p>Selamat datang di website Technema Solutions. Dengan mengakses dan menggunakan layanan kami, Anda menyetujui untuk terikat oleh syarat dan ketentuan berikut.</p><h2 id=\"penggunaan-layanan\">Penggunaan Layanan</h2><p>Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan hukum yang berlaku di Republik Indonesia.</p><h2 id=\"hak-kekayaan-intelektual\">Hak Kekayaan Intelektual</h2><p>Seluruh konten di website ini, termasuk teks, grafis, logo, dan perangkat lunak, merupakan milik Technema Solutions dan dilindungi oleh undang-undang hak cipta.</p><h2 id=\"batasan-tanggung-jawab\">Batasan Tanggung Jawab</h2><p>Technema Solutions tidak bertanggung jawab atas kerugian yang timbul akibat penggunaan layanan kami di luar kendali kami.</p><h2 id=\"perubahan-syarat\">Perubahan Syarat</h2><p>Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Perubahan akan berlaku efektif setelah dipublikasikan di halaman ini.</p><h2 id=\"kontak\">Kontak</h2><p>Jika Anda memiliki pertanyaan tentang syarat dan ketentuan ini, silakan hubungi kami melalui halaman kontak.</p>",
      },
      {
        slug: "kebijakan-privasi",
        title: "Kebijakan Privasi",
        body: "<h2 id=\"pendahuluan\">Pendahuluan</h2><p>Technema Solutions berkomitmen untuk melindungi privasi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.</p><h2 id=\"informasi-yang-dikumpulkan\">Informasi yang Dikumpulkan</h2><p>Kami mengumpulkan informasi yang Anda berikan secara sukarela melalui formulir kontak, termasuk nama, email, nomor telepon, dan pesan. Kami juga mengumpulkan data analitik anonim melalui Google Analytics untuk meningkatkan pengalaman pengguna.</p><h2 id=\"penggunaan-informasi\">Penggunaan Informasi</h2><p>Informasi yang dikumpulkan digunakan untuk merespons pertanyaan Anda, meningkatkan layanan kami, dan menganalisis pola penggunaan website secara agregat.</p><h2 id=\"perlindungan-data\">Perlindungan Data</h2><p>Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.</p><h2 id=\"cookie\">Cookie</h2><p>Website kami menggunakan cookie untuk meningkatkan pengalaman browsing. Anda dapat mengatur preferensi cookie melalui banner cookie consent yang muncul saat pertama kali mengunjungi website.</p><h2 id=\"hak-anda\">Hak Anda</h2><p>Anda berhak untuk mengakses, memperbaiki, atau menghapus data pribadi Anda. Hubungi kami melalui halaman kontak untuk mengajukan permintaan terkait data Anda.</p><h2 id=\"perubahan-kebijakan\">Perubahan Kebijakan</h2><p>Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru.</p>",
      },
    ],
  });
  console.log("✅ Legal pages seeded");

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
      tagline: "Kelola Arsip Lebih Cerdas dengan Kekuatan AI",
      description:
        "Arsip Pintar adalah platform manajemen dokumen berbasis cloud yang dilengkapi Kecerdasan Buatan (AI), dirancang khusus untuk instansi pemerintah dan perusahaan di Indonesia. Dengan Smart OCR, AI Chat Assistant, dan sistem keamanan berlapis (NIP + OTP), Arsip Pintar mengubah pencarian dokumen dari berjam-jam menjadi hitungan detik. Kelola, amankan, dan akses arsip digital Anda dari mana saja — dengan kontrol akses penuh dan audit trail yang mendukung kepatuhan regulasi.",
      features: [
        "AI Chat Assistant",
        "Smart OCR",
        "Manajemen Dokumen Terpusat",
        "Keamanan Berlapis (NIP + OTP)",
        "Audit Trail & Pelacakan Aktivitas",
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
      icon: "Bot",
      title: "AI Chat Assistant",
      description:
        "Asisten cerdas untuk arsip Anda. Ajukan pertanyaan dalam bahasa sehari-hari, dapatkan jawaban beserta sumber dokumennya. Analisis dokumen otomatis, pencarian kontekstual berdasarkan isi dan makna, serta ringkasan instan dokumen panjang dalam hitungan detik.",
    },
    {
      icon: "ScanLine",
      title: "Smart OCR Berakurasi Tinggi",
      description:
        "Otomatis membaca dan mengekstraksi teks dari berbagai format: scan, gambar, PDF, dan foto. Memahami layout kompleks termasuk chart, diagram, dan tabel. Hasil langsung siap digunakan untuk pencarian dan indeksasi.",
    },
    {
      icon: "FolderOpen",
      title: "Manajemen Dokumen Terpusat",
      description:
        "Platform intuitif untuk mengelola seluruh siklus hidup dokumen digital. Upload mudah dengan drag & drop, organisasi fleksibel dengan folder dan tag, preview langsung tanpa unduh, serta bulk operations untuk kelola banyak dokumen sekaligus.",
    },
    {
      icon: "ShieldCheck",
      title: "Keamanan Berlapis Standar Enterprise",
      description:
        "Dirancang memenuhi standar keamanan informasi instansi pemerintah dan swasta. Autentikasi ganda dengan NIP + OTP, Role-Based Access Control (RBAC) berdasarkan jabatan, izin granular hingga level dokumen individual, dan session management otomatis.",
    },
  ];
  for (let i = 0; i < arsipFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({
      data: { ...arsipFeatures[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Capabilities
  const arsipCapabilities = [
    { icon: "Bot", title: "AI Chat Assistant", description: "Tanya jawab tentang isi dokumen dalam bahasa natural, seperti chatting biasa" },
    { icon: "ScanLine", title: "Smart OCR", description: "Ekstraksi teks otomatis dari scan, gambar, PDF, chart, dan tabel" },
    { icon: "Search", title: "Pencarian Cerdas", description: "Temukan dokumen dalam hitungan detik berdasarkan isi, bukan sekadar nama file" },
    { icon: "Upload", title: "Upload & Organisasi", description: "Drag & drop dokumen ke dalam folder dan tag yang fleksibel" },
    { icon: "Users", title: "Kontrol Hak Akses (RBAC)", description: "Atur hak akses berdasarkan jabatan: Kepala Bidang, Kepala Seksi, hingga Staf" },
    { icon: "ClipboardList", title: "Audit Trail Lengkap", description: "Log aktivitas siapa melakukan apa, kapan, dan dari mana secara real-time" },
    { icon: "KeyRound", title: "Autentikasi NIP + OTP", description: "Login aman tanpa password — verifikasi ganda dengan NIP dan kode OTP via email" },
    { icon: "Eye", title: "Preview Dokumen", description: "Lihat isi dokumen langsung di browser tanpa perlu mengunduh" },
    { icon: "Layers", title: "Bulk Operations", description: "Kelola banyak dokumen sekaligus: pindah folder, ubah tag, atau hapus massal" },
    { icon: "Filter", title: "Filter & Kategori", description: "Filter berdasarkan tahun, jenis dokumen, kategori, atau unit kerja" },
    { icon: "Globe", title: "Akses dari Mana Saja", description: "Akses arsip dari kantor atau rumah melalui browser — cukup koneksi internet" },
    { icon: "FileBarChart", title: "Laporan Siap Pakai", description: "Laporan audit dan statistik penggunaan komprehensif untuk kebutuhan pemeriksaan" },
  ];
  for (let i = 0; i < arsipCapabilities.length; i++) {
    await prisma.productCapability.create({
      data: { ...arsipCapabilities[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // How It Works
  const arsipSteps = [
    { step: 1, icon: "KeyRound", title: "Login Aman dengan OTP", description: "Masukkan NIP Anda, terima kode OTP via email, dan langsung masuk ke sistem. Tidak perlu mengingat password — lebih aman dan praktis." },
    { step: 2, icon: "Upload", title: "Upload Dokumen", description: "Drag & drop dokumen PDF, Word, scan KTP, akta, surat, dan berbagai format lainnya ke dalam folder yang Anda buat sendiri." },
    { step: 3, icon: "Cpu", title: "AI Memproses Otomatis", description: "Smart OCR mengekstrak teks dari dokumen, AI mengindeks dan mengkategorikan secara otomatis. Hasilnya langsung bisa dicari." },
    { step: 4, icon: "Bot", title: "Cari & Tanya AI Chat", description: "Temukan dokumen dalam 10 detik dengan pencarian cerdas, atau tanya AI Chat: \"Berikan poin penting dari surat edaran sekda 2025?\" — AI menjawab beserta sumber dokumennya." },
  ];
  for (let i = 0; i < arsipSteps.length; i++) {
    await prisma.productStep.create({
      data: { ...arsipSteps[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Use Cases
  const arsipUseCases = [
    { icon: "Building2", title: "Pemerintah Daerah", description: "Digitalisasi arsip aset daerah, PKS, SPK, surat edaran, dan dokumen regulasi. Mendukung kepatuhan terhadap regulasi pengelolaan arsip pemerintah." },
    { icon: "Scale", title: "Kantor Hukum", description: "Kelola ribuan dokumen perkara, kontrak, NDA, dan surat kuasa. Tanya AI Chat untuk mencari klausul spesifik atau perbedaan antar kontrak dalam hitungan detik." },
    { icon: "GraduationCap", title: "Institusi Pendidikan", description: "Arsip data mahasiswa, transkrip, ijazah, dan dokumen akademik secara digital dengan kontrol akses per fakultas dan jurusan." },
    { icon: "Landmark", title: "BUMN & Perusahaan Swasta", description: "Manajemen dokumen korporat, compliance audit, dan pengelolaan kontrak vendor dengan audit trail lengkap dan hak akses terkontrol." },
  ];
  for (let i = 0; i < arsipUseCases.length; i++) {
    await prisma.productUseCase.create({
      data: { ...arsipUseCases[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Impact Stats
  const arsipStats = [
    { value: "10 Detik", label: "Rata-rata Waktu Pencarian Dokumen" },
    { value: "100%", label: "Jejak Audit Digital Tercatat" },
    { value: "99.9%", label: "Uptime & Ketersediaan Sistem" },
  ];
  for (let i = 0; i < arsipStats.length; i++) {
    await prisma.productStat.create({
      data: { ...arsipStats[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Pricing Plans
  const arsipPricing = [
    { name: "Starter", price: "499.000", currency: "Rp", period: "/bulan", description: "Cocok untuk unit kerja kecil yang baru memulai digitalisasi arsip", features: ["Hingga 10.000 dokumen", "10 pengguna", "Pencarian cerdas full-text", "Smart OCR dasar", "Penyimpanan 50 GB", "Autentikasi NIP + OTP", "Dukungan email"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: false },
    { name: "Professional", price: "2.499.000", currency: "Rp", period: "/bulan", description: "Untuk instansi menengah yang membutuhkan AI Chat dan fitur lengkap", features: ["Dokumen tak terbatas", "50 pengguna", "AI Chat Assistant", "Smart OCR lanjutan (tabel & chart)", "Penyimpanan 500 GB", "RBAC & izin granular", "Audit trail lengkap", "API access", "Dukungan prioritas"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Enterprise", price: null, currency: "Rp", period: "/bulan", description: "Solusi khusus untuk organisasi besar dengan kebutuhan compliance dan kustomisasi penuh", features: ["Semua fitur Professional", "Pengguna tak terbatas", "Penyimpanan tak terbatas", "Kustomisasi sesuai kebijakan instansi", "On-premise option", "Dedicated account manager", "SLA 99.9%", "Pelatihan & pendampingan tim"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < arsipPricing.length; i++) {
    await prisma.productPricingPlan.create({
      data: { ...arsipPricing[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // Testimonials
  await prisma.productTestimonial.create({ data: { productId: arsipPintar.id, name: "Ir. Budi Santoso, M.Si", role: "Kepala Bidang Aset Daerah", company: "BKAD Kabupaten Berau", content: "Arsip Pintar mengubah total cara kami mengelola dokumen aset daerah. Dulu petugas bisa menghabiskan berjam-jam mencari satu dokumen PKS, sekarang cukup 10 detik. Fitur AI Chat-nya luar biasa — pegawai baru tinggal tanya, tidak perlu selalu tanya senior.", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: arsipPintar.id, name: "Ahmad Faisal, SH", role: "Managing Partner", company: "Faisal & Rekan Law Firm", content: "Dengan ribuan dokumen perkara yang harus dikelola, Arsip Pintar benar-benar menyelamatkan produktivitas tim kami. Fitur AI Chat bisa langsung menjawab pertanyaan seperti 'apa perbedaan kontrak vendor A dan B?' beserta sumber dokumennya.", sortOrder: 1 } });

  // Integrations
  const arsipIntegrations = [
    { name: "Scanner & Pemindai", icon: "ScanLine" },
    { name: "Email (OTP & Notifikasi)", icon: "Mail" },
    { name: "Microsoft Office", icon: "FileText" },
    { name: "PDF Reader", icon: "FileText" },
    { name: "Cloud Storage", icon: "Cloud" },
    { name: "REST API", icon: "Code" },
  ];
  for (let i = 0; i < arsipIntegrations.length; i++) {
    await prisma.productIntegration.create({
      data: { ...arsipIntegrations[i], productId: arsipPintar.id, sortOrder: i },
    });
  }

  // FAQs
  const arsipFaqs = [
    { question: "Apa itu Arsip Pintar?", answer: "Arsip Pintar adalah sistem penyimpanan dokumen digital yang dilengkapi Kecerdasan Buatan (AI). Bayangkan seperti Google Drive, tapi khusus untuk dokumen instansi Anda — private, tidak di server luar, dan dilengkapi asisten AI yang hafal semua isi dokumen." },
    { question: "Bagaimana sistem keamanan Arsip Pintar?", answer: "Arsip Pintar menggunakan autentikasi ganda NIP + OTP (One-Time Password) yang dikirim ke email terdaftar. Tidak ada password yang perlu diingat — hanya pegawai yang punya akses email terdaftar yang bisa masuk. Ditambah dengan Role-Based Access Control (RBAC) dan izin granular per dokumen." },
    { question: "Apa yang bisa dilakukan AI Chat Assistant?", answer: "AI Chat bisa menjawab pertanyaan tentang isi dokumen dalam bahasa sehari-hari. Contoh: \"Berikan poin penting dari surat edaran sekda 2025?\", \"Cari dokumen hibah aset dari PT XYZ\", atau \"Klausul mana yang perlu direvisi dari kontrak berdasarkan PP 71/2019?\". AI akan mencari di semua dokumen dan memberikan jawaban beserta sumber dokumennya." },
    { question: "Apakah bisa diakses dari luar kantor?", answer: "Ya, Arsip Pintar berbasis cloud dan bisa diakses dari mana saja — kantor maupun rumah — cukup menggunakan browser dan koneksi internet. Tetap aman karena dilindungi sistem OTP." },
    { question: "Berapa lama proses implementasi?", answer: "Implementasi dasar bisa dilakukan dalam 1-2 minggu. Untuk migrasi dokumen dari sistem lama, biasanya memakan waktu 2-4 minggu tergantung volume. Tim Technema Solutions akan mendampingi seluruh proses tanpa biaya tambahan." },
    { question: "Apakah data tetap milik instansi kami?", answer: "Ya, 100% data tetap milik instansi Anda. Kami juga menyediakan opsi on-premise (server di lokasi Anda) untuk paket Enterprise. Anda bisa mengekspor semua dokumen dalam format asli kapan saja." },
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
      tagline: "Tanya Database Anda dalam Bahasa Sehari-hari — AI yang Menjawab dengan Data",
      description: "Databot adalah platform AI database chat yang mengubah pertanyaan bahasa natural menjadi SQL query secara otomatis. Cukup ketik pertanyaan dalam bahasa Indonesia atau Inggris — Databot akan generate SQL, eksekusi query ke database Anda, dan tampilkan hasilnya dalam bentuk tabel, chart interaktif, dan ringkasan otomatis. Mendukung PostgreSQL, MySQL, dan Snowflake, dengan pilihan multi-LLM (OpenAI, Anthropic, Gemini, Ollama). Tanya database langsung dari web, WhatsApp, atau Telegram.",
      features: [
        "AI Chat Database",
        "Multi-Database Support",
        "Visualisasi Otomatis",
        "AI Training Center",
        "Integrasi WhatsApp & Telegram",
      ],
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
    { icon: "Bot", title: "AI Chat Database", description: "Tanya database Anda dalam bahasa sehari-hari — 'Berapa total penjualan bulan ini?' atau 'Produk mana yang paling laris di cabang Jakarta?' — Databot secara otomatis generate SQL, eksekusi query, dan tampilkan hasil dalam tabel, chart interaktif, dan ringkasan bahasa Indonesia. Streaming real-time." },
    { icon: "Database", title: "Multi-Database & Multi-LLM", description: "Hubungkan PostgreSQL, MySQL, atau Snowflake. Pilih AI engine sesuai kebutuhan: OpenAI GPT-4o, Anthropic Claude, Google Gemini, atau Ollama untuk model lokal. Setiap workspace bisa menggunakan LLM yang berbeda." },
    { icon: "BarChart3", title: "Visualisasi & Ringkasan Otomatis", description: "Setiap hasil query otomatis divisualisasikan dalam chart interaktif (Plotly.js) dan diringkas dalam bahasa Indonesia. Tanpa perlu membuat grafik manual — AI memilih jenis chart yang paling tepat untuk data Anda." },
    { icon: "GraduationCap", title: "AI Training Center", description: "Latih AI agar semakin akurat dengan 4 cara: upload DDL schema tabel, tambahkan dokumentasi bisnis, berikan contoh pasangan pertanyaan-SQL, atau auto-ingest langsung dari database. Semakin dilatih, semakin pintar." },
  ];
  for (let i = 0; i < databotFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({ data: { ...databotFeatures[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Capabilities
  const databotCaps = [
    { icon: "Bot", title: "AI Chat Database", description: "Tanya database dalam bahasa natural, AI auto-generate dan eksekusi SQL" },
    { icon: "Database", title: "Multi-Database", description: "Dukungan PostgreSQL, MySQL, dan Snowflake" },
    { icon: "Sparkles", title: "Multi-LLM Provider", description: "Pilih OpenAI, Anthropic, Google Gemini, atau Ollama lokal" },
    { icon: "BarChart3", title: "Visualisasi Otomatis", description: "Chart interaktif Plotly yang dipilih AI secara cerdas" },
    { icon: "GraduationCap", title: "AI Training Center", description: "Latih AI dengan schema, dokumentasi, contoh SQL, atau auto-ingest" },
    { icon: "Users", title: "Workspace Multi-User", description: "Multi-tenant dengan role Admin, Member, dan Viewer" },
    { icon: "MessageCircle", title: "Integrasi WhatsApp", description: "Tanya database langsung dari WhatsApp Business" },
    { icon: "Send", title: "Integrasi Telegram", description: "Query database via Telegram Bot" },
    { icon: "ShieldCheck", title: "SQL Guardrails", description: "Blokir otomatis query berbahaya — hanya SELECT yang diizinkan" },
    { icon: "Zap", title: "Query Cache", description: "Hasil query di-cache Redis untuk respons <1 detik" },
    { icon: "BarChart3", title: "Analytics Dashboard", description: "Statistik total queries, success rate, dan aktivitas terkini" },
    { icon: "Lock", title: "Role & Permissions", description: "RBAC per workspace dengan enkripsi kredensial database" },
  ];
  for (let i = 0; i < databotCaps.length; i++) {
    await prisma.productCapability.create({ data: { ...databotCaps[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Steps
  const databotSteps = [
    { step: 1, icon: "Database", title: "Hubungkan Database", description: "Koneksikan database PostgreSQL, MySQL, atau Snowflake Anda. Kredensial dienkripsi dengan Fernet — aman tersimpan." },
    { step: 2, icon: "GraduationCap", title: "Latih AI Anda", description: "Upload DDL schema tabel, tambahkan dokumentasi bisnis, berikan contoh Q&A SQL, atau gunakan auto-ingest untuk mengekstrak schema langsung dari database." },
    { step: 3, icon: "Bot", title: "Tanya dalam Bahasa Natural", description: "Ketik pertanyaan dalam bahasa Indonesia atau Inggris — 'Berapa revenue bulan lalu per cabang?' — Databot auto-generate SQL, eksekusi, dan tampilkan hasilnya." },
    { step: 4, icon: "BarChart3", title: "Lihat Visualisasi & Ringkasan", description: "Hasil query ditampilkan dalam tabel data, chart interaktif otomatis, dan ringkasan bahasa Indonesia. Bisa juga tanya langsung via WhatsApp atau Telegram." },
  ];
  for (let i = 0; i < databotSteps.length; i++) {
    await prisma.productStep.create({ data: { ...databotSteps[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Use Cases
  const databotUseCases = [
    { icon: "TrendingUp", title: "Bisnis & Manajemen", description: "Tanya langsung data penjualan, revenue, dan KPI bisnis tanpa perlu keahlian SQL. Pemilik bisnis bisa ambil keputusan lebih cepat berdasarkan data real-time." },
    { icon: "Calculator", title: "Tim Keuangan", description: "Query laporan keuangan, arus kas, hutang piutang, dan analisis biaya via chat. Hasilnya langsung dalam bentuk tabel dan chart yang siap dipresentasikan." },
    { icon: "Package", title: "Operasional", description: "Pantau stok barang, status pesanan, dan performa operasional. Bisa tanya langsung dari WhatsApp kapan saja tanpa harus buka laptop." },
    { icon: "BarChart3", title: "Data Team", description: "Kurangi backlog query request dari tim bisnis. Dengan Databot, stakeholder bisa self-service analytics — data team fokus ke analisis yang lebih strategis." },
  ];
  for (let i = 0; i < databotUseCases.length; i++) {
    await prisma.productUseCase.create({ data: { ...databotUseCases[i], productId: databot.id, sortOrder: i } });
  }

  // Databot Stats, Pricing, Testimonials, Integrations, FAQs
  const databotStats = [
    { value: "<1 Detik", label: "Waktu Respons Query (Cache Hit)" },
    { value: "3", label: "Database Didukung (PostgreSQL, MySQL, Snowflake)" },
    { value: "4", label: "Cara Melatih AI Anda" },
  ];
  for (let i = 0; i < databotStats.length; i++) {
    await prisma.productStat.create({ data: { ...databotStats[i], productId: databot.id, sortOrder: i } });
  }

  const databotPricing = [
    { name: "Starter", price: null, currency: "Rp", period: "", description: "Untuk tim kecil yang ingin mulai tanya database tanpa SQL", features: ["1 workspace", "1 database connection", "AI Chat Database", "Visualisasi otomatis", "AI Training (schema & docs)", "Query cache", "3 pengguna", "Dukungan email"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
    { name: "Professional", price: null, currency: "Rp", period: "", description: "Untuk perusahaan yang butuh multi-workspace dan integrasi messaging", features: ["Multi-workspace", "Multi-database connection", "Multi-LLM provider", "Integrasi WhatsApp & Telegram", "AI Training lengkap (4 cara)", "RBAC per workspace", "Analytics dashboard", "20 pengguna", "Dukungan prioritas"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: true },
    { name: "Enterprise", price: null, currency: "Rp", period: "", description: "Solusi on-premise dengan kustomisasi penuh untuk organisasi besar", features: ["Semua fitur Professional", "On-premise deployment", "Pengguna tak terbatas", "Workspace tak terbatas", "Custom LLM (Ollama lokal)", "Dedicated support engineer", "Pelatihan tim", "SLA 99.9%"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < databotPricing.length; i++) {
    await prisma.productPricingPlan.create({ data: { ...databotPricing[i], productId: databot.id, sortOrder: i } });
  }

  await prisma.productTestimonial.create({ data: { productId: databot.id, name: "Budi Santoso", role: "Head of Business Intelligence", company: "PT. Retail Nusantara", content: "Databot mengubah cara tim BI kami bekerja. Manajer cabang sekarang bisa tanya langsung 'berapa penjualan hari ini per kategori?' tanpa harus request ke tim data. Query backlog kami turun drastis.", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: databot.id, name: "Lisa Permata", role: "CFO", company: "PT. Sejahtera Group", content: "Saya bisa tanya laporan keuangan langsung dari WhatsApp saat sedang di luar kantor. Databot langsung jawab dengan data dan chart yang siap pakai. Pengambilan keputusan jadi jauh lebih cepat.", sortOrder: 1 } });

  const databotIntegrations = [
    { name: "PostgreSQL", icon: "Database" }, { name: "MySQL", icon: "Database" }, { name: "Snowflake", icon: "Database" }, { name: "WhatsApp", icon: "MessageCircle" }, { name: "Telegram", icon: "Send" }, { name: "Multi-LLM (OpenAI, Anthropic, Gemini, Ollama)", icon: "Brain" },
  ];
  for (let i = 0; i < databotIntegrations.length; i++) {
    await prisma.productIntegration.create({ data: { ...databotIntegrations[i], productId: databot.id, sortOrder: i } });
  }

  const databotFaqs = [
    { question: "Apa itu Databot?", answer: "Databot adalah platform AI database chat yang memungkinkan Anda bertanya ke database menggunakan bahasa sehari-hari (Indonesia atau Inggris). AI akan otomatis mengubah pertanyaan Anda menjadi SQL query, mengeksekusinya, dan menampilkan hasilnya lengkap dengan visualisasi chart dan ringkasan — tanpa perlu menulis kode SQL sama sekali." },
    { question: "Database apa saja yang didukung?", answer: "Saat ini Databot mendukung tiga database: PostgreSQL, MySQL, dan Snowflake. Anda bisa menghubungkan satu atau lebih database ke workspace Anda dan bertanya lintas sumber data." },
    { question: "Apakah data saya aman?", answer: "Sangat aman. Databot menerapkan SQL Guardrails yang memblokir query berbahaya seperti DROP, DELETE, INSERT — hanya query READ-ONLY yang dieksekusi. Kredensial database dienkripsi dengan Fernet encryption, autentikasi menggunakan JWT, dan akses dikontrol melalui sistem RBAC (Admin, Member, Viewer) per workspace." },
    { question: "Bisa diakses dari WhatsApp atau Telegram?", answer: "Ya. Databot memiliki integrasi langsung dengan WhatsApp dan Telegram. Anda bisa mengirim pertanyaan tentang data Anda langsung dari aplikasi chat tersebut dan mendapatkan jawaban beserta ringkasannya secara real-time." },
    { question: "Apakah perlu keahlian SQL untuk menggunakan Databot?", answer: "Tidak perlu sama sekali. Cukup ketik pertanyaan dalam bahasa natural seperti 'Berapa total penjualan bulan ini per kategori?' dan Databot akan otomatis generate SQL, eksekusi, dan tampilkan hasilnya dalam tabel, chart, serta ringkasan yang mudah dipahami." },
    { question: "LLM (AI model) apa yang digunakan?", answer: "Databot mendukung multi-LLM provider: OpenAI (GPT-4o), Anthropic (Claude), Google Gemini, dan Ollama untuk deployment lokal. Anda bisa memilih provider sesuai kebutuhan dan preferensi di setiap workspace." },
  ];
  for (let i = 0; i < databotFaqs.length; i++) {
    await prisma.productFaq.create({ data: { ...databotFaqs[i], productId: databot.id, sortOrder: i } });
  }

  // ── Risto POS ──
  const ristoPOS = await prisma.product.create({
    data: {
      slug: "risto-pos",
      name: "Risto POS",
      tagline: "Tingkatkan Profitabilitas Bisnis F&B Anda — Bayar 1x Seumur Hidup!",
      description: "Risto POS adalah sistem Point of Sale (POS) berbasis cloud yang dirancang khusus untuk bisnis makanan dan minuman (F&B). Dengan 26 fitur komprehensif, Risto POS membantu Anda mengelola seluruh aspek bisnis — mulai dari pemesanan, pembayaran, inventaris, hingga laporan keuangan — dengan mudah dan efisien. Tersedia di Google Playstore dan dapat diakses dari HP, tablet, laptop, ataupun komputer. Cukup bayar 1x seumur hidup, tanpa biaya langganan bulanan.",
      features: [
        "Dasbor Global & Multi Outlet",
        "Manajemen Meja & Menu",
        "Point of Sale & Order Tracking",
        "8 Laporan Keuangan",
        "SDM & Penggajian",
        "Unlimited User",
      ],
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
    { icon: "Store", title: "Dasbor Global & Multi Outlet", description: "Pantau kinerja bisnis secara keseluruhan dan per outlet dengan dasbor yang komprehensif. Kontrol semua cabang restoran dalam 1 akun dan 1 login — tanpa perlu berganti aplikasi. Dapat menggunakan lebih dari 1 outlet dalam satu aplikasi." },
    { icon: "UtensilsCrossed", title: "Modul Menu & Manajemen Meja", description: "Buat, edit, dan kategorikan menu restoran dengan mudah. Atur tata letak meja secara visual, alokasikan meja untuk pelanggan, dan pantau status setiap meja secara real-time." },
    { icon: "ShoppingCart", title: "Point of Sale & Order Tracking", description: "Proses transaksi penjualan dengan cepat dan akurat, termasuk split bill. Lacak status pesanan pelanggan dari pemesanan hingga penyajian, dan lihat riwayat lengkap setiap transaksi." },
    { icon: "FileBarChart", title: "8 Laporan Keuangan & SDM", description: "Dapatkan laporan keuangan komprehensif untuk menganalisis kinerja bisnis F&B Anda. Dilengkapi modul SDM & Penggajian untuk mengelola karyawan, absensi, gaji, dan penggajian dalam satu platform." },
  ];
  for (let i = 0; i < ristoFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({ data: { ...ristoFeatures[i], productId: ristoPOS.id, sortOrder: i } });
  }

  // Risto POS Capabilities
  const ristoCaps = [
    { icon: "LayoutGrid", title: "Dasbor Global & Outlet", description: "Pantau bisnis keseluruhan dan per outlet dengan mudah" },
    { icon: "UtensilsCrossed", title: "Modul Menu", description: "Buat, edit, dan kategorikan menu restoran Anda" },
    { icon: "LayoutGrid", title: "Manajemen Meja", description: "Atur tata letak meja, alokasikan, dan pantau status real-time" },
    { icon: "ShoppingCart", title: "Point of Sale (POS)", description: "Proses transaksi penjualan cepat dan akurat, termasuk split bill" },
    { icon: "ClipboardList", title: "Pencatatan Pesanan", description: "Lacak status pesanan dari pemesanan hingga penyajian" },
    { icon: "Clock", title: "Riwayat Pesanan", description: "Lihat riwayat pesanan pelanggan secara lengkap" },
    { icon: "Users", title: "Pelanggan & Pemasok", description: "Kelola data pelanggan dan pemasok, serta catat riwayat" },
    { icon: "Package", title: "Modul Pembelian & Beban", description: "Catat pembelian bahan baku dan kelola beban operasional" },
    { icon: "UserCog", title: "SDM & Penggajian", description: "Kelola karyawan, absensi, gaji, dan penggajian" },
    { icon: "FileBarChart", title: "8 Laporan Keuangan", description: "Laporan keuangan komprehensif untuk analisis bisnis F&B" },
    { icon: "ShieldCheck", title: "Role & Permissions", description: "Atur hak akses pengguna berdasarkan peran di restoran" },
    { icon: "UserPlus", title: "Unlimited User", description: "Buat akun pengguna sebanyak apapun tanpa biaya tambahan" },
  ];
  for (let i = 0; i < ristoCaps.length; i++) {
    await prisma.productCapability.create({ data: { ...ristoCaps[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoSteps = [
    { step: 1, icon: "Download", title: "Download & Pilih Paket", description: "Download Risto POS melalui Google Playstore atau akses web technemasolutions.co.id. Pilih paket yang sesuai kebutuhan bisnis F&B Anda — cukup bayar 1x seumur hidup." },
    { step: 2, icon: "MessageCircle", title: "Aktivasi & Pelatihan", description: "Customer Service akan menghubungi via WhatsApp untuk memberikan akses akun Risto POS Anda. Jadwal pelatihan diatur melalui Online Meeting atau Video Tutorial." },
    { step: 3, icon: "Settings", title: "Setup Menu & Meja", description: "Masukkan menu restoran, atur tata letak meja, buat akun pengguna unlimited, dan atur Role & Permissions sesuai peran karyawan." },
    { step: 4, icon: "Rocket", title: "Mulai Berjualan", description: "Langsung gunakan semua fitur Risto POS untuk kelola bisnis F&B Anda dari HP, tablet, atau komputer. Dapatkan FREE Maintenance dan support 13/7." },
  ];
  for (let i = 0; i < ristoSteps.length; i++) {
    await prisma.productStep.create({ data: { ...ristoSteps[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoUseCases = [
    { icon: "UtensilsCrossed", title: "Restoran & Rumah Makan", description: "Kelola pemesanan, manajemen meja, pencatatan pesanan, dan laporan keuangan restoran Anda secara lengkap dalam satu platform." },
    { icon: "Coffee", title: "Kafe & Coffee Shop", description: "Proses transaksi cepat, kelola menu minuman dan makanan, serta pantau performa bisnis kafe dari mana saja via HP atau tablet." },
    { icon: "Store", title: "Franchise & Multi Outlet F&B", description: "Kontrol semua cabang restoran dalam 1 akun dan 1 login. Dasbor Global memungkinkan pemilik memantau semua outlet secara real-time." },
    { icon: "Truck", title: "Catering & Cloud Kitchen", description: "Pencatatan pesanan terorganisir, manajemen pelanggan & pemasok, serta modul pembelian untuk kelola bahan baku dan beban operasional." },
  ];
  for (let i = 0; i < ristoUseCases.length; i++) {
    await prisma.productUseCase.create({ data: { ...ristoUseCases[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoStats = [
    { value: "26", label: "Fitur Komprehensif untuk F&B" },
    { value: "8", label: "Laporan Keuangan Tersedia" },
    { value: "1x", label: "Bayar Seumur Hidup" },
  ];
  for (let i = 0; i < ristoStats.length; i++) {
    await prisma.productStat.create({ data: { ...ristoStats[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoPricing = [
    { name: "Dasar", price: "3.750.000", currency: "Rp", period: "/lifetime", description: "Bayar 1x seumur hidup — cocok untuk restoran kecil dan kafe", features: ["Dashboard Global & Outlet", "Modul Menu", "Table Management", "Point of Sale (POS)", "Order Tracking & History", "Modul Pelanggan", "8 Laporan Keuangan", "Role & Permissions", "Unlimited User", "Support 13/7"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: false },
    { name: "Standar", price: "4.600.000", currency: "Rp", period: "/lifetime", description: "Bayar 1x seumur hidup — untuk restoran yang butuh modul pembelian dan SDM", features: ["Semua fitur Dasar", "Modul Pemasok", "Modul Pembelian", "Modul Beban", "SDM & Penggajian", "Support 13/7"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Premium", price: "5.560.000", currency: "Rp", period: "/lifetime", description: "Bayar 1x seumur hidup — solusi lengkap dengan integrasi online food dan order mandiri", features: ["Semua fitur Standar", "Import/Integrasi Data Online Food", "Order Mandiri", "FREE Maintenance", "Support 13/7"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: false },
    { name: "On-Premise", price: "7.500.000", currency: "Rp", period: "/tahun", description: "Server dan domain sendiri — dikelola oleh tim Technema", features: ["Semua fitur Premium", "Server & domain sendiri", "Dikelola tim Technema", "Nama domain dapat diganti", "Support 13/7"], ctaLabel: "Hubungi Kami", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < ristoPricing.length; i++) {
    await prisma.productPricingPlan.create({ data: { ...ristoPricing[i], productId: ristoPOS.id, sortOrder: i } });
  }

  await prisma.productTestimonial.create({ data: { productId: ristoPOS.id, name: "Chef Arman", role: "Owner & Head Chef", company: "Warung Nusantara (3 Cabang)", content: "Dengan Risto POS, saya bisa kontrol 3 cabang warung dari 1 akun saja. Modul menu sangat mudah digunakan, dan laporan keuangan membantu saya mengambil keputusan lebih cepat. Yang paling penting — bayar 1x dan tidak ada biaya bulanan!", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: ristoPOS.id, name: "Dewi Anggraini", role: "Pemilik", company: "Kopi Kenangan Lokal", content: "Risto POS sangat cocok untuk bisnis kafe kami. Fitur manajemen meja, order tracking, dan split bill sangat membantu di jam-jam sibuk. Tim support juga responsif — available 13/7 tanpa biaya tambahan.", sortOrder: 1 } });

  const ristoIntegrations = [
    { name: "Google Playstore", icon: "Smartphone" }, { name: "Browser Web", icon: "Globe" }, { name: "HP & Tablet", icon: "Smartphone" }, { name: "Laptop & Komputer", icon: "Monitor" }, { name: "Online Food Platform", icon: "ShoppingCart" }, { name: "Printer Struk", icon: "Printer" },
  ];
  for (let i = 0; i < ristoIntegrations.length; i++) {
    await prisma.productIntegration.create({ data: { ...ristoIntegrations[i], productId: ristoPOS.id, sortOrder: i } });
  }

  const ristoFaqs = [
    { question: "Apa itu Risto POS?", answer: "Risto POS adalah sistem Point of Sale (POS) berbasis cloud yang dirancang khusus untuk bisnis makanan dan minuman (F&B). Dengan 26 fitur komprehensif, Risto POS membantu mengelola seluruh aspek bisnis mulai dari pemesanan, pembayaran, inventaris, hingga laporan keuangan." },
    { question: "Apakah harus bayar langganan bulanan?", answer: "Tidak! Pembayaran Risto POS dilakukan HANYA 1x Seumur Hidup dan tidak ada biaya bulanan aplikasi. Mulai dari Rp 3.750.000 per outlet. Di tahun ke-2 dan seterusnya, hanya perlu membayar Rp 350.000/tahun untuk biaya pemeliharaan server." },
    { question: "Bisa diakses dari perangkat apa saja?", answer: "Risto POS dapat diakses dari handphone, tablet, laptop, ataupun komputer. Tersedia juga di Google Playstore. Cukup gunakan browser untuk mengakses dari perangkat apapun." },
    { question: "Apakah bisa Multi Outlet?", answer: "Ya! Risto POS mendukung Multi Outlet — Anda dapat menggunakan lebih dari 1 outlet di dalam 1 aplikasi dan 1 login. Ini berbeda dengan kompetitor seperti Moka dan Majoo yang tidak menyediakan fitur ini." },
    { question: "Apakah bisa integrasi dengan platform online food?", answer: "Ya, pada paket Premium tersedia fitur Import/Integrasi Data Online Food yang memungkinkan data dari platform delivery online terintegrasi ke dalam sistem Risto POS Anda." },
    { question: "Bagaimana cara mendapatkan Risto POS?", answer: "Cukup akses web technemasolutions.co.id dan pilih paket yang diinginkan. Customer Service kami akan menghubungi via WhatsApp untuk memberikan akses akun dan mengatur jadwal pelatihan melalui Online Meeting atau Video Tutorial." },
    { question: "Apakah ada support setelah pembelian?", answer: "Ya, setiap pelanggan Risto POS mendapatkan support 13/7 dan FREE Maintenance tanpa biaya tambahan. Tim kami siap membantu troubleshooting dan pelatihan penggunaan." },
  ];
  for (let i = 0; i < ristoFaqs.length; i++) {
    await prisma.productFaq.create({ data: { ...ristoFaqs[i], productId: ristoPOS.id, sortOrder: i } });
  }

  // ── POS Solutions ──
  const posSolutions = await prisma.product.create({
    data: {
      slug: "pos-solutions",
      name: "POS Solutions",
      tagline: "Bayar Sekali, Pakai Berkali-kali!",
      description: "POS Solutions adalah aplikasi point-of-sale berbasis website dari Technema Solutions yang mendukung seluruh kegiatan keuangan dan operasional bisnis Anda. Dengan 40+ fitur lengkap, fitur Multi Outlet untuk mengontrol semua cabang dalam 1 akun, kasir mode offline, serta 21 laporan keuangan — kelola bisnis Anda kapan saja dan di mana saja melalui HP, tablet, laptop, ataupun komputer. Cukup bayar 1x, tanpa biaya langganan.",
      features: [
        "Multi Outlet",
        "Kasir Mode Offline",
        "21 Laporan Keuangan",
        "40+ Fitur Lengkap",
        "Akses Multi-Perangkat",
      ],
      icon: "Monitor",
      logo: "/images/product_logo/pos_solutions.png",
      category: "pos",
      isPublished: true,
      sortOrder: 3,
      relatedSlugs: ["risto-pos", "arsip-pintar", "databot"],
    },
  });

  const posFeatures = [
    { icon: "Store", title: "Multi Outlet dalam 1 Akun", description: "Mudah mengontrol semua cabang bisnis Anda dalam 1 akun yang sama, tanpa perlu berpindah ke akun cabang lain. Setiap cabang bisnis akan terintegrasi satu sama lain — pantau perkembangan bisnis di semua cabang secara real-time." },
    { icon: "ShoppingCart", title: "Penjualan & Kasir Mode Offline", description: "Catat penjualan dengan mudah dan cepat menggunakan perangkat apapun, mulai dari HP, tablet, ataupun komputer. Meskipun berbasis web, terdapat fitur kasir mode offline yang memaksimalkan kinerja kasir tanpa terhubung ke internet — dan owner tetap bisa monitoring." },
    { icon: "FileBarChart", title: "21 Laporan Keuangan Lengkap", description: "Dapatkan akses instan ke lebih dari 21 laporan keuangan yang membantu Anda menganalisis kinerja bisnis dengan mudah. Dari statistik keuangan komprehensif hingga laporan penjualan, pembelian, stok, dan laba rugi." },
    { icon: "Settings", title: "Dapat Dikustomisasi", description: "POS Solutions dapat dikustomisasi berdasarkan kebutuhan bisnis Anda. Mulai dari koneksi ke Giro, penambahan fitur khusus, hingga penyesuaian tampilan sesuai branding toko Anda." },
  ];
  for (let i = 0; i < posFeatures.length; i++) {
    await prisma.productFeatureHighlight.create({ data: { ...posFeatures[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posCaps = [
    { icon: "Store", title: "Multi Outlet", description: "Kontrol semua cabang bisnis dalam 1 akun sekaligus" },
    { icon: "BarChart3", title: "Statistik Keuangan", description: "Statistik keuangan komprehensif untuk pantau bisnis di semua cabang" },
    { icon: "ShoppingCart", title: "Penjualan", description: "Catat penjualan dengan mudah dari perangkat apapun" },
    { icon: "Package", title: "Pembelian", description: "Proses pembelian cepat dan efisien dalam satu platform" },
    { icon: "FileText", title: "Penawaran", description: "Buat dan kirim penawaran ke pelanggan lengkap dengan rincian produk dan harga" },
    { icon: "ClipboardList", title: "Penyesuaian Stok", description: "Lakukan penyesuaian stok cepat dan akurat agar inventaris selalu up-to-date" },
    { icon: "FileBarChart", title: "Laporan Keuangan", description: "Akses instan ke 21 laporan keuangan untuk analisis bisnis" },
    { icon: "RotateCcw", title: "Pencatatan Retur", description: "Kelola proses retur dengan mudah dan perbarui stok secara otomatis" },
    { icon: "Users", title: "Pelanggan & Pemasok", description: "Catat dan kelola informasi pelanggan dan pemasok dengan mudah" },
    { icon: "FolderKanban", title: "Manajemen Proyek", description: "Kelola perencanaan dan pelaksanaan proyek, lacak kemajuan dan sumber daya" },
    { icon: "UserCog", title: "Manajemen Akses Akun", description: "Kelola akses dan izin pengguna dengan profil unik untuk keamanan" },
    { icon: "Calculator", title: "Modul Akuntansi", description: "Pencatatan dan pelaporan keuangan komprehensif, kelola transaksi dan arus kas" },
  ];
  for (let i = 0; i < posCaps.length; i++) {
    await prisma.productCapability.create({ data: { ...posCaps[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posSteps = [
    { step: 1, icon: "CreditCard", title: "Bayar Sekali", description: "Pilih paket yang sesuai kebutuhan bisnis Anda (Dasar, Standar, atau Premium). Bayar 1 kali saja per outlet — tanpa biaya langganan bulanan." },
    { step: 2, icon: "Store", title: "Setup Outlet & Pengguna", description: "Tambahkan outlet, buat akun pengguna unlimited, dan atur hak akses sesuai peran karyawan. Aplikasi langsung bisa digunakan via browser." },
    { step: 3, icon: "ShoppingCart", title: "Mulai Berjualan", description: "Catat penjualan dari HP, tablet, atau komputer. Fitur kasir mode offline memastikan transaksi tetap berjalan meski tanpa internet." },
    { step: 4, icon: "BarChart3", title: "Pantau & Kembangkan", description: "Gunakan 21 laporan keuangan untuk menganalisis performa bisnis. Pantau semua cabang secara real-time dari 1 akun." },
  ];
  for (let i = 0; i < posSteps.length; i++) {
    await prisma.productStep.create({ data: { ...posSteps[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posUseCases = [
    { icon: "ShoppingCart", title: "Minimarket", description: "Meskipun berbasis web, terdapat fitur kasir mode offline yang memaksimalkan kinerja kasir tanpa terhubung ke internet, dan owner tetap bisa monitoring." },
    { icon: "Wind", title: "Vape Store", description: "Dapat dibuka melalui handphone, tablet, ataupun komputer sehingga pengguna bisa lebih fleksibel untuk melakukan pencatatan transaksi." },
    { icon: "Pill", title: "Apotek", description: "Memudahkan untuk mengontrol stok di mana saja dan kapan saja karena berbasis web. Dapatkan notifikasi untuk obat yang sudah hampir kehabisan stok." },
    { icon: "Settings", title: "Toko Sparepart", description: "Kontrol semua cabang toko sparepart Anda dengan hanya 1 akun POS Solutions tanpa ribet berganti akun. Dengan fitur Multi Outlet, pemilik dapat mengontrol semua toko sekaligus." },
  ];
  for (let i = 0; i < posUseCases.length; i++) {
    await prisma.productUseCase.create({ data: { ...posUseCases[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posStats = [
    { value: "40+", label: "Fitur Lengkap untuk Bisnis Anda" },
    { value: "21", label: "Laporan Keuangan Tersedia" },
    { value: "100%", label: "Kepercayaan Pelanggan" },
  ];
  for (let i = 0; i < posStats.length; i++) {
    await prisma.productStat.create({ data: { ...posStats[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posPricing = [
    { name: "Dasar", price: "3.000.000", currency: "Rp", period: "/outlet", description: "Bayar 1x — cocok untuk toko tunggal dengan kebutuhan POS dasar", features: ["Statistik Keuangan", "Penjualan & Kasir Offline", "Pembelian", "Laporan Keuangan", "Pelanggan & Pemasok", "Akun Pengguna Unlimited", "Manajemen Akses Akun", "Support 10/7"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: false },
    { name: "Standar", price: "4.750.000", currency: "Rp", period: "/outlet", description: "Bayar 1x — untuk bisnis yang butuh fitur stok dan retur lebih lengkap", features: ["Semua fitur Dasar", "Penawaran", "Penyesuaian Stok", "Pencatatan Retur", "Multi Outlet", "Support 10/7"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: true },
    { name: "Premium", price: "7.500.000", currency: "Rp", period: "/outlet", description: "Bayar 1x — solusi lengkap dengan semua 15 fitur untuk bisnis besar", features: ["Semua fitur Standar", "Manajemen Proyek", "Modul Akuntansi", "Notifikasi E-mail", "SDM & Penggajian", "Kustomisasi", "Support 10/7"], ctaLabel: "Mulai Sekarang", ctaHref: "/kontak", isPopular: false },
  ];
  for (let i = 0; i < posPricing.length; i++) {
    await prisma.productPricingPlan.create({ data: { ...posPricing[i], productId: posSolutions.id, sortOrder: i } });
  }

  await prisma.productTestimonial.create({ data: { productId: posSolutions.id, name: "Hendra Wijaya", role: "Pemilik", company: "Toko Sparepart Motor (3 Cabang)", content: "Dengan fitur Multi Outlet, saya bisa kontrol semua 3 cabang toko sparepart dari 1 akun saja. Tidak perlu ribet berganti akun. Stok semua cabang terpantau real-time dari HP.", sortOrder: 0 } });
  await prisma.productTestimonial.create({ data: { productId: posSolutions.id, name: "Apt. Sari Indah", role: "Pemilik", company: "Apotek Sehat Selalu", content: "POS Solutions sangat membantu mengontrol stok obat di apotek kami. Notifikasi stok yang hampir habis membuat kami tidak pernah kehabisan obat penting. Dan yang terbaik — bayar 1x tanpa langganan!", sortOrder: 1 } });

  const posIntegrations = [
    { name: "Browser (Chrome, Firefox, Safari)", icon: "Globe" }, { name: "HP & Tablet", icon: "Smartphone" }, { name: "Laptop & Komputer", icon: "Monitor" }, { name: "Printer Struk", icon: "Printer" }, { name: "Barcode Scanner", icon: "ScanLine" }, { name: "E-mail Notifikasi", icon: "Mail" },
  ];
  for (let i = 0; i < posIntegrations.length; i++) {
    await prisma.productIntegration.create({ data: { ...posIntegrations[i], productId: posSolutions.id, sortOrder: i } });
  }

  const posFaqs = [
    { question: "Apa itu POS Solutions?", answer: "POS Solutions adalah aplikasi point-of-sale berbasis website dari Technema Solutions. Fitur yang ada di dalamnya mendukung seluruh kegiatan keuangan dan operasional bisnis dari berbagai lini, dengan 40+ fitur dan 21 laporan keuangan." },
    { question: "Apakah harus bayar langganan bulanan?", answer: "Tidak! POS Solutions menggunakan sistem bayar sekali, pakai berkali-kali. Cukup 1x bayar per outlet, tanpa biaya langganan bulanan. Harga mulai dari Rp 3.000.000/outlet." },
    { question: "Bagaimana jika internet mati?", answer: "POS Solutions memiliki fitur kasir mode offline. Kasir tetap bisa melakukan transaksi tanpa terhubung ke internet, dan data akan otomatis tersinkronisasi saat koneksi internet pulih. Owner tetap bisa monitoring." },
    { question: "Bisa diakses dari perangkat apa saja?", answer: "POS Solutions berbasis web sehingga bisa dibuka melalui handphone, tablet, laptop, ataupun komputer menggunakan browser. Tidak perlu install aplikasi khusus." },
    { question: "Apa itu fitur Multi Outlet?", answer: "Fitur Multi Outlet memungkinkan Anda mengontrol semua cabang bisnis dalam 1 akun sekaligus, tanpa perlu login ke akun cabang bisnis lainnya. Setiap cabang terintegrasi dan stok bisa dipantau secara real-time." },
    { question: "Apakah POS Solutions bisa dikustomisasi?", answer: "Ya, POS Solutions dapat dikustomisasi berdasarkan kebutuhan pelanggan. Contoh: koneksi ke Giro, penambahan fitur khusus, dan penyesuaian lainnya. Hubungi tim kami untuk konsultasi." },
    { question: "Bagaimana dengan support?", answer: "Setiap pelanggan POS Solutions mendapatkan support penuh 10/7 tanpa dipungut biaya apapun. Tim kami siap membantu setup, pelatihan, dan troubleshooting." },
  ];
  for (let i = 0; i < posFaqs.length; i++) {
    await prisma.productFaq.create({ data: { ...posFaqs[i], productId: posSolutions.id, sortOrder: i } });
  }
}

function calcSeedReadTime(sections: { heading: string; content: string }[]): string {
  const allText = sections.map((s) => `${s.heading} ${s.content}`).join(" ");
  const words = allText.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} menit baca`;
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
    const body = post.body as { heading: string; content: string }[];
    await prisma.blogPost.create({ data: { ...post, readTime: calcSeedReadTime(body) } });
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
