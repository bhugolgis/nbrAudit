import {
  adminInstance,
  trainingInstance,
  trainingwAuthInstance,
} from "../../../../../libs/utils/fetch-utils";
import { UserGroup } from "../../../../../libs/utils/sessionStorage";
import { DmRoutes } from "../constants/routes";

export const fetchTrainingList = async () => {
  if (UserGroup == "districtManager") {
    const response = await trainingInstance.get(
      `${DmRoutes.Training.TRAINING_LIST}`
    );
    return response.data.results;
  } else if (UserGroup == "admin") {
    const response = await trainingInstance.get(
      `${DmRoutes.Training.TRAINING_LIST}`
    );
    return response.data.results;
  }
};

export const fetchCurrentTrainingList = async () => {
  const response = await trainingInstance.get(
    `${DmRoutes.Training.TRAINING_LIST}?trainingStatus=notstarted&trainingStatus=started`
  );
  return response.data.results;
};

export const fetchPastTrainingList = async () => {
  const response = await trainingInstance.get(
    `${DmRoutes.Training.TRAINING_LIST}?trainingStatus=ended`
  );
  return response.data.results;
};
export const fetchPendingApplicationList = async () => {
  const response = await trainingwAuthInstance.get(
    `${DmRoutes.Training.TRAINING_APPLICATION}/?trainingApplicationStatus=Pending`
  );
  return response.data.results;
};
export const fetchShortlistedApplicationList = async () => {
  const response = await trainingwAuthInstance.get(
    `${DmRoutes.Training.TRAINING_APPLICATION}/?trainingApplicationStatus=Shortlisted`
  );
  return response.data.results;
};
export const fetchSelectedApplicationList = async () => {
  const response = await trainingwAuthInstance.get(
    `${DmRoutes.Training.TRAINING_APPLICATION}/?trainingApplicationStatus=Selected&trainingFinalStatus=Approved&trainingFinalStatus=Pending`
  );
  return response.data.results;
};

export const fetchRejectedApplicationList = async () => {
  const response = await trainingwAuthInstance.get(
    `${DmRoutes.Training.TRAINING_APPLICATION}/?trainingFinalStatus=Rejected`
  );
  return response.data.results;
};

export const fetchAdminRejectedAppList = async () => {};
export const fetchDmDashboard = async () => {
  const response = await adminInstance.get(
    `${DmRoutes.DASHBOARD.DM_DASHBOARD}`
  );
  return response.data;
};

export const fetchAdminLoanDashboard = async () => {
  const response = await adminInstance.get(
    `${DmRoutes.DASHBOARD.ADMIN_LOAN_DASHBOARD}`
  );
  return response.data;
};
