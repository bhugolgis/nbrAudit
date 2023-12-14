import { Table } from "antd";
import styled from "styled-components";

export const Head = styled.h1`
  color: #e15d4e;
  margin-left: 15px;
`;
export const DataTable = styled(Table)`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin: 30px 0px;
  .ant-table-pagination.ant-pagination {
    display: none;
  }
  .ant-table table {
    /* margin: 20px 0px 30px 0px; */
  }
  .ant-table-thead > tr > th {
    background: #78a6c8;
    color: #fff;
  }
`;
