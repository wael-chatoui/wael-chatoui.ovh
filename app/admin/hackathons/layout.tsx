import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Wael Chatoui - Admin - Hackathons",
  },
};

export default function AdminHackathonsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
