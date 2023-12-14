import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchSchemeList, fetchUserListView } from "../../api/commonapi";

const useCarousel = () => {
  const [userList, setUserList] = useState();
  const [schemeList, setSchemeList] = useState();
  const [listLoading, setListLoading] = useState(true);
  const [schemeCount, setSchemeCount] = useState();
  const getUserList = async () => {
    const response = await fetchUserListView();
    setUserList(response.data);
  };

  const getSchemeList = async () => {
    const response = await fetchSchemeList();
    setSchemeList(response);
    setListLoading(false);
    setSchemeCount(response.count);
  };

  useEffect(() => {
    getUserList();
    getSchemeList();
  }, []);
  return { userList, schemeList, listLoading, schemeCount };
};
export default useCarousel;
