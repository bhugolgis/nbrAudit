import React, { useState, useEffect } from "react";
import {
  ChildContainer,
  Logo,
  MahaPreit,
  SearchBar,
  ProfileImage,
  TranslateContainer,
} from "./style";
import { MpbcdcLogo, MhLogo, IndiaLogo, MahaLogo } from "../../../media";
import {
  Input,
  Select,
  Button,
  Dropdown,
  Space,
  Menu,
  message,
  Spin,
} from "antd";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import axios from "axios";
import { BeneficiaryId, Token, UserGroup } from "../../utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import Translater from "../Translation";
import { adminWoAuthInstance } from "../../utils/fetch-utils";
import { COMMONROUTES } from "../../routes";
import Timer from "../timer";
const { Option } = Select;
const TopHeader = (props) => {
  const [listData, setListData] = useState();
  const [loading, setLoading] = useState(false);
  const handleLogout = ({ key }) => {
    if (key == "3") {
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/adminmodule/logout`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      }).then((response) => {
        sessionStorage.clear();
        props.func(true);
        setTimeout(() => {
          message.success("Successfully Logged out");
          window.location.replace("/home");
        }, 2000);
      });
    } else if (key == "1" && UserGroup == "cgm") {
      window.location.replace("/cgm-dashboard");
    } else if (key == "1" && UserGroup == "beneficiary") {
      window.location.replace("/user-dashboard");
    } else if (key == "1" && UserGroup == "admin") {
      window.location.replace("/admin-dashboard");
    } else if (key == "1" && UserGroup == "districtManager") {
      window.location.replace("/dm-dashboard");
    } else if (key == "1" && UserGroup == "regionalManager") {
      window.location.replace("/rm-dashboard");
    } else if (key == "1" && UserGroup == "scrutinyClerk") {
      window.location.replace("/clerk-dashboard");
    } else if (key == "1" && UserGroup == "MPBCDCOfficeAdmin") {
      window.location.replace("/mpbcdc-dashboard");
    } else if (key == "1" && UserGroup == "MahaPreitOfficeAdmin") {
      window.location.replace("/mahapreit-dashboard");
    } else if (key == "1" && UserGroup == "MPBCDC_MD") {
      window.location.replace("/loanmpbcdcmdpage");
    }
  };
  const menu = (
    <Menu
      onClick={handleLogout}
      items={[
        {
          label: "Dashboard",
          key: "1",
        },
        {
          label: "Logout",
          key: "3",
        },
      ]}
    />
  );

  useEffect(() => {
    const UserListData = async () => {
      setLoading(true);
      const response = await adminWoAuthInstance.get(
        `${COMMONROUTES.USER.USER_LIST_VIEW}/${BeneficiaryId}`
      );
      setListData(response.data.data);
      setLoading(false);
    };
    UserListData();
  }, []);

  return (
    <ChildContainer>
      <span style={{ display: "flex", alignItems: "center" }}>
        {/* <Logo src={IndiaLogo} height="50px" width="50px" /> */}
        <Logo src={MhLogo} height="50px" width="50px" />
        <Logo src={MpbcdcLogo} height="50px" />
        <MahaPreit src={MahaLogo} height="50px" />
      </span>

      <span style={{ display: "flex", alignItems: "center" }}>
        {/* <Select defaultValue="english">
          <Option value="english">English</Option>
          <Option value="hindi">Hindi</Option>
        </Select> */}
        {/* <SearchBar placeholder="Search..." enterButton /> */}
        {/* <Timer/> */}
        <Translater />
        {sessionStorage.getItem("name") == null &&
        sessionStorage.getItem("token") == null ? (
          <span>
            <Link to="/login">
              <Button style={{ borderRadius: "10px" }}>Sign In</Button>
            </Link>
            &nbsp; &nbsp;
            <Link to="/register">
              <Button style={{ borderRadius: "10px" }}>Sign Up</Button>
            </Link>
          </span>
        ) : (
          <span>
            {/* {loading == true ? (
              <Spin />
            ) : (
              <ProfileImage
                src={REACT_APP_BASE_URL + listData.UserPersonalInfo[0].photo}
                width="25px"
                height="25px"
              />
            )} */}

            <Dropdown overlay={menu} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {sessionStorage.getItem("name")}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </span>
        )}
      </span>
    </ChildContainer>
  );
};
export default TopHeader;
