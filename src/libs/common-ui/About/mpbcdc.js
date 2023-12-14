import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { Container, Links, QuickLink, Heading, Description } from "./style";
import { MahapreitFav, MpbcdcLogo } from "../../../media";
import {
  FacebookOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const AboutMpbcdc = (props) => {
  return (
    <Container>
      <Col span={16}>
        {/* <div
          style={{
            width: "80px",
            height: "80px",
            background: "#78a6c8",
            borderRadius: "50%",
          }}
        ></div> */}
        <Heading>ABOUT US</Heading>
        <Description>
          Mahatma Phule Backward Class Development Corporation since 1978 MPBCDC
          has been established for the For the upliftment and welfare of the
          backward classes at their own or in collaboration with the government,
          statutory bodies, companies, partner organizations, individuals or
          through such organizations, agencies, agricultural development
          programs, marketing, processing and supply and storage of agricultural
          products, Planning, operating, assisting, advising, advising,
          providing financial assistance, providing protection and undertaking
          activities through small business, building construction,
          transportation and other occupations, business, trade or program such
          as medical, engineering, agriculture etc. It also provides financial
          assistance to the economically weaker sections of the Scheduled Castes
          and Neo-Buddhists living below the poverty line and to provide
          financial assistance for self-employment under various schemes to
          uplift the living standards of the dependents of unsanitary cleaners.
        </Description>
        {/* <span
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <a href="https://www.facebook.com/mahapreit">
            <FacebookOutlined
              style={{
                fontSize: "30px",
                margin: "0px 10px 0px 0px",
                color: "#0080ff",
              }}
            />
          </a>
          <a href="https://www.youtube.com/channel/UC6mkep2n14fiMXZkCWKynEA">
            <YoutubeOutlined
              style={{
                fontSize: "30px",
                margin: "0px 10px 0px 0px",
                color: " #ff0000",
              }}
            />
          </a>
          <a href="https://www.linkedin.com/company/mahapreit">
            <LinkedinOutlined
              style={{
                fontSize: "30px",
                margin: "0px 10px 0px 0px",
                color: "#0080ff",
              }}
            />
          </a>
          <a href="https://www.instagram.com/mahapreit/">
            <InstagramOutlined
              style={{
                fontSize: "30px",
                margin: "0px 10px 0px 0px",
                color: "#ff1a75",
              }}
            />
          </a>
          <a href="https://twitter.com/mahapreit">
            <TwitterOutlined
              style={{
                fontSize: "30px",
                margin: "0px 10px 0px 0px",
                color: "#0080ff",
              }}
            />
          </a>
        </span> */}
      </Col>
      <Col
        span={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={MpbcdcLogo} width="250px" height="250px" />
      </Col>
    </Container>
  );
};
export { AboutMpbcdc };
