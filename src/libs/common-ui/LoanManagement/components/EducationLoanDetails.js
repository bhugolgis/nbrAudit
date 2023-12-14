import React, { useState, useRef, useEffect } from "react";
import {
  Steps,
  Button,
  message,
  Progress,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Radio,
  Checkbox,
  Upload,
  Card,
  Spin,
  DatePicker,
} from "antd";
import moment from "moment";
import casteData from "../../../../data/casteData.json";
import countryData from "../../../../data/countrys.json";

const EducationLoanDetails = ({ data, onSuccess, onBack, form }) => {
  const { Option } = Select;
  const { TextArea } = Input;

  const [casteValue, setCasteValue] = useState("");
  const [subCaste, setSubCaste] = useState("");

  const handleSubCaste = (e) => {
    setSubCaste(e.target.value);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };
  const disabledexpDate = (current) => {
    return current && current < moment().endOf("day");
  };

  useEffect(() => {
    form.setFieldsValue({
      ExpnAmtAdmissionFeesT:
        (form.getFieldValue("ExpnAmtAdmissionFeesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesA")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesB")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesC")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesD")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesE")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesF")),
    });
    form.setFieldsValue({
      ExpnAmtinstrumentsT:
        (form.getFieldValue("ExpnAmtinstrumentsA") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsA")) +
        (form.getFieldValue("ExpnAmtinstrumentsB") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsB")) +
        (form.getFieldValue("ExpnAmtinstrumentsC") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsC")) +
        (form.getFieldValue("ExpnAmtinstrumentsD") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsD")) +
        (form.getFieldValue("ExpnAmtinstrumentsE") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsE")) +
        (form.getFieldValue("ExpnAmtinstrumentsF") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsF")),
    });
    form.setFieldsValue({
      ExpnAmtExaminationFeeT:
        (form.getFieldValue("ExpnAmtExaminationFeeA") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeA")) +
        (form.getFieldValue("ExpnAmtExaminationFeeB") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeB")) +
        (form.getFieldValue("ExpnAmtExaminationFeeC") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeC")) +
        (form.getFieldValue("ExpnAmtExaminationFeeD") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeD")) +
        (form.getFieldValue("ExpnAmtExaminationFeeE") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeE")) +
        (form.getFieldValue("ExpnAmtExaminationFeeF") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeF")),
    });

    form.setFieldsValue({
      ExpnAmtBoardingT:
        (form.getFieldValue("ExpnAmtBoardingA") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingA")) +
        (form.getFieldValue("ExpnAmtBoardingB") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingB")) +
        (form.getFieldValue("ExpnAmtBoardingC") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingC")) +
        (form.getFieldValue("ExpnAmtBoardingD") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingD")) +
        (form.getFieldValue("ExpnAmtBoardingE") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingE")) +
        (form.getFieldValue("ExpnAmtBoardingF") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingF")),
    });

    form.setFieldsValue({
      ExpnAmtInsurancepremiumT:
        (form.getFieldValue("ExpnAmtInsurancepremiumA") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumA")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumB") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumB")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumC") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumC")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumD") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumD")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumE") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumE")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumF") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumF")),
    });

    form.setFieldsValue({
      ExpnAmtTravelExpensesT:
        (form.getFieldValue("ExpnAmtTravelExpensesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesA")) +
        (form.getFieldValue("ExpnAmtTravelExpensesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesB")) +
        (form.getFieldValue("ExpnAmtTravelExpensesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesC")) +
        (form.getFieldValue("ExpnAmtTravelExpensesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesD")) +
        (form.getFieldValue("ExpnAmtTravelExpensesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesE")) +
        (form.getFieldValue("ExpnAmtTravelExpensesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesF")),
    });

    form.setFieldsValue({
      ExpnAmtCautionMoneyT:
        (form.getFieldValue("ExpnAmtCautionMoneyA") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyA")) +
        (form.getFieldValue("ExpnAmtCautionMoneyB") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyB")) +
        (form.getFieldValue("ExpnAmtCautionMoneyC") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyC")) +
        (form.getFieldValue("ExpnAmtCautionMoneyD") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyD")) +
        (form.getFieldValue("ExpnAmtCautionMoneyE") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyE")) +
        (form.getFieldValue("ExpnAmtCautionMoneyF") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyF")),
    });
    form.setFieldsValue({
      AT:
        (form.getFieldValue("ExpnAmtAdmissionFeesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesA")) +
        (form.getFieldValue("ExpnAmtinstrumentsA") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsA")) +
        (form.getFieldValue("ExpnAmtExaminationFeeA") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeA")) +
        (form.getFieldValue("ExpnAmtBoardingA") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingA")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumA") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumA")) +
        (form.getFieldValue("ExpnAmtTravelExpensesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesA")) +
        (form.getFieldValue("ExpnAmtCautionMoneyA") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyA")),
    });

    form.setFieldsValue({
      BT:
        (form.getFieldValue("ExpnAmtAdmissionFeesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesB")) +
        (form.getFieldValue("ExpnAmtinstrumentsB") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsB")) +
        (form.getFieldValue("ExpnAmtExaminationFeeB") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeB")) +
        (form.getFieldValue("ExpnAmtBoardingB") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingB")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumB") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumB")) +
        (form.getFieldValue("ExpnAmtTravelExpensesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesB")) +
        (form.getFieldValue("ExpnAmtCautionMoneyB") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyB")),
    });

    form.setFieldsValue({
      CT:
        (form.getFieldValue("ExpnAmtAdmissionFeesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesC")) +
        (form.getFieldValue("ExpnAmtinstrumentsC") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsC")) +
        (form.getFieldValue("ExpnAmtExaminationFeeC") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeC")) +
        (form.getFieldValue("ExpnAmtBoardingC") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingC")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumC") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumC")) +
        (form.getFieldValue("ExpnAmtTravelExpensesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesC")) +
        (form.getFieldValue("ExpnAmtCautionMoneyC") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyC")),
    });

    form.setFieldsValue({
      DT:
        (form.getFieldValue("ExpnAmtAdmissionFeesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesD")) +
        (form.getFieldValue("ExpnAmtinstrumentsD") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsD")) +
        (form.getFieldValue("ExpnAmtExaminationFeeD") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeD")) +
        (form.getFieldValue("ExpnAmtBoardingD") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingD")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumD") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumD")) +
        (form.getFieldValue("ExpnAmtTravelExpensesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesD")) +
        (form.getFieldValue("ExpnAmtCautionMoneyD") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyD")),
    });

    form.setFieldsValue({
      ET:
        (form.getFieldValue("ExpnAmtAdmissionFeesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesE")) +
        (form.getFieldValue("ExpnAmtinstrumentsE") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsE")) +
        (form.getFieldValue("ExpnAmtExaminationFeeE") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeE")) +
        (form.getFieldValue("ExpnAmtBoardingE") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingE")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumE") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumE")) +
        (form.getFieldValue("ExpnAmtTravelExpensesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesE")) +
        (form.getFieldValue("ExpnAmtCautionMoneyE") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyE")),
    });

    form.setFieldsValue({
      FT:
        (form.getFieldValue("ExpnAmtAdmissionFeesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesF")) +
        (form.getFieldValue("ExpnAmtinstrumentsF") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsF")) +
        (form.getFieldValue("ExpnAmtExaminationFeeF") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeF")) +
        (form.getFieldValue("ExpnAmtBoardingF") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingF")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumF") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumF")) +
        (form.getFieldValue("ExpnAmtTravelExpensesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesF")) +
        (form.getFieldValue("ExpnAmtCautionMoneyF") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyF")),
    });

    form.setFieldsValue({
      TT:
        (form.getFieldValue("AT") == null ? 0 : form.getFieldValue("AT")) +
        (form.getFieldValue("BT") == null ? 0 : form.getFieldValue("BT")) +
        (form.getFieldValue("CT") == null ? 0 : form.getFieldValue("CT")) +
        (form.getFieldValue("DT") == null ? 0 : form.getFieldValue("DT")) +
        (form.getFieldValue("ET") == null ? 0 : form.getFieldValue("ET")) +
        (form.getFieldValue("FT") == null ? 0 : form.getFieldValue("FT")),
    });
    form.setFieldsValue({
      AmtTotal:
        (form.getFieldValue("AmtPromoters") == null
          ? 0
          : form.getFieldValue("AmtPromoters")) +
        (form.getFieldValue("LoanAmount") == null
          ? 0
          : form.getFieldValue("LoanAmount")) +
        (form.getFieldValue("AmtLoanStateAgency") == null
          ? 0
          : form.getFieldValue("AmtLoanStateAgency")) +
        (form.getFieldValue("AmtSubsidy") == null
          ? 0
          : form.getFieldValue("AmtSubsidy")) +
        (form.getFieldValue("AmtOthers") == null
          ? 0
          : form.getFieldValue("AmtOthers")),
    });
  });
  const handleExpnAmt = (e) => {
    form.setFieldsValue({
      ExpnAmtAdmissionFeesT:
        (form.getFieldValue("ExpnAmtAdmissionFeesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesA")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesB")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesC")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesD")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesE")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesF")),
    });

    form.setFieldsValue({
      ExpnAmtinstrumentsT:
        (form.getFieldValue("ExpnAmtinstrumentsA") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsA")) +
        (form.getFieldValue("ExpnAmtinstrumentsB") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsB")) +
        (form.getFieldValue("ExpnAmtinstrumentsC") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsC")) +
        (form.getFieldValue("ExpnAmtinstrumentsD") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsD")) +
        (form.getFieldValue("ExpnAmtinstrumentsE") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsE")) +
        (form.getFieldValue("ExpnAmtinstrumentsF") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsF")),
    });

    form.setFieldsValue({
      ExpnAmtExaminationFeeT:
        (form.getFieldValue("ExpnAmtExaminationFeeA") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeA")) +
        (form.getFieldValue("ExpnAmtExaminationFeeB") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeB")) +
        (form.getFieldValue("ExpnAmtExaminationFeeC") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeC")) +
        (form.getFieldValue("ExpnAmtExaminationFeeD") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeD")) +
        (form.getFieldValue("ExpnAmtExaminationFeeE") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeE")) +
        (form.getFieldValue("ExpnAmtExaminationFeeF") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeF")),
    });

    form.setFieldsValue({
      ExpnAmtBoardingT:
        (form.getFieldValue("ExpnAmtBoardingA") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingA")) +
        (form.getFieldValue("ExpnAmtBoardingB") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingB")) +
        (form.getFieldValue("ExpnAmtBoardingC") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingC")) +
        (form.getFieldValue("ExpnAmtBoardingD") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingD")) +
        (form.getFieldValue("ExpnAmtBoardingE") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingE")) +
        (form.getFieldValue("ExpnAmtBoardingF") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingF")),
    });

    form.setFieldsValue({
      ExpnAmtInsurancepremiumT:
        (form.getFieldValue("ExpnAmtInsurancepremiumA") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumA")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumB") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumB")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumC") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumC")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumD") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumD")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumE") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumE")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumF") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumF")),
    });

    form.setFieldsValue({
      ExpnAmtTravelExpensesT:
        (form.getFieldValue("ExpnAmtTravelExpensesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesA")) +
        (form.getFieldValue("ExpnAmtTravelExpensesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesB")) +
        (form.getFieldValue("ExpnAmtTravelExpensesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesC")) +
        (form.getFieldValue("ExpnAmtTravelExpensesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesD")) +
        (form.getFieldValue("ExpnAmtTravelExpensesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesE")) +
        (form.getFieldValue("ExpnAmtTravelExpensesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesF")),
    });

    form.setFieldsValue({
      ExpnAmtCautionMoneyT:
        (form.getFieldValue("ExpnAmtCautionMoneyA") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyA")) +
        (form.getFieldValue("ExpnAmtCautionMoneyB") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyB")) +
        (form.getFieldValue("ExpnAmtCautionMoneyC") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyC")) +
        (form.getFieldValue("ExpnAmtCautionMoneyD") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyD")) +
        (form.getFieldValue("ExpnAmtCautionMoneyE") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyE")) +
        (form.getFieldValue("ExpnAmtCautionMoneyF") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyF")),
    });

    form.setFieldsValue({
      AT:
        (form.getFieldValue("ExpnAmtAdmissionFeesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesA")) +
        (form.getFieldValue("ExpnAmtinstrumentsA") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsA")) +
        (form.getFieldValue("ExpnAmtExaminationFeeA") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeA")) +
        (form.getFieldValue("ExpnAmtBoardingA") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingA")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumA") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumA")) +
        (form.getFieldValue("ExpnAmtTravelExpensesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesA")) +
        (form.getFieldValue("ExpnAmtCautionMoneyA") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyA")),
    });

    form.setFieldsValue({
      BT:
        (form.getFieldValue("ExpnAmtAdmissionFeesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesB")) +
        (form.getFieldValue("ExpnAmtinstrumentsB") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsB")) +
        (form.getFieldValue("ExpnAmtExaminationFeeB") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeB")) +
        (form.getFieldValue("ExpnAmtBoardingB") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingB")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumB") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumB")) +
        (form.getFieldValue("ExpnAmtTravelExpensesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesB")) +
        (form.getFieldValue("ExpnAmtCautionMoneyB") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyB")),
    });

    form.setFieldsValue({
      CT:
        (form.getFieldValue("ExpnAmtAdmissionFeesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesC")) +
        (form.getFieldValue("ExpnAmtinstrumentsC") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsC")) +
        (form.getFieldValue("ExpnAmtExaminationFeeC") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeC")) +
        (form.getFieldValue("ExpnAmtBoardingC") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingC")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumC") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumC")) +
        (form.getFieldValue("ExpnAmtTravelExpensesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesC")) +
        (form.getFieldValue("ExpnAmtCautionMoneyC") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyC")),
    });

    form.setFieldsValue({
      DT:
        (form.getFieldValue("ExpnAmtAdmissionFeesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesD")) +
        (form.getFieldValue("ExpnAmtinstrumentsD") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsD")) +
        (form.getFieldValue("ExpnAmtExaminationFeeD") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeD")) +
        (form.getFieldValue("ExpnAmtBoardingD") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingD")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumD") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumD")) +
        (form.getFieldValue("ExpnAmtTravelExpensesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesD")) +
        (form.getFieldValue("ExpnAmtCautionMoneyD") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyD")),
    });

    form.setFieldsValue({
      ET:
        (form.getFieldValue("ExpnAmtAdmissionFeesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesE")) +
        (form.getFieldValue("ExpnAmtinstrumentsE") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsE")) +
        (form.getFieldValue("ExpnAmtExaminationFeeE") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeE")) +
        (form.getFieldValue("ExpnAmtBoardingE") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingE")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumE") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumE")) +
        (form.getFieldValue("ExpnAmtTravelExpensesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesE")) +
        (form.getFieldValue("ExpnAmtCautionMoneyE") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyE")),
    });

    form.setFieldsValue({
      FT:
        (form.getFieldValue("ExpnAmtAdmissionFeesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesF")) +
        (form.getFieldValue("ExpnAmtinstrumentsF") == null
          ? 0
          : form.getFieldValue("ExpnAmtinstrumentsF")) +
        (form.getFieldValue("ExpnAmtExaminationFeeF") == null
          ? 0
          : form.getFieldValue("ExpnAmtExaminationFeeF")) +
        (form.getFieldValue("ExpnAmtBoardingF") == null
          ? 0
          : form.getFieldValue("ExpnAmtBoardingF")) +
        (form.getFieldValue("ExpnAmtInsurancepremiumF") == null
          ? 0
          : form.getFieldValue("ExpnAmtInsurancepremiumF")) +
        (form.getFieldValue("ExpnAmtTravelExpensesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtTravelExpensesF")) +
        (form.getFieldValue("ExpnAmtCautionMoneyF") == null
          ? 0
          : form.getFieldValue("ExpnAmtCautionMoneyF")),
    });

    form.setFieldsValue({
      TT:
        (form.getFieldValue("AT") == null ? 0 : form.getFieldValue("AT")) +
        (form.getFieldValue("BT") == null ? 0 : form.getFieldValue("BT")) +
        (form.getFieldValue("CT") == null ? 0 : form.getFieldValue("CT")) +
        (form.getFieldValue("DT") == null ? 0 : form.getFieldValue("DT")) +
        (form.getFieldValue("ET") == null ? 0 : form.getFieldValue("ET")) +
        (form.getFieldValue("FT") == null ? 0 : form.getFieldValue("FT")),
    });

    if (
      data.LoanSchemeCode == "central-nsfdc-el-a" ||
      data.LoanSchemeCode == "central-nsfdc-el-b"
    ) {
      form.setFieldsValue({ AmtOthers: 0 });
      form.setFieldsValue({ PerOthers: 0 });

      form.setFieldsValue({
        AmtPromoters: parseFloat(form.getFieldValue("TT") * 0.05).toFixed(2),
      });
      form.setFieldsValue({ PerPromoters: "5" });

      form.setFieldsValue({
        AmtLoanNSFDC: parseFloat(form.getFieldValue("TT") * 0.75).toFixed(2),
      });
      form.setFieldsValue({
        LoanAmount: parseFloat(form.getFieldValue("TT") * 0.75).toFixed(2),
      });
      form.setFieldsValue({ PerLoanNSFDC: "75" });

      form.setFieldsValue({
        AmtSubsidy:
          form.getFieldValue("TT") > 10000
            ? 10000
            : parseFloat(
                form.getFieldValue("TT") -
                  form.getFieldValue("AmtPromoters") -
                  form.getFieldValue("LoanAmount")
              ).toFixed(2),
      });
      form.setFieldsValue({
        PerSubsidy: parseFloat(
          form.getFieldValue("AmtSubsidy") / form.getFieldValue("TT")
        ).toFixed(2),
      });

      form.setFieldsValue({
        AmtLoanStateAgency: parseFloat(
          form.getFieldValue("TT") -
            form.getFieldValue("AmtPromoters") -
            form.getFieldValue("LoanAmount") -
            form.getFieldValue("AmtSubsidy")
        ).toFixed(2),
      });
      form.setFieldsValue({
        PerLoanStateAgency: parseFloat(
          (form.getFieldValue("AmtLoanStateAgency") * 100) /
            form.getFieldValue("TT")
        ).toFixed(2),
      });

      form.setFieldsValue({
        AmtTotal: form.getFieldValue("TT"),
      });
    }

    if (
      data.LoanSchemeCode == "central-nskfdc-el-a" ||
      data.LoanSchemeCode == "central-nskfdc-el-b"
    ) {
      form.setFieldsValue({ AmtOthers: 0 });
      form.setFieldsValue({ PerOthers: 0 });

      form.setFieldsValue({
        AmtPromoters: parseFloat(form.getFieldValue("TT") * 0.1).toFixed(2),
      });
      form.setFieldsValue({ PerPromoters: "10" });

      form.setFieldsValue({
        AmtLoanNSFDC: parseFloat(form.getFieldValue("TT") * 0.9).toFixed(2),
      });
      form.setFieldsValue({
        LoanAmount: parseFloat(form.getFieldValue("TT") * 0.9).toFixed(2),
      });
      form.setFieldsValue({ PerLoanNSFDC: "90" });

      form.setFieldsValue({ AmtSubsidy: 0 });
      form.setFieldsValue({ PerSubsidy: 0 });

      form.setFieldsValue({
        AmtLoanStateAgency: parseFloat(
          form.getFieldValue("TT") -
            form.getFieldValue("AmtPromoters") -
            form.getFieldValue("LoanAmount") -
            form.getFieldValue("AmtSubsidy")
        ).toFixed(2),
      });
      form.setFieldsValue({
        PerLoanStateAgency: parseFloat(
          (form.getFieldValue("AmtLoanStateAgency") * 100) /
            form.getFieldValue("TT")
        ).toFixed(2),
      });

      form.setFieldsValue({
        AmtTotal: form.getFieldValue("TT"),
      });
    }

    // form.setFieldsValue({
    //   AmtTotal: parseFloat((form.getFieldValue("AmtPromoters") == null ? 0 : form.getFieldValue("AmtPromoters"))
    //     + (form.getFieldValue("LoanAmount") == null ? 0 : form.getFieldValue("LoanAmount"))
    //     + (form.getFieldValue("AmtLoanStateAgency") == null ? 0 : form.getFieldValue("AmtLoanStateAgency"))
    //     + (form.getFieldValue("AmtSubsidy") == null ? 0 : form.getFieldValue("AmtSubsidy"))
    //     // + (form.getFieldValue("AmtOthers") == null ? 0 : form.gAmtOthersFieldValue("AmtOthers"))
    //   ).toFixed(2)
    // });
  };

  const handleFinanceAmt = (e) => {
    form.setFieldsValue({ AmtOthers: 0 });
    form.setFieldsValue({ PerOthers: 0 });

    // form.setFieldsValue({ AmtPromoters: form.getFieldValue("TT") * 0.05 })
    // form.setFieldsValue({ PerPromoters: "5" })

    // form.setFieldsValue({ AmtLoanNSFDC: form.getFieldValue("TT") * 0.75 })
    // form.setFieldsValue({ LoanAmount: form.getFieldValue("TT") * 0.75 })
    // form.setFieldsValue({ PerLoanNSFDC: "75" })

    // form.setFieldsValue({ AmtSubsidy: "10000" })
    // form.setFieldsValue({ PerSubsidy: (1000000 / form.getFieldValue("TT")) })

    // form.setFieldsValue({
    //   AmtLoanStateAgency: (form.getFieldValue("TT")
    //     - form.getFieldValue("AmtPromoters")
    //     - form.getFieldValue("LoanAmount")
    //     - form.getFieldValue("AmtSubsidy")
    //   )
    // })
    // form.setFieldsValue({ PerLoanStateAgency: (1000000 / form.getFieldValue("TT")) })

    form.setFieldsValue({
      AmtTotal:
        (form.getFieldValue("AmtPromoters") == null
          ? 0
          : form.getFieldValue("AmtPromoters")) +
        (form.getFieldValue("LoanAmount") == null
          ? 0
          : form.getFieldValue("LoanAmount")) +
        (form.getFieldValue("AmtLoanStateAgency") == null
          ? 0
          : form.getFieldValue("AmtLoanStateAgency")) +
        (form.getFieldValue("AmtSubsidy") == null
          ? 0
          : form.getFieldValue("AmtSubsidy")) +
        (form.getFieldValue("AmtOthers") == null
          ? 0
          : form.getFieldValue("AmtOthers")),
    });
  };

  const [LoanAmount, setLoanAmount] = useState(0);
  const handleLoanAmount = (e) => {
    form.setFieldsValue({ Investment: e });
    form.setFieldsValue({ AmtLoanNSFDC: e });

    form.setFieldsValue({ AmtOthers: 0 });
    form.setFieldsValue({ PerOthers: 0 });

    // form.setFieldsValue({ AmtPromoters: form.getFieldValue("TT") * 0.05 })
    // form.setFieldsValue({ PerPromoters: "5" })

    // form.setFieldsValue({ AmtLoanNSFDC: form.getFieldValue("TT") * 0.75 })
    // form.setFieldsValue({ LoanAmount: form.getFieldValue("TT") * 0.75 })
    // form.setFieldsValue({ PerLoanNSFDC: "75" })

    // form.setFieldsValue({ AmtSubsidy: "10000" })
    // form.setFieldsValue({ PerSubsidy: (1000000 / form.getFieldValue("TT")) })

    // form.setFieldsValue({
    //   AmtLoanStateAgency: ((form.getFieldValue("TT"))
    //     - (form.getFieldValue("AmtPromoters"))
    //     - (form.getFieldValue("LoanAmount"))
    //     - (form.getFieldValue("AmtSubsidy"))
    //   )
    // })
    // form.setFieldsValue({ PerLoanStateAgency: (1000000 / form.getFieldValue("TT")) })

    form.setFieldsValue({
      AmtTotal:
        (form.getFieldValue("AmtPromoters") == null
          ? 0
          : form.getFieldValue("AmtPromoters")) +
        (form.getFieldValue("LoanAmount") == null
          ? 0
          : form.getFieldValue("LoanAmount")) +
        (form.getFieldValue("AmtLoanStateAgency") == null
          ? 0
          : form.getFieldValue("AmtLoanStateAgency")) +
        (form.getFieldValue("AmtSubsidy") == null
          ? 0
          : form.getFieldValue("AmtSubsidy")) +
        (form.getFieldValue("AmtOthers") == null
          ? 0
          : form.getFieldValue("AmtOthers")),
    });

    form.setFieldsValue({
      ExpnAmtAdmissionFeesT:
        (form.getFieldValue("ExpnAmtAdmissionFeesA") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesA")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesB") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesB")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesC") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesC")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesD") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesD")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesE") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesE")) +
        (form.getFieldValue("ExpnAmtAdmissionFeesF") == null
          ? 0
          : form.getFieldValue("ExpnAmtAdmissionFeesF")),
    });

    if (data.LoanSchemeCode == "state-subsidy" && (e < 1 || e > 50000)) {
      message.warning("Loan Amount upto 50,000");
    } else if (data.LoanSchemeCode == "state-mm" && (e < 1 || e > 500000)) {
      message.warning("Loan Amount upto 5,00,000");
    } else if (data.LoanSchemeCode == "state-df" && (e < 1 || e > 100000)) {
      message.warning("Loan Amount upto 1,00,000");
    } else if (
      data.LoanSchemeCode == "central-nsfdc-tl-a" &&
      (e < 1 || e > 3000000)
    ) {
      message.warning("Loan Amount upto 30,00,000");
      // } else if (
      //   data.LoanSchemeCode == "central-nsfdc-tl-b" &&
      //   (e < 500000 || e >= 1000000)
      // ) {
      //   message.warning("Loan Amount Above 5,00,000/- and  Upto 10,00,000/-");
      // } else if (
      //   data.LoanSchemeCode == "central-nsfdc-tl-c" &&
      //   (e < 1000000 || e >= 2000000)
      // ) {
      //   message.warning("Loan Amount Above 10,00,000/- and  Upto 20,00,000/-");
      // } else if (
      //   data.LoanSchemeCode == "central-nsfdc-tl-d" &&
      //   (e < 2000000 || e >= 4500000)
      // ) {
      //   message.warning("Loan Amount Above 20,00,000/- and  Upto 45,00,000/-");
    } else if (
      data.LoanSchemeCode == "central-nsfdc-mcf" &&
      (e < 1 || e > 140000)
    ) {
      message.warning(
        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-msy" &&
      (e < 1 || e > 140000)
    ) {
      message.warning(
        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost "
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-may" &&
      (e < 1 || e >= 500000)
    ) {
      message.warning(
        "Loan Amount Upto 1,40,000/- or Upto 90% of the Unit Cost "
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-mky" &&
      (e < 1 || e > 75000)
    ) {
      message.warning("Loan Amount Upto 75,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nsfdc-el-a" &&
      (e < 1 || e > 2000000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Cource Fee or 20,00,000 Whichever is less"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-el-b" &&
      (e < 1 || e > 3000000)
    ) {
      message.warning(
        "Loan Amount  Upto 90% of the Cource Fee or 30,00,000 Whichever is less "
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-gbsa" &&
      (e < 1 || e >= 750000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Unit Cost or Upto 7,50,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-gbsb" &&
      (e < 750000 || e >= 1500000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Unit Cost or Above 7,50,000/- and Upto 15,00,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-gbsc" &&
      (e < 1500000 || e >= 3000000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Unit Cost or Above 15,00,000/- and Upto 30,00,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-lvy" &&
      (e < 1 || e >= 500000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Project Cost or Upto 5,00,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nskfdc-msy" &&
      (e < 1 || e > 60000)
    ) {
      message.warning("Loan Amount Upto 60,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-may" &&
      (e < 1 || e > 100000)
    ) {
      message.warning("Loan Amount Upto 1,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-mcf" &&
      (e < 1 || e > 60000)
    ) {
      message.warning("Loan Amount Upto 60,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-gtl" &&
      (e < 1 || e > 3000000)
    ) {
      message.warning("Loan Amount Upto 30,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-el-a" &&
      (e < 1 || e > 1000000)
    ) {
      message.warning("Loan Amount Upto 10,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-el-b" &&
      (e < 1 || e > 2000000)
    ) {
      message.warning("Loan Amount Upto 20,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-suy-a" &&
      (e < 1 || e >= 2500000)
    ) {
      message.warning("Loan Amount Upto 25,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-suy-b" &&
      (e < 1 || e >= 5000000)
    ) {
      message.warning("Loan Amount Upto 50,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-sms" &&
      (e < 1 || e >= 1500000)
    ) {
      message.warning("Loan Amount Upto 15,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-gbs" &&
      (e < 1 || e >= 200000)
    ) {
      message.warning("Loan Amount Upto 2,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-vetls" &&
      (e < 1 || e >= 400000)
    ) {
      message.warning("Loan Amount Upto 4,00,000/- ");
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onSuccess}
        data={data}
        autoComplete="off"
        form={form}
      >
        <h3>PERSONAL DATA:</h3>
        <Row>
          <Col span={8}>
            <Form.Item label="Caste">
              <Radio.Group
                name="Caste"
                defaultValue={data.Caste || "sc"}
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b"
                    ? true
                    : false
                }
                onChange={(e) => {
                  setCasteValue(e.target.value);
                }}
              >
                <Radio value="sc">SC</Radio>
                <Radio value="others">Other</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Sub Caste (if your subcaste is not available in
                 dropdown you are not eligible for this loan plan)"
              name="SubCaste"
              rules={[
                { required: true, message: "Please input your Sub Caste!" },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 250,
                }}
                placeholder="Select sub-caste"
                onChange={(v) => {
                  setSubCaste(v);
                }}
                defaultValue={data.subCaste || ""}
                disabled={casteValue == "others" ? true : false}
              >
                {casteData.map((sub) => {
                  return (
                    <Option value={sub.sub_caste} onChange={handleSubCaste}>
                      {sub.sub_caste}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Annual Family Income"
              name="AnnualFamilyIncome"
              rules={[
                {
                  required: true,
                  message: "Please insert Annual Family Income",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject(
                        "Annual Family Income has to be a number."
                      );
                    }
                    if (value <= 0) {
                      return Promise.reject(
                        "Annual Family Income can't be less than 0"
                      );
                    }
                    if (value > 300000) {
                      return Promise.reject(
                        "Annual Family Income can't be more than 3,00,000"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 250 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              label="Contact No (Mobile/Residence)"
              name="ContactNo"
              rules={[
                { required: true, message: "Please insert Contact No." },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Contact No has to be a number.");
                    }
                    if (value < 1000000000) {
                      return Promise.reject(
                        "Contact No can't be less than 10 digits"
                      );
                    }
                    if (value.length < 10) {
                      return Promise.reject(
                        "Contact No can't be less than 10 digits"
                      );
                    }
                    if (value.length > 10) {
                      return Promise.reject(
                        "Contact No can't be more than 10 digits"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input type="number" style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Valid Passport No. (only for students wish to study in abroad)"
              name="PassportNo"
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Valid Visa/Permit No. (If any for study abroad)"
              name="VisaPermitNo"
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            <Form.Item
              label="Valid Passport Expiry Date (only for students wish to study in abroad)"
              name="PassportExpDate"
            >
              <DatePicker
                style={{ width: 250 }}
                disabledDate={disabledexpDate}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Valid Visa/Permit Expiry Date (If any for study abroad)"
              name="VisaExpDate"
            >
              <DatePicker
                style={{ width: 250 }}
                disabledDate={disabledexpDate}
              />
            </Form.Item>
          </Col>
        </Row>

        <hr />
        <Row>
          <Col span={3}>
            <h3>Examination</h3>
          </Col>
          <Col span={7}>
            <h3>Institution/University from which passed</h3>
          </Col>
          <Col span={7}>
            <h3>Year of passing</h3>
          </Col>
          <Col span={7}>
            <h3>Percentage of marks/grade</h3>
          </Col>
        </Row>

        <Row>
          <Col span={3}>* SSC</Col>
          <Col span={7}>
            <Form.Item
              name="SSLCInstitution"
              rules={[{ required: true, message: "Please insert Institution" }]}
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="SSLCYearofpassing"
              rules={[
                { required: true, message: "Please insert Year of passing" },
              ]}
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              name="SSLCPercentageofmarks"
              rules={[
                {
                  required: true,
                  message: "Please insert Percentage of marks",
                },
              ]}
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={3}>10 + 2</Col>
          <Col span={7}>
            <Form.Item name="HSCInstitution">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="HSCYearofpassing">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="HSCPercentageofmarks">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={3}>Graduation</Col>
          <Col span={7}>
            <Form.Item name="GraduationInstitution">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="GraduationYearofpassing">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="GraduationPercentageofmarks">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={3}>P.G.</Col>
          <Col span={7}>
            <Form.Item name="PGInstitution">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="PGYearofpassing">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="PGPercentageofmarks">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={3}>Any Other (please specify)</Col>
          <Col span={7}>
            <Form.Item name="OtherInstitution">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="OtherYearofpassing">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item name="OtherPercentageofmarks">
              <Input style={{ width: 250 }} />
            </Form.Item>
          </Col>
        </Row>

        <hr />
        <h3>PARTICULARS OF PARENTS/GUARDIAN:</h3>
        <Row>
          <Col span={6}>
            <Form.Item
              label="Full Name"
              name="ParentsFullName"
              rules={[
                {
                  required: true,
                  message: "Please insert Parents/Guardian Full name",
                },
              ]}
            >
              <Input style={{ width: 250 }} />
            </Form.Item>
            <Form.Item
              label="Age"
              name="ParentsAge"
              rules={[
                {
                  required: true,
                  message: "Please insert Parents/Guardian Age",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("ParentsAge") < 18 ||
                      getFieldValue("ParentsAge") > 100
                    ) {
                      return Promise.reject("Please enter proper value");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Phone Number Res."
              name="ParentsResidencePhone"
              rules={[
                {
                  required: true,
                  message: "Please insert Parents/Guardian Phone Number",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Phone Number has to be a number.");
                    }
                    if (value.toString().length < 10) {
                      return Promise.reject(
                        "Phone Number can't be less than 10 digits"
                      );
                    }
                    if (value.toString().length > 10) {
                      return Promise.reject(
                        "Phone Number can't be more than 10 digits"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 250 }} />
            </Form.Item>
            <Form.Item
              label="Phone Number Office"
              name="ParentsPlaceofworkPhone"
              rules={[
                {
                  required: true,
                  message: "Please insert Parents/Guardian Office Phone Number",
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Phone Number has to be a number.");
                    }
                    if (value.toString().length < 10) {
                      return Promise.reject(
                        "Phone Number can't be less than 10 digits"
                      );
                    }
                    if (value.toString().length > 10) {
                      return Promise.reject(
                        "Phone Number can't be more than 10 digits"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 250 }} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Permanent Address: Residence"
              name="ParentsResidenceAddress"
              rules={[
                {
                  required: true,
                  message: "Please insert Parents/Guardian Address",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Address: Place of work"
              name="ParentsPlaceofworkAddress"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <hr />
        <h3>COURSE DETAILS: (For which Educational Loan sought)</h3>
        <Row>
          <Col span={12}>
            <Form.Item
              label="Name of the Fulltime Professional/Technical Course for which Loan is required"
              name="CourseName"
              rules={[
                { required: true, message: "Please insert Technical Course" },
              ]}
            >
              <Input style={{ width: 500 }} />
            </Form.Item>
            <Form.Item
              label="Details of placement to be provided 
            by the Educational Institute, if any"
              name="DetailsOfPlacement"
              rules={[
                {
                  required: true,
                  message: "Please insert the Educational Institute",
                },
              ]}
            >
              <Input style={{ width: 500 }} />
            </Form.Item>
            <Form.Item
              label="Name of the College/Institute/University (Affiliation/Recognition)"
              name="CourseCollegeName"
              rules={[{ required: true, message: "Please insert the details" }]}
            >
              <Input style={{ width: 500 }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Duration of the Course (In Year)"
              name="CourseDuration"
              rules={[
                { required: true, message: "Please insert the details" },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject(
                        "Duration of the Course has to be a number."
                      );
                    }
                    if (value <= 0) {
                      return Promise.reject(
                        "Duration of the Course can't be less than 0 year"
                      );
                    }
                    if (value > 10) {
                      return Promise.reject(
                        "Duration of the Course can't be more than 10 years"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 500 }} />
            </Form.Item>
            <Form.Item
              label="Entrance exam, if any, qualified"
              name="EntranceExam"
            >
              <Input style={{ width: 500 }} />
            </Form.Item>
            <Form.Item
              label="Country (Non Mandatory)"
              name="CourseCountry"
              rules={[
                { required: false, message: "Please select the country" },
              ]}
            >
              <Select
                showSearch
                placeholder="Select Country"
                // onChange={(v, k) => {
                //     setDivision(v);
                // }}
                // value={Division}
                style={{ width: "250px" }}
                // name="Division"
                // required
                defaultValue={"India"}
              >
                {countryData.map((CountryB, index) => {
                  return (
                    <Option
                      key={index}
                      value={CountryB.name}
                      //onChange={handleDivision}
                    >
                      {CountryB.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <hr />
        <h3>TOTAL STUDY EXPENSES*:</h3>
        <Row>
          <Col span={3}>
            <h3>YEAR-WISE OR SEMESTER-WISE</h3>
          </Col>
          <Col span={3}>
            <h3>1</h3>
          </Col>
          <Col span={3}>
            <h3>2</h3>
          </Col>
          <Col span={3}>
            <h3>3</h3>
          </Col>
          <Col span={3}>
            <h3>4</h3>
          </Col>
          <Col span={3}>
            <h3>5</h3>
          </Col>
          <Col span={3}>
            <h3>6</h3>
          </Col>
          <Col span={3}>
            <h3>TOTAL</h3>
          </Col>
        </Row>

        <Row>
          <Col span={3}>* Admission Fees & Tuition Fee</Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtAdmissionFeesA"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Admission Fees",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtAdmissionFeesB"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Admission Fees",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtAdmissionFeesC"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Admission Fees",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtAdmissionFeesD"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Admission Fees",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtAdmissionFeesE"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Admission Fees",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtAdmissionFeesF"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Admission Fees",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtAdmissionFeesT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>
            * Books, Stationery and other instruments required for the course
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtinstrumentsA"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt instruments",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtinstrumentsB"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt instruments",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtinstrumentsC"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt instruments",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtinstrumentsD"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt instruments",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtinstrumentsE"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt instruments",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtinstrumentsF"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt instruments",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtinstrumentsT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>* Examination Fee</Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtExaminationFeeA"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Examination Fee",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtExaminationFeeB"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Examination Fee",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtExaminationFeeC"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Examination Fee",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtExaminationFeeD"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Examination Fee",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtExaminationFeeE"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Examination Fee",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtExaminationFeeF"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Examination Fee",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtExaminationFeeT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>* Boarding and Lodging Expenses</Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtBoardingA"
              rules={[
                { required: true, message: "Please insert Expn. Amt Boarding" },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtBoardingB"
              rules={[
                { required: true, message: "Please insert Expn. Amt Boarding" },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtBoardingC"
              rules={[
                { required: true, message: "Please insert Expn. Amt Boarding" },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtBoardingD"
              rules={[
                { required: true, message: "Please insert Expn. Amt Boarding" },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtBoardingE"
              rules={[
                { required: true, message: "Please insert Expn. Amt Boarding" },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtBoardingF"
              rules={[
                { required: true, message: "Please insert Expn. Amt Boarding" },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtBoardingT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>
            * Insurance premium for policy for insuring loanees against loan in
            case of death or permanent disability
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtInsurancepremiumA"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Insurance premium",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtInsurancepremiumB"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Insurance premium",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtInsurancepremiumC"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Insurance premium",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtInsurancepremiumD"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Insurance premium",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtInsurancepremiumE"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Insurance premium",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtInsurancepremiumF"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Insurance premium",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtInsurancepremiumT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>
            * Travel Expenses/Passage Money for studying abroad.
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtTravelExpensesA"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Travel Expenses",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtTravelExpensesB"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Travel Expenses",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtTravelExpensesC"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Travel Expenses",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtTravelExpensesD"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Travel Expenses",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtTravelExpensesE"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Travel Expenses",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtTravelExpensesF"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Travel Expenses",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtTravelExpensesT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>* Caution Money, Development Fund etc.</Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtCautionMoneyA"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Caution Money",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtCautionMoneyB"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Caution Money",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtCautionMoneyC"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Caution Money",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtCautionMoneyD"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Caution Money",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtCautionMoneyE"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Caution Money",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item
              name="ExpnAmtCautionMoneyF"
              rules={[
                {
                  required: true,
                  message: "Please insert Expn. Amt Caution Money",
                },
              ]}
            >
              <InputNumber
                onChange={handleExpnAmt}
                Value={0}
                style={{ width: 160 }}
              />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ExpnAmtCautionMoneyT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={3}>
            <h3>Total</h3>
          </Col>
          <Col span={3}>
            <Form.Item name="AT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="BT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="CT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="DT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="ET">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="FT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
          <Col span={3}>
            <Form.Item name="TT">
              <InputNumber disabled style={{ width: 160 }} />
            </Form.Item>
          </Col>
        </Row>
        <hr />
        <h3>MEANS OF FINANCE:</h3>

        <Row>
          <Col span={8}>
            <h3></h3>
          </Col>
          <Col span={8}>
            <h3>Amount</h3>
          </Col>
          <Col span={8}>
            <h3>Percentage %</h3>
          </Col>
        </Row>

        <Row>
          <Col span={8}>* Promoters Contribution</Col>
          <Col span={8}>
            <Form.Item
              name="AmtPromoters"
              rules={[
                { required: true, message: "Please insert Amount Promoters" },
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                onChange={handleFinanceAmt}
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="PerPromoters"
              rules={[
                {
                  required: true,
                  message: "Please insert Percentage % Promoters",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("PerPromoters") < 0 ||
                      getFieldValue("PerPromoters") > 100
                    ) {
                      return Promise.reject("Please enter proper value");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>
            * Loan from{" "}
            {data.LoanSchemeCode == "central-nsfdc-el-a" ||
            data.LoanSchemeCode == "central-nsfdc-el-b"
              ? "NSFDC"
              : "NSKFDC"}
          </Col>
          <Col span={8}>
            <Form.Item
              name="LoanAmount"
              rules={[
                { required: true, message: "Please insert Loan Amount" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      data.LoanSchemeCode == "state-subsidy" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 50000)
                    ) {
                      return Promise.reject("Loan Amount upto 50,000");
                    } else if (
                      data.LoanSchemeCode == "state-mm" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 500000)
                    ) {
                      return Promise.reject("Loan Amount upto 5,00,000");
                    } else if (
                      data.LoanSchemeCode == "state-df" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 100000)
                    ) {
                      return Promise.reject("Loan Amount upto 1,00,000");
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-tl-a" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 3000000)
                    ) {
                      return Promise.reject("Loan Amount upto 30,00,000");
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-mcf" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 140000)
                    ) {
                      return Promise.reject(
                        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost"
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-msy" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 140000)
                    ) {
                      return Promise.reject(
                        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost "
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-mky" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 75000)
                    ) {
                      return Promise.reject("Loan Amount Upto 75,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-el-a" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 2000000)
                    ) {
                      return Promise.reject(
                        "Loan Amount Upto 90% of the Cource Fee or 20,00,000 Whichever is less"
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-el-b" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 3000000)
                    ) {
                      return Promise.reject(
                        "Loan Amount  Upto 90% of the Cource Fee or 30,00,000 Whichever is less "
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-gtl" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 3000000)
                    ) {
                      return Promise.reject("Loan Amount Upto 30,00,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-mcf" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 60000)
                    ) {
                      return Promise.reject("Loan Amount Upto 60,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-msy" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 60000)
                    ) {
                      return Promise.reject("Loan Amount Upto 60,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-may" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 100000)
                    ) {
                      return Promise.reject("Loan Amount Upto 1,00,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-el-a" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 1000000)
                    ) {
                      return Promise.reject("Loan Amount Upto 10,00,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-el-b" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 2000000)
                    ) {
                      return Promise.reject("Loan Amount Upto 20,00,000/- ");
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                style={{ width: 300 }}
                onChange={handleLoanAmount}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="PerLoanNSFDC"
              rules={[
                {
                  required: true,
                  message: "Please insert Percentage % Loan",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("PerLoanNSFDC") < 0 ||
                      getFieldValue("PerLoanNSFDC") > 100
                    ) {
                      return Promise.reject("Please enter proper value");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>* Loan from State Channelising Agency</Col>
          <Col span={8}>
            <Form.Item
              name="AmtLoanStateAgency"
              rules={[
                {
                  required: true,
                  message: "Please insert Amount State Channelising Agency",
                },
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                onChange={handleFinanceAmt}
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="PerLoanStateAgency"
              rules={[
                {
                  required: true,
                  message: "Please insert % State Channelising Agency",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("PerLoanStateAgency") < 0 ||
                      getFieldValue("PerLoanStateAgency") > 100
                    ) {
                      return Promise.reject("Please enter proper value");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={8}>* Subsidy</Col>
          <Col span={8}>
            <Form.Item
              name="AmtSubsidy"
              rules={[
                { required: true, message: "Please insert Amount Subsidy" },
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                onChange={handleFinanceAmt}
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="PerSubsidy"
              rules={[
                {
                  required: true,
                  message: "Please insert Percentage % Subsidy",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("PerSubsidy") < 0 ||
                      getFieldValue("PerSubsidy") > 100
                    ) {
                      return Promise.reject("Please enter proper value");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber
                disabled={
                  data.LoanSchemeCode == "central-nsfdc-el-a" ||
                  data.LoanSchemeCode == "central-nsfdc-el-b" ||
                  data.LoanSchemeCode == "central-nskfdc-el-a" ||
                  data.LoanSchemeCode == "central-nskfdc-el-b"
                    ? true
                    : false
                }
                style={{ width: 300 }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row>
          <Col span={8}>* Others, if any</Col>
          <Col span={8}>
            <Form.Item
              name="AmtOthers"
              rules={[
                {
                  required: true,
                  message: "Please insert Amount Others, if any",
                },
              ]}
            >
              <InputNumber onChange={handleFinanceAmt} style={{ width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="PerOthers"
              rules={[
                {
                  required: true,
                  message: "Please insert Percentage % Others, if any",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      getFieldValue("PerOthers") < 0 ||
                      getFieldValue("PerOthers") > 100
                    ) {
                      return Promise.reject("Please enter proper value");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 300 }} />
            </Form.Item>
          </Col>
        </Row> */}

        <Row>
          <Col span={8}>* Total</Col>
          <Col span={8}>
            <Form.Item
              name="AmtTotal"
              rules={[{ required: true, message: "Please insert Amount" }]}
            >
              <InputNumber disabled style={{ width: 300 }} />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>

        <hr />
        <h3>OTHER DETAILS:</h3>
        <Row>
          <Col span={6}>
            State in brief how the completion of the course is going to help for
            improving your prospects of earning your livelihood.
          </Col>
          <Col span={6}>
            <Form.Item name="OtherDetails">
              <TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>* Expected income per month :</Col>
          <Col span={6}>
            <Form.Item
              name="Expectedincomepm"
              rules={[
                {
                  required: true,
                  message: "Please insert expected income per month",
                },
              ]}
            >
              <InputNumber style={{ width: 300 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>* Anticipated monthly expenses :</Col>
          <Col span={6}>
            <Form.Item
              name="Anticipatedmonthlyexpn"
              rules={[
                { required: true, message: "Please insert monthly expenses" },
              ]}
            >
              <InputNumber style={{ width: 300 }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={6}>* Amount available for Repayment of Loan</Col>
          <Col span={6}>
            <Form.Item
              name="Amtavailableforrepayment"
              rules={[
                { required: true, message: "Please insert Repayment of Loan" },
              ]}
            >
              <InputNumber style={{ width: 300 }} />
            </Form.Item>
          </Col>
        </Row>

        {/* <Row>
          <Col span={7}>
            <Form.Item
              label="Business Name:"
              name="BusinessName"
              rules={[
                { required: true, message: "Please insert Business Name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Proposed Investment (Minimum 10% of the project cost):"
              name="Investment"
            >
              <InputNumber style={{ width: 300 }} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>

          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Brief Information of Business:"
              name="BusinessInfo"
              rules={[
                {
                  required: true,
                  message: "Please insert Brief Information of Business",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={7}>
            <Form.Item
              label="The Address of the place of Business"
              name="BusinessAdd"
              rules={[
                {
                  required: true,
                  message: "Please insert The Address of the place of Business",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Land Owned or Rented?:"
              name="OwnRented"
              rules={[
                {
                  required: true,
                  message: "Please select Land Owned or Rented?",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={"Owned"}>Owned</Radio>
                <Radio value={"Rented"}>Rented</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row> */}

        <div className="steps-action">
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => onBack(data)}
          >
            Previous
          </Button>

          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>

        {/* <Button onClick={() => { onBack(data) }}>Back</Button>
                &nbsp;
                <Button type="primary" htmlType="submit">
                    Submit
                </Button> */}
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                </Form.Item> */}
      </Form>
    </div>
  );
};

export default EducationLoanDetails;
