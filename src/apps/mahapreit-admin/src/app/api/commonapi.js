import {
  adminInstance,
  cgmInstance,
} from "../../../../../libs/utils/fetch-utils";
import { MahapreitRoutes, MH_ROUTES } from "../constants/routes";

export const fetchJobApplicationList = async () => {
  const response = await adminInstance.get(`${MH_ROUTES.JOB.JOB_LISTING}`);
  return response.data.results;
};

export const fetchMahapreitDashboard = async () => {
  const response = await adminInstance.get(
    `${MH_ROUTES.DASHBOARD.MAHAPREIT_DASHBOARD}`
  );
  return response.data;
};

export const fetchAllSchemesApplication = async () => {
  const response = await cgmInstance.get(
    `${MH_ROUTES.SCHEMES.ALL_SCHEME_APPLICATION}`
  );
  return response.data.results;
};
