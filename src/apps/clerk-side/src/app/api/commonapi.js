import { adminInstance } from "../../../../../libs/utils/fetch-utils";
import { CLERK_ROUTES } from "../constants/routes";

export const fetchClerkDashboard = async () => {
  const response = await adminInstance.get(
    `${CLERK_ROUTES.CLERK_DASHBOARD.DASHBOARD}`
  );
  return response.data;
};
