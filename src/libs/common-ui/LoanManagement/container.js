import axios from "axios";
import { useState, useEffect } from "react";
import { loanmanagementInstance } from "../../../libs/utils/fetch-utils";
import { Name, DmDistrict } from "../../utils/sessionStorage";

const useLoanList = (statusname, heading) => {
  const [userList, setUserList] = useState();
  const [nextData, setNextData] = useState(null);
  const [prevData, setPrevData] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  //loanmanagementInstance
  //LoanStatuswiseList
  const fetchLoanList = async (limit) => {
    if (heading == "Submited Form") {
      const response = await loanmanagementInstance.get(
        `/LoanFormListuserAPI/${Name || ""}`
      );
      return response.data;
    } else {
      const response = await loanmanagementInstance.get(
        `/LoanStatuswiseList/${statusname}`
        // `/LoanStatuswiseList/${statusname}?limit=${limit}`
        // `/LoanStatuswiseList/${statusname}?limit=${limit}&search=${DmDistrict}`
      );
      return response.data;
    }
  };

  const getLoanList = async () => {
    // const response = await adminInstance.get(
    //   `/ApplicantList/?limit=100`
    // );
    const response = await fetchLoanList(100);
    const res = response.results.filter((f) =>
      DmDistrict.split(",").some((item) => item === f.District)
    );
    if (DmDistrict !== "") {
      setUserList(res);
    } else {
      setUserList(response.results);
    }
    setNextData(response.next);
    setPrevData(response.previous);
    setPageLoading(false);
  };

  const handleNext = () => {
    loanmanagementInstance.get(nextData).then((response) => {
      setUserList(response.data.results);
      setNextData(response.data.next);
      setPrevData(response.data.previous);
    });
  };

  const handlePrev = () => {
    loanmanagementInstance.get(prevData).then((response) => {
      setUserList(response.data.results);
      setNextData(response.data.next);
      setPrevData(response.data.previous);
    });
  };
  useEffect(() => {
    getLoanList();
  }, []);

  return { userList, pageLoading, nextData, prevData, handleNext, handlePrev };
};
export default useLoanList;
