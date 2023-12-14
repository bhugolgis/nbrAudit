import React from "react";
import { Tabs } from "antd";

import LoanFormAllData from "../../../../../../libs/common-ui/LoanManagement/LoanFormAllData";
import { MainContainer } from "../../../../style";
const { TabPane } = Tabs;

const LoanRMpage = () => {
  return (
    <div>
      <Tabs>
        <TabPane tab="DM-Verified" key="tab-a">
          <LoanFormAllData statusname="RM" heading="RM-Pending" />
        </TabPane>
        <TabPane tab="RM-Approved" key="tab-b">
          <LoanFormAllData statusname="BANK-RELEASE" heading="BANK-RELEASE" />
        </TabPane>
        <TabPane tab="MPBCDC-ADMIN" key="tab-c">
          <LoanFormAllData statusname="MPBCDC-ADMIN" heading="MPBCDC-ADMIN" />
        </TabPane>
        <TabPane tab="MPBCDC-MD" key="tab-d">
          <LoanFormAllData statusname="MPBCDC-MD" heading="MPBCDC-MD" />
        </TabPane>
        <TabPane tab="RM-Reject" key="tab-e">
          <LoanFormAllData statusname="RM-REJECT" heading="RM-Reject" />
        </TabPane>

        <TabPane tab="BANK-RELEASE-Pending" key="tab-f">
          <LoanFormAllData statusname="BANK-RELEASE" heading="BANK-RELEASE-Pending" />
        </TabPane>
        {/* <TabPane tab="Bank-Approved" key="tab-d">
          <LoanFormAllData statusname='MPBCDC-MD' heading='Bank-Approved' />
        </TabPane> */}
        {/* <TabPane tab="MPBCDC-MD Approved" key="tab-e">
          <LoanFormAllData
            statusname="BANK-RELEASE"
            heading="MPBCDC-MD Approved"
          />
        </TabPane> */}
        <TabPane tab="Bank Loan Released" key="tab-g">
          <LoanFormAllData
            statusname="LOAN-ACTIVE"
            heading="Bank Loan Released"
          />
        </TabPane>
        <TabPane tab="Loan closed" key="tab-h">
          <LoanFormAllData statusname="LOAN-CLOSED" heading="Loan Closed" />
        </TabPane>
        <TabPane tab="Loan Defaulted" key="tab-i">
          <LoanFormAllData
            statusname="LOAN-DEFAULTER"
            heading="Loan Defaulted"
          />
        </TabPane>
        <TabPane tab="All loan status" key="tab-j">
          <LoanFormAllData statusname="ALL" heading="All loan status" />
        </TabPane>

      </Tabs>
    </div>
  );
};

export default LoanRMpage;
