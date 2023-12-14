import styled from "styled-components";
import { Table } from "antd";
export const MainContainer = styled.div`
  margin: 30px;
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
