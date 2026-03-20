import Container from "@/components/ui/Container";
import { Icons } from "@/components/ui/Icons";
import { CONTACT_PHONE } from "@/lib/constants";

export default function CtaBanner() {
  return (
    <section className="px-4 sm:px-8 lg:px-[50px]">
      <div
        className="bg-brand py-8"
        style={{ borderRadius: "40px 40px 0 0" }}
      >
        <Container>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 sm:gap-6 text-left">
            {/* Left - Icon + Heading */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Customer service icon */}
              <div className="w-[55px] h-[55px] bg-white/15 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 16v-5a6 6 0 00-12 0v5" />
                  <path d="M4 15v1a2 2 0 002 2h1" />
                  <path d="M17 18h1a2 2 0 002-2v-1" />
                  <path d="M4 11a1 1 0 00-1 1v2a1 1 0 001 1" />
                  <path d="M20 11a1 1 0 011 1v2a1 1 0 01-1 1" />
                  <circle cx="12" cy="21" r="1" />
                  <path d="M9 21h6" />
                  <path d="M12 18v3" />
                </svg>
              </div>
              <h3 className="font-heading text-[16px] sm:text-[24px] font-bold text-white m-0">
                Meningkatkan Pengalaman Pelanggan.
              </h3>
            </div>

            {/* Right - Phone button */}
            <a
              href={`tel:${CONTACT_PHONE.replace(/\s/g, "")}`}
              className="flex items-center gap-3 bg-white/15 hover:bg-white/25 transition-colors rounded-full px-7 py-3 no-underline"
            >
              <span className="text-white">{Icons.phone}</span>
              <span className="text-white font-heading text-[18px] font-bold">
                {CONTACT_PHONE}
              </span>
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
