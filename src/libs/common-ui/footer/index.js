import React, { useEffect } from "react";
import {
  Container,
  Footer,
  Line,
  LinkHeader,
  QuickLink,
  Credit,
} from "./style";
import {
  FacebookOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { BiPhoneCall, BiMapAlt } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { Row, Col } from "antd";
import { BhugolFavicon } from "../../../media";
import countapi from "countapi-js";
import useHome from "../Home/container";
import { useState } from "react";
import useFooter from "./container";

const MainFooter = () => {
  const { visitorCount } = useFooter();
  return (
    <div>
      <Container>
        <h4 style={{ color: "#fff" }}>
          Get connected with us on social networks.
        </h4>
        <span>
          <a href="https://www.facebook.com/mahapreit">
            <FacebookOutlined
              style={{
                fontSize: "20px",
                margin: "0px 10px 0px 0px",
                color: "#fff",
              }}
            />
          </a>
          <a href="https://www.youtube.com/channel/UC6mkep2n14fiMXZkCWKynEA">
            <YoutubeOutlined
              style={{
                fontSize: "20px",
                margin: "0px 10px 0px 0px",
                color: "#fff",
              }}
            />
          </a>
          <a href="https://www.linkedin.com/company/mahapreit">
            <LinkedinOutlined
              style={{
                fontSize: "20px",
                margin: "0px 10px 0px 0px",
                color: "#fff",
              }}
            />
          </a>
          <a href="https://www.instagram.com/mahapreit/">
            <InstagramOutlined
              style={{
                fontSize: "20px",
                margin: "0px 10px 0px 0px",
                color: "#fff",
              }}
            />
          </a>
          <a href="https://twitter.com/mahapreit">
            <TwitterOutlined
              style={{
                fontSize: "20px",
                margin: "0px 10px 0px 0px",
                color: "#fff",
              }}
            />
          </a>
        </span>
      </Container>
      <Footer>
        <Col span={5}>
          <h4>NAVYUG BENEFICIARY REGISTRATION</h4>
          <Line />
          <p style={{ textAlign: "justify" }}>
            Navyug Beneficiary Registration System: The core objective of the
            MPBCDC and MahaPREIT is upliftment of the SC community using
            financial assistance from Central/State Governments.
          </p>
        </Col>
        <Col span={2}>
          <h4>USEFUL LINKS </h4>
          <Line />
          <QuickLink>
            <a href="https://mahapreit.in/">
              <LinkHeader>MahaPREIT</LinkHeader>
            </a>
          </QuickLink>
          <QuickLink>
            <a href="https://mpbcdc.maharashtra.gov.in/">
              <LinkHeader>MPBCDC</LinkHeader>
            </a>
          </QuickLink>
          <QuickLink>
            <a href="https://www.digilocker.gov.in/">
              <LinkHeader>DigiLocker</LinkHeader>
            </a>
          </QuickLink>
          <QuickLink>
            <a href="https://uidai.gov.in/">
              <LinkHeader>UIDAI</LinkHeader>
            </a>
          </QuickLink>
          <QuickLink>
            <a href="https://sjsa.maharashtra.gov.in/">
              <LinkHeader>Social Justice</LinkHeader>
            </a>
          </QuickLink>
          <QuickLink>
            <a href="https://rdd.maharashtra.gov.in/">
              <LinkHeader>Rural RDD</LinkHeader>
            </a>
          </QuickLink>
        </Col>
        <Col span={5}>
          <h4>MAHAPREIT</h4>
          <Line />
          <p>
            <BiMapAlt
              style={{ fontSize: "20px", margin: "0px 5px -5px 0px " }}
            />
            Pinnacle Corporate Park - 5th floor, next to Trade centre, Bandra
            Kurla Complex, Bandra East, Mumbai, Maharashtra 400051
          </p>
          <HiOutlineMail
            style={{ fontSize: "20px", margin: "0px 5px -5px 0px " }}
          />
          &nbsp;
          <a href="mailto:">info[at]mahapreit[dot]in</a>
          <br />
          <BiPhoneCall
            style={{ fontSize: "20px", margin: "0px 5px -5px 0px " }}
          />
          <a href="tel:"> (022) 69214400</a>
        </Col>
        <Col span={6}>
          <h4>MPBCDC (Head Office)</h4>
          <Line />
          <p>
            <BiMapAlt
              style={{ fontSize: "20px", margin: "0px 5px -5px 0px " }}
            />
            Shop No.25/2, Juhu Supreme Shopping Centre Gulmohar, Cross Rd Number
            9, JVPD Scheme, Juhu, Mumbai, Maharashtra 400049
          </p>
          <HiOutlineMail
            style={{ fontSize: "20px", margin: "0px 5px -5px 0px " }}
          />
          <a href="mailto:">info[at]mpbcdc[dot]in</a>
          <br />
          <BiPhoneCall
            style={{ fontSize: "20px", margin: "0px 5px -5px 0px " }}
          />
          <a href="tel:"> (022) 26200351 / (022) 26202852</a>
        </Col>
        <Col span={3}>
          <h4>VISITORS COUNT</h4>
          <Line />

          <h5>Total Visitors : </h5>

          <h5>Today's count : {visitorCount}</h5>
        </Col>
      </Footer>
      <Credit>
        <img
          src={BhugolFavicon}
          width="20px"
          height="20px"
          style={{ margin: "5px 10px" }}
        />
        Developed and Managed by Bhugol GIS Pvt. Ltd.
      </Credit>
    </div>
  );
};
export default MainFooter;
