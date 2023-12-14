import React, { useEffect } from "react";
import { useState } from "react";
import {
  fetchDistrictloanApplicationCount,
  fetchSchemeLoanApplicationCount,
} from "../../api/commonapi";
import { DmDistrict } from "../../utils/sessionStorage";

const useTables = () => {
  const [districtwiseApp, setDistrictwiseApp] = useState();
  const [schemewiseApp, setSchemewiseApp] = useState();
  const getDistrictLoanApp = async () => {
    const response = await fetchDistrictloanApplicationCount();

    const res = response.filter(f => DmDistrict.split(',').some(item => item === f.district));
    if (DmDistrict !== "") {
      setDistrictwiseApp(res);
    } else {
      setDistrictwiseApp(response);
    }

    // setDistrictwiseApp(response);
  };
  const getSchemeLoanApp = async () => {
    const response = await fetchSchemeLoanApplicationCount();
    setSchemewiseApp(response);
  };

  useEffect(() => {
    getDistrictLoanApp();
    getSchemeLoanApp();
  }, []);

  return { districtwiseApp, schemewiseApp };
};
export default useTables;
