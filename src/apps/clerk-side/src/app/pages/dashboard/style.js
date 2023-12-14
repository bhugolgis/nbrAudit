import styled from "styled-components";
import { Card } from "antd";
import { FaUsers } from "react-icons/fa";

export const Cards = styled(Card)`
  width: 200px;
  height: 90px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const UserIcon = styled(FaUsers)`
  font-size: 35px;
  color: #fd7e14;
`;
export const Count = styled.h2`
  color: #000;
`;
