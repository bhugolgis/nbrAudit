import React from "react";
import { Col, Card } from "antd";
import {
  Container,
  Heading,
  Line1,
  Line2,
  Line3,
  LocationButton,
  CardContainer,
} from "./style";

const Contact = (props) => {
  return (
    <Container>
      <Heading>
        <h1>Get in touch with us for more information</h1>
        <p> If you need help or have a question we are here for you.</p>
      </Heading>
      <CardContainer>
        <Col span={6}>
          <span>
            <Line1 />
            <h2>MAHAPREIT</h2>
            <h4>
              Pinnacle Corporate Park, (MAHAPREIT)- 5th floor, next to Trade
              centre, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra
              400051
            </h4>
            Email - <a href="mailto:">info[at]mahapreit[dot]in</a>
            <br />
            Phone - <a href="tel:"> (022) 69214400</a>
          </span>
          <LocationButton href="https://www.google.com/maps/place/MAHAPREIT/@19.072434,72.870286,16z/data=!4m5!3m4!1s0x0:0xa7bb0761e9d61fc9!8m2!3d19.0724343!4d72.870286?hl=en">
            View Location
          </LocationButton>
        </Col>
        <Col span={6}>
          <Line2 />
          <h2>MPBCDC (Head Office)</h2>
          <h4>
            Shop No.25/2, Juhu Supreme Shopping Centre Gulmohar, Cross Rd Number
            9, JVPD Scheme, Juhu, Mumbai, Maharashtra 400049
          </h4>
          Email - <a href="mailto:">mahatma.phule@yahoo.in</a>
          <br />
          Phone - <a href="tel:">(022) 26200351 / (022) 26202852</a>
          <br />
          <LocationButton href="https://www.google.com/maps?ll=19.114655,72.834457&z=16&t=m&hl=en&gl=IN&mapclient=embed&cid=6900938585247713455">
            View Location
          </LocationButton>
        </Col>
        <Col span={6}>
          <Line3 />
          <h2>MPBCDC (Registered Office)</h2>
          <h4>
            Thakarsi House, 15, J N Hardia Marg, Ballard Estate, Fort, Mumbai
            <br />
          </h4>
          Phone - <a href="tel:">(022) 22023791</a>
          <LocationButton href="https://www.google.com/maps/place/MAHAPREIT/@19.072434,72.870286,16z/data=!4m5!3m4!1s0x0:0xa7bb0761e9d61fc9!8m2!3d19.0724343!4d72.870286?hl=en">
            View Location
          </LocationButton>
        </Col>
      </CardContainer>
    </Container>
  );
};
export { Contact };
