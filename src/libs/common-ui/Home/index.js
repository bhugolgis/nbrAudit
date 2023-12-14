import React from "react";
import { Slider } from "../slider";
import { Avatar, Card, Tabs, Alert, Row, Col, Spin } from "antd";
import Marquee from "react-fast-marquee";
import {
  Container,
  GridCard,
  Heading,
  NoticeMarque,
  SubTitle,
  Tab,
} from "./style";
import NoticesCarousel from "../../common-ui/carousels/notices";
import Verticals from "../../common-ui/carousels/verticals";
import BeneficiaryCarousel from "../../common-ui/carousels/benSchemes";
import { Link } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import { BsPersonCheckFill } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { GrTechnology } from "react-icons/gr";
import useHome from "./container";
import AllJobs from "../carousels/allJobs";
import AllTraining from "../carousels/allTraining";
import Training from "../training";
import {
  Environment,
  HomePageFirstRow,
  WomenEnterpreuner,
} from "../../../media";
import countapi from "countapi-js";
import { useEffect } from "react";
import axios from "axios";

const Home = (props) => {
  const { Meta } = Card;
  const { homePageCounts, jobList, countLoading } = useHome();

  return (
    <div>
      <NoticeMarque>
        <h2>Important Notifications</h2>
        <Alert
          banner
          message={
            <Link to="/register">
              <Marquee
                pauseOnHover
                gradient={false}
                style={{ marginRight: "10px" }}
              >
                NBR Portal is currently open for registration. Please click to
                sign up and complete the profile to be eligibile for different
                schemes.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; For any query or
                assistance regarding registration on NBR please contact:
                +919372664543.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </Marquee>
            </Link>
          }
        />
      </NoticeMarque>
      <Row style={{ margin: "20px" }}>
        <Col span={12} style={{ display: "flex", alignItems: "center" }}>
          <p
            style={{
              margin: "30px 60px",
              fontSize: "18px",
              textAlign: "justify",
            }}
          >
            Navyug Beneficiary Registration System: The objective of the MPBCDC
            and MahaPREIT is upliftment of the SC community using financial
            assistance from Central/State Governments.
          </p>
        </Col>
        <Col span={12} style={{ display: "flex", justifyContent: "center" }}>
          <img src={HomePageFirstRow} width="400px" />
        </Col>
      </Row>
      <span style={{ backgroundColor: "#80bfff" }}>
        <Heading>
          {/* <SubTitle>See our all Latest and Updated Notices.</SubTitle> */}
          <h2>Latest Notices</h2>
        </Heading>
        <Tab
          defaultActiveKey="1"
          items={[
            {
              label: `SPECIAL SCHEMES`,
              key: "1",
              children: <NoticesCarousel />,
            },
            {
              label: `JOBS`,
              key: "2",
              children: <AllJobs />,
            },
            {
              label: `TRAINING`,
              key: "3",
              children: <AllTraining />,
            },
          ]}
        />
      </span>
      <Slider />
      <Heading>
        <h2>Our Social Impact</h2>
      </Heading>
      <Container>
        <GridCard>
          {countLoading == true ? (
            <Spin />
          ) : (
            <Meta
              avatar={<GiArchiveRegister style={{ fontSize: "25px" }} />}
              title="Beneficiaries Registered"
              description={<h2>{homePageCounts.TotalBeneficiaryCount}</h2>}
            />
          )}
        </GridCard>
        <GridCard>
          {countLoading == true ? (
            <Spin />
          ) : (
            <Meta
              avatar={<GiReceiveMoney style={{ fontSize: "25px" }} />}
              title="Loans Approved"
              description={<h2>{homePageCounts.SupportinRS}</h2>}
            />
          )}
        </GridCard>
        <GridCard>
          {countLoading == true ? (
            <Spin />
          ) : (
            <Meta
              avatar={<BsPersonCheckFill style={{ fontSize: "25px" }} />}
              title="Beneficiaries Trained"
              description={<h2>{homePageCounts.BeneficiariesTrained}</h2>}
            />
          )}
        </GridCard>
        <GridCard>
          {countLoading == true ? (
            <Spin />
          ) : (
            <Meta
              avatar={<GrTechnology style={{ fontSize: "25px" }} />}
              title="Total Trainings"
              description={<h2>{homePageCounts.TrainingCounts}</h2>}
            />
          )}
        </GridCard>
      </Container>

      <Heading>
        {/* <SubTitle>Check out our all emerging verticals.</SubTitle> */}
        <h2>Opportunities provided by MahaPREIT</h2>
      </Heading>
      <Verticals />
      <Heading>
        {/* <SubTitle>Check our Beneficiaries Schemes</SubTitle> */}
        <h2>Navyug Beneficiary Schemes</h2>
      </Heading>
      <BeneficiaryCarousel />
    </div>
  );
};
export { Home };
