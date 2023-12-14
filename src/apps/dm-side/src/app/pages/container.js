import React, { useEffect, useState } from "react";
import {
  fetchAdminLoanDashboard,
  fetchCurrentTrainingList,
  fetchDmDashboard,
  fetchPastTrainingList,
  fetchPendingApplicationList,
  fetchRejectedApplicationList,
  fetchSelectedApplicationList,
  fetchShortlistedApplicationList,
  fetchTrainingList,
} from "../api/commonapi";

const useTraining = () => {
  const [trainingList, setTrainingList] = useState();
  const [pendingList, setPendingList] = useState();
  const [shortlistedList, setShortlistedList] = useState();
  const [rejectedList, setRejectedList] = useState();
  const [selectedList, setSelectedList] = useState();
  const [dmDashboard, setDmDashboard] = useState();
  const [dashboardLoading, setDashboardLoading] = useState(true);

  const [adminLoanDashboard, setAdminLoanDashboard] = useState();

  const [currentTrainingList, setCurrentTrainingList] = useState();
  const [pastTrainingList, setPastTrainingList] = useState();
  const getTrainingList = async () => {
    const response = await fetchTrainingList();
    setTrainingList(response);
  };

  const getPastTraining = async () => {
    const response = await fetchPastTrainingList();
    setPastTrainingList(response);
  };

  const getCurrentTraining = async () => {
    const response = await fetchCurrentTrainingList();
    setCurrentTrainingList(response);
  };

  const getAdminLoanDashboard = async () => {
    const response = await fetchAdminLoanDashboard();
    setAdminLoanDashboard(response);
  };

  const getPendingList = async () => {
    const response = await fetchPendingApplicationList();
    setPendingList(response);
  };
  const getShortlistedList = async () => {
    const response = await fetchShortlistedApplicationList();
    setShortlistedList(response);
  };
  const getSelectedList = async () => {
    const response = await fetchSelectedApplicationList();
    setSelectedList(response);
  };

  const getRejectedList = async () => {
    const response = await fetchRejectedApplicationList();
    setRejectedList(response);
  };
  const getDmDashboard = async () => {
    const response = await fetchDmDashboard();
    setDmDashboard(response);
    setDashboardLoading(false);
  };

  useEffect(() => {
    getTrainingList();
    getPendingList();
    getShortlistedList();
    getSelectedList();
    getDmDashboard();
    getRejectedList();
    getCurrentTraining();
    getPastTraining();
    getAdminLoanDashboard();
  }, []);
  return {
    trainingList,
    currentTrainingList,
    pastTrainingList,
    adminLoanDashboard,
    pendingList,
    shortlistedList,
    rejectedList,
    selectedList,
    dmDashboard,
    dashboardLoading,
  };
};
export default useTraining;
