import axios from "axios";
import React, { useEffect, useState } from "react";
import { fetchAssistedList, fetchFilterList } from "../../api/commonApi";

const useAssisted = () => {
  const [assistedList, setAssistedList] = useState();
  const [nextPage, setNextPage] = useState();
  const [prevPage, setPrevPage] = useState();
  const [disFilter, setDisFilter] = useState(null);
  const [search, setSearch] = useState(null);
  const getAssistedList = async () => {
    const response = await fetchAssistedList();
    setAssistedList(response.results);
    setNextPage(response.next);
    setPrevPage(response.previous);
  };

  const getNextPageData = () => {
    axios.get(nextPage).then((response) => {
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setAssistedList(response.data.results);
    });
  };

  const getPrevPageData = () => {
    axios.get(prevPage).then((response) => {
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setAssistedList(response.data.results);
    });
  };

  const getFilterList = async () => {
    const response = await fetchFilterList(search, disFilter);
    setAssistedList(response.results);
    setNextPage(response.next);
    setPrevPage(response.previous);
  };
  useEffect(() => {
    getAssistedList();
  }, []);
  return {
    assistedList,
    getPrevPageData,
    getNextPageData,
    disFilter,
    search,
    setSearch,
    setDisFilter,
    getFilterList,
  };
};
export default useAssisted;
