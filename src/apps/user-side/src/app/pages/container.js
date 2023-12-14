import { useState, useEffect } from "react";
import {
  fetchRelevantJobs,
  fetchRelevantTrainingList,
  fetchSchemesAppList,
  fetchTrainingApplicationList,
  fetchUserAllData,
  fetchUserJobList,
  fetchUserListView,
} from "../api/commonapi";

const useBeneficiaryData = () => {
  const [userDetails, setUserDetails] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [userJobList, setUserJobList] = useState();
  const [listLoading, setListLoading] = useState(true);
  const [singleUser, setSingleUser] = useState();
  const [statusLoading, setStatusLoading] = useState(true);
  const [isPersonal, setIsPersonal] = useState("process");
  const [relevantTraining, setRelevantTraining] = useState();
  const [relevantJobs, setRelevantJobs] = useState();
  const [userList, setUserList] = useState();
  const [trainingList, setTrainingList] = useState();
  const [schemeList, setSchemeList] = useState();
  // Page Loading States
  const [relevantJobsLoading, setRelevantJobsLoading] = useState(true);
  const [relevantTrainingLoading, setRelevantTrainingLoading] = useState(true);
  const [appliedJobsLoading, setAppliedJobsLoading] = useState(true);
  const [appliedTrainingLoading, setAppliedTrainingLoading] = useState(true);
  const [schemesLoading, setSchemesLoading] = useState(true);

  const getApplicantDetail = async () => {
    const response = await fetchUserAllData();
    setUserDetails(response);
    setPageLoading(false);
  };
  const getJobApplicationList = async () => {
    const response = await fetchUserJobList();
    setUserJobList(response);
    setAppliedJobsLoading(false);
  };
  const getUserDetails = async () => {
    const response = await fetchUserListView();
    setSingleUser(response);
    setIsPersonal(response.data.UserPersonalInfo[0].isCompleted);
    setStatusLoading(false);
  };

  const getRelevantTraining = async () => {
    const response = await fetchRelevantTrainingList();
    setRelevantTraining(response);
    setRelevantTrainingLoading(false);
  };
  const getRelevantJobs = async () => {
    const response = await fetchRelevantJobs();
    setRelevantJobs(response);
    setRelevantJobsLoading(false);
  };
  const getUserDetail = async () => {
    const response = await fetchUserAllData();
    setUserList(response);
  };
  const getTrainingList = async () => {
    const response = await fetchTrainingApplicationList();
    setTrainingList(response);
    setAppliedTrainingLoading(false);
  };

  const getSchemesList = async () => {
    const response = await fetchSchemesAppList();
    setSchemeList(response);
    setSchemesLoading(false);
  };

  useEffect(() => {
    getApplicantDetail();
    getJobApplicationList();
    getUserDetails();
    getRelevantTraining();
    getRelevantJobs();
    getUserDetail();
    getTrainingList();
    getSchemesList();
  }, []);

  return {
    userDetails,
    userJobList,
    pageLoading,
    listLoading,
    singleUser,
    statusLoading,
    isPersonal,
    appliedJobsLoading,
    relevantTraining,
    relevantTrainingLoading,
    appliedTrainingLoading,
    relevantJobs,
    relevantJobsLoading,
    userList,
    trainingList,
    schemeList,
    schemesLoading,
  };
};
export default useBeneficiaryData;
