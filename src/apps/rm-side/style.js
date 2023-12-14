import styled from "styled-components";
import { Table, Card } from "antd";
export const MainContainer = styled.div`
  padding: 30px;
  background-color: rgb(234, 238, 243);
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

export const CardsTable = styled(Card)`
  height: 400px;
  margin: 30px 20px 0px 0px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
