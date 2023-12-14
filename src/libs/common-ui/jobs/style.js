import { Button, Card, Collapse, Modal, Tag } from "antd";
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
export const JobCard = styled(Card)`
  .ant-card-body {
    padding: 15px;
  }
  width: 100;
  margin: 20px 15px 15px 0px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
`;
export const JobDescription = styled.p`
  text-align: justify;
  overflow: hidden;
  line-height: 1.5;
  height: 6em;
  color: #8c8c8c;
  margin-bottom: 15px;
`;
export const VacancyTag = styled(Tag)`
  color: #00b33c;
  padding: 3px 10px;
  font-weight: 500;
  border: 1px solid #00b33c;
  border-radius: 5px;
  margin-bottom: 10px;
`;
export const MonthTag = styled(Tag)`
  color: #0073e6;
  padding: 3px 10px;
  font-weight: 500;
  border: 1px solid #0073e6;
  border-radius: 5px;
`;
export const StatusTag = styled(Tag)`
  color: #ffcc00;
  padding: 3px 10px;
  font-weight: 500;
  border: 1px solid #ffcc00;
  border-radius: 5px;
`;
