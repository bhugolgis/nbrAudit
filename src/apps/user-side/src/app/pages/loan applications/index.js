import React from "react";
import { Tabs } from "antd";
import LoanFormAllData from "../../../../../../libs/common-ui/LoanManagement/LoanFormAllData";
import { MainContainer } from "../../../../style";

const { TabPane } = Tabs;

const LoanBeneficiarypage = () => {
  return (
    <MainContainer>
      <Tabs>
        <TabPane tab="Submited Form" key="tab-a">
          <LoanFormAllData statusname="SC" heading="Submited Form"  />
        </TabPane>
      </Tabs>
    </MainContainer>
  );
};

export default LoanBeneficiarypage;
