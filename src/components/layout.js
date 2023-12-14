import React, { useState } from "react";
import NsfkdcForm from "../libs/common-ui/nsfkdc";
import LoanForm from "../libs/common-ui/LoanManagement/LoanForm";
import LoanBankpage from "../libs/common-ui/LoanManagement/LoanBankpage";
import LoanMahapreitpage from "../libs/common-ui/LoanManagement/LoanMahapreitpage";
import LoanMPBCDCpage from "../libs/common-ui/LoanManagement/LoanMPBCDCpage";
import { Contact } from "../libs/common-ui/Contact/contact";
import Dashboard from "../apps/cgm-side";
import Header from "../libs/common-ui/header/header";
import { Home } from "../libs/common-ui/Home/index";
import { Col, Row, Spin } from "antd";
import { AboutMahapreit } from "../libs/common-ui/About/mahapreit";
import MainFooter from "../libs/common-ui/footer";
import NsfkdcSchemes from "../libs/common-ui/Schemes/nsfkdc";
import NsfdcSchemes from "../libs/common-ui/Schemes/nsfdc";
import { AboutMpbcdc } from "../libs/common-ui/About/mpbcdc";
import { AboutNbr } from "../libs/common-ui/About/nbr";
import Subsidy from "../libs/common-ui/Schemes/subsidy";
import MoneyMargin from "../libs/common-ui/Schemes/moneymargin";
import DirectFinance from "../libs/common-ui/Schemes/directfinance";
import ProfileForm from "../apps/user-side/src/app/pages/profile/editProfile/index";
import AdminMain from "../apps/admin-side";
import UserDashboard from "../apps/user-side";
import DmDashboard from "../apps/dm-side/index";
import TopHeader from "../libs/common-ui/top-header";
import Jobs from "../libs/common-ui/jobs";
import { UserGroup } from "../libs/utils/sessionStorage";
import RmDashboard from "../apps/rm-side";
import ClerkDashboard from "../apps/clerk-side";
import Training from "../libs/common-ui/training";
import MpbcdcDashboard from "../apps/mpbcdc-admin";
import MahapreitDashboard from "../apps/mahapreit-admin";
import MahoganiForm from "../libs/common-ui/forms/mahogani";
import HousingForm from "../libs/common-ui/forms/housing";
import TrainingForm from "../libs/common-ui/training/form";
import EwsForm from "../libs/common-ui/forms/ews";
import { NbrLogo } from "../media";
import { Link } from "react-router-dom";
import { GuideLines } from "../libs/common-ui/Home/style";
import Guidelines from "../libs/common-ui/Guidelines";
import Plantation from "../libs/common-ui/forms/plantation";
import Usermanual from "../libs/common-ui/Guidelines/usermanual";
import Erickshaw from "../libs/common-ui/forms/eRickshaw";
import CgmDashboard from "../apps/cgm-side/src/app/pages/dashboard/dashboard";
import AdminDashboard from "../apps/admin-side/src/app/pages/dashboard";
import MPBCDCMDDashboard from "../apps/mpbcdc-md";
import Help from "../libs/common-ui/help";
const Layout = (props) => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);
  const [loading, setLoading] = useState(false);

  const getLoadingValue = (value) => {
    setLoading(value);
  };

  return (
    <div>
      <Spin spinning={loading} tip="Logging out... ">
        <TopHeader func={getLoadingValue} />
        <Row style={{ width: "100%" }}>
          <Col
            span={4}
            style={{
              margin: "6px 0px 5px 0px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Link to="/home">
              <img
                src={NbrLogo}
                width="80px"
                height="80px"
                style={{ marginTop: "10px" }}
              />
            </Link>
          </Col>

          <Col span={20}>
            <Row style={{ display: "flex", justifyContent: "Center" }}>
              <h2
                style={{
                  paddingTop: "10px",
                }}
              >
                <b>NAVYUG Beneficiary Registration</b>
              </h2>
            </Row>
            <Header />
          </Col>
        </Row>
        {relUrl == "home" ? <Home address={props.locPath} /> : ""}
        {relUrl == "about-mahapreit" ? (
          <AboutMahapreit address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "about-mpbcdc" ? (
          <AboutMpbcdc address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "about-nbr" ? <AboutNbr address={props.locPath} /> : ""}
        {relUrl == "contact" ? <Contact address={props.locPath} /> : ""}
        {relUrl == "jobs" ? <Jobs /> : ""}
        {relUrl == "help" ? <Help /> : ""}
        {relUrl == "loan-form" ? <NsfkdcForm address={props.locPath} /> : ""}
        {relUrl == "training" ? <Training /> : ""}
        {relUrl == "goverment-resolutions" ? <Guidelines /> : ""}
        {relUrl == "user-manual" ? <Usermanual /> : ""}
        {relUrl == "NsfkdcForm" ? <NsfkdcForm address={props.locPath} /> : ""}
        {relUrl == "state-subsidy" ? <LoanForm address={props.locPath} /> : ""}
        {relUrl == "state-mm" ? <LoanForm address={props.locPath} /> : ""}
        {relUrl == "state-df" ? <LoanForm address={props.locPath} /> : ""}

        {relUrl == "central-nsfdc-tl-a" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-tl-b" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-tl-c" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-tl-d" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-mcf" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-msy" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-mky" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-may" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-el-a" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-el-b" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-gbsa" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-gbsb" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-gbsc" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nsfdc-lvy" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}

        {relUrl == "central-nskfdc-msy" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-may" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-mcf" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-gtl" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-el-a" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-el-b" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-suy-a" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-suy-b" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-sms" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-gbs" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "central-nskfdc-vetls" && UserGroup == "beneficiary" ? (
          <LoanForm address={props.locPath} />
        ) : (
          ""
        )}

        {relUrl == "loanbeneficiarypage" && UserGroup == "beneficiary" ? (
          <UserDashboard address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "loanscrunitypage" && UserGroup == "scrutinyClerk" ? (
          <ClerkDashboard address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "clerk-training-applications" &&
        UserGroup == "scrutinyClerk" ? (
          <ClerkDashboard />
        ) : (
          ""
        )}
        {relUrl == "loandmpage" && UserGroup == "districtManager" ? (
          <DmDashboard address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "loanrmpage" ? <RmDashboard address={props.locPath} /> : ""}
        {relUrl == "loanbankpage" ? (
          <LoanBankpage address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "loanmahapreitpage" ? (
          <LoanMahapreitpage address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "loanmpbcdcpage" ? (
          <MpbcdcDashboard address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "loanmpbcdcmdpage" ? (
          <MPBCDCMDDashboard address={props.locPath} />
        ) : (
          ""
        )}

        {/* {relUrl == "dashboard" && UserGroup == "cgm" ? (
          <Dashboard />
        ) : (
          message.error("Cgm is not logged in !")
        )} */}
        {relUrl == "nsfkdc-schemes" ? (
          <NsfkdcSchemes address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "nsfdc-schemes" ? <NsfdcSchemes /> : ""}
        {relUrl == "subsidy-schemes" ? <Subsidy /> : ""}
        {relUrl == "money-margin-schemes" ? <MoneyMargin /> : ""}
        {relUrl == "direct-finance-schemes" ? <DirectFinance /> : ""}
        {relUrl == "training-schemes" ? <Training /> : ""}
        {relUrl == "personal-information" && UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "beneficiary-scheme-application" ? <UserDashboard /> : ""}
        {relUrl == "income-and-domicile-information" &&
        UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "eligibility-information" && UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "residential-information" && UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "qualification-information" && UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          " "
        )}
        {relUrl == "bank-information" && UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "other-information" && UserGroup == "beneficiary" ? (
          <ProfileForm relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "cgm-dashboard" && UserGroup == "cgm" ? (
          <Dashboard address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "cgm-job-dashboard" && UserGroup == "cgm" ? (
          <Dashboard address={props.locPath} />
        ) : (
          ""
        )}
        {relUrl == "cgm-past-jobs" && UserGroup == "cgm" ? <Dashboard /> : ""}
        {relUrl == "beneficiary-applications" && UserGroup == "cgm" ? (
          <Dashboard />
        ) : (
          ""
        )}
        {relUrl == "cgm-current-training" && UserGroup == "cgm" ? (
          <Dashboard />
        ) : (
          ""
        )}
        {relUrl == "cgm-past-training" && UserGroup == "cgm" ? (
          <Dashboard />
        ) : (
          ""
        )}
        {relUrl == "cgm-special-schemes" && UserGroup == "cgm" ? (
          <Dashboard />
        ) : (
          ""
        )}
        {relUrl == "admin-dashboard" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "admin-cgm" && UserGroup == "admin" ? <AdminMain /> : ""}
        {relUrl == "admin-dm" && UserGroup == "admin" ? <AdminMain /> : ""}
        {relUrl == "admin-rm" && UserGroup == "admin" ? <AdminMain /> : ""}
        {relUrl == "LoanList" ? <MpbcdcDashboard /> : ""}
        {relUrl == "mpbcdc-loan-application" ? <MpbcdcDashboard /> : ""}
        {relUrl == "user-dashboard" && UserGroup == "beneficiary" ? (
          <UserDashboard relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "user-profile" && UserGroup == "beneficiary" ? (
          <UserDashboard relUrl={relUrl} />
        ) : (
          ""
        )}
        {relUrl == "user-job-application" && UserGroup == "beneficiary" ? (
          <UserDashboard />
        ) : (
          ""
        )}
        {relUrl == "user-training-application" && UserGroup == "beneficiary" ? (
          <UserDashboard />
        ) : (
          ""
        )}
        {relUrl == "user-scheme-application" && UserGroup == "beneficiary" ? (
          <UserDashboard />
        ) : (
          ""
        )}
        {relUrl == "dm-dashboard" && UserGroup == "districtManager" ? (
          <DmDashboard />
        ) : (
          ""
        )}
        {relUrl == "admin-schemes-dashboard" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "admin-beneficiaries-list" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}

        {relUrl == "admin-current-jobs" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "admin-past-jobs" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "cgm-add-job" && UserGroup == "cgm" ? <Dashboard /> : ""}
        {relUrl == "cgm-current-jobs" && UserGroup == "cgm" ? (
          <Dashboard />
        ) : (
          ""
        )}
        {relUrl == "admin-job-dashboard" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "admin-loan-dashboard" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "admin-training" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "admin-job-applications" && UserGroup == "admin" ? (
          <AdminMain />
        ) : (
          ""
        )}
        {relUrl == "apply-mahogani-scheme" && UserGroup == "beneficiary" ? (
          <MahoganiForm />
        ) : (
          ""
        )}
        {relUrl == "apply-housing-scheme" && UserGroup == "beneficiary" ? (
          <HousingForm />
        ) : (
          ""
        )}
        {relUrl == "apply-ews-scheme" && UserGroup == "beneficiary" ? (
          <EwsForm />
        ) : (
          ""
        )}
        {relUrl == "e-rickshaw-scheme" && UserGroup == "beneficiary" ? (
          <Erickshaw />
        ) : (
          ""
        )}
        {relUrl == "plantation-beautification-scheme" &&
        UserGroup == "beneficiary" ? (
          <Plantation />
        ) : (
          ""
        )}
        {relUrl == "training-application" && UserGroup == "beneficiary" ? (
          <TrainingForm />
        ) : (
          ""
        )}
        {relUrl == "view-profile" && UserGroup == "cgm" ? <Dashboard /> : ""}
        {relUrl == "rm-dashboard" ? <RmDashboard /> : ""}
        {relUrl == "clerk-dashboard" ? <ClerkDashboard /> : ""}
        {relUrl == "add-training" ? <DmDashboard /> : ""}
        {relUrl == "current-training" ? <DmDashboard /> : ""}

        {relUrl == "mpbcdc-dashboard" ? <MpbcdcDashboard /> : ""}
        {relUrl == "mpbcdc-training" ? <MpbcdcDashboard /> : ""}
        {relUrl == "mahapreit-dashboard" ? <MahapreitDashboard /> : ""}
        {relUrl == "mahapreit-jobs" ? <MahapreitDashboard /> : ""}
        {relUrl == "dm-training-application" ? <DmDashboard /> : ""}
        {relUrl == "admin-special-schemes-application" ? <AdminMain /> : ""}

        {relUrl == "beneficiary-assisted" ? <AdminMain /> : ""}
        {relUrl == "beneficiary-assisted-list-mpbcdc" ? (
          <MpbcdcDashboard />
        ) : (
          ""
        )}
        {relUrl == "beneficiary-asssited-list-mahapreit" ? (
          <MahapreitDashboard />
        ) : (
          ""
        )}
        {relUrl == "beneficiary-asssisted-list-dm" ? <DmDashboard /> : ""}
        {relUrl == "beneficiary-asssisted-list-rm" ? <RmDashboard /> : ""}
        {relUrl == "loan-count-report" ? <MpbcdcDashboard /> : ""}
        {relUrl == "loan-detail-report" ? <MpbcdcDashboard /> : ""}

        {relUrl == "dm-loanDetail-report" ? <DmDashboard /> : ""}
        {relUrl == "dm-loanCount-report" ? <DmDashboard /> : ""}

        {relUrl == "rm-loanCount-report" ? <RmDashboard /> : ""}
        {relUrl == "rm-loanDetail-report" ? <RmDashboard /> : ""}

        {relUrl == "cgm-scheme-dashboard" ? <Dashboard /> : ""}
        {relUrl == "mahapreit-beneficiaires" ? <MahapreitDashboard /> : ""}
        {relUrl == "mahapreit-schemes" ? <MahapreitDashboard /> : ""}
        {relUrl == "admin-scrutiny" ? <AdminMain /> : ""}
        {relUrl == "dm-past-training" ? <DmDashboard /> : ""}
        {relUrl == "admin-training-dashboard" ? <AdminMain /> : ""}
        {relUrl == "admin-current-training" ? <AdminMain /> : ""}
        {relUrl == "admin-past-training" ? <AdminMain /> : ""}
        {relUrl == "admin-schemes-applications" ? <AdminMain /> : ""}
        <MainFooter />
      </Spin>
    </div>
  );
};

export default Layout;
