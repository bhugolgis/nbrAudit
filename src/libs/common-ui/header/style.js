import { Col, Row, Menu, Button } from "antd";
import styled from "styled-components";

export const Container = styled(Row)`
  padding: 0px;
  width: 100%;
  //box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
`;
export const MainLogo = styled.img`
  height: 50px;
  width: 300px;
  cursor: pointer;
`;
export const MenuItem = styled(Menu.Item)`
  padding: 0px 35px !important;
`;
export const MainMenu = styled(Menu)`
  border: none !important;
  width: 100%;
`;
export const NavItemText = styled.p`
  margin: 0px;
`;
export const SignIn = styled(Button)`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  border-radius: 15px;
  background-color: #f5f5f5;
  cursor: pointer;
`;
export const LogoContainer = styled(Col)`
  display: flex;
`;
export const MenuBar = styled(Menu)`
  border-bottom: none;
  background: #193367;
  color: #fff;
  margin-left: 100px;
  width: 100%;
  height: 50px;
  .ant-menu-title-content {
    font-size: 16px;
    font-weight: 500;
  }
  .ant-menu-item a {
    color: #fff !important;
  }
`;
export const HeaderLogo = styled.img`
  width: 60px;
  height: 60px;
`;
export const MainHeader = styled(Col)`
  display: flex;
  background: #193367;
  align-items: Center;
`;
