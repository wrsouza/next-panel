import type { Metadata } from "next";
import "../../globals.css";
import { AuthLayout } from "../../../layouts";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Authentication Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}
