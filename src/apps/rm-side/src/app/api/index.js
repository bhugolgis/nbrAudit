import React from "react";
import { adminInstance } from "../../../../../libs/utils/fetch-utils";
import { RM_ROUTES } from "../constants/route";

export const fetchRmDashboard = async () => {
  const response = await adminInstance.get(`${RM_ROUTES.DASHBOARD}`);
  return response.data;
};
