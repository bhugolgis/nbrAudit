import styled from "styled-components";
import { Row, Input, Col, Menu, Divider } from "antd";
import { BiPhoneCall, BiMapAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import { MenuUnfoldOutlined, RightCircleOutlined } from "@ant-design/icons";

const { Search } = Input;

export const Container = styled.div`
  padding: 20px 30px;
  background: #193367;
  display: flex;
  justify-content: space-between;
`;

export const MenuIcon = styled(MenuUnfoldOutlined)`
  font-size: 25px;
  padding-right: 20px;
  cursor: pointer;
`;
export const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
export const MahaPreit = styled.img`
  height: 50px;
  margin-right: 10px;
`;
export const ChildContainer = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
export const SearchBar = styled(Search)`
  width: 250px;
  margin: 0px 20px;
`;
export const HeaderLogo = styled.img`
  width: 160px;
  height: 50px;
`;
export const MainHeader = styled(Col)`
  display: flex;
  background: #193367;
  align-items: Center;
`;
export const MenuBar = styled(Menu)`
  border-bottom: none;
  background: #193367;
  color: #fff;
  margin-left: 100px;
  .ant-menu-title-content {
    font-size: 16px;
    font-weight: 500;
  }
  .ant-menu-item a {
    color: #fff !important;
  }
`;
export const FooterTop = styled.div`
  padding: 20px 30px;
  background: #193367;
  display: flex;
  justify-content: space-between;
`;
export const Footer = styled(Row)`
  padding: 20px 30px;
  background: #eceff1;
  display: flex;
  justify-content: space-between;
`;
export const QuickLink = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
`;
export const LinkHeader = styled.p`
  margin-bottom: 5px;
`;
export const Arrow = styled(RightCircleOutlined)`
  display: flex;
  align-items: center;
`;
export const Line = styled(Divider)`
  border: 1px solid #193367;
  margin: 0px 0px 10px;
  min-width: 5%;
  border-radius: 10px;
  width: 50px;
  background-color: #193367;
`;
export const ProfileImage = styled(BiUserCircle)`
  font-size: 20px;
  margin: 0px 5px -5px 0px;
`;
export const Credit = styled(Row)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;
