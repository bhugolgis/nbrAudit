import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  fetchCgmList,
  fetchClerkList,
  fetchDmList,
  fetchRmList,
} from "../../api/commonApi";

const useUserData = () => {
  const [cgmList, setCgmList] = useState();
  const [dmList, setDmList] = useState();
  const [rmList, setRmList] = useState();
  const [clerkList, setClerkList] = useState();

  const getCgmList = async () => {
    const response = await fetchCgmList();
    setCgmList(response);
  };
  const getDmList = async () => {
    const response = await fetchDmList();
    setDmList(response);
  };
  const getRmList = async () => {
    const response = await fetchRmList();
    setRmList(response);
  };

  const getClerkList = async () => {
    const response = await fetchClerkList();
    setClerkList(response);
  };

  useEffect(() => {
    getCgmList();
    getDmList();
    getRmList();
    getClerkList();
  }, []);

  return {
    cgmList,
    dmList,
    rmList,
    clerkList,
  };
};
export default useUserData;
