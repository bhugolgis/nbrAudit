import styled from "styled-components";
import { Form } from "antd";
export const MainContainer = styled.div`
  padding: 40px;
  background-color: rgb(234, 238, 243);
`;
export const ChildContainer = styled.span`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
export const FormItem = styled(Form.Item)`
  display: flex;
  flex-direction: column;
  .ant-form-item-label {
    text-align: left;
    margin-bottom: 5px;
    word-wrap: break-word;
  }
  .ant-form-item-row {
    display: flex;
    flex-direction: column;
  }
`;
