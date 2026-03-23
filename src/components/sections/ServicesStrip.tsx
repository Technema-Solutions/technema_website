import FadeIn from "@/components/ui/FadeIn";
import Container from "@/components/ui/Container";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

const serviceIcons: Record<string, React.ReactNode> = {
  AppWindow: (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#3D7EAA" strokeWidth="1.5">
      <rect x="2" y="3" width="13" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 7h13" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="5" r="0.5" fill="#3D7EAA" />
      <circle cx="7" cy="5" r="0.5" fill="#3D7EAA" />
      <rect x="17" y="6" width="5" height="10" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 18h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  BrainCircuit: (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#3D7EAA" strokeWidth="1.5">
      <path d="M12 5a3 3 0 10-5.997.125 4 4 0 00-2.526 5.77 4 4 0 00.556 6.588A4 4 0 1012 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5a3 3 0 115.997.125 4 4 0 012.526 5.77 4 4 0 01-.556 6.588A4 4 0 1112 18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 5v3M9 8h6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="1.5" fill="#3D7EAA" stroke="none" />
      <path d="M12 13.5V16M9 14.5l1.5 1M15 14.5l-1.5 1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  LayoutDashboard: (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#3D7EAA" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="9" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="3" width="7" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="14" y="12" width="7" height="9" rx="1" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="16" width="7" height="5" rx="1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  DatabaseZap: (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#3D7EAA" strokeWidth="1.5">
      <ellipse cx="12" cy="5" rx="8" ry="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 5v6c0 1.657 3.582 3 8 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 11v6c0 1.657 3.582 3 8 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 5v4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 12l-2 4h4l-2 4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Handshake: (
    <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#3D7EAA" strokeWidth="1.5">
      <path d="M11 17l-2-2M7 11l5 5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 9l4.5-1L9 6l3 1 3-1 2.5 2L22 9l-1 3-1.5 4h-3L14 18l-2 1-2-1-2-2H5.5L4 12z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 14l2-2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export default function ServicesStrip({ services }: { services: ServiceItem[] }) {
  return (
    <section className="relative z-30 -mt-[30px] sm:-mt-[60px]">
      <Container>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 md:gap-4">
          {services.map((service, i) => {
            const isLastOdd = services.length % 2 !== 0 && i === services.length - 1;
            return (
            <FadeIn key={i} delay={i * 0.08} className={isLastOdd ? "col-span-2 max-w-[50%] mx-auto md:col-span-1 md:max-w-none" : ""}>
              <div className="relative overflow-hidden bg-[#f4f4f4] rounded-[15px] border border-[#e1e1e1] p-4 sm:p-6 text-center h-[280px] md:min-h-[258px] md:h-auto flex flex-col items-center justify-center">
                {/* Circuit pattern background */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                  <line x1="60%" y1="0" x2="100%" y2="60%" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="70%" y1="0" x2="100%" y2="45%" stroke="#ddd" strokeWidth="0.8" />
                  <line x1="50%" y1="0" x2="100%" y2="75%" stroke="#ddd" strokeWidth="0.8" />
                  <circle cx="15%" cy="75%" r="3" fill="#ddd" />
                  <circle cx="10%" cy="85%" r="2" fill="#ddd" />
                  <circle cx="85%" cy="20%" r="2.5" fill="#ddd" />
                  <circle cx="90%" cy="35%" r="2" fill="#ddd" />
                  <circle cx="25%" cy="90%" r="1.5" fill="#ddd" />
                  <circle cx="20%" cy="80%" r="8" fill="none" stroke="#ddd" strokeWidth="0.8" />
                  <circle cx="88%" cy="28%" r="6" fill="none" stroke="#ddd" strokeWidth="0.8" />
                </svg>

                {/* Icon circle */}
                <div className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] rounded-full bg-white/40 border-2 border-white flex items-center justify-center mx-auto">
                  {serviceIcons[service.icon] ?? null}
                </div>

                {/* Title */}
                <h4 className="font-heading text-[15px] sm:text-[18px] font-semibold text-[#0A2540] text-center mt-4">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-[14px] sm:text-[16px] text-[#7a7a7a] text-center mt-2 leading-snug">
                  {service.description}
                </p>
              </div>
            </FadeIn>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
