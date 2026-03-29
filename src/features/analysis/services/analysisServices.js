import { createServerApi } from "@/lib/api.server";

export const getAnalysisById = async (id) => {
  const api = await createServerApi();
  const { data } = await api.get(`/analyzes/${id}`);
  return data.data;
};

export const getJobsAnalysis = async () => {
  const api = await createServerApi();
  const { data } = await api.get("/jobs");
  return data.data;
};
