import API_ENDPOINTS from "../constant/endpoints";

export const StartApiFilterCpfImage = async () => {
  const response = await fetch(`${API_ENDPOINTS.filterCpfImage}/start/api`);
  return response;
};

export const StartApiFilterDatas = async () => {
  const response = await fetch(`${API_ENDPOINTS.filterDatas}/start/api`);
  return response;
};
