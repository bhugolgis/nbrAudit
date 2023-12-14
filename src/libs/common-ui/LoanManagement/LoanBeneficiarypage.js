import React from "react";
import { Tabs } from "antd";

import LoanFormAllData from "./LoanFormAllData";

const { TabPane } = Tabs;

const LoanBeneficiarypage = () => {
  return (
    <div>
      <Tabs>
        <TabPane tab="Submited Form" key="tab-a">
          <LoanFormAllData statusname="SC" heading="Submited Form" />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LoanBeneficiarypage;
