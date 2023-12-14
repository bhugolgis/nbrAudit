import styled from "styled-components";
import { Modal, Row } from "antd";
export const MainContainer = styled.div`
  margin: 0px;
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
export const StatusModal = styled(Modal)`
  .ant-modal-footer {
    display: none;
  }
`;
export const StatusFields = styled(Row)`
  display: flex;
  justify-content: space-between;
`;
export const Selected = styled.p`
  margin-bottom: 0px;
  color: #00cc44;
`;
export const PendingStatus = styled.p`
  margin-bottom: 0px;
  color: #e60000;
`;
export const Shortlisted = styled.p`
  margin-bottom: 0px;
  color: #ffcc00;
`;
