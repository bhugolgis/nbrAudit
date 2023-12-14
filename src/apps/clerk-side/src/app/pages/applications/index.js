import React from "react";
import { Tabs } from "antd";
import LoanFormAllData from "../../../../../../libs/common-ui/LoanManagement/LoanFormAllData";
import { MainContainer } from "../../../../style";
const { TabPane } = Tabs;

const LoanScrunitypage = () => {
  return (
    <>
      <Tabs>
        <TabPane tab="Scrunity-Pending" key="tab-a">
          <LoanFormAllData statusname="SC" heading="Scrunity-Pending" />
        </TabPane>
        <TabPane tab="Scrunity-Submitted-Query" key="tab-b">
          <LoanFormAllData
            statusname="SC-QUERY"
            heading="Scrunity-Submitted-Query"
          />
        </TabPane>
        <TabPane tab="Scrunity-Verified" key="tab-c">
          <LoanFormAllData statusname="DM" heading="Scrunity-Verified" />
        </TabPane>
      </Tabs>
    </>
  );
};

export default LoanScrunitypage;
