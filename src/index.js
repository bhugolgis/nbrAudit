import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./libs/common-ui/login/login";
import Register from "./apps/user-side/src/app/pages/Register/register";
import EmptyPage from "./libs/common-ui/page404";
import ForgotPassword from "./libs/common-ui/forgot-password";
import Training from "./libs/common-ui/training";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<App />} />
      <Route path="/about" element={<App />} />
      <Route path="/opportunity" element={<App />} />
      <Route path="/help" element={<App />} />
      <Route path="/jobs" element={<App />} />
      <Route path="/contact" element={<App />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/training" element={<App />} />
      <Route path="/goverment-resolutions" element={<App />} />
      <Route path="/user-manual" element={<App />} />
      <Route path="/loan-form" element={<App />} />
      <Route path="/NsfkdcForm" element={<App />} />
      <Route path="/state-subsidy" element={<App />} />
      <Route path="/state-mm" element={<App />} />
      <Route path="/state-df" element={<App />} />
      <Route path="/LoanList" element={<App />} />
      <Route path="/central-nsfdc-tl-a" element={<App />} />
      <Route path="/central-nsfdc-tl-b" element={<App />} />
      <Route path="/central-nsfdc-tl-c" element={<App />} />
      <Route path="/central-nsfdc-tl-d" element={<App />} />
      <Route path="/central-nsfdc-mcf" element={<App />} />
      <Route path="/central-nsfdc-msy" element={<App />} />
      <Route path="/central-nsfdc-mky" element={<App />} />
      <Route path="/central-nsfdc-may" element={<App />} />
      <Route path="/central-nsfdc-el-a" element={<App />} />
      <Route path="/central-nsfdc-el-b" element={<App />} />
      <Route path="/central-nsfdc-gbsa" element={<App />} />
      <Route path="/central-nsfdc-gbsb" element={<App />} />
      <Route path="/central-nsfdc-gbsc" element={<App />} />
      <Route path="/central-nsfdc-lvy" element={<App />} />
      <Route path="/central-nskfdc-msy" element={<App />} />
      <Route path="/central-nskfdc-may" element={<App />} />
      <Route path="/central-nskfdc-mcf" element={<App />} />
      <Route path="/central-nskfdc-gtl" element={<App />} />
      <Route path="/central-nskfdc-el-a" element={<App />} />
      <Route path="/central-nskfdc-el-b" element={<App />} />
      <Route path="/central-nskfdc-suy-a" element={<App />} />
      <Route path="/central-nskfdc-suy-b" element={<App />} />
      <Route path="/central-nskfdc-sms" element={<App />} />
      <Route path="/central-nskfdc-gbs" element={<App />} />
      <Route path="/central-nskfdc-vetls" element={<App />} />
      <Route path="/loanbeneficiarypage" element={<App />} />
      <Route path="/loanscrunitypage" element={<App />} />
      <Route path="/loandmpage" element={<App />} />
      <Route path="/loanrmpage" element={<App />} />
      <Route path="/loanbankpage" element={<App />} />
      {/* <Route path="/loanmahapreitpage" element={<App />} /> */}
      <Route path="/loanmpbcdcpage" element={<App />} />
      <Route path="/loanmpbcdcmdpage" element={<App />} />
      <Route path="/dashboard" element={<App />} />
      <Route path="/schemes" element={<App />} />
      <Route path="/nsfkdc-schemes" element={<App />} />
      <Route path="/nsfdc-schemes" element={<App />} />
      <Route path="/about-mahapreit" element={<App />} />
      <Route path="/about-mpbcdc" element={<App />} />
      <Route path="/about-nbr" element={<App />} />
      <Route path="/subsidy-schemes" element={<App />} />
      <Route path="/money-margin-schemes" element={<App />} />
      <Route path="/direct-finance-schemes" element={<App />} />
      <Route path="/training-schemes" element={<App />} />
      <Route path="/loan-application" element={<App />} />
      <Route path="/my-profile" element={<App />} />
      <Route path="/cgm-dashboard" element={<App />} />
      <Route path="/cgm-past-jobs" element={<App />} />
      <Route path="/beneficiary-applications" element={<App />} />
      <Route path="/cgm-current-training" element={<App />} />
      <Route path="/cgm-past-training" element={<App />} />
      <Route path="/personal-information" element={<App />} />
      <Route path="/income-and-domicile-information" element={<App />} />
      <Route path="/eligibility-information" element={<App />} />
      <Route path="/residential-information" element={<App />} />
      <Route path="/bank-information" element={<App />} />
      <Route path="/personal-information" element={<App />} />
      <Route path="/income-and-domicile-information" element={<App />} />
      <Route path="/qualification-information" element={<App />} />
      <Route path="/eligibility-information" element={<App />} />
      <Route path="/residential-information" element={<App />} />
      <Route path="/bank-information" element={<App />} />
      <Route path="/other-information" element={<App />} />
      <Route path="/admin-dashboard" element={<App />} />
      <Route path="/admin-cgm" element={<App />} />
      <Route path="/user-dashboard" element={<App />} />
      <Route path="/user-profile" element={<App />} />
      <Route path="/dm-dashboard" element={<App />} />
      <Route path="/admin-beneficiaries-list" element={<App />} />
      <Route path="*" element={<EmptyPage />} />
      <Route path="/admin-dm" element={<App />} />
      <Route path="/admin-rm" element={<App />} />
      <Route path="/admin-current-jobs" element={<App />} />
      <Route path="/admin-past-jobs" element={<App />} />
      <Route path="/cgm-add-job" element={<App />} />
      <Route path="/cgm-current-jobs" element={<App />} />
      <Route path="/cgm-job-dashboard" element={<App />} />
      <Route path="/admin-job-dashboard" element={<App />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin-loan-dashboard" element={<App />} />
      <Route path="/admin-training" element={<App />} />
      <Route path="/admin-job-applications" element={<App />} />
      <Route path="/view-profile" element={<App />} />
      <Route path="/rm-dashboard" element={<App />} />
      <Route path="/clerk-dashboard" element={<App />} />
      <Route path="/add-training" element={<App />} />
      <Route path="/current-training" element={<App />} />
      <Route path="/mpbcdc-dashboard" element={<App />} />
      <Route path="/mpbcdc-training" element={<App />} />
      <Route path="/mpbcdc-loan-application" element={<App />} />
      <Route path="/mahapreit-dashboard" element={<App />} />
      <Route path="/mahapreit-jobs" element={<App />} />
      <Route path="/user-job-application" element={<App />} />
      <Route path="/user-training-application" element={<App />} />
      <Route path="/user-scheme-application" element={<App />} />
      <Route path="/cgm-special-schemes" element={<App />} />

      <Route path="/apply-mahogani-scheme" element={<App />} />
      <Route path="/apply-housing-scheme" element={<App />} />
      <Route path="/apply-ews-scheme" element={<App />} />
      <Route path="/plantation-beautification-scheme" element={<App />} />
      <Route path="/e-rickshaw-scheme" element={<App />} />

      <Route path="/training-application" element={<App />} />
      <Route path="/dm-training-application" element={<App />} />
      <Route path="/clerk-training-applications" element={<App />} />
      <Route path="/admin-special-schemes-application" element={<App />} />
      <Route path="/beneficiary-assisted" element={<App />} />
      <Route path="/beneficiary-assisted-list-mpbcdc" element={<App />} />
      <Route path="/beneficiary-asssited-list-mahapreit" element={<App />} />
      <Route path="/beneficiary-asssisted-list-dm" element={<App />} />
      <Route path="/beneficiary-asssisted-list-rm" element={<App />} />

      <Route path="/loan-count-report" element={<App />} />
      <Route path="/loan-detail-report" element={<App />} />

      <Route path="dm-loanCount-report" element={<App />} />
      <Route path="dm-loanDetail-report" element={<App />} />

      <Route path="rm-loanCount-report" element={<App />} />
      <Route path="rm-loanDetail-report" element={<App />} />

      <Route path="/cgm-scheme-dashboard" element={<App />} />

      <Route path="/mahapreit-beneficiaires" element={<App />} />
      <Route path="/admin-schemes-dashboard" element={<App />} />
      <Route path="/beneficiary-scheme-application" element={<App />} />
      <Route path="/mahapreit-schemes" element={<App />} />
      <Route path="/admin-scrutiny" element={<App />} />
      <Route path="/dm-past-training" element={<App />} />

      <Route path="/admin-training-dashboard" element={<App />} />
      <Route path="/admin-current-training" element={<App />} />
      <Route path="/admin-past-training" element={<App />} />
      <Route path="/admin-schemes-applications" element={<App />} />
      <Route path="/help" element={<App />} />
    </Routes>
  </BrowserRouter>
);
