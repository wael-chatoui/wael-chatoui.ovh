import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Wael Chatoui - Admin - Projects",
  },
};

export default function AdminProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
