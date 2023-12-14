import { Row, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { emptyPage } from "../../../media";
import { Link } from "react-router-dom";
const EmptyPage = () => {
  return (
    <MainContainer>
      <img src={emptyPage} width="350px" style={{ marginRight: "70px" }} />
      <div>
        <Heading>404</Heading>
        <SubHeading>UH OH! You're Lost.</SubHeading>
        <p>
          The page you are looking for does not exist. Click the below button to
          get back to homepage.
        </p>
        <HomeButton type="primary">
          <Link to="/">Home</Link>
        </HomeButton>
      </div>
    </MainContainer>
  );
};
export default EmptyPage;
export const MainContainer = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const Heading = styled.h1`
  font-size: 100px;
  margin-bottom: 0px;
  font-weight: 500;
`;
export const SubHeading = styled.h1`
  font-size: 40px;
  margin-bottom: 0px;
`;
export const HomeButton = styled(Button)`
  border-radius: 20px;
  width: 100px;
`;
