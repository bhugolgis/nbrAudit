import styled from "styled-components";
import { Modal, Row, Table } from "antd";
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
export const ApprovedStatus = styled.p`
  margin-bottom: 0px;
  color: #00cc44;
`;
export const PendingStatus = styled.p`
  margin-bottom: 0px;
  color: #e60000;
`;
export const Selected = styled.p`
  margin-bottom: 0px;
  color: #ffcc00;
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
