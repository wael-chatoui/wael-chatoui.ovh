import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills",
};

export default function ExpertiseSkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
