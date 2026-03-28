import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export function useAnalysisJobs(interval = 6000) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchJobs = useCallback(async () => {
    try {
      const response = await api.get("/jobs");
      setJobs(response.data.data || []);
      setError(null);
    } catch (err) {
      console.error("Error fetching analysis jobs:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Primera carga
    fetchJobs();

    // Configurar polling
    const timer = setInterval(() => {
      fetchJobs();
    }, interval);

    return () => clearInterval(timer);
  }, [fetchJobs, interval]);

  return { jobs, loading, error, refetch: fetchJobs };
}
