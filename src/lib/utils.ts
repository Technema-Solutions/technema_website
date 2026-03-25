import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function calcReadTime(html: string): string {
  const text = html.replace(/<[^>]*>/g, "").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} menit baca`;
}
