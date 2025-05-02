import API_ENDPOINTS from "../constant/endpoints";

export const StartApiFilterDatas = async () => {
  const response = await fetch(`${API_ENDPOINTS.filterDatas}/start/api`);
  return response;
};
