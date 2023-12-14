import { Row, Card, Divider, Button } from "antd";
import styled from "styled-components";
export const Container = styled.div`
  margin: 20px;
`;
export const Heading = styled(Row)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
export const CardContainer = styled(Row)`
  margin-top: 40px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;
export const Cards = styled(Card)`
  width: 300px;
`;
export const Line1 = styled(Divider)`
  width: 20vw;
  height: 6px;
  border-radius: 10px;
  background-color: #ed5a11;
  min-width: 20%;
`;
export const Line2 = styled(Divider)`
  width: 20vw;
  height: 6px;
  border-radius: 10px;
  background-color: #6a0ffc;
  min-width: 20%;
`;

export const Line3 = styled(Divider)`
  width: 20vw;
  height: 6px;
  border-radius: 10px;
  background-color: #06c766;
  min-width: 20%;
`;
export const LocationButton = styled(Button)`
  width: 100%;
  margin-top: 30px;
  border-radius: 5px;
`;
