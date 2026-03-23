export interface IndustryChallenge {
  icon: string;
  title: string;
  description: string;
}

export interface IndustrySolution {
  icon: string;
  title: string;
  description: string;
  features: string[];
  image?: string;
}

export interface IndustryCaseStudyData {
  tag: string;
  title: string;
  partnerName: string;
  partnerLogo: string;
  narrative: string;
  videoUrl?: string;
  results: { value: string; label: string }[];
}

export interface IndustryProcessStep {
  step: number;
  icon: string;
  title: string;
  description: string;
}

export interface IndustryFeature {
  icon: string;
  title: string;
  description: string;
}

export interface IndustryStat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface IndustryTestimonialData {
  content: string;
  name: string;
  role: string;
  company: string;
}

export interface IndustryFaqItem {
  question: string;
  answer: string;
}

export interface IndustryDetail {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  heroHeading: string;
  heroHighlight: string;
  heroDescription: string;
  metaTitle: string;
  metaDescription: string;
  challenges: IndustryChallenge[];
  solutions: IndustrySolution[];
  caseStudy: IndustryCaseStudyData | null;
  process: IndustryProcessStep[];
  features: IndustryFeature[];
  stats: IndustryStat[];
  testimonials: IndustryTestimonialData[];
  faqs: IndustryFaqItem[];
}

export const industries: IndustryDetail[] = [
  {
    slug: "kesehatan",
    name: "Kesehatan",
    icon: "HeartPulse",
    tagline: "Solusi Digital untuk Layanan Kesehatan Modern",
    heroHeading: "Transformasi Digital untuk Layanan Kesehatan yang Lebih Baik",
    heroHighlight: "Kesehatan",
    heroDescription:
      "Integrasikan seluruh sistem data rumah sakit dan klinik Anda dalam satu platform terpadu. Dengan teknologi data integration dan dashboard real-time, kami membantu fasilitas kesehatan meningkatkan efisiensi operasional dan kualitas layanan pasien.",
    metaTitle: "Solusi Digital Industri Kesehatan | Technema Solutions",
    metaDescription:
      "Technema Solutions menyediakan solusi integrasi data, dashboard real-time, dan transformasi digital untuk rumah sakit, klinik, dan fasilitas kesehatan di Indonesia.",

    challenges: [
      {
        icon: "Database",
        title: "Data Tersebar di Banyak Sistem",
        description:
          "Rumah sakit menggunakan puluhan sistem berbeda — HIS, LIS, RIS, PACS — yang tidak saling terhubung, menyebabkan duplikasi data dan informasi yang tidak konsisten.",
      },
      {
        icon: "ClipboardList",
        title: "Pelaporan Manual & Lambat",
        description:
          "Proses pelaporan masih mengandalkan spreadsheet manual, memakan waktu berjam-jam untuk menghasilkan laporan yang seharusnya tersedia dalam hitungan detik.",
      },
      {
        icon: "ShieldAlert",
        title: "Keamanan & Kepatuhan Data",
        description:
          "Data rekam medis pasien memerlukan perlindungan tingkat tinggi sesuai regulasi pemerintah, namun banyak fasilitas masih belum memiliki sistem keamanan yang memadai.",
      },
      {
        icon: "GitBranch",
        title: "Integrasi Antar Departemen",
        description:
          "Laboratorium, farmasi, rawat inap, dan unit gawat darurat beroperasi secara terpisah, menyulitkan koordinasi perawatan pasien lintas departemen.",
      },
    ],

    solutions: [
      {
        icon: "Workflow",
        title: "Integrasi Data Terpadu",
        description:
          "Hubungkan seluruh sistem informasi rumah sakit — dari HIS, LIS, hingga PACS — dalam satu platform data yang terstandarisasi dan interoperable.",
        features: [
          "Koneksi multi-sistem dengan standar HL7 & FHIR",
          "Transformasi & konsolidasi data otomatis",
          "Data warehouse terpusat untuk seluruh departemen",
          "API gateway untuk integrasi pihak ketiga",
        ],
      },
      {
        icon: "LayoutDashboard",
        title: "Dashboard & Visualisasi Real-Time",
        description:
          "Pantau seluruh operasional rumah sakit melalui dashboard interaktif yang menampilkan data terkini untuk pengambilan keputusan yang lebih cepat dan akurat.",
        features: [
          "Dashboard eksekutif untuk manajemen rumah sakit",
          "Monitoring BOR, ALOS, dan indikator mutu",
          "Visualisasi tren kunjungan pasien",
          "Alert otomatis untuk anomali data",
        ],
      },
      {
        icon: "Lock",
        title: "Keamanan & Kepatuhan Data",
        description:
          "Lindungi data rekam medis pasien dengan sistem keamanan berlapis yang sesuai dengan standar regulasi kesehatan nasional dan internasional.",
        features: [
          "Enkripsi data end-to-end",
          "Role-based access control (RBAC)",
          "Audit trail untuk setiap akses data",
          "Kepatuhan regulasi Kemenkes & HIPAA-ready",
        ],
      },
      {
        icon: "Zap",
        title: "Otomasi Proses & Pelaporan",
        description:
          "Otomatiskan proses administratif dan pelaporan rutin sehingga tenaga medis dapat fokus pada hal yang paling penting — merawat pasien.",
        features: [
          "Pelaporan otomatis ke Kemenkes & BPJS",
          "Rekonsiliasi data klaim asuransi",
          "Notifikasi otomatis untuk jadwal perawatan",
          "Workflow automation untuk proses administratif",
        ],
      },
    ],

    caseStudy: {
      tag: "Studi Kasus",
      title: "Integrasi Data & Dashboard untuk Jaringan Rumah Sakit",
      partnerName: "Synchro",
      partnerLogo: "/images/partners/synchro-logo.svg",
      videoUrl: "https://youtu.be/NXuLHvSlxJs?si=IojTUy_YVVGHmM-K",
      narrative:
        "Sebuah jaringan rumah sakit dengan 5 cabang menghadapi tantangan besar: data pasien tersebar di 12 sistem berbeda, pelaporan memakan waktu 3 hari kerja, dan tidak ada visibilitas real-time atas kinerja operasional. Bermitra dengan Synchro — platform integrasi data terdepan di Indonesia — kami mengimplementasikan solusi SISHIS (Secure and Interoperable Surveillance and Health Information System) yang menghubungkan seluruh sistem dalam satu data warehouse terpusat, dilengkapi dashboard eksekutif yang memberikan insight actionable secara real-time.",
      results: [
        { value: "95%", label: "Data Terintegrasi" },
        { value: "60%", label: "Lebih Cepat Pelaporan" },
        { value: "Real-time", label: "Dashboard Monitoring" },
        { value: "100%", label: "Kepatuhan Regulasi" },
      ],
    },

    process: [
      {
        step: 1,
        icon: "Search",
        title: "Analisis & Audit Data",
        description:
          "Tim kami melakukan assessment menyeluruh terhadap infrastruktur data, sistem yang digunakan, dan kebutuhan spesifik fasilitas kesehatan Anda.",
      },
      {
        step: 2,
        icon: "PenTool",
        title: "Perancangan Arsitektur",
        description:
          "Merancang arsitektur integrasi data yang optimal, termasuk data flow, ETL pipeline, dan desain dashboard sesuai kebutuhan stakeholder.",
      },
      {
        step: 3,
        icon: "Code",
        title: "Implementasi & Integrasi",
        description:
          "Mengimplementasikan solusi secara bertahap dengan metodologi agile, memastikan setiap fase berjalan tanpa mengganggu operasional rumah sakit.",
      },
      {
        step: 4,
        icon: "BarChart3",
        title: "Monitoring & Optimasi",
        description:
          "Setelah go-live, kami terus memantau performa sistem, mengoptimasi query data, dan memastikan dashboard selalu menampilkan insight yang relevan.",
      },
    ],

    features: [
      {
        icon: "Database",
        title: "SISHIS Integration",
        description:
          "Integrasi dengan platform SISHIS dari Synchro untuk pengelolaan data kesehatan yang aman dan interoperable.",
      },
      {
        icon: "FileCode",
        title: "Standar HL7 & FHIR",
        description:
          "Mendukung standar interoperabilitas kesehatan internasional untuk pertukaran data antar sistem yang seamless.",
      },
      {
        icon: "LayoutDashboard",
        title: "Dashboard Real-Time",
        description:
          "Dashboard interaktif dengan visualisasi data terkini untuk monitoring operasional dan pengambilan keputusan.",
      },
      {
        icon: "ArrowLeftRight",
        title: "Multi-Source ETL",
        description:
          "Extract, Transform, Load dari berbagai sumber data — database, API, file, dan streaming data secara otomatis.",
      },
      {
        icon: "FileBarChart",
        title: "Automated Reporting",
        description:
          "Laporan otomatis terjadwal untuk kepatuhan regulasi Kemenkes, BPJS, dan kebutuhan internal manajemen.",
      },
      {
        icon: "ShieldCheck",
        title: "Data Security & Compliance",
        description:
          "Keamanan berlapis dengan enkripsi, audit trail, dan kontrol akses untuk memenuhi standar kepatuhan data kesehatan.",
      },
    ],

    stats: [
      { value: 50, suffix: "+", label: "Fasilitas Kesehatan", icon: "Building2" },
      { value: 1, suffix: "M+", label: "Data Terintegrasi", icon: "Database" },
      { value: 99.9, suffix: "%", label: "Uptime Sistem", icon: "Activity" },
      { value: 24, suffix: "/7", label: "Dukungan Teknis", icon: "Headphones" },
    ],

    testimonials: [{
      content:
        "Sejak menggunakan solusi integrasi data dari Technema dan Synchro, kami berhasil menghubungkan 12 sistem yang sebelumnya terpisah. Waktu pelaporan berkurang drastis dari 3 hari menjadi real-time, dan manajemen kini dapat mengambil keputusan berdasarkan data yang akurat dan terkini.",
      name: "Dr. Arief Prasetyo",
      role: "Direktur Transformasi Digital",
      company: "Jaringan RS Harapan Medika",
    }],

    faqs: [
      {
        question: "Berapa lama proses implementasi integrasi data rumah sakit?",
        answer:
          "Tergantung pada kompleksitas dan jumlah sistem yang diintegrasikan. Untuk rumah sakit tunggal dengan 3-5 sistem, implementasi biasanya memakan waktu 3-6 bulan. Untuk jaringan rumah sakit, timeline bisa mencapai 6-12 bulan dengan pendekatan bertahap.",
      },
      {
        question: "Apakah sistem ini kompatibel dengan HIS yang sudah kami gunakan?",
        answer:
          "Ya, solusi kami dirancang untuk kompatibel dengan berbagai HIS yang umum digunakan di Indonesia, termasuk sistem custom. Kami menggunakan standar HL7 dan FHIR untuk memastikan interoperabilitas, serta dapat membangun custom connector jika diperlukan.",
      },
      {
        question: "Bagaimana jaminan keamanan data pasien?",
        answer:
          "Keamanan data adalah prioritas utama kami. Kami mengimplementasikan enkripsi end-to-end, role-based access control, dan audit trail lengkap. Sistem kami dirancang untuk memenuhi standar kepatuhan data kesehatan nasional serta HIPAA-ready untuk standar internasional.",
      },
      {
        question: "Apa peran Synchro dalam solusi ini?",
        answer:
          "Synchro adalah mitra teknologi kami yang menyediakan platform integrasi data SISHIS. Mereka menangani core data integration engine, sementara Technema bertanggung jawab atas implementasi end-to-end, kustomisasi dashboard, dan dukungan berkelanjutan.",
      },
      {
        question: "Apakah tersedia pelatihan untuk tim IT rumah sakit?",
        answer:
          "Tentu. Setiap implementasi mencakup program pelatihan komprehensif untuk tim IT dan pengguna akhir. Kami juga menyediakan dokumentasi lengkap, video tutorial, dan dukungan teknis 24/7 pasca go-live.",
      },
      {
        question: "Berapa biaya investasi untuk solusi ini?",
        answer:
          "Biaya bervariasi tergantung pada skala implementasi, jumlah sistem yang diintegrasikan, dan fitur dashboard yang dibutuhkan. Kami menawarkan konsultasi gratis untuk melakukan assessment dan memberikan proposal yang disesuaikan dengan kebutuhan dan anggaran Anda.",
      },
    ],
  },

  {
    slug: "pendidikan",
    name: "Pendidikan",
    icon: "GraduationCap",
    tagline: "Digitalisasi Sistem Pendidikan Modern",
    heroHeading: "Solusi Digital untuk Institusi Pendidikan yang Lebih Maju",
    heroHighlight: "Pendidikan",
    heroDescription:
      "Modernisasi sistem informasi akademik, e-learning, dan manajemen sekolah dengan platform digital terintegrasi yang meningkatkan kualitas pembelajaran dan efisiensi administrasi.",
    metaTitle: "Solusi Digital Industri Pendidikan | Technema Solutions",
    metaDescription:
      "Technema Solutions menyediakan solusi digital untuk sekolah, universitas, dan institusi pendidikan di Indonesia — dari sistem akademik, e-learning, hingga portal orangtua.",

    challenges: [
      {
        icon: "Database",
        title: "Data Siswa Tersebar & Tidak Terpusat",
        description:
          "Data nilai, absensi, dan biodata siswa tersimpan di berbagai tempat — buku catatan, spreadsheet, bahkan kertas — sehingga sulit diakses saat dibutuhkan dan rawan kehilangan.",
      },
      {
        icon: "ClipboardList",
        title: "Administrasi Masih Manual",
        description:
          "Proses pendaftaran, penjadwalan, dan pembuatan raport masih dilakukan secara manual, memakan waktu guru dan staf yang seharusnya bisa digunakan untuk hal yang lebih produktif.",
      },
      {
        icon: "BarChart",
        title: "Sulit Memantau Perkembangan Belajar",
        description:
          "Tanpa sistem analitik yang baik, guru dan kepala sekolah kesulitan melihat tren prestasi siswa, mengidentifikasi siswa yang butuh perhatian khusus, atau mengukur efektivitas program belajar.",
      },
      {
        icon: "Users",
        title: "Komunikasi Sekolah & Orangtua Terbatas",
        description:
          "Informasi penting seperti jadwal ujian, nilai, dan pengumuman sekolah sering terlambat sampai ke orangtua karena masih mengandalkan surat edaran atau grup chat yang tidak terstruktur.",
      },
    ],

    solutions: [
      {
        icon: "GraduationCap",
        title: "Sistem Informasi Akademik Terpadu",
        description:
          "Kelola seluruh data akademik dalam satu platform — dari pendaftaran siswa baru, penjadwalan kelas, hingga pengelolaan nilai dan raport secara otomatis.",
        features: [
          "Database siswa terpusat dan mudah dicari",
          "Penjadwalan kelas dan ujian otomatis",
          "Pengelolaan nilai dan raport digital",
          "Manajemen data guru dan staf",
        ],
      },
      {
        icon: "Monitor",
        title: "Platform E-Learning Interaktif",
        description:
          "Hadirkan pengalaman belajar digital yang menarik dengan platform e-learning yang mendukung video pembelajaran, tugas online, dan diskusi interaktif.",
        features: [
          "Kelas virtual dengan video dan materi digital",
          "Penugasan dan pengumpulan tugas online",
          "Forum diskusi untuk siswa dan guru",
          "Bank soal dan ujian online dengan penilaian otomatis",
        ],
      },
      {
        icon: "LayoutDashboard",
        title: "Dashboard Analitik Pendidikan",
        description:
          "Pantau perkembangan belajar siswa dan kinerja sekolah melalui dashboard visual yang mudah dipahami, membantu pengambilan keputusan berbasis data.",
        features: [
          "Grafik tren prestasi siswa per mata pelajaran",
          "Laporan kehadiran dan keterlambatan",
          "Perbandingan kinerja antar kelas dan angkatan",
          "Notifikasi otomatis untuk siswa berisiko tertinggal",
        ],
      },
      {
        icon: "MessageSquare",
        title: "Portal Komunikasi Sekolah",
        description:
          "Jembatani komunikasi antara sekolah, guru, siswa, dan orangtua melalui portal terpadu yang memastikan setiap informasi tersampaikan dengan cepat dan tepat.",
        features: [
          "Pengumuman sekolah langsung ke orangtua",
          "Notifikasi nilai dan absensi real-time",
          "Jadwal kegiatan dan kalender akademik",
          "Konsultasi guru-orangtua secara online",
        ],
      },
    ],

    caseStudy: null,

    process: [
      {
        step: 1,
        icon: "ClipboardList",
        title: "Analisis Kebutuhan Sekolah",
        description:
          "Tim kami mengunjungi sekolah atau kampus Anda untuk memahami alur kerja yang ada, tantangan yang dihadapi, dan kebutuhan spesifik dari guru, staf, dan manajemen.",
      },
      {
        step: 2,
        icon: "PenTool",
        title: "Desain & Kustomisasi Sistem",
        description:
          "Merancang sistem yang disesuaikan dengan kurikulum, struktur organisasi, dan kebutuhan unik institusi Anda — bukan solusi generik yang dipaksakan.",
      },
      {
        step: 3,
        icon: "Code",
        title: "Implementasi Bertahap",
        description:
          "Sistem diterapkan secara bertahap agar tidak mengganggu kegiatan belajar mengajar. Dimulai dari modul prioritas, lalu berkembang sesuai kesiapan.",
      },
      {
        step: 4,
        icon: "Users",
        title: "Pelatihan & Pendampingan",
        description:
          "Guru dan staf mendapatkan pelatihan langsung agar nyaman menggunakan sistem baru. Tim kami terus mendampingi hingga semua berjalan lancar.",
      },
    ],

    features: [
      {
        icon: "BookOpen",
        title: "Student Information System",
        description:
          "Kelola seluruh data siswa dari pendaftaran hingga kelulusan dalam satu sistem yang rapi dan mudah diakses.",
      },
      {
        icon: "LayoutDashboard",
        title: "Learning Management System",
        description:
          "Platform belajar online lengkap dengan materi, tugas, ujian, dan forum diskusi yang bisa diakses kapan saja.",
      },
      {
        icon: "FileBarChart",
        title: "Analitik Pembelajaran",
        description:
          "Visualisasi data perkembangan belajar siswa untuk membantu guru dan manajemen mengambil keputusan yang tepat.",
      },
      {
        icon: "ClipboardCheck",
        title: "Raport Digital",
        description:
          "Raport otomatis yang bisa diakses secara online oleh orangtua dan siswa, lengkap dengan grafik perkembangan.",
      },
      {
        icon: "Smartphone",
        title: "Absensi Digital",
        description:
          "Sistem absensi yang terintegrasi dengan notifikasi otomatis ke orangtua jika siswa tidak hadir atau terlambat.",
      },
      {
        icon: "Users",
        title: "Portal Orangtua",
        description:
          "Orangtua bisa memantau nilai, absensi, jadwal, dan pengumuman sekolah langsung dari ponsel mereka.",
      },
    ],

    stats: [
      { value: 100, suffix: "+", label: "Sekolah & Kampus", icon: "Building2" },
      { value: 50, suffix: "K+", label: "Siswa Terdaftar", icon: "Users" },
      { value: 98, suffix: "%", label: "Kepuasan Pengguna", icon: "TrendingUp" },
      { value: 24, suffix: "/7", label: "Dukungan Teknis", icon: "Headphones" },
    ],

    testimonials: [{
      content:
        "Sejak menggunakan sistem digital dari Technema, administrasi sekolah kami jauh lebih efisien. Guru tidak lagi pusing mengurus nilai di spreadsheet, orangtua bisa langsung melihat perkembangan anak mereka, dan kami sebagai manajemen punya data yang jelas untuk mengambil keputusan. Transformasi digital yang benar-benar terasa dampaknya.",
      name: "Hj. Siti Nurhaliza, M.Pd.",
      role: "Kepala Sekolah",
      company: "SMA Negeri 1 Makassar",
    }],

    faqs: [
      {
        question: "Berapa lama waktu yang dibutuhkan untuk menerapkan sistem ini di sekolah kami?",
        answer:
          "Untuk sekolah tunggal, implementasi biasanya memakan waktu 2-4 bulan. Untuk yayasan pendidikan dengan beberapa cabang, prosesnya bisa memakan waktu 4-8 bulan dengan pendekatan bertahap. Kami memastikan implementasi tidak mengganggu kegiatan belajar mengajar.",
      },
      {
        question: "Apakah sistem ini bisa digunakan untuk sekolah dan juga perguruan tinggi?",
        answer:
          "Ya, sistem kami dirancang fleksibel untuk berbagai jenjang pendidikan — dari SD, SMP, SMA, hingga perguruan tinggi. Setiap jenjang mendapatkan modul yang disesuaikan, misalnya sistem SKS untuk kampus atau raport K-13 untuk sekolah dasar dan menengah.",
      },
      {
        question: "Apakah guru dan staf akan dilatih menggunakan sistem ini?",
        answer:
          "Tentu. Setiap implementasi mencakup program pelatihan langsung untuk guru, staf administrasi, dan manajemen sekolah. Kami juga menyediakan video tutorial, panduan pengguna, serta tim pendampingan yang siap membantu selama masa transisi.",
      },
      {
        question: "Bagaimana jika sekolah kami sudah punya sistem yang berjalan?",
        answer:
          "Kami dapat mengintegrasikan sistem baru dengan sistem yang sudah ada, atau melakukan migrasi data dari sistem lama ke platform baru. Tim kami akan memastikan tidak ada data yang hilang selama proses perpindahan.",
      },
      {
        question: "Apakah orangtua perlu menginstal aplikasi khusus?",
        answer:
          "Portal orangtua bisa diakses langsung melalui browser di ponsel atau komputer tanpa perlu menginstal aplikasi tambahan. Orangtua cukup membuka link dan login dengan akun yang diberikan sekolah.",
      },
      {
        question: "Berapa biaya implementasi untuk sekolah kami?",
        answer:
          "Biaya disesuaikan dengan jumlah siswa, modul yang dipilih, dan skala implementasi. Kami menawarkan konsultasi gratis untuk memahami kebutuhan Anda dan memberikan penawaran yang transparan. Tersedia juga skema pembayaran bertahap untuk memudahkan anggaran sekolah.",
      },
    ],
  },

  {
    slug: "umkm",
    name: "UMKM",
    icon: "ShoppingCart",
    tagline: "Percepat Pertumbuhan Usaha Kecil & Menengah",
    heroHeading: "Teknologi Terjangkau untuk Pertumbuhan UMKM yang Berkelanjutan",
    heroHighlight: "UMKM",
    heroDescription:
      "Solusi digital yang dirancang khusus untuk kebutuhan UMKM — dari sistem kasir, manajemen stok, hingga analitik penjualan yang mudah digunakan siapa saja.",
    metaTitle: "Solusi Digital untuk UMKM | Technema Solutions",
    metaDescription:
      "Technema Solutions menyediakan solusi digital terjangkau untuk UMKM di Indonesia — sistem POS, manajemen inventori, analitik penjualan, dan integrasi marketplace.",

    challenges: [
      {
        icon: "ClipboardList",
        title: "Pencatatan Masih Manual & Rawan Salah",
        description:
          "Banyak UMKM masih mencatat transaksi di buku tulis atau spreadsheet sederhana. Akibatnya, data penjualan sering tidak akurat, uang sulit dilacak, dan laporan keuangan jadi berantakan.",
      },
      {
        icon: "Package",
        title: "Stok Barang Sulit Dikontrol",
        description:
          "Tanpa sistem inventori yang baik, pemilik usaha sering kehabisan stok barang laris atau justru menumpuk barang yang kurang diminati. Ini mempengaruhi keuntungan secara langsung.",
      },
      {
        icon: "TrendingDown",
        title: "Tidak Tahu Produk Mana yang Paling Laku",
        description:
          "Tanpa data penjualan yang terstruktur, sulit mengetahui produk mana yang paling menguntungkan, jam sibuk toko, atau tren penjualan bulanan untuk mengambil keputusan bisnis.",
      },
      {
        icon: "Store",
        title: "Sulit Masuk ke Pasar Digital",
        description:
          "Banyak UMKM ingin berjualan online tapi bingung harus mulai dari mana. Mengelola toko di marketplace, media sosial, dan toko fisik sekaligus terasa sangat overwhelming.",
      },
    ],

    solutions: [
      {
        icon: "ShoppingBag",
        title: "Sistem Kasir & POS Digital",
        description:
          "Ganti buku catatan dengan sistem kasir digital yang mudah digunakan. Setiap transaksi tercatat otomatis, struk bisa dicetak atau dikirim digital, dan laporan harian langsung tersedia.",
        features: [
          "Tampilan kasir yang simpel dan mudah digunakan",
          "Cetak struk atau kirim struk digital via WhatsApp",
          "Pencatatan transaksi otomatis dan akurat",
          "Dukungan berbagai metode pembayaran (tunai, QRIS, transfer)",
        ],
      },
      {
        icon: "Package",
        title: "Manajemen Stok Otomatis",
        description:
          "Pantau stok barang secara real-time. Sistem otomatis memberi peringatan saat stok menipis dan membantu Anda mengetahui barang mana yang perlu di-restock.",
        features: [
          "Update stok otomatis setiap ada transaksi",
          "Notifikasi saat stok barang hampir habis",
          "Riwayat pergerakan stok lengkap",
          "Pengelolaan stok untuk banyak lokasi/cabang",
        ],
      },
      {
        icon: "LayoutDashboard",
        title: "Laporan Penjualan & Analitik",
        description:
          "Lihat performa bisnis Anda dalam grafik yang mudah dipahami. Ketahui produk terlaris, jam sibuk, dan tren penjualan tanpa perlu jago akuntansi.",
        features: [
          "Laporan penjualan harian, mingguan, dan bulanan",
          "Grafik produk terlaris dan margin keuntungan",
          "Analisis jam sibuk dan pola belanja pelanggan",
          "Laporan keuangan sederhana siap pakai",
        ],
      },
      {
        icon: "Globe",
        title: "Toko Online & Integrasi Marketplace",
        description:
          "Perluas jangkauan bisnis Anda ke dunia digital. Kelola pesanan dari marketplace, media sosial, dan toko online dari satu dashboard tanpa bingung.",
        features: [
          "Sinkronisasi produk ke Tokopedia, Shopee, dan marketplace lainnya",
          "Satu dashboard untuk semua pesanan online dan offline",
          "Manajemen harga berbeda per channel penjualan",
          "Pelacakan pengiriman terintegrasi",
        ],
      },
    ],

    caseStudy: null,

    process: [
      {
        step: 1,
        icon: "Search",
        title: "Konsultasi Kebutuhan Usaha",
        description:
          "Kami mendengarkan cerita bisnis Anda — apa yang dijual, berapa banyak transaksi per hari, tantangan yang dihadapi — untuk memahami solusi apa yang paling pas.",
      },
      {
        step: 2,
        icon: "Settings",
        title: "Kustomisasi & Pengaturan Sistem",
        description:
          "Sistem disesuaikan dengan jenis usaha Anda — baik itu warung makan, toko retail, atau jasa. Produk, harga, dan kategori dimasukkan agar siap digunakan.",
      },
      {
        step: 3,
        icon: "Code",
        title: "Implementasi & Pelatihan",
        description:
          "Tim kami membantu memasang sistem dan melatih Anda serta karyawan sampai benar-benar mahir. Kami pastikan transisi berjalan mulus tanpa mengganggu operasional toko.",
      },
      {
        step: 4,
        icon: "BarChart3",
        title: "Monitoring & Dukungan Berkelanjutan",
        description:
          "Setelah berjalan, kami terus memantau dan siap membantu jika ada kendala. Kami juga memberikan tips berdasarkan data penjualan untuk membantu bisnis Anda terus berkembang.",
      },
    ],

    features: [
      {
        icon: "ShieldCheck",
        title: "Point of Sale (POS)",
        description:
          "Sistem kasir digital yang cepat dan mudah digunakan, lengkap dengan struk digital dan dukungan berbagai metode pembayaran.",
      },
      {
        icon: "Database",
        title: "Manajemen Stok",
        description:
          "Pantau persediaan barang secara real-time dengan notifikasi otomatis saat stok menipis atau perlu restock.",
      },
      {
        icon: "FileBarChart",
        title: "Laporan Penjualan",
        description:
          "Laporan penjualan visual yang mudah dipahami — ketahui produk terlaris, keuntungan, dan tren bisnis Anda.",
      },
      {
        icon: "GitBranch",
        title: "Multi-Cabang",
        description:
          "Kelola beberapa toko atau cabang dari satu akun. Pantau performa setiap lokasi dan bandingkan hasilnya.",
      },
      {
        icon: "ArrowLeftRight",
        title: "Integrasi Marketplace",
        description:
          "Hubungkan toko Anda dengan Tokopedia, Shopee, dan platform lainnya. Kelola semua pesanan dari satu tempat.",
      },
      {
        icon: "CreditCard",
        title: "Pembayaran Digital",
        description:
          "Terima pembayaran QRIS, transfer bank, dan e-wallet dengan mudah. Semua transaksi tercatat otomatis.",
      },
    ],

    stats: [
      { value: 200, suffix: "+", label: "UMKM Terdigitalisasi", icon: "ShoppingCart" },
      { value: 40, suffix: "%", label: "Peningkatan Penjualan", icon: "TrendingUp" },
      { value: 99.5, suffix: "%", label: "Uptime Sistem", icon: "Activity" },
      { value: 30, suffix: " Menit", label: "Setup & Siap Pakai", icon: "Clock" },
    ],

    testimonials: [{
      content:
        "Dulu saya catat semua penjualan di buku, sering lupa dan bingung sendiri saat hitung untung rugi di akhir bulan. Sejak pakai sistem dari Technema, semua tercatat otomatis. Saya jadi tahu produk mana yang paling laku, kapan harus restock, dan omzet bulanan naik sekitar 35%. Penggunaannya juga gampang, karyawan saya yang baru pun cepat bisa.",
      name: "Ibu Ratna Dewi",
      role: "Pemilik",
      company: "Toko Sembako Berkah Jaya",
    }],

    faqs: [
      {
        question: "Apakah sistem ini cocok untuk usaha kecil yang baru mulai?",
        answer:
          "Sangat cocok. Sistem kami dirancang dari awal untuk kemudahan penggunaan. Anda tidak perlu pengalaman teknis — jika bisa menggunakan smartphone, Anda bisa menggunakan sistem kami. Tersedia juga paket starter yang terjangkau untuk usaha yang baru memulai.",
      },
      {
        question: "Berapa biaya berlangganan per bulan?",
        answer:
          "Kami menawarkan beberapa paket yang disesuaikan dengan ukuran usaha. Mulai dari paket dasar untuk usaha kecil hingga paket premium untuk usaha dengan banyak cabang. Hubungi kami untuk konsultasi gratis dan mendapatkan penawaran terbaik sesuai kebutuhan Anda.",
      },
      {
        question: "Bisa digunakan di lebih dari satu toko?",
        answer:
          "Ya, sistem kami mendukung pengelolaan multi-cabang. Anda bisa memantau penjualan dan stok dari semua toko dalam satu dashboard, membandingkan performa antar cabang, dan mengelola stok transfer antar lokasi.",
      },
      {
        question: "Apakah bisa terhubung dengan Tokopedia atau Shopee?",
        answer:
          "Ya, sistem kami dapat terintegrasi dengan marketplace populer seperti Tokopedia, Shopee, dan platform lainnya. Produk, stok, dan pesanan tersinkronisasi secara otomatis sehingga Anda tidak perlu update manual di setiap platform.",
      },
      {
        question: "Apakah karyawan saya bisa dilatih menggunakan sistem ini?",
        answer:
          "Tentu. Kami menyediakan pelatihan langsung saat implementasi dan video tutorial yang bisa ditonton kapan saja. Sistem kami juga dirancang dengan tampilan yang intuitif sehingga karyawan baru biasanya bisa menguasainya dalam waktu kurang dari satu jam.",
      },
      {
        question: "Bagaimana keamanan data usaha saya?",
        answer:
          "Data Anda tersimpan aman di cloud dengan enkripsi berlapis. Hanya Anda dan orang yang Anda beri izin yang bisa mengakses data bisnis. Kami juga melakukan backup otomatis setiap hari sehingga data Anda tidak akan hilang.",
      },
    ],
  },

  {
    slug: "pemerintahan",
    name: "Pemerintahan",
    icon: "Landmark",
    tagline: "Digitalisasi Dokumen Pemerintahan dengan Arsip Pintar",
    heroHeading: "Digitalisasi Dokumen untuk Pemerintahan yang Lebih Efisien",
    heroHighlight: "Pemerintahan",
    heroDescription:
      "Kelola ribuan dokumen instansi Anda secara digital dengan Arsip Pintar — sistem pengarsipan cerdas berbasis AI. Cari dokumen dalam hitungan detik, tanya isi dokumen seperti chat biasa, dan akses arsip dari mana saja dengan aman.",
    metaTitle: "Arsip Pintar — Digitalisasi Dokumen Pemerintahan | Technema Solutions",
    metaDescription:
      "Arsip Pintar dari Technema Solutions membantu instansi pemerintah mendigitalisasi arsip dokumen dengan AI Chat cerdas, pencarian instan, dan keamanan berlapis.",

    challenges: [
      {
        icon: "FolderSearch",
        title: "Pencarian Dokumen Lama & Menyulitkan",
        description:
          "Petugas menghabiskan waktu berjam-jam hanya untuk mencari satu dokumen dari tumpukan arsip di lemari dan gudang. Surat keputusan, kontrak, dan laporan penting sulit ditemukan saat dibutuhkan mendesak.",
      },
      {
        icon: "Clock",
        title: "Arsip Menumpuk Tidak Teratur",
        description:
          "Dokumen PKS, AJB, NDA, dan berbagai surat penting tersebar di berbagai tempat tanpa sistem pengelolaan yang jelas. Semakin lama, arsip semakin menumpuk dan semakin sulit dikelola.",
      },
      {
        icon: "Users",
        title: "Pergantian Pegawai = Pengetahuan Hilang",
        description:
          "Saat pegawai pindah tugas atau pensiun, pengetahuan tentang lokasi dan isi dokumen ikut hilang. Pegawai baru harus memulai dari nol tanpa ada yang bisa membimbing soal arsip lama.",
      },
      {
        icon: "ShieldAlert",
        title: "Validasi Dokumen Membingungkan",
        description:
          "Dengan banyaknya versi dokumen yang beredar, sulit memastikan dokumen mana yang paling baru dan valid untuk digunakan. Kesalahan menggunakan dokumen yang salah bisa berakibat fatal.",
      },
    ],

    solutions: [
      {
        icon: "FileSearch",
        title: "Arsip Pintar — Penyimpanan Dokumen Digital Cerdas",
        description:
          "Arsip Pintar adalah sistem penyimpanan dokumen digital buatan Technema yang dirancang khusus untuk instansi pemerintah. Bayangkan seperti Google Drive, tapi khusus untuk instansi Anda — private, tidak di server luar, dan dilengkapi AI yang memahami isi setiap dokumen.",
        features: [
          "Upload dokumen semudah kirim file di WhatsApp (PDF, Word, dan lainnya)",
          "Buat folder sendiri — misalnya: 'PKS 2025', 'Akta Tanah', 'NDA Pegawai'",
          "Cari dokumen dengan filter berdasarkan tahun, jenis, atau kategori",
          "Organisasi arsip yang rapi dan mudah ditemukan kapan saja",
        ],
      },
      {
        icon: "Bot",
        title: "AI Chat — Asisten Cerdas untuk Dokumen Anda",
        description:
          "Ini yang membedakan Arsip Pintar dari sistem biasa. Anda bisa bertanya dalam bahasa sehari-hari — seperti chat WhatsApp — dan AI akan mencari di SEMUA dokumen lalu memberikan jawaban beserta sumber dokumennya.",
        features: [
          "Tanya seperti: \"Cari dokumen hibah aset dari PT XYZ\"",
          "Bandingkan dokumen: \"Apa perbedaan kontrak vendor A dan vendor B?\"",
          "Minta ringkasan: \"Berikan poin penting dari surat edaran sekda 2025\"",
          "AI paham maksud Anda, bukan sekadar cocokkan kata kunci",
        ],
      },
      {
        icon: "KeyRound",
        title: "Keamanan & Kontrol Akses Berlapis",
        description:
          "Data dokumen pemerintah adalah data sensitif yang harus dijaga ketat. Arsip Pintar menggunakan sistem login OTP tanpa password dan hak akses bertingkat — jadi setiap pegawai hanya bisa mengakses dokumen sesuai kewenangannya.",
        features: [
          "Login dengan NIP + kode OTP dari email — tidak perlu hafal password",
          "Hak akses bertingkat: Kepala Bidang, Kepala Seksi, dan Staf",
          "Lacak siapa yang buka atau edit dokumen melalui riwayat aktivitas",
          "Data tersimpan di server private, bukan di server luar",
        ],
      },
      {
        icon: "Wallet",
        title: "Hemat Biaya & Ruang Penyimpanan",
        description:
          "Tidak perlu lagi membeli lemari arsip, menyewa gudang penyimpanan, atau mencetak dokumen berlembar-lembar. Semua tersimpan digital dengan aman dan bisa diakses kapan saja.",
        features: [
          "Tidak perlu ruang penyimpanan fisik yang besar",
          "Hemat kertas dan tinta printer secara signifikan",
          "Tidak perlu beli lemari arsip terus-menerus",
          "Pegawai baru tidak perlu orientasi lama — tinggal tanya AI",
        ],
      },
    ],

    caseStudy: {
      tag: "Studi Kasus",
      title: "Digitalisasi Arsip Dokumen Aset Daerah dengan Arsip Pintar",
      partnerName: "Arsip Pintar by Technema",
      partnerLogo: "/images/partners/arsip-pintar-logo.svg",
      narrative:
        "Sebuah Badan Keuangan dan Aset Daerah (BKAD) mengelola ribuan dokumen penting — mulai dari PKS, AJB, SPK, hingga surat edaran — yang tersimpan di lemari-lemari arsip yang sudah penuh sesak. Pencarian satu dokumen saja bisa memakan waktu hingga 2 jam. Saat ada pegawai yang pindah tugas, pengetahuan tentang lokasi arsip ikut hilang. Setelah menggunakan Arsip Pintar, seluruh dokumen berhasil didigitalisasi dan bisa dicari dalam hitungan detik. Pegawai baru cukup bertanya ke AI Chat untuk menemukan dokumen yang dibutuhkan. Tidak ada lagi arsip yang hilang atau rusak karena kelembaban.",
      results: [
        { value: "2 Jam → 10 Detik", label: "Waktu Pencarian" },
        { value: "100%", label: "Dokumen Terdigitalisasi" },
        { value: "0%", label: "Dokumen Hilang" },
        { value: "24/7", label: "Akses Dari Mana Saja" },
      ],
    },

    process: [
      {
        step: 1,
        icon: "Search",
        title: "Audit Arsip & Kebutuhan",
        description:
          "Tim kami mengunjungi instansi Anda untuk melihat kondisi arsip fisik, memahami jenis dokumen yang dikelola, dan menentukan prioritas digitalisasi berdasarkan kebutuhan yang paling mendesak.",
      },
      {
        step: 2,
        icon: "Upload",
        title: "Digitalisasi & Upload Dokumen",
        description:
          "Dokumen fisik discan dan diupload ke sistem Arsip Pintar. AI secara otomatis mengenali isi teks dari setiap dokumen sehingga bisa dicari dengan mudah nantinya.",
      },
      {
        step: 3,
        icon: "Settings",
        title: "Konfigurasi Sistem & Hak Akses",
        description:
          "Sistem dikonfigurasi sesuai struktur organisasi instansi — siapa boleh akses apa, folder apa saja yang perlu dibuat, dan alur kerja yang sesuai dengan hierarki yang ada.",
      },
      {
        step: 4,
        icon: "Presentation",
        title: "Pelatihan & Pendampingan",
        description:
          "Seluruh pegawai dilatih menggunakan Arsip Pintar — dari cara upload dokumen hingga cara bertanya ke AI Chat. Tim kami mendampingi sampai semua nyaman dan lancar menggunakan sistem.",
      },
    ],

    features: [
      {
        icon: "Bot",
        title: "AI Chat Cerdas",
        description:
          "Tanya apa saja tentang dokumen Anda dalam bahasa sehari-hari. AI akan mencari di semua dokumen dan memberikan jawaban beserta sumbernya.",
      },
      {
        icon: "KeyRound",
        title: "Login Aman dengan OTP",
        description:
          "Masuk sistem cukup dengan NIP dan kode OTP yang dikirim ke email. Tidak perlu hafal password yang rumit, tapi tetap lebih aman.",
      },
      {
        icon: "FolderOpen",
        title: "Manajemen Folder & Dokumen",
        description:
          "Upload dokumen PDF dan Word dengan mudah, buat folder sesuai kebutuhan, dan cari dokumen dengan filter berdasarkan tahun atau kategori.",
      },
      {
        icon: "ShieldCheck",
        title: "Hak Akses Bertingkat",
        description:
          "Atur siapa yang boleh melihat dokumen apa — Kepala Bidang bisa akses semua, Kepala Seksi akses bidangnya, Staf sesuai tugasnya.",
      },
      {
        icon: "Eye",
        title: "Riwayat Aktivitas",
        description:
          "Setiap akses dan perubahan pada dokumen tercatat otomatis. Mudah melacak siapa yang membuka atau mengedit dokumen tertentu.",
      },
      {
        icon: "Globe2",
        title: "Akses dari Mana Saja",
        description:
          "Arsip Pintar bisa diakses dari kantor maupun rumah melalui browser. Tidak perlu instal aplikasi khusus, cukup buka dan login.",
      },
    ],

    stats: [
      { value: 30, suffix: "+", label: "Instansi Pemerintah", icon: "Building2" },
      { value: 10, suffix: " Detik", label: "Pencarian Dokumen", icon: "Search" },
      { value: 0, suffix: "%", label: "Dokumen Hilang", icon: "Shield" },
      { value: 24, suffix: "/7", label: "Akses Dari Mana Saja", icon: "Globe2" },
    ],

    testimonials: [{
      content:
        "Yang paling membuat kami kagum adalah fitur AI Chat-nya. Dulu, kalau ada audit mendadak, kami harus bongkar lemari arsip berhari-hari untuk mencari dokumen yang diminta. Sekarang, cukup ketik pertanyaan di Arsip Pintar — misalnya 'cari dokumen hibah aset tahun 2023' — dan jawabannya langsung muncul lengkap dengan dokumennya. Bahkan pegawai baru yang belum hafal sistem kearsipan kami bisa langsung produktif karena tinggal tanya ke AI.",
      name: "H. Ahmad Fauzi, S.E., M.M.",
      role: "Kepala Bidang Aset",
      company: "BKAD Kabupaten Berau",
    }],

    faqs: [
      {
        question: "Apa itu Arsip Pintar dan apa bedanya dengan Google Drive biasa?",
        answer:
          "Arsip Pintar adalah sistem penyimpanan dokumen digital cerdas buatan Technema yang dilengkapi Kecerdasan Buatan (AI). Bedanya dengan Google Drive: Arsip Pintar tersimpan di server private (bukan server luar), punya AI Chat yang bisa Anda ajak bicara tentang isi dokumen, dan dilengkapi hak akses bertingkat yang sesuai untuk kebutuhan instansi pemerintah.",
      },
      {
        question: "Bagaimana cara kerja AI Chat di Arsip Pintar?",
        answer:
          "AI Chat bekerja seperti asisten yang sudah membaca dan menghafal semua dokumen Anda. Cukup ketik pertanyaan dalam bahasa sehari-hari — misalnya: 'Cari dokumen kontrak dengan PT XYZ' atau 'Apa poin penting dari surat edaran kemarin?' — dan AI akan mencari di seluruh dokumen lalu memberikan jawaban beserta sumber dokumennya. Semudah kirim chat di WhatsApp.",
      },
      {
        question: "Apakah data dokumen kami aman?",
        answer:
          "Sangat aman. Arsip Pintar menggunakan server private khusus untuk instansi Anda — data tidak disimpan di server luar. Login menggunakan sistem OTP (kode yang dikirim ke email), bukan password biasa yang mudah bocor. Setiap akses dan perubahan dokumen tercatat dalam riwayat aktivitas, dan hak akses diatur bertingkat sesuai jabatan.",
      },
      {
        question: "Berapa lama waktu implementasi Arsip Pintar?",
        answer:
          "Untuk satu bidang atau dinas, sistem bisa siap digunakan dalam 1-3 bulan, termasuk proses digitalisasi dokumen yang sudah ada. Untuk instansi yang lebih besar dengan banyak bidang, kami menyarankan pendekatan bertahap — dimulai dari bidang yang paling membutuhkan, lalu berkembang ke bidang lainnya.",
      },
      {
        question: "Apakah pegawai yang tidak terbiasa teknologi bisa menggunakan Arsip Pintar?",
        answer:
          "Pasti bisa. Arsip Pintar dirancang sesederhana mungkin — upload dokumen semudah kirim file di WhatsApp, dan mencari dokumen semudah chat biasa. Kami juga menyediakan pelatihan langsung dan pendampingan sampai seluruh pegawai nyaman menggunakannya. Bahkan fitur AI Chat-nya tidak perlu pelatihan khusus karena tinggal ketik pertanyaan seperti biasa.",
      },
      {
        question: "Jenis dokumen apa saja yang bisa disimpan di Arsip Pintar?",
        answer:
          "Arsip Pintar mendukung berbagai jenis dokumen — PDF, Word, hasil scan, dan lainnya. Dokumen seperti PKS, AJB, NDA, surat keputusan, surat edaran, kontrak kerja, laporan keuangan, dan semua jenis arsip instansi bisa disimpan dan dicari dengan mudah melalui sistem.",
      },
    ],
  },
];

export function getIndustryBySlug(slug: string): IndustryDetail | undefined {
  return industries.find((i) => i.slug === slug);
}

export function getAllIndustrySlugs(): string[] {
  return industries.map((i) => i.slug);
}
