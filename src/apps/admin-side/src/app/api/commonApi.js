import {
  adminInstance,
  adminWoAuthInstance,
  cgmInstance,
} from "../../../../../libs/utils/fetch-utils";
import {
  DmDistrict,
  UserGroup,
  VerticalId,
} from "../../../../../libs/utils/sessionStorage";
import { CGMROUTES } from "../../../../cgm-side/src/app/constants/routes";
import { ROUTES } from "../constants/routes";
export const logout = async () => {
  const response = await adminInstance.post(`${ROUTES.LOGOUT.BASEURL}`);
  return response.data;
};
export const fetchBeneficiaryList = async (limit, searchName, district) => {
  const response = await adminInstance.get(
    `${ROUTES.BENEFICIARY.BENEFICIARY_LIST}?search=${searchName}&district=${district}&limit=${limit}`
  );
  return response.data;
};

export const fetchDistrictwiseAllCount = async () => {
  const response = await adminInstance.get(
    `${ROUTES.DISTRICTWISEALLCOUNT.BASEURL}`
  );
  return response.data;
};

export const fetchbeneficiaryCount = async () => {
  const response = await adminInstance.get(
    `${ROUTES.BENEFICIARY.BENEFICIARY_LIST}?district=null&search=null&limit=10`
  );
  return response.data.count;
};
export const fetchDistrictWiseCount = async () => {
  const response = await adminInstance.get(
    `${ROUTES.DISTRICTWISEALLCOUNT.DISTRICTWISECOUNT}`
  );
  return response.data;
};
export const fetchCgmList = async () => {
  const response = await adminInstance.get(`${ROUTES.CGM.CGM_LIST}`);
  return response.data;
};

export const fetchDmList = async () => {
  const response = await adminInstance.get(`${ROUTES.DM.DM_LIST}`);
  return response.data;
};

export const fetchRmList = async () => {
  const response = await adminInstance.get(`${ROUTES.RM.RM_LIST}`);
  return response.data.results;
};
export const fetchBeneficiaryFilterData = async (limit, dis, name, offset) => {
  const response = await adminInstance.get(
    `${ROUTES.BENEFICIARY.BENEFICIARY_LIST}?district=${dis}&search=${name}&limit=${limit}&offset=${offset}`
  );
};
export const fetchVerticalWiseJobCount = async () => {
  const response = await adminInstance.get(`${ROUTES.JOB.VERTICALWISEJOB}`);
  return response.data.JobCount;
};
export const fetchJobList = async () => {
  if (UserGroup == "cgm") {
    const response = await adminInstance.get(
      `${ROUTES.JOB.JOBLIST}?vertical=${VerticalId}`
    );
    return response.data;
  } else if (UserGroup == "admin") {
    const response = await adminInstance.get(`${ROUTES.JOB.JOBLIST}`);
    return response.data;
  }
};

export const fetchCurrentJobs = async () => {
  if (UserGroup == "cgm") {
    const response = await adminInstance.get(
      `${ROUTES.JOB.JOBLIST}?vertical=${VerticalId}&JobStatus=applicationOpen`
    );
    return response.data;
  } else if (UserGroup == "admin") {
    const response = await adminInstance.get(
      `${ROUTES.JOB.JOBLIST}?JobStatus=applicationOpen`
    );
    return response.data;
  }
};

export const fetchPastJobs = async () => {
  if (UserGroup == "cgm") {
    const response = await adminInstance.get(
      `${ROUTES.JOB.JOBLIST}?vertical=${VerticalId}&JobStatus=JobEnd`
    );
    return response.data;
  } else if (UserGroup == "admin") {
    const response = await adminInstance.get(
      `${ROUTES.JOB.JOBLIST}?JobStatus=JobEnd`
    );
    return response.data;
  }
};

export const fetchJobDashboardData = async () => {
  const response = await adminInstance.get(`${ROUTES.JOB.JOB_DASHBOARD}`);
  return response.data;
};
export const fetchAdminJobList = async () => {
  const response = await adminInstance.get(
    `${ROUTES.JOB.All_VERTICAL_JOB_LIST}`
  );
  return response.data;
};

export const fetchAdminJobOfferings = async () => {
  const response = await adminInstance.get(`${ROUTES.DASHBOARD.JOBLIST}`);
  return response.data;
};
export const fetchDashboardCounts = async () => {
  const response = await adminInstance.get(`${ROUTES.DASHBOARD.COUNTS}`);
  return response.data;
};
export const fetchJobOfferings = async () => {
  const response = await cgmInstance.get(CGMROUTES.JOB.JOB_OFFERINGS);
  return response.data;
};
export const fetchAssistedList = async () => {
  if (UserGroup == "districtManager") {
    const response = await adminWoAuthInstance.get(
      `${ROUTES.BENEFICIARY.ASSISTED_LIST}?District=${DmDistrict}`
    );
    return response.data;
  } else if (UserGroup == "regionalManager") {
    const response = await adminInstance.get(
      `${ROUTES.BENEFICIARY.RM_ASSISTED_LIST}`
    );
    return response.data;
  } else {
    const response = await adminWoAuthInstance.get(
      `${ROUTES.BENEFICIARY.ASSISTED_LIST}`
    );
    return response.data;
  }
};
export const fetchFilterList = async (beneficiaryName, district) => {
  const response = await adminWoAuthInstance.get(
    `${ROUTES.BENEFICIARY.ASSISTED_LIST}?NameOfBeneficiary=${beneficiaryName}&District=${district}`
  );
  return response.data;
};

export const fetchLoanDashboardData = async () => {
  const response = await adminWoAuthInstance.get(`${ROUTES.DASHBOARD.LOAN}`);
  return response.data;
};

export const fetchClerkList = async () => {
  const response = await adminWoAuthInstance.get(`${ROUTES.SCRUTINY.LIST}`);
  return response.data;
};

export const fetchAdminTrainingDashboard = async () => {
  const response = await adminInstance.get(`${ROUTES.DASHBOARD.TRAINING}`);
  return response.data;
};
