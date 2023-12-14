import axios from "axios";
import {
  adminInstance,
  beneficaryInstance,
  trainingInstance,
  trainingwAuthInstance,
} from "../../../../../libs/utils/fetch-utils";
import {
  BeneficiaryId,
  Skills,
  Token,
} from "../../../../../libs/utils/sessionStorage";
import { ROUTES } from "../constants/routes/routes";

export const fetchUserAllData = async () => {
  const response = await beneficaryInstance.get(`${ROUTES.APPLICANT.DETAIL}`);
  return response.data;
};
export const fetchUserJobList = async () => {
  const response = await beneficaryInstance.get(`${ROUTES.APPLICANT.JOB_LIST}`);
  return response.data.results;
};
export const fetchUserListView = async () => {
  const response = await adminInstance.get(
    `${ROUTES.APPLICANT.USER_LIST_VIEW}/${BeneficiaryId}`
  );
  return response.data;
};
export const fetchRelevantJobs = async () => {
  const response = await adminInstance.get(`${ROUTES.JOB.RELEVANT_JOBS}`);
  return response.data;
};
export const fetchRelevantTrainingList = async () => {
  const response = await trainingwAuthInstance.get(
    `${ROUTES.TRAINING.RELEVANT_TRAINING}?applicationStatus=started`
  );
  return response.data.results;
};
export const fetchTrainingApplicationList = async () => {
  const response = await trainingwAuthInstance.get(
    `${ROUTES.TRAINING.TRAINING_APP}`
  );
  return response.data.results;
};
export const fetchSchemesAppList = async () => {
  const response = await beneficaryInstance.get(
    `${ROUTES.SCHEMES.SCHEMES_APP_LIST}`
  );
  return response.data.results;
};
export const fetchTrainingByID = async (id) => {
  const response = await trainingwAuthInstance.get(
    `${ROUTES.TRAINING.TRAINING_BY_ID}/${id}/`
  );
  return response.data;
};
