"use client";

import { useState, useRef } from "react";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";
import FadeIn from "@/components/ui/FadeIn";
import { CONTACT_MAP_EMBED } from "@/lib/constants";
import { submitContactForm } from "@/lib/actions/contact-public";

const inputClass =
  "w-full px-5 py-4 rounded-[12px] border border-border-gray bg-gray-bg text-[15px] outline-none transition-colors duration-200 focus:border-brand placeholder:text-text-gray";

export default function ContactForm({ mapEmbedUrl }: { mapEmbedUrl?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    const result = await submitContactForm(data);

    if (result.success) {
      setStatus("success");
      formRef.current?.reset();
    } else {
      setStatus("error");
      setErrorMsg(result.error);
    }
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
          {/* Left — Form */}
          <FadeIn className="w-full lg:w-1/2">
            <div>
              <SectionTag variant="light">FORMULIR KONTAK</SectionTag>
              <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#0A2540] leading-[1.31] mt-5 mb-6 sm:mb-8">
                Kirim Pesan kepada Kami
              </h2>

              {status === "success" && (
                <div className="mb-6 rounded-xl bg-green-50 border border-green-200 px-5 py-4 text-green-800 text-[15px]">
                  Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.
                </div>
              )}

              {status === "error" && errorMsg && (
                <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-5 py-4 text-red-800 text-[15px]">
                  {errorMsg}
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="kontak-nama" className="sr-only">
                      Nama Anda
                    </label>
                    <input
                      id="kontak-nama"
                      name="name"
                      type="text"
                      placeholder="Nama Anda"
                      required
                      aria-required="true"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="kontak-email" className="sr-only">
                      Email Anda
                    </label>
                    <input
                      id="kontak-email"
                      name="email"
                      type="email"
                      placeholder="Email Anda"
                      required
                      aria-required="true"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="kontak-subjek" className="sr-only">
                      Subjek
                    </label>
                    <input
                      id="kontak-subjek"
                      name="subject"
                      type="text"
                      placeholder="Subjek"
                      required
                      aria-required="true"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="kontak-telepon" className="sr-only">
                      Telepon
                    </label>
                    <input
                      id="kontak-telepon"
                      name="phone"
                      type="tel"
                      placeholder="Telepon"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="kontak-pesan" className="sr-only">
                    Pesan
                  </label>
                  <textarea
                    id="kontak-pesan"
                    name="message"
                    placeholder="Tulis Pesan..."
                    rows={5}
                    required
                    aria-required="true"
                    className={`${inputClass} resize-y mb-6`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-brand text-white font-bold text-[14px] tracking-wider uppercase px-10 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#2D6890] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? "MENGIRIM..." : "KIRIM PESAN"}
                </button>
              </form>
            </div>
          </FadeIn>

          {/* Right — Google Maps */}
          <FadeIn delay={0.15} direction="left" className="w-full lg:w-1/2">
            <div className="h-full min-h-[400px] lg:min-h-0 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src={mapEmbedUrl || CONTACT_MAP_EMBED}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 400 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Technema Solutions"
                className="w-full h-full"
              />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
