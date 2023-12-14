import { Col, Row, Menu, Button } from "antd";
import React from "react";
import "antd/dist/antd.css";
import { Link } from "react-router-dom";
import {
  Container,
  NavItemText,
  MainMenu,
  MenuBar,
  MainHeader,
  HeaderLogo,
} from "./style";
import { NbrLogo } from "../../../media";

const Header = (props) => {
  const mainUrl = window.location.pathname;
  const relUrl = mainUrl.slice(1);
  return (
    <Row>
      {/* <Col
        span={4}
        style={{
          margin: "6px 0px 5px 0px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Link to="/home">
          <HeaderLogo src={NbrLogo} />
        </Link>
      </Col> */}
      <MainHeader span={24}>
        <div>
          <MenuBar mode="horizontal" defaultSelectedKeys={[`${relUrl}`]}>
            <Menu.Item key="home">
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.SubMenu key="about" title="About">
              <Menu.Item key="about-mahapreit">
                <Link to="/about-mahapreit">About MahaPREIT</Link>
              </Menu.Item>
              <Menu.Item key="about-mpbcdc">
                <Link to="/about-mpbcdc">About MPBCDC</Link>
              </Menu.Item>
              <Menu.Item key="about-nbr">
                <Link to="/about-nbr">About NBR </Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="guidelines" title="Guidelines">
              <Menu.Item key="goverment-resolutions">
                <Link to="/goverment-resolutions">Goverment Resolutions</Link>
              </Menu.Item>
              <Menu.Item key="user-manual">
                <Link to="/user-manual">User Manual</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="schemes" title="Schemes">
              <Menu.SubMenu key="state-schemes" title="State Schemes">
                <Menu.Item key="subsidy-schemes">
                  <Link to="/subsidy-schemes">Subsidy</Link>
                </Menu.Item>
                <Menu.Item key="money-margin">
                  <Link to="/money-margin-schemes">Margin Money</Link>
                </Menu.Item>
                <Menu.Item key="direct-finanance">
                  <Link to="/direct-finance-schemes">Direct Finance</Link>
                </Menu.Item>
                {/* <Menu.Item key="training">
                  <Link to="/training-schemes">Training</Link>
                </Menu.Item> */}
              </Menu.SubMenu>
              <Menu.SubMenu key="central-schemes" title="Central Schemes">
                <Menu.Item key="nsfdc-schemes">
                  <Link to="/nsfdc-schemes">NSFDC</Link>
                </Menu.Item>
                <Menu.Item key="nsfkdc-schemes">
                  <Link to="/nsfkdc-schemes">NSKFDC</Link>
                </Menu.Item>
              </Menu.SubMenu>
            </Menu.SubMenu>
            {/* <Menu.Item key="jobs">Jobs</Menu.Item>
            <Menu.Item key="training">Trainings</Menu.Item> */}
            {/* <Menu.Item key="media">Media Courses</Menu.Item> */}
            <Menu.Item key="jobs">
              <Link to="/jobs">Jobs</Link>
            </Menu.Item>
            <Menu.Item key="training">
              <Link to="/training">Trainings</Link>
            </Menu.Item>
            <Menu.Item key="help">
              <Link to="/help">Help</Link>
            </Menu.Item>
            <Menu.Item key="contact">
              <Link to="/contact">Contact</Link>
            </Menu.Item>
          </MenuBar>
        </div>
      </MainHeader>
    </Row>
  );
};

export default Header;
