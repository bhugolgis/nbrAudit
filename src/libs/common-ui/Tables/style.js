import styled from "styled-components";
import { Table } from "antd";
export const DataTable = styled(Table)`
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
