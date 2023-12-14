import React from "react";
import styled from "styled-components";
import { Table, Card, Modal, Button } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

export const MainContainer = styled.div`
  margin: 30px;
`;
export const DataTable = styled(Table)`
  margin-top: 15px;
  .ant-table-pagination.ant-pagination {
    margin: 20px 0px;
  }
  .ant-table-thead > tr > th {
    padding: 10px 15px;
  }
  .ant-table table {
  }
  .ant-table-tbody > tr > td {
    padding: 15px;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
`;
export const Cards = styled(Card)`
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  margin-top: 15px;
  .ant-card-body {
    padding: 0px;
  }
`;
export const Profile = styled(FaUserCircle)`
  font-size: 20px;
`;
export const View = styled(AiFillEye)`
  font-size: 20px;
  cursor: pointer;
`;
export const ProfileDataModal = styled(Modal)`
  .ant-modal-header {
    display: none;
  }
`;

export const ClearButton = styled(Button)`
  margin-left: 10px;
`;
export const Heading = styled.span`
  display: flex;
  justify-content: space-between;
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const SubHeading = styled.p`
  font-size: 14px;
`;
export const Content = styled.div`
  border: 1px solid #e6e6e6;
  padding: 20px;
  border-radius: 5px;
`;
export const Title = styled.span`
  font-weight: 600;
  margin-bottom: 0px;
`;
