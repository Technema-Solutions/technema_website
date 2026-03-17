"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";

interface TocItem {
  id: string;
  heading: string;
}

function TocList({
  sections,
  activeId,
  onClickItem,
}: {
  sections: TocItem[];
  activeId: string;
  onClickItem: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  return (
    <ul className="space-y-1">
      {sections.map((s) => (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={(e) => onClickItem(e, s.id)}
            className={`block py-3 px-4 text-[14px] leading-[1.5] rounded-lg transition-all duration-200 border-l-2 ${
              activeId === s.id
                ? "border-brand text-brand font-semibold bg-light-brand"
                : "border-transparent text-text-gray hover:text-dark hover:border-gray-300"
            }`}
          >
            {s.heading}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function StickyTableOfContents({ sections }: { sections: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <div className="sticky top-28">
      <div className="rounded-2xl border border-gray-200 p-5 bg-white">
        <h3 className="font-heading text-[16px] font-bold text-dark mb-3">
          Daftar Isi
        </h3>
        <TocList sections={sections} activeId={activeId} onClickItem={handleClick} />
      </div>
    </div>
  );
}

export function CollapsibleTableOfContents({ sections }: { sections: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );

    for (const section of sections) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sections]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    },
    []
  );

  return (
    <div className="mb-8">
      <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-5 py-4 text-left cursor-pointer"
        >
          <span className="font-heading text-[16px] font-bold text-dark">
            Daftar Isi
          </span>
          <ChevronDown
            className={`w-5 h-5 text-text-gray transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-4 max-h-[50vh] overflow-y-auto">
              <TocList sections={sections} activeId={activeId} onClickItem={handleClick} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TableOfContents({ sections }: { sections: TocItem[] }) {
  return <StickyTableOfContents sections={sections} />;
}
