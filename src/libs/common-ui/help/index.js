import React from "react";
import { MainContainer } from "../jobs/style";
import { Col, Collapse, Row, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
const { Panel } = Collapse;
const text = (
  <p
    style={{
      paddingLeft: 24,
    }}
  >
    A dog is a type of domesticated animal. Known for its loyalty and
    faithfulness, it can be found as a welcome guest in many households across
    the world.
  </p>
);
const items = [
  {
    key: "1",
    label: "This is panel header 1",
    children: text,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: text,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: text,
  },
];
export default function Help() {
  return (
    <MainContainer>
      <h2> Help Documentation and videos</h2>
      <ul>
        <li>
          User Manual - <a href="/user-manual">Click here to see User Manual</a>
        </li>
      </ul>
      <br />
      <Row style={{ width: "100vw" }}>
        <Col span={7}>
          <h3>How to Registerand Login</h3>
          <iframe
            src="https://mybucketbhugolgis1.s3.us-east-2.amazonaws.com/Registration+and+Login.mp4"
            allowFullScreen
            webkitallowfullscreen={true}
            mozallowfullscreen={true}
            style={{ width: "100%", height: "250px" }}
          ></iframe>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <h3>How to Apply for Jobs</h3>
          <iframe
            src="https://mybucketbhugolgis1.s3.us-east-2.amazonaws.com/Job_Application.mp4"
            allowFullScreen
            webkitallowfullscreen={true}
            mozallowfullscreen={true}
            style={{ width: "100%", height: "250px" }}
          ></iframe>
        </Col>
        <Col span={1}></Col>
        <Col span={7}>
          <h3>How to Apply for Training</h3>
          <iframe
            src="https://mybucketbhugolgis1.s3.us-east-2.amazonaws.com/Training_Application.mp4"
            allowFullScreen
            webkitallowfullscreen={true}
            mozallowfullscreen={true}
            style={{ width: "100%", height: "250px" }}
          ></iframe>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span={7}>
          <h3>How to Apply for Loans</h3>
          <iframe
            src="https://mybucketbhugolgis1.s3.us-east-2.amazonaws.com/Loan+Application.mp4"
            allowFullScreen
            webkitallowfullscreen={true}
            mozallowfullscreen={true}
            style={{ width: "100%", height: "250px" }}
          ></iframe>
        </Col>
      </Row>
    </MainContainer>
  );
}
