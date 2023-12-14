import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  fetchAllCounts,
  fetchBeneficiaryCount,
  fetchCount,
  fetchHomeData,
  fetchJAllJobs,
  fetchJobList,
  fetchSchemeList,
  fetchTrainingList,
  fetchUserListView,
  fetchVisitorCounts,
} from "../../api/commonapi";
import { Token } from "../../utils/sessionStorage";

const useHome = () => {
  const [homePageCounts, setHomePageCounts] = useState();
  const [jobList, setJobList] = useState();
  const [trainingList, setTrainingList] = useState();
  const [jobLoading, setJobLoading] = useState(true);
  const [trainingLoading, setTrainingLoading] = useState(true);
  const [countLoading, setCountLoading] = useState(true);
  const [userList, setUserList] = useState();
  const [numOfTraining, setNumOfTraining] = useState();
  const [numOfJobs, setNumOfJobs] = useState();

  const getHomePageCounts = async () => {
    const response = await fetchHomeData();
    setHomePageCounts(response);
    setCountLoading(false);
  };
  const getJobList = async () => {
    const response = await fetchJAllJobs();
    setJobList(response);
    setNumOfJobs(response.count);
    setJobLoading(false);
  };
  const getTrainingList = async () => {
    const response = await fetchTrainingList();
    setTrainingList(response);
    setNumOfTraining(response.count);
    setTrainingLoading(false);
  };

  const getUserListView = async () => {
    if (Token == null) {
      return null;
    } else {
      const response = await fetchUserListView();
      setUserList(response.data);
    }
  };

  useEffect(() => {
    getHomePageCounts();
    getJobList();
    getTrainingList();
    getUserListView();
  }, []);

  return {
    homePageCounts,
    jobList,
    jobLoading,
    numOfJobs,
    trainingList,
    trainingLoading,
    countLoading,
    userList,
    numOfTraining,
  };
};
export default useHome;
