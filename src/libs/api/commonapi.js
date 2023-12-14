import axios from "axios";
import { COMMONROUTES } from "../routes";
import {
  adminInstance,
  adminWoAuthInstance,
  CgmWoAuthInstance,
  loanmanagementInstance,
  loanWoAuthInstance,
  trainingInstance,
} from "../utils/fetch-utils";
import { BeneficiaryId } from "../utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../utils/urls";

export const fetchJobList = async () => {
  const response = await adminInstance.get(`${COMMONROUTES.JOB.JOBLIST}`);
  return response.data;
};
export const fetchAllJobList = async (verticalId) => {
  const response = await adminWoAuthInstance.get(
    `${COMMONROUTES.JOB.JOBLIST}?vertical=${verticalId}&JobStatus=applicationOpen`
  );
  return response.data;
};
export const fetchVerticalList = async () => {
  const response = await adminInstance.get(
    `${COMMONROUTES.VERTICAL.VERTICAL_LIST}`
  );
  return response.data;
};
export const fetchDistrictloanApplicationCount = async () => {
  const response = await loanmanagementInstance.get(
    `${COMMONROUTES.LOAN.LOAN_DISTRICTWISE_COUNT}`
  );
  return response.data;
};
export const fetchSchemeLoanApplicationCount = async () => {
  const response = await loanmanagementInstance.get(
    `${COMMONROUTES.LOAN.SCHEME_WISE_COUNT}`
  );
  return response.data;
};
export const fetchUserListView = async () => {
  const response = await adminInstance.get(
    `${COMMONROUTES.USER.USER_LIST_VIEW}/${BeneficiaryId}/`
  );
  return response.data;
};
export const fetchTrainingList = async () => {
  const response = await trainingInstance.get(
    `${COMMONROUTES.TRAINING.TRAINING_LIST}?applicationStatus=started`
  );
  return response.data;
};

export const fetchBeneficiaryCount = async () => {
  const response = await adminWoAuthInstance.get(
    `${COMMONROUTES.USER.BENEFICIARY_COUNT}`
  );
  return response.data.TotalBeneficaryCount;
};
export const fetchJAllJobs = async () => {
  const response = await adminWoAuthInstance.get(
    `${COMMONROUTES.JOB.JOBLIST}?JobStatus=applicationOpen`
  );
  return response.data;
};
export const fetchHomeData = async () => {
  const response = await adminWoAuthInstance.get(
    `${COMMONROUTES.HOME.HOMEPAGE}`
  );
  return response.data;
};
export const fetchSchemeList = async () => {
  const response = await adminWoAuthInstance.get(
    `${COMMONROUTES.SCHEMES.SCHEME_LIST}`
  );
  return response.data;
};
export const fetchVisitorCounts = async () => {
  const response = await axios({
    method: "get",
    url: "https://api.countapi.xyz/hit/nbrmahapreit.in/2169a112-e445-4508-9df9-4ff3fda15f8e?callback=websiteVisits",
  });
  return response;
};

export const fetchDailyCount = async () => {
  const response = await axios({
    method: "get",
    url: "https://api.countapi.xyz/get/nbrmahapreit.in/2169a112-e445-4508-9df9-4ff3fda15f8e",
  });
  return response;
};
export const deleteVisitorCount = async () => {
  const response = await axios({
    method: "get",
    url: "https://api.countapi.xyz/set/nbrmahapreit.in/2169a112-e445-4508-9df9-4ff3fda15f8e?value=0",
  });
  return response.data;
};

export const fetchLoanSchemeList = async (data) => {
  const response = await loanWoAuthInstance.get(
    `${COMMONROUTES.LOAN.LOAN_SCHEME_LIST}/?search=${data}`
  );
  return response.data;
};

export const fetchDocs = async () => {
  const response = await axios.get(
    `${REACT_APP_BASE_URL}/Allauth${COMMONROUTES.AUTH.GET_DOCS}`
  );
  return response.data;
};
