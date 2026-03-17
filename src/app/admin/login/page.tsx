"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function sanitizeCallbackUrl(url: string | null): string {
  if (!url) return "/admin";
  // Only allow relative paths starting with /admin
  if (url.startsWith("/admin") && !url.startsWith("//")) return url;
  return "/admin";
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    if (!cooldown) return;
    const timer = setTimeout(() => setCooldown(false), 3000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (cooldown) return;

      setLoading(true);
      setError("");

      const formData = new FormData(e.currentTarget);
      const result = await signIn("credentials", {
        email: formData.get("email"),
        password: formData.get("password"),
        redirect: false,
      });

      if (result?.error) {
        setError("Email atau password salah.");
        setLoading(false);
        setCooldown(true);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    },
    [callbackUrl, cooldown, router]
  );

  const isDisabled = loading || cooldown;

  return (
    <div className="w-full max-w-md px-4">
      <div className="rounded-2xl bg-white p-8 shadow-2xl">
        {/* Logo & Title */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#3D7EAA] to-[#6BB8D6] shadow-lg">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Technema Admin</h1>
          <p className="mt-1 text-sm text-gray-500">
            Masuk untuk mengelola konten website
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition focus:border-[#3D7EAA] focus:ring-2 focus:ring-[#3D7EAA]/20 focus:outline-none"
              placeholder="admin@technema.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 transition focus:border-[#3D7EAA] focus:ring-2 focus:ring-[#3D7EAA]/20 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className="w-full rounded-lg bg-gradient-to-r from-[#3D7EAA] to-[#6BB8D6] px-4 py-2.5 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Memproses..." : cooldown ? "Tunggu sebentar..." : "Masuk"}
          </button>
        </form>
      </div>

      <p className="mt-6 text-center text-sm text-white/50">
        &copy; {new Date().getFullYear()} Technema Solutions
      </p>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#0C2D48] to-[#132F4C] px-4">
      <Suspense fallback={<div className="text-white/50">Memuat...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
