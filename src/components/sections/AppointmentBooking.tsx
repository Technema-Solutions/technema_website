import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";
import SectionTag from "@/components/ui/SectionTag";

export default function AppointmentBooking() {
  return (
    <section className="bg-white py-24">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          {/* Left - Form */}
          <FadeIn className="w-full lg:w-[55%]">
            <div>
              <SectionTag variant="light">HUBUNGI KAMI</SectionTag>
              <h2 className="font-heading text-[28px] sm:text-[36px] md:text-[42px] font-bold text-[#0A2540] leading-[1.31] mt-5 mb-6 sm:mb-8">
                Buat Janji Konsultasi Online untuk Perencanaan Bisnis Anda.
              </h2>

              {/* 2x2 Grid inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Nama Anda</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Nama Anda"
                    required
                    aria-required="true"
                    className="w-full px-5 py-4 rounded-[12px] border border-border-gray bg-gray-bg text-[15px] outline-none transition-colors duration-200 focus:border-brand placeholder:text-text-gray"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email Anda</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Email Anda"
                    required
                    aria-required="true"
                    className="w-full px-5 py-4 rounded-[12px] border border-border-gray bg-gray-bg text-[15px] outline-none transition-colors duration-200 focus:border-brand placeholder:text-text-gray"
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="sr-only">Subjek</label>
                  <input
                    id="contact-subject"
                    type="text"
                    placeholder="Subjek"
                    required
                    aria-required="true"
                    className="w-full px-5 py-4 rounded-[12px] border border-border-gray bg-gray-bg text-[15px] outline-none transition-colors duration-200 focus:border-brand placeholder:text-text-gray"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="sr-only">Telepon</label>
                  <input
                    id="contact-phone"
                    type="tel"
                    placeholder="Telepon"
                    className="w-full px-5 py-4 rounded-[12px] border border-border-gray bg-gray-bg text-[15px] outline-none transition-colors duration-200 focus:border-brand placeholder:text-text-gray"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Pesan</label>
                <textarea
                  id="contact-message"
                  placeholder="Tulis Pesan..."
                  rows={5}
                  required
                  aria-required="true"
                  className="w-full px-5 py-4 rounded-[12px] border border-border-gray bg-gray-bg text-[15px] outline-none resize-y transition-colors duration-200 focus:border-brand placeholder:text-text-gray mb-6"
                />
              </div>

              <button className="bg-brand text-white font-bold text-[14px] tracking-wider uppercase px-10 py-4 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[#2D6890]">
                KIRIM SEKARANG
              </button>
            </div>
          </FadeIn>

          {/* Right - Image with decorative elements */}
          <FadeIn delay={0.15} direction="left" className="w-full lg:w-[45%]">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=500&fit=crop"
                alt="Tim kantor"
                width={600}
                height={500}
                className="w-full rounded-[20px] object-cover"
              />

              {/* Decorative oval shape */}
              <div className="absolute -bottom-6 -left-6 w-[120px] h-[120px] border-4 border-brand rounded-full opacity-30" />

              {/* Play button overlay */}
              <div className="absolute bottom-8 right-8 flex items-center gap-3">
                <div className="w-[50px] h-[50px] bg-brand rounded-full flex items-center justify-center cursor-pointer hover:bg-[#2D6890] transition-colors">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="white"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <span className="text-white font-heading font-semibold text-[14px] uppercase tracking-wider">
                  Putar
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
