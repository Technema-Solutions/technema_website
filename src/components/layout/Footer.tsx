import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import Container from "@/components/ui/Container";
import type { LucideIcon } from "lucide-react";

const socialIconMap: Record<string, LucideIcon> = {
  Facebook, Twitter, Instagram, Linkedin,
};

interface FooterColumnItem {
  id: string;
  title: string;
  links: { id: string; label: string; href: string }[];
}

interface SocialLinkItem {
  id: string;
  platform: string;
  href: string;
  icon: string;
}

interface FooterProps {
  siteName: string;
  companyTagline: string;
  footerColumns: FooterColumnItem[];
  socialLinks: SocialLinkItem[];
}

export default function Footer({ siteName, companyTagline, footerColumns, socialLinks }: FooterProps) {
  return (
    <footer className="bg-dark pt-20 pb-0 relative overflow-hidden">
      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="footerCircuit" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <circle cx="100" cy="100" r="2" fill="white" />
              <line x1="100" y1="100" x2="200" y2="100" stroke="white" strokeWidth="0.5" />
              <line x1="100" y1="100" x2="100" y2="0" stroke="white" strokeWidth="0.5" />
              <circle cx="50" cy="50" r="1.5" fill="white" />
              <line x1="50" y1="50" x2="100" y2="100" stroke="white" strokeWidth="0.5" />
              <circle cx="150" cy="50" r="1.5" fill="white" />
              <line x1="150" y1="50" x2="200" y2="0" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerCircuit)" />
        </svg>
      </div>

      {/* Large decorative shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -bottom-16 -left-16 w-[300px] h-[300px] opacity-[0.05]">
          <circle cx="150" cy="150" r="120" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="150" cy="150" r="80" fill="none" stroke="white" strokeWidth="0.8" />
        </svg>
        <svg className="absolute -top-10 -right-10 w-[250px] h-[250px] opacity-[0.04]">
          <circle cx="125" cy="125" r="100" fill="none" stroke="white" strokeWidth="1.5" />
          <circle cx="125" cy="125" r="60" fill="none" stroke="white" strokeWidth="0.8" />
        </svg>
        <svg className="absolute top-1/3 right-1/4 w-[400px] h-[200px] opacity-[0.04]">
          <line x1="0" y1="200" x2="400" y2="0" stroke="white" strokeWidth="0.5" />
          <line x1="40" y1="200" x2="400" y2="30" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-12">
          {/* Logo + Description + Social */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Image src="/images/logo_technema.png" alt="Technema Solutions" width={34} height={34} className="w-[34px] h-[34px] object-contain" />
              <span className="font-heading text-[20px] font-bold">
                <span className="text-white">Technema Solutions</span>
              </span>
            </div>
            <p className="text-white/50 text-[14px] leading-[1.8] max-w-[300px] mb-6">
              {companyTagline}
            </p>

            {/* Social media icons */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = socialIconMap[social.icon];
                return (
                  <a
                    key={social.id}
                    href={social.href}
                    className="w-[36px] h-[36px] bg-white/10 rounded-full flex items-center justify-center text-white/60 hover:bg-brand hover:text-white transition-all duration-300 no-underline"
                    aria-label={social.platform}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Dynamic Footer Columns */}
          {footerColumns.map((column) => (
            <div key={column.id}>
              <h4 className="text-white font-bold text-[16px] font-heading mb-5">{column.title}</h4>
              {column.links.map((link) =>
                link.href === "#" ? (
                  <span key={link.id} className="block text-white/50 text-[14px] mb-3">
                    {link.label}
                  </span>
                ) : (
                  <a key={link.id} href={link.href} className="block text-white/50 no-underline text-[14px] mb-3 transition-colors hover:text-brand-light">
                    {link.label}
                  </a>
                )
              )}
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-[16px] font-heading mb-5">Buletin</h4>
            <p className="text-white/50 text-[14px] leading-[1.7] mb-4">
              Berlangganan buletin kami untuk mendapatkan informasi dan wawasan terbaru.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Email Anda"
                className="flex-1 px-4 py-3 rounded-[10px] border border-white/10 bg-white/5 text-white text-[14px] outline-none focus:border-brand transition-colors"
              />
              <button className="bg-brand border-none text-white px-5 py-3 rounded-[10px] cursor-pointer font-semibold text-[14px] transition-colors hover:bg-[#2D6890]">
                <Send className="w-[18px] h-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <span className="text-white/40 text-[13px]">
            &copy; {new Date().getFullYear()} {siteName}. Hak cipta dilindungi.
          </span>
          <div className="flex gap-5 flex-wrap justify-center">
            <a href="/syarat-ketentuan" className="text-white/40 no-underline text-[13px] hover:text-white transition-colors">
              Syarat &amp; Ketentuan
            </a>
            <a href="/kebijakan-privasi" className="text-white/40 no-underline text-[13px] hover:text-white transition-colors">
              Kebijakan Privasi
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
