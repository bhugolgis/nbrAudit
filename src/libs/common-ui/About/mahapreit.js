import React from "react";
import { Col } from "antd";
import { Container, Heading, Description } from "./style";
import { MahapreitFav } from "../../../media";
import {
  FacebookOutlined,
  YoutubeOutlined,
  TwitterOutlined,
  InstagramOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
const AboutMahapreit = () => {
  return (
    <Container>
      <Col span={16}>
        <Heading>ABOUT US</Heading>
        <Description>
          MAHATMA PHULE RENEWABLE ENERGY AND INFRASTRUCTURE TECHNOLOGY LIMITED
          (MAHAPREIT) is subsidiary company of Mahatma Phule Backward Class
          Development Corporation (MPBCDC). Objectives are to establish and
          carry on business of generating, Trading, operating, leasing and
          renting Renewable Power Projects mainly but not limited to Solar Power
          Projects including Solar parks along with tie-lines, sub-stations and
          transmission lines on ownership and/or build, own and transfer and/or
          build, own, lease and transfer and/or build, own, operate and transfer
          basis and also to establish and /or carry on business in relation to
          Decarbonization and energyefficiency , battery storage solutions ,
          alternative fuel cell technology and climate change issues in
          accordance with Ministry of New and Renewable Energy (MNRE)
          schemes/policies or Ministry of Power or any such department of Govt
          of India (GoI) and its PSU/companies and Govt. of Maharashtra (GoM)
          Energy deptt’s Renewable Energy Policy as amended from time to time
          and all incidental and allied activities required for such business.
          It also helps to undertake task of socio-economic and educational
          upliftment of the Scheduled Castes, and Backward classes in the State
          of Maharashtra and implement schemes and programs of any department or
          agency of such department of Govt. of India (GoI) and its agencies and
          Govt. of Maharashtra (GoM) for All entrepreneurship and skill
          development to achieve or fulfill any objects of this company
          including but not limited to forward back linkage integration, setting
          up of business by startups of weaker and schedule caste persons and
          making them available funding , financing and accounting systems ,
          secretarial practices and audit supports system, legal frame work and
          all incubation support ecosystem to make them self-sustainable
          entities or groups of entrepreneurs or companies.
        </Description>
        <span
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
        </span>
      </Col>
      <Col
        span={8}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={MahapreitFav} width="300px" height="250px" />
      </Col>
    </Container>
  );
};
export { AboutMahapreit };
