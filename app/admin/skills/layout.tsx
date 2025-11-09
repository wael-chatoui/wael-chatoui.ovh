import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Wael Chatoui - Admin - Skills",
  },
};

export default function AdminSkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
