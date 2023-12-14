import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  deleteVisitorCount,
  fetchDailyCount,
  fetchVisitorCounts,
} from "../../api/commonapi";

const useFooter = () => {
  const [visitorCount, setVisitorCount] = useState();
  const [dailyCount, setDailyCount] = useState();

  const getVisitorCounts = async () => {
    const response = await fetchVisitorCounts();
    setVisitorCount(
      response.data.slice(
        response.data.lastIndexOf(":") + 1,
        response.data.lastIndexOf("}")
      )
    );
  };

  const deletVisitors = async () => {
    const response = await deleteVisitorCount();
    setDailyCount(response.value);
  };

  const getDailyCounts = async () => {
    const response = await fetchDailyCount();
    setDailyCount(response.data.value);
  };
  useEffect(() => {
    getVisitorCounts();

    setInterval(() => {
      getDailyCounts();
      deletVisitors();
    }, 86400000);
  }, []);
  return { visitorCount };
};
export default useFooter;
