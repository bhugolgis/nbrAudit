import axios from "axios";
import { useState, useEffect } from "react";
import { fetchBeneficiaryList } from "../../api/commonApi";

const useBeneficiaryList = () => {
  const [userList, setUserList] = useState();
  const [nextData, setNextData] = useState();
  const [prevData, setPrevData] = useState();
  const [pageLoading, setPageLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [disFilter, setDisFilter] = useState(null);
  const [nameFilter, setNameFilter] = useState(null);
  const handleName = (e) => {
    setNameFilter(e.target.value);
  };
  const handleDistrict = (e) => {
    setDisFilter(e.target.value);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSearch = async () => {
    const response = await fetchBeneficiaryList(100, nameFilter, disFilter);
    setUserList(response.results);
    setNextData(response.next);
    setPrevData(response.previous);
  };

  const handleClear = async () => {
    setNameFilter(null);
    setDisFilter(null);
  };
  const getBeneficiaryList = async () => {
    const response = await fetchBeneficiaryList(100, nameFilter, disFilter);
    setUserList(response.results);
    setNextData(response.next);
    setPrevData(response.previous);
    setPageLoading(false);
  };

  const handleNext = () => {
    axios.get(nextData).then((response) => {
      setUserList(response.data.results);
      setNextData(response.data.next);
      setPrevData(response.data.previous);
    });
  };

  const handlePrev = () => {
    axios.get(prevData).then((response) => {
      setUserList(response.data.results);
      setNextData(response.data.next);
      setPrevData(response.data.previous);
    });
  };
  useEffect(() => {
    getBeneficiaryList();
  }, []);

  return {
    userList,
    pageLoading,
    nextData,
    prevData,
    isModalOpen,
    modalLoading,
    userData,
    disFilter,
    nameFilter,
    handleClear,
    handleSearch,
    setDisFilter,
    setUserData,
    handleName,
    handleDistrict,
    setModalLoading,
    handleNext,
    handlePrev,
    handleOk,
    handleCancel,
    showModal,
  };
};
export default useBeneficiaryList;
