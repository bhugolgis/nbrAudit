import { useEffect } from "react";
import { useState } from "react";
import {
  fetchCgmDashboardDetails,
  fetchPendingJobApplicationList,
  fetchPendingSchemeList,
  fetchRejectedJobApplication,
  fetchRejectedSchemeList,
  fetchSchemeApplicationList,
  fetchSchemeDashboard,
  fetchSelectedJobApplications,
  fetchSelectedSchemeList,
  fetchShortlistedSchemeList,
  fetchSortlistedJobApplications,
} from "../api/commonapi";
import axios from "axios";
import { cgmInstance } from "../../../../../libs/utils/fetch-utils";

const useCgmData = () => {
  const [pendingJobApplicationList, setPendingJobApplicationList] = useState();
  const [sortlistedJobList, setSortlistedList] = useState();
  const [selectedJobList, setSelectedJobList] = useState();
  const [rejectedJobList, setRejectedJobList] = useState();
  const [open, setOpen] = useState(false);
  const [cgmDashboardDetails, setCgmDashboardDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [jobApplicationCount, setJobApplicationCount] = useState();
  const [schemePenList, setSchemePenList] = useState();
  const [schemeShortList, setSchemeShortList] = useState();
  const [schemeSelectList, setSchemeSelectList] = useState();
  const [schemeRejectList, setSchemeRejectList] = useState();
  const [docsLoading, setDocsLoading] = useState(true);

  const [schemeDashboard, setSchemeDashboard] = useState();
  const [schemeDashboardLoading, setSchemeDashboardLoading] = useState(true);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const getPendingJobApplicationList = async () => {
    const response = await fetchPendingJobApplicationList();
    setPendingJobApplicationList(response);
    setDocsLoading(false);
  };

  const getShortlistedList = async () => {
    const response = await fetchSortlistedJobApplications();
    setSortlistedList(response);
  };
  const getSelectedList = async () => {
    const response = await fetchSelectedJobApplications();
    setSelectedJobList(response);
  };

  const getRejectedList = async () => {
    const response = await fetchRejectedJobApplication();
    setRejectedJobList(response);
  };

  const getCgmDashboardDetails = async () => {
    const response = await fetchCgmDashboardDetails();
    setCgmDashboardDetails(response);
    setJobApplicationCount(response.districtJobApplicationCount);
    setLoading(false);
  };

  const [pendingNext, setPendingNext] = useState();
  const [pendingPrev, setPendingPrev] = useState();
  const getPendingSchemeList = async () => {
    const response = await fetchPendingSchemeList();
    setPendingNext(response.next);
    setPendingPrev(response.previous);
    setSchemePenList(response.results);
  };

  const getPendingNext = async () => {
    const response = await cgmInstance.get(pendingNext);
    setSchemePenList(response.data.results);
    setPendingNext(response.data.next);
    setPendingPrev(response.data.previous);
  };
  const getPendingPrev = async () => {
    const response = await cgmInstance.get(pendingPrev);
    setSchemePenList(response.data.results);
    setPendingNext(response.data.next);
    setPendingPrev(response.data.previous);
  };
  const getShortlistedSchemeList = async () => {
    const response = await fetchShortlistedSchemeList();
    setSchemeShortList(response);
  };
  const getSelectedSchemeList = async () => {
    const response = await fetchSelectedSchemeList();
    setSchemeSelectList(response);
  };
  const getRejectedSchemeList = async () => {
    const response = await fetchRejectedSchemeList();
    setSchemeRejectList(response);
  };

  const getSchemeDashboardData = async () => {
    const response = await fetchSchemeDashboard();
    setSchemeDashboard(response);
    setSchemeDashboardLoading(false);
  };

  useEffect(() => {
    getPendingJobApplicationList();
    getShortlistedList();
    getSelectedList();
    getCgmDashboardDetails();
    getPendingSchemeList();
    getShortlistedSchemeList();
    getSelectedSchemeList();
    getRejectedList();
    getRejectedSchemeList();
    getSchemeDashboardData();
  }, []);
  return {
    pendingJobApplicationList,
    sortlistedJobList,
    selectedJobList,
    rejectedJobList,
    open,
    cgmDashboardDetails,
    loading,
    jobApplicationCount,
    schemePenList,
    schemeSelectList,
    schemeShortList,
    schemeRejectList,
    docsLoading,
    schemeDashboard,
    schemeDashboardLoading,
    getPendingNext,
    getPendingPrev,
    showModal,
    handleOk,
    handleCancel,
  };
};
export default useCgmData;
