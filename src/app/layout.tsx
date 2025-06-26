import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS Project",
  description: "Premium software subscriptions marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
