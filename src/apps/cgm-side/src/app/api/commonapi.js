import axios from "axios";
import {
  adminInstance,
  adminWoAuthInstance,
  cgmInstance,
} from "../../../../../libs/utils/fetch-utils";
import { Token, UserGroup } from "../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../libs/utils/urls";
import { CGMROUTES } from "../constants/routes";

export const fetchPendingJobApplicationList = async () => {
  if (UserGroup == "cgm") {
    const response = await axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/cgm/VerticalWiseJobApplicantList?JobTabStatus=Pending`,
      headers: {
        Authorization: `token ${Token}`,
      },
    });
    return response.data.results;
  } else if (UserGroup == "admin") {
    const response = await cgmInstance.get(
      `${REACT_APP_BASE_URL}/adminmodule/AllVerticalWiseJobApplicantList?JobTabStatus=Pending`
    );
    return response.data.results;
  }
};
export const fetchSortlistedJobApplications = async () => {
  if (UserGroup == "cgm") {
    const response = await axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/cgm/VerticalWiseJobApplicantList?JobTabStatus=Shortlisted`,
      headers: {
        Authorization: `token ${Token}`,
      },
    });
    return response.data.results;
  } else if (UserGroup == "admin") {
    const response = await cgmInstance.get(
      `${REACT_APP_BASE_URL}/adminmodule/AllVerticalWiseJobApplicantList?JobTabStatus=Shortlisted`
    );
    return response.data.results;
  }
};
export const fetchSelectedJobApplications = async () => {
  if (UserGroup == "cgm") {
    const response = await axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/cgm/VerticalWiseJobApplicantList?JobTabStatus=Selected`,
      headers: {
        Authorization: `token ${Token}`,
      },
    });
    return response.data.results;
  } else if (UserGroup == "admin") {
    const response = await cgmInstance.get(
      `${REACT_APP_BASE_URL}/adminmodule/AllVerticalWiseJobApplicantList?JobTabStatus=Selected`
    );
    return response.data.results;
  }
};

export const fetchRejectedJobApplication = async () => {
  const response = await axios({
    method: "get",
    url: `${REACT_APP_BASE_URL}/cgm/VerticalWiseJobApplicantList?JobTabStatus=Rejected`,
    headers: {
      Authorization: `token ${Token}`,
    },
  });
  return response.data.results;
};
export const fetchCgmDashboardDetails = async () => {
  if (UserGroup == "cgm") {
    const response = await cgmInstance.get(`${CGMROUTES.CGM.DASHBOARD}`);
    return response.data;
  } else if (UserGroup == "admin") {
    const response = await adminInstance.get(
      `${CGMROUTES.ADMIN.JOB_DASHBOARD}`
    );
    return response.data;
  }
};
export const fetchPendingSchemeList = async () => {
  const response = await cgmInstance.get(
    `${CGMROUTES.SPECIAL_SCHEMES.SCHEME_LIST}?SchemeApplicationStatus=Pending`
  );
  return response.data;
};
export const fetchShortlistedSchemeList = async () => {
  const response = await cgmInstance.get(
    `${CGMROUTES.SPECIAL_SCHEMES.SCHEME_LIST}?SchemeApplicationStatus=Shortlisted`
  );
  return response.data.results;
};
export const fetchSelectedSchemeList = async () => {
  const response = await cgmInstance.get(
    `${CGMROUTES.SPECIAL_SCHEMES.SCHEME_LIST}?SchemeApplicationStatus=Selected`
  );
  return response.data.results;
};
export const fetchRejectedSchemeList = async () => {
  const response = await cgmInstance.get(
    `${CGMROUTES.SPECIAL_SCHEMES.SCHEME_LIST}?SchemeApplicationStatus=Rejected`
  );
  return response.data.results;
};

export const fetchSchemeDashboard = async () => {
  if (UserGroup == "admin") {
    const response = await adminWoAuthInstance.get(
      `${CGMROUTES.SPECIAL_SCHEMES.ADMIN_DASHBOARD}`
    );
    return response.data;
  } else {
    const response = await adminInstance.get(
      `${CGMROUTES.SPECIAL_SCHEMES.DASHBOARD}`
    );
    return response.data;
  }
};
