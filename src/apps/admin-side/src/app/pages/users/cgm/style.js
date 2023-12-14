import styled from "styled-components";
import { Table, Form, Input } from "antd";
export const MainContainer = styled.div`
  margin: 30px;
`;
export const FlexStyle = styled.span`
  display: flex;
  justify-content: flex-end;
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
