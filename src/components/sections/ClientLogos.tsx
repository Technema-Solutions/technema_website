import Image from "next/image";
import { ArrowUpRight, Monitor, Star, Hexagon } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ClientItem {
  name: string;
  icon: string;
  logo?: string | null;
}

const iconMap: Record<string, LucideIcon> = {
  ArrowUpRight, Monitor, Star, Hexagon,
};

function LogoItem({ client }: { client: ClientItem }) {
  if (client.logo) {
    return (
      <div className="flex shrink-0 items-center gap-2 px-3 sm:px-4 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
        <Image
          src={client.logo}
          alt={client.name}
          width={200}
          height={64}
          className="h-16 w-auto object-contain"
        />
        <span className="whitespace-nowrap font-heading text-sm font-bold text-dark tracking-wider uppercase">
          {client.name}
        </span>
      </div>
    );
  }

  const Icon = client.icon ? iconMap[client.icon] : null;
  return (
    <div className="flex shrink-0 items-center gap-2 px-3 sm:px-4 opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0">
      {Icon && <Icon className="w-5 h-5 text-dark" />}
      <span
        className={`whitespace-nowrap font-heading text-dark ${Icon ? "text-lg font-bold" : "text-xl font-extrabold"
          } tracking-wider uppercase`}
      >
        {client.name}
      </span>
    </div>
  );
}

export default function ClientLogos({ clients }: { clients: ClientItem[] }) {
  return (
    <section className="overflow-hidden bg-white py-12 lg:py-16">
      <p className="mb-8 text-center text-sm font-medium tracking-widest text-gray-400 uppercase">
        Mitra Perusahaan Kami
      </p>

      <div className="group relative flex">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex animate-marquee gap-8 group-hover:[animation-play-state:paused]">
          {clients.map((client) => (
            <LogoItem key={client.name} client={client} />
          ))}
          {clients.map((client) => (
            <LogoItem key={`dup-${client.name}`} client={client} />
          ))}
        </div>
      </div>
    </section>
  );
}
