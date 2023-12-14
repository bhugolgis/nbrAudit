import axios from "axios";
import { Token } from "../sessionStorage";
import { REACT_APP_BASE_URL } from "../urls";

export const adminInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/adminmodule`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `token ${Token}`,
  },
});

export const adminWoAuthInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/adminmodule`,
});

export const beneficaryInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/applicant`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${Token}`,
  },
});
export const cgmInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/cgm`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${Token}`,
  },
});

export const authInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/Allauth`,
});
export const loanmanagementInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/loan`,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `token ${Token}`,
  },
});

export const trainingInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/training`,
});
export const trainingwAuthInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/training`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${Token}`,
  },
});

export const loanWoAuthInstance = axios.create({
  baseURL: `${REACT_APP_BASE_URL}/loan`,
});
