import React from "react";
import { useState, useEffect } from "react";
import {
  fetchAllJobList,
  fetchJobList,
  fetchUserListView,
  fetchVerticalList,
} from "../../api/commonapi";

const useCommonJob = () => {
  const [jobList, setJobList] = useState();
  const [loading, setLoading] = useState(true);
  const [verticalList, setVerticalList] = useState();
  const [open, setOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [userList, setUserList] = useState();
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const getJobList = async (verticalId) => {
    const response = await fetchAllJobList(verticalId);
    setJobList(response);
    setLoading(false);
  };
  // const getVerticalList = async () => {
  //   const response = await fetchVerticalList();
  //   setVerticalList(response);
  //   setModalLoading(false);
  // };

  const getUserList = async () => {
    const response = await fetchUserListView();
    setUserList(response.data);
  };

  // const verticalFilter = async () => {
  //   const response = await
  // }

  useEffect(() => {
    getJobList(null);
    // getVerticalList();
    getUserList();
  }, []);

  return {
    jobList,
    loading,
    open,
    verticalList,
    modalLoading,
    userList,
    showModal,
    handleCancel,
    handleOk,
    getJobList,
  };
};
export default useCommonJob;
