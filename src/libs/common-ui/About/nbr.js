import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { Container, Links, QuickLink, Heading, Description } from "./style";
import { NbrLogo } from "../../../media";
import {
  FacebookOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
const AboutNbr = (props) => {
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
          National Beneficiary Registration System: The core object of the
          MPBCDC and MahaPREIT is upliftment of the SC community using financial
          assistance from Central/State Governments. In order to achieve this
          objective, there are further tasks identified which are listed below:
          a. Implementation of New Initiatives of Model Programs(NIMP) b.
          Understanding and developing various schemes c. Supporting the
          start-up incubation and Entrepreneur's development d. Registering
          eligible beneficiaries of MahaPREIT as Enterpreneurs e. Reviewing and
          suggesting eligibility criteria to management f. Monitoring and
          Maintaining database and linking the beneficiary with appropriate
          verticals g. Forward linkage of project proposal h. Integrating
          beneficiary data of other departments i. Collaborating with NSDC/GoM
          Innovation Council, Top Foreign Universities/ Laboratories and
          well-known institudes j. Setting up a Knowledge Centre with
          IIT/IIM/CII k. Working on Educational Research Training and Management
          including Science and Technology Field l. Strengthening the Dr. B R
          Ambedkar Training Institute at MPBCDC to impart training to enable
          people to be self-sustainable and help enable their economic
          upliftment m. Bringing the sustainable development, with asset
          creation, Employment and Revenue generation by taking steps towards
          skill development, promoting gender equality and improve environment
          n. Work in an integrated manner for holistic development of rural
          areas by catering to their needs, bringing the weaker sections into
          mainstream effectively by reaching the unserved, undeserved, backward
          and unreached areas through 'targeted project'.
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
        <img src={NbrLogo} width="250px" height="250px" />
      </Col>
    </Container>
  );
};
export { AboutNbr };
