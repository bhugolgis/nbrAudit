import styled from "styled-components";
import { Table, Form, Input, Modal } from "antd";
export const MainContainer = styled.div`
  margin: 30px;
`;
export const FlexStyle = styled.span`
  display: flex;
  justify-content: flex-end;
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
export const FormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  .ant-form-item-label {
    text-align: left;
    margin-bottom: 5px;
  }
`;
export const InputFields = styled(Input)`
  width: 220px;
`;
export const ProfileDataModal = styled(Modal)`
  .ant-modal-header {
    display: none;
  }
`;
