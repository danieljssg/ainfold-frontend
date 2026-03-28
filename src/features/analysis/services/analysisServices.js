import serverApi from "@/lib/api.server";

export const getJobsAnalysis = async () => {
  const response = await serverApi.get("/jobs");
  return response.data.data;
};

export const getAnalysisById = async (id) => {
  const response = await serverApi.get(`/analyzes/${id}`);
  return response.data.data;
};
