import React from "react";
import styled from "styled-components";
import { Row, Card, Divider, Col, Tabs, Button, Tag } from "antd";
import { RightCircleOutlined } from "@ant-design/icons";
export const Container = styled(Row)`
  padding: 30px;
  display: flex;
  justify-content: space-between;
`;
export const CounterCard = styled.span`
  display: flex;
  justify-content: space-between;
`;
export const GridCard = styled(Card.Grid)`
  width: 270px;
  border-radius: 10px;
  margin-right: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const Line = styled(Divider)`
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin: 10px 0px 0px;
  min-width: 5%;
  border-radius: 10px;
  width: 50px;
  background-color: #1890ff;
`;
export const NoticeCardGrid = styled(Card)`
  width: 100%;
  height: 270px;
`;
export const Headline = styled.span`
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`;
export const GuideLines = styled(Col)``;
export const StepsNumber = styled.h1`
  border-radius: 50%;
  background-color: #e6e6e6;
  padding: 5px 20px;
`;
export const StepsHead = styled.h2`
  margin-left: 20px;
  display: flex;
  align-items: center;
`;
export const StepsLine = styled.p`
  display: flex;
  align-items: center;
  margin-left: 10px;
`;
export const LoginCol = styled(Col)`
  display: flex;
  align-items: center;
  margin-top: 5vh;
  flex-direction: column;
`;
export const Arrow = styled(RightCircleOutlined)`
  display: flex;
  align-items: center;
`;
export const QuickLink = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  padding: 6px 15px 6px;
  cursor: pointer;
`;

export const NoticeMarque = styled.h4`
  margin: 20px 20px 20px 30px;
`;
export const Heading = styled.h4`
  margin: 30px;
  border-left: 3px solid #193367;
  padding-left: 10px;
`;
export const ChildContainer = styled(Row)`
  padding: 40px;
  background: #6cb5c7;
  background: -webkit-linear-gradient(top left, #6cb5c7, #70b2ea);
  background: -moz-linear-gradient(top left, #6cb5c7, #70b2ea);
  background: linear-gradient(to bottom right, #6cb5c7, #70b2ea);
  display: flex;
  justify-content: space-between;
`;
export const LocationButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
  border-radius: 5px;
`;
export const LinkHeader = styled.h4`
  margin: 0px 0px 0px 10px;
  color: #0099ff;
`;
export const SubTitle = styled.p`
  margin-bottom: 0px !important;
  color: #193367;
`;
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
  padding: 0px 30px 30px 30px;
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

export const Cards = styled(Card)`
  width: 260px;
  margin: 0px 20px 20px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const VacancyTag = styled(Tag)`
  color: #00b33c;
  padding: 3px 10px;
  font-weight: 500;
  border: 1px solid #00b33c;
  border-radius: 5px;
  margin-bottom: 10px;
`;
export const MonthTag = styled(Tag)`
  color: #0073e6;
  padding: 3px 10px;
  font-weight: 500;
  border: 1px solid #0073e6;
  border-radius: 5px;
`;
export const StatusTag = styled(Tag)`
  color: #ff6666;
  padding: 3px 10px;
  font-weight: 500;
  border: 1px solid #ff6666;
  border-radius: 5px;
`;
export const JobDescription = styled.p`
  text-align: justify;
  overflow: hidden;
  line-height: 1.5;
  height: 6em;
  color: #8c8c8c;
  margin-bottom: 10px;
`;
