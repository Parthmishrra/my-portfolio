import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Partha Sarathi Mishra — Software Engineer & UI/UX Designer",
  description: "Portfolio of Partha Sarathi Mishra, software engineer and UI/UX designer based in Bengaluru."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
