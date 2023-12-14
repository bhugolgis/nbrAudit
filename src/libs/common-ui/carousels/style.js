import styled from "styled-components";
import { Button, Tabs, Card } from "antd";
const { Meta } = Card;

export const Title = styled.h3`
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
export const Read = styled(Button)`
  margin-top: 20px;
`;
export const Tab = styled(Tabs)`
  .ant-tabs-ink-bar {
    display: none;
  }
  .ant-tabs-nav::before {
    border-bottom: none;
  }
  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #193367 !important;
    font-size: 15px;
  }
`;
export const SubTitle = styled(Meta)`
  .ant-card-meta-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  margin-bottom: 0px !important;
`;
export const Cards = styled(Card)`
  width: 260px !important;
  margin: 0px 20px 20px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const ApplyButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  border-radius: 8px;
  width: 100%;
  background: #004d99;
  color: white;
  font-weight: 500;
`;
