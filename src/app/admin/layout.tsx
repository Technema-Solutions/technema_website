import { Toaster } from "sonner";

export const metadata = {
  title: "Admin | Technema Solutions",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster position="top-right" richColors />
    </>
  );
}
