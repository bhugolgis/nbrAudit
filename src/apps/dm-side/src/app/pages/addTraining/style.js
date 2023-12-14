import styled from "styled-components";
import { Form } from "antd";
export const MainContainer = styled.div`
  padding: 30px;
`;
export const FormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  .ant-form-item-label {
    text-align: left;
    margin-bottom: 5px;
  }
  .ant-form-item-row {
    display: flex;
    flex-direction: column;
  }
`;
