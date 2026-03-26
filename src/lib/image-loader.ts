interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderParams): string {
  // Uploaded files: serve directly via Caddy, skip Next.js optimizer
  if (src.startsWith("/uploads/")) {
    return src;
  }

  // All other images: use Next.js default optimizer
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`;
}
