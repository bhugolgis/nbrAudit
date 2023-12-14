import { useState, useEffect } from "react";
import {
  fetchAdminJobOfferings,
  fetchCurrentJobs,
  fetchJobDashboardData,
  fetchJobList,
  fetchJobOfferings,
  fetchPastJobs,
} from "../../api/commonApi";

const useJobData = () => {
  const [currentJobList, setCurrentJobList] = useState();
  const [pastJobList, setPastJobsList] = useState();
  const [jobDashboardData, setJobDashboardData] = useState();
  const [jobOfferings, setJobOfferings] = useState();
  const [loading, setLoading] = useState(true);
  const [adminJobOfferings, setAdminJobOfferings] = useState();
  const getJobList = async () => {
    const response = await fetchJobList();
  };

  const getCurrentJobs = async () => {
    const response = await fetchCurrentJobs();
    setCurrentJobList(response.results);
  };

  const getPastJobs = async () => {
    const response = await fetchPastJobs();
    setPastJobsList(response.results);
  };

  const getJobData = async () => {
    const response = await fetchJobDashboardData();
    setJobDashboardData(response);
    setLoading(false);
  };

  const getJobOfferingsData = async () => {
    const response = await fetchJobOfferings();
    setJobOfferings(response);
  };

  const getAdminJobOfferings = async () => {
    const response = await fetchAdminJobOfferings();
    setAdminJobOfferings(response);
  };

  useEffect(() => {
    getJobList();
    getJobData();
    getJobOfferingsData();
    getAdminJobOfferings();
    getCurrentJobs();
    getPastJobs();
  }, []);

  return {
    currentJobList,
    pastJobList,
    jobDashboardData,
    loading,
    jobOfferings,
    adminJobOfferings,
  };
};
export default useJobData;
