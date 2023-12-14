import React, { useState } from "react";
import { Tabs } from "antd";
import LoanFormAllData from "../../../../../../libs/common-ui/LoanManagement/LoanFormAllData";
import { MainContainer } from "../../../../style";

const { TabPane } = Tabs;

const LoanDMpage = () => {
  return (
    <div>
      <Tabs>
        <TabPane tab="Scrunity-Verified" key="tab-a">
          <LoanFormAllData statusname="DM" heading="DM-Pending" />
        </TabPane>
        <TabPane tab="DM-Submitted-Query" key="tab-b">
          <LoanFormAllData statusname="DM-QUERY" heading="DM-Submitted-Query" />
        </TabPane>
        <TabPane tab="Send to Bank" key="tab-c">
          <LoanFormAllData statusname="BO" heading="BO-Pending" />
        </TabPane>
        <TabPane tab="DM-Reject" key="tab-d">
          <LoanFormAllData statusname="DM-REJECT" heading="DM-REJECT" />
        </TabPane>
        <TabPane tab="Approved by Bank" key="tab-e">
          <LoanFormAllData statusname="RM" heading="DM-Verified" />
        </TabPane>
        <TabPane tab="Rejected by Bank" key="tab-f">
          <LoanFormAllData statusname="BO-REJECT" heading="BO-REJECT" />
        </TabPane>
        <TabPane tab="All loan status" key="tab-g">
          <LoanFormAllData statusname="ALL" heading="All loan status" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LoanDMpage;
