"use client";

import { useEffect } from "react";
import "@/styles/cookie-consent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieConsentBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box inline",
          position: "bottom left",
        },
        preferencesModal: {
          layout: "box",
        },
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          autoClear: {
            cookies: [
              { name: /^_ga/ },
              { name: "_gid" },
            ],
          },
        },
      },
      language: {
        default: "id",
        translations: {
          id: {
            consentModal: {
              title: "Kami Menggunakan Kuki",
              description:
                "Kami menggunakan kuki untuk meningkatkan pengalaman Anda di situs kami. Kuki analitik membantu kami memahami bagaimana pengunjung berinteraksi dengan website sehingga kami dapat terus memperbaikinya.",
              acceptAllBtn: "Terima Semua",
              acceptNecessaryBtn: "Tolak Semua",
              showPreferencesBtn: "Kelola Preferensi",
            },
            preferencesModal: {
              title: "Preferensi Kuki",
              acceptAllBtn: "Terima Semua",
              acceptNecessaryBtn: "Tolak Semua",
              savePreferencesBtn: "Simpan Preferensi",
              sections: [
                {
                  title: "Penggunaan Kuki",
                  description:
                    "Kami menggunakan kuki untuk memastikan fungsionalitas dasar website dan untuk meningkatkan pengalaman online Anda. Anda dapat memilih untuk menerima atau menolak setiap kategori kapan saja.",
                },
                {
                  title: "Kuki yang Diperlukan",
                  description:
                    "Kuki ini penting agar website berfungsi dengan baik. Tanpa kuki ini, website tidak dapat beroperasi dengan benar.",
                  linkedCategory: "necessary",
                },
                {
                  title: "Kuki Analitik",
                  description:
                    "Kuki ini mengumpulkan informasi tentang cara Anda menggunakan website kami, halaman mana yang paling sering dikunjungi, dan apakah Anda menerima pesan error. Semua data dikumpulkan secara anonim.",
                  linkedCategory: "analytics",
                },
              ],
            },
          },
        },
      },
    });
  }, []);

  return null;
}
