import React from "react";
import styled from "styled-components";
import { Card, Button } from "antd";
import {
  AffordableHousing,
  AgroProcessing,
  Corporate,
  EmergingTechnology,
  EnergyAudit,
  Environment,
  Infrastructure,
  RenewableEnergy,
  SoftwareTechnology,
  WomenEnterpreuner,
} from "../../../media";
import Slider from "react-slick";

const { Meta } = Card;

const Verticals = (props) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  return (
    <Slider
      style={{
        margin: "0px 35px ",
        padding: "15px 0px 25px 0px",
        borderRadius: "10px",
      }}
      {...settings}
    >
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={RenewableEnergy}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Renewable Energy & Electric Vehicles"
            description="Renewable Energy & Electric Vehicles"
          />
          <a href="https://mahapreit.in/service/renewable-energy-electric-vehicles-ev">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={SoftwareTechnology}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Software Technology Park & Data center"
            description="Software Technology Park & Data center"
          />
          <a href="https://mahapreit.in/service/software-technology-park-and-dc">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={Infrastructure}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Infrastructure Technology Projects"
            description="Infrastructure Technology Projects"
          />
          <a href="https://mahapreit.in/service/infrastructure-technology-projects">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={AffordableHousing}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Affordable Housing"
            description="Affordable Housing"
          />
          <a href="https://mahapreit.in/service/affordable-housing">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={Environment}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Environment and Climate Change "
            description="Environment and Climate Change "
          />
          <a href="https://mahapreit.in/service/environment-and-climate-change">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={AgroProcessing}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Agro Processing Value Chain and Bio Fuels"
            description="Agro Processing Value Chain and Bio Fuels"
          />
          <a href="https://mahapreit.in/service/agro-processing-value-chain-and-biofuels">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={EnergyAudit}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Energy Audit and Corrective Systems"
            description="Energy Audit and Corrective Systems"
          />
          <a href="https://mahapreit.in/service/renewable-energy-electric-vehicles-ev">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={EmergingTechnology}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Emerging Technology Areas"
            description="Emerging Technology Areas"
          />
          <a href="https://mahapreit.in/service/emerging-technology-areas">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={WomenEnterpreuner}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Women Entrepreneurship & Business Development"
            description="Women Entrepreneurship & Business Development"
          />
          <a href="https://mahapreit.in/service/women-entrepreneurship-business-development">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
      <div>
        <Cards
          bordered={false}
          cover={
            <img
              src={Corporate}
              width="240px"
              height="200px"
              style={{ padding: "0px" }}
            />
          }
        >
          <SubTitle
            title="Corporate Community Development"
            description="Corporate Community Development"
          />
          <a href="https://mahapreit.in/service/corporate-community-development">
            <Read type="primary">Read more...</Read>
          </a>
        </Cards>
      </div>
    </Slider>
    // <div
    //   style={{
    //     margin: "0px 35px ",
    //     background: "#316789",
    //     padding: "35px 0px 25px 0px",
    //     borderRadius: "10px",
    //   }}
    // >
    //   <Carousel cols={4} showDots loop>
    //     <Carousel.Item>

    //       {/* <ItemCard>
    //         <img
    //           src={AffordableHousing}
    //           width="240px"
    //           height="250px"
    //           style={{ padding: "0px" }}
    //         />
    //         <Title>Renewable Energy & Electric Vehicles</Title>
    //         <span>Renewable Energy & Electric Vehicles</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/renewable-energy-electric-vehicles-ev">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Software Technology Park & Data center</Title>
    //         <span>Software Technology Park & Data center</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/software-technology-park-and-dc">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Infrastructure Technology Projects</Title>
    //         <span>Infrastructure Technology Projects</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/infrastructure-technology-projects">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Agro Processing Value Chain and Bio Fuels</Title>
    //         <span>Agro Processing Value Chain and Bio Fuels</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/agro-processing-value-chain-and-biofuels">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Affordable Housing</Title>
    //         <span>Affordable Housing</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/affordable-housing">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Environment and Climate Change </Title>
    //         <span>Environment and Climate Change </span>
    //         <br />
    //         <a href="https://mahapreit.in/service/environment-and-climate-change">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>

    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Energy Audit and Corrective Systems</Title>
    //         <span>Energy Audit and Corrective Systems</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/renewable-energy-electric-vehicles-ev">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Emerging Technology Areas</Title>
    //         <span>Emerging Technology Areas</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/emerging-technology-areas">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Women Entrepreneurship & Business Development</Title>
    //         <span>Women Entrepreneurship & Business Development</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/women-entrepreneurship-business-development">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //     <Carousel.Item>
    //
    //       {/* <ItemCard>
    //         <Title>Corporate Community Development</Title>
    //         <span>Corporate Community Development</span>
    //         <br />
    //         <a href="https://mahapreit.in/service/corporate-community-development">
    //           <Read>Read more...</Read>
    //         </a>
    //       </ItemCard> */}
    //     </Carousel.Item>
    //   </Carousel>
    // </div>
  );
};
export default Verticals;
export const ItemCard = styled(Card)`
  width: 260px;
  margin: 0px 0px 20px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const Title = styled.h3`
  text-align: justify;
`;
export const Read = styled(Button)`
  margin-top: 15px;
`;
export const Cards = styled(Card)`
  width: 260px;
  margin: 0px 0px 20px 0px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;
export const SubTitle = styled(Meta)`
  .ant-card-meta-description {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  margin-bottom: 0px !important;
`;
