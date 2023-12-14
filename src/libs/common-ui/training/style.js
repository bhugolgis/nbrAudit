import { Button, Collapse, Modal, Form, Input } from "antd";
import styled from "styled-components";

export const MainContainer = styled.div`
  padding: 30px;
  background-color: rgb(234, 238, 243);
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const Accordian = styled(Collapse)`
  .ant-collapse-item > .ant-collapse-header {
    padding: 0px;
  }
`;
export const ApplyButton = styled(Button)`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  border-radius: 8px;
  width: 100%;
  background: #004d99;
  color: white;
  font-weight: 500;
`;
export const JobModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
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
export const TrainingFormModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;
export const FormModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;
