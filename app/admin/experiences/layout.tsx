import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Wael Chatoui - Admin - Experiences",
  },
};

export default function AdminExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
