import React from "react";
import { Tabs } from "antd";
import { Link } from "react-router-dom";
import { Read, Cards, SubTitle, Tab } from "./style";
import Slider from "react-slick";

const { TabPane } = Tabs;

export const centralschemes = [
  {
    title: "Term Loan",
    link: "/nsfdc-schemes",
  },
  {
    title: "Micro Credit Finance",
    link: "/nsfdc-schemes",
  },
  {
    title: "Mahila Samrudhi",
    link: "/nsfdc-schemes",
  },
  {
    title: "Mahila Kisan Yojana",
    link: "/nsfdc-schemes",
  },
  {
    title: "Educational Loan (For domestic higher education)",
    link: "/nsfdc-schemes",
  },
  {
    title: "Educational Loan (For higher education abroad)",
    link: "/nsfdc-schemes",
  },
];

export const stateSchemes = [
  { title: "Subsidy Scheme", link: "/subsidy-schemes" },
  { title: "Money Margin Scheme", link: "/money-margin-schemes" },
  { title: "Direct Finance Scheme", link: "/direct-finance-schemes" },
];
const BeneficiaryCarousel = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <div
      style={{
        margin: "0px 35px ",
        padding: "15px 0px 25px 0px",
        borderRadius: "10px",
      }}
    >
      <Tab defaultActiveKey="1">
        <TabPane tab="STATE SCHEMES" key="1">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {stateSchemes.map((data) => {
              return (
                <Cards bordered={false}>
                  <SubTitle title={data.title} />
                  <Read>
                    <Link to={`${data.link}`}>READ MORE...</Link>
                  </Read>
                </Cards>
              );
            })}
          </div>
        </TabPane>
        <TabPane tab="CENTRAL SCHEMES" key="2">
          <Slider {...settings}>
            {centralschemes.map((data) => {
              return (
                <div>
                  <Cards bordered={false}>
                    <SubTitle title={data.title} description={data.subtitle} />
                    <Link to={`${data.link}`}>
                      <Read>READ MORE...</Read>
                    </Link>
                  </Cards>
                </div>
              );
            })}
          </Slider>
        </TabPane>
      </Tab>
    </div>
  );
};
export default BeneficiaryCarousel;
