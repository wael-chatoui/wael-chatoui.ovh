"use client";

import { useState, useEffect } from "react";
import { Experience, Project, Hackathon } from "@/types/expertise";

interface UseExpertiseDataReturn {
  experiences: Experience[];
  projects: Project[];
  hackathons: Hackathon[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useExpertiseData(): UseExpertiseDataReturn {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const [expRes, projRes, hackRes] = await Promise.all([
        fetch('/api/experiences'),
        fetch('/api/projects'),
        fetch('/api/hackathons'),
      ]);

      if (!expRes.ok || !projRes.ok || !hackRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const [expData, projData, hackData] = await Promise.all([
        expRes.json(),
        projRes.json(),
        hackRes.json(),
      ]);

      setExperiences(expData.data || []);
      setProjects(projData.data || []);
      setHackathons(hackData.data || []);
    } catch (err) {
      console.error('Error fetching expertise data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    experiences,
    projects,
    hackathons,
    loading,
    error,
    refetch: fetchData,
  };
}
