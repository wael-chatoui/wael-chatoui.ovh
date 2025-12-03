"use client";

import { motion } from "framer-motion";
import { sora } from "@/app/font";
import SkillFlag from "@/components/skill-flag";
import SkillLegend from "@/components/skill-legend";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";

interface Skill {
  id: number;
  import { redirect } from "next/navigation";

  export default function SkillsRedirectPage() {
    redirect("/expertise/skills");
  }
}
