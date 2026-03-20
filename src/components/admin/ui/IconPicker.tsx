"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import * as LucideIcons from "lucide-react";

// Extract all PascalCase icon names once at module level
const ALL_ICON_NAMES: string[] = Object.keys(LucideIcons).filter(
  (k) =>
    k[0] === k[0].toUpperCase() &&
    !k.endsWith("Icon") &&
    k !== "default" &&
    k !== "icons" &&
    k !== "createLucideIcon" &&
    typeof (LucideIcons as Record<string, unknown>)[k] !== "function"
);

const MAX_RESULTS = 60;

interface IconPickerProps {
  value: string;
  onChange: (name: string) => void;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function IconPicker({
  value,
  onChange,
  name,
  placeholder = "Pilih ikon...",
  required,
}: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Focus search input when popover opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const filteredIcons = useMemo(() => {
    if (search.length < 2) return [];
    const q = search.toLowerCase();
    const results: string[] = [];
    for (const name of ALL_ICON_NAMES) {
      if (name.toLowerCase().includes(q)) {
        results.push(name);
        if (results.length >= MAX_RESULTS) break;
      }
    }
    return results;
  }, [search]);

  const handleSelect = useCallback(
    (iconName: string) => {
      onChange(iconName);
      setIsOpen(false);
      setSearch("");
    },
    [onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange("");
      setSearch("");
    },
    [onChange]
  );

  // Render a single icon by PascalCase name
  const renderIcon = (iconName: string, size = 20) => {
    const IconComp = (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>>)[iconName];
    if (!IconComp) return null;
    return <IconComp size={size} strokeWidth={1.5} />;
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={value} />}

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-left focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA] bg-white flex items-center gap-2.5 min-h-[38px]"
      >
        {value ? (
          <>
            <span className="text-[#3D7EAA] flex-shrink-0">{renderIcon(value)}</span>
            <span className="flex-1 truncate text-gray-900">{value}</span>
            <span
              onClick={handleClear}
              className="text-gray-400 hover:text-red-500 flex-shrink-0 cursor-pointer"
            >
              <LucideIcons.X size={14} />
            </span>
          </>
        ) : (
          <>
            <LucideIcons.Search size={16} className="text-gray-400 flex-shrink-0" />
            <span className="text-gray-400 flex-1">{placeholder}</span>
          </>
        )}
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full min-w-[320px] bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <LucideIcons.Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari ikon... (min. 2 huruf)"
                className="w-full rounded-lg border border-gray-200 pl-9 pr-4 py-2 text-sm focus:border-[#3D7EAA] focus:outline-none focus:ring-1 focus:ring-[#3D7EAA]"
              />
            </div>
          </div>

          {/* Icon grid */}
          <div className="max-h-[280px] overflow-y-auto p-3">
            {search.length < 2 ? (
              <p className="text-center text-sm text-gray-400 py-6">
                Ketik minimal 2 huruf untuk mencari ikon
              </p>
            ) : filteredIcons.length === 0 ? (
              <p className="text-center text-sm text-gray-400 py-6">
                Tidak ada ikon yang cocok
              </p>
            ) : (
              <>
                <div className="grid grid-cols-6 gap-1">
                  {filteredIcons.map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => handleSelect(iconName)}
                      title={iconName}
                      className={`flex flex-col items-center justify-center p-2 rounded-lg text-gray-600 hover:bg-[#EFF7FB] hover:text-[#3D7EAA] transition-colors cursor-pointer ${
                        value === iconName ? "bg-[#EFF7FB] text-[#3D7EAA] ring-1 ring-[#3D7EAA]/30" : ""
                      }`}
                    >
                      {renderIcon(iconName, 18)}
                      <span className="text-[9px] mt-1 truncate w-full text-center leading-tight">
                        {iconName}
                      </span>
                    </button>
                  ))}
                </div>
                {filteredIcons.length >= MAX_RESULTS && (
                  <p className="text-center text-xs text-gray-400 mt-2">
                    Menampilkan {MAX_RESULTS} hasil pertama — ketik lebih spesifik
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
