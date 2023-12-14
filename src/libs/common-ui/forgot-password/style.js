import { Button, Col, DatePicker } from "antd";
import styled from "styled-components";

export const ImageCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const ContentCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #a9f2e5;
`;

export const Card = styled.div`
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
export const DatePick = styled(DatePicker)`
  width: 250px;
`;
export const Submit = styled(Button)`
  width: 100%;
  border-radius: 20px;
`;
