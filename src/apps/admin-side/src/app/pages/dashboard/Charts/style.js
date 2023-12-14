import styled from "styled-components";
import { Card } from "antd";
export const MainContainer = styled.div`
  margin-top: 30px;
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const Cards = styled(Card)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
  margin-right: 20px;
`;
