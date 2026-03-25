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

          {/* Right - Animated Illustration */}
          <FadeIn delay={0.15} direction="left" className="w-full lg:w-[45%]">
            <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-dark via-dark2 to-dark3 min-h-[400px] lg:min-h-[500px]">

              {/* Dot grid pattern */}
              <div className="absolute inset-0 opacity-[0.07]" style={{
                backgroundImage: "radial-gradient(circle, #6BB8D6 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }} />

              {/* Floating shapes */}
              <div className="absolute top-[12%] left-[8%] w-[60px] h-[60px] rounded-full bg-brand/20 border border-brand/30" style={{ animation: "appointment-float 6s ease-in-out infinite" }} />
              <div className="absolute top-[8%] right-[15%] w-[40px] h-[40px] rounded-[10px] bg-brand-light/15 border border-brand-light/25 rotate-45" style={{ animation: "appointment-float 7s ease-in-out 1s infinite" }} />
              <div className="absolute bottom-[18%] left-[12%] w-[35px] h-[35px] rounded-[8px] bg-brand-light/20 border border-brand-light/30" style={{ animation: "appointment-float 5s ease-in-out 0.5s infinite" }} />
              <div className="absolute bottom-[10%] right-[10%] w-[50px] h-[50px] rounded-full bg-brand/15 border border-brand/25" style={{ animation: "appointment-float 8s ease-in-out 2s infinite" }} />
              <div className="absolute top-[45%] right-[8%] w-[28px] h-[28px] rounded-full bg-brand-light/25" style={{ animation: "appointment-float 6s ease-in-out 3s infinite" }} />
              <div className="absolute top-[65%] left-[6%] w-[22px] h-[22px] rounded-full bg-brand/20" style={{ animation: "appointment-float 7s ease-in-out 1.5s infinite" }} />

              {/* Glow behind center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-brand-light/20 rounded-full blur-3xl" />

              {/* Pulse rings */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-brand-light/30" style={{ animation: "appointment-pulse 3s ease-out infinite" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-brand-light/20" style={{ animation: "appointment-pulse 3s ease-out 1s infinite" }} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full border border-brand-light/10" style={{ animation: "appointment-pulse 3s ease-out 2s infinite" }} />

              {/* Central icon cluster */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                {/* Main chat bubble */}
                <div className="relative">
                  <div className="w-[90px] h-[90px] rounded-[22px] bg-gradient-to-br from-brand to-brand-light flex items-center justify-center shadow-lg shadow-brand/30">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <line x1="9" y1="10" x2="15" y2="10" />
                      <line x1="12" y1="7" x2="12" y2="13" />
                    </svg>
                  </div>

                  {/* Envelope icon - offset top-right */}
                  <div className="absolute -top-8 -right-10 w-[52px] h-[52px] rounded-[14px] bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center" style={{ animation: "appointment-float 5s ease-in-out 0.5s infinite" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6BB8D6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>

                  {/* Phone icon - offset bottom-left */}
                  <div className="absolute -bottom-6 -left-12 w-[48px] h-[48px] rounded-[12px] bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center" style={{ animation: "appointment-float 6s ease-in-out 1.5s infinite" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6BB8D6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>

                  {/* Globe icon - offset bottom-right */}
                  <div className="absolute -bottom-10 right-[-6px] w-[44px] h-[44px] rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center" style={{ animation: "appointment-float 7s ease-in-out 2.5s infinite" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6BB8D6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative lines */}
              <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#6BB8D6" strokeWidth="1" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#6BB8D6" strokeWidth="1" />
                <line x1="30%" y1="0" x2="30%" y2="100%" stroke="#6BB8D6" strokeWidth="1" />
                <line x1="70%" y1="0" x2="70%" y2="100%" stroke="#6BB8D6" strokeWidth="1" />
              </svg>

              {/* Bottom text accent */}
              <div className="absolute bottom-6 left-0 right-0 text-center">
                <p className="text-brand-light/60 text-[13px] font-sans tracking-[3px] uppercase">Mari Terhubung</p>
              </div>

              {/* Keyframes */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes appointment-float {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-12px); }
                }
                @keyframes appointment-pulse {
                  0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                  100% { transform: translate(-50%, -50%) scale(2); opacity: 0; }
                }
              `}} />
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
