import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchLoanSchemeList, fetchUserListView } from "../../api/commonapi";
import { UserGroup } from "../../utils/sessionStorage";

const useSchemes = (props) => {
  const [isActive, setIsActive] = useState(true);
  const [userList, setUserList] = useState();
  const [loanList, setLoanList] = useState();
  const [loading, setLoading] = useState(true);

  const getUserList = async () => {
    const response = await fetchUserListView();
    setUserList(response.data);
  };

  const getLoanList = async () => {
    const response = await fetchLoanSchemeList(props);
    setLoanList(response);
    setLoading(false);
  };
  useEffect(() => {
    getUserList();
    getLoanList();
  }, []);
  return { isActive, userList, loanList, loading };
};
export default useSchemes;
