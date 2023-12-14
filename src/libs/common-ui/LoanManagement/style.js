import React from "react";
import styled from "styled-components";
import { Table, Card, Row, Modal, Col, Button } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { AiFillEye, AiFillEdit, AiFillBook } from "react-icons/ai";

export const DataTable = styled(Table)`
  overflow-x: scroll;
  margin-top: 15px;
  .ant-table-pagination.ant-pagination {
    margin: 20px 0px;
  }
  .ant-table-thead > tr > th {
    padding: 10px 15px;
  }
  .ant-table {
    width: 100%;
    overflow-x: scroll;
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
export const Edit = styled(AiFillEdit)`
  font-size: 20px;
  cursor: pointer;
`;
export const History = styled(AiFillBook)`
  font-size: 20px;
  cursor: pointer;
`;
export const ProfileDataModal = styled(Modal)`
  .ant-modal-header {
    display: none;
  }
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const ApprovedStatus = styled.p`
  margin-bottom: 0px;
  color: #00cc44;
`;
export const PendingStatus = styled.p`
  margin-bottom: 0px;
  color: #e60000;
`;
export const StatusModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;
export const StatusFields = styled(Row)`
  display: flex;
  justify-content: space-between;
`;
export const MainContainer = styled.div`
  margin: 30px;
`;

export const FormHeading = styled.h3`
  margin: 20px 0px 10px 0px;
  padding: 0px 10px;
  color: #0099ff;
  border: 2px solid grey;
`;

export const Title = styled.h4`
  margin-right: 10px;
`;

export const DataContainer = styled(Col)`
  display: flex;
  flex-direction: row;
  width: 50%;
`;

export const HtmlTable = styled.table`
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
`;

export const DownloadButton = styled(Button);
