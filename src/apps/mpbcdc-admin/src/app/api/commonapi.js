import {
  adminWoAuthInstance,
  loanmanagementInstance,
  trainingwAuthInstance,
} from "../../../../../libs/utils/fetch-utils";
import { MpbcdcRoutes } from "../constants/routes";

export const fetchTrainingApplicationList = async () => {
  const response = await trainingwAuthInstance.get(
    `${MpbcdcRoutes.TRAINING.TRAINING_LIST}`
  );
  return response.data.results;
};

export const fetchLoanApplicationSchemesWise = async () => {
  const response = await loanmanagementInstance.get(
    `${MpbcdcRoutes.LOAN.LOAN_APPLICATION_SCHEMEWISE}`
  );
  return response.data;
};

export const fetchDashboardData = async () => {
  const response = await adminWoAuthInstance.get(`${MpbcdcRoutes.DASHBOARD}`);
  return response.data;
};
