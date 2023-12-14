import styled from "styled-components";
import { Card, Row, Table } from "antd";
import { FaUsers } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
export const MainContainer = styled.div`
  padding: 15px 30px 30px 30px;
`;
export const Cards = styled(Card)`
  margin-right: 20px;
  height: 90px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const UserIcon = styled(FaUsers)`
  font-size: 35px;
  color: #fd7e14;
`;
export const CardContainer = styled(Row)`
  margin-top: 15px;
`;
export const TotalJob = styled(HiOutlineNewspaper)`
  font-size: 40px;
  color: #0044cc;
`;
export const ActiveJob = styled(HiOutlineNewspaper)`
  font-size: 40px;
  color: #fd7e14;
`;
export const JobApplication = styled(HiOutlineNewspaper)`
  font-size: 40px;
  color: #20c997;
`;
export const TotalJobIcons = styled(FaUsers)`
  font-size: 40px;
  color: #e83e8c;
`;

export const CardTable = styled(Card)`
  height: 400px;
  margin-right: 20px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const DataTable = styled(Table)`
  .ant-table-pagination.ant-pagination {
    margin: 20px 0px;
  }
  .ant-table-thead > tr > th {
    padding: 10px 15px;
  }
  .ant-table {
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
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
