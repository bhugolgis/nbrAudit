import styled from "styled-components";
import { Table } from "antd";
export const MainContainer = styled.div`
  margin: 30px;
`;
export const DataTable = styled(Table)`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin: 30px 0px;
  .ant-table-pagination.ant-pagination {
    margin: 20px;
  }
  .ant-table-thead > tr > th {
    background: #78a6c8;
    color: #fff;
  }
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
