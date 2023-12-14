import styled from "styled-components";
import { Card, Table } from "antd";
import { FaUsers } from "react-icons/fa";

export const MainContainer = styled.div`
  margin: 30px;
`;
export const Cards = styled(Card)`
  width: 210px;
  height: 110px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const CardContainer = styled.span`
  display: flex;
  justify-content: space-between;
`;
export const Count = styled.h2`
  color: #006bb3;
`;
export const UserIcon = styled(FaUsers)`
  font-size: 35px;
  color: #006bb3;
`;
export const DataTable = styled(Table)`
  margin-top: 15px;
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
