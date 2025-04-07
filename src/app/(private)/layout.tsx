import { DashboardLayout } from "../../layouts";
import { CookiesProvider } from "next-client-cookies/server";
import { AuthProvider } from "../../contexts";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    </CookiesProvider>
  );
}
