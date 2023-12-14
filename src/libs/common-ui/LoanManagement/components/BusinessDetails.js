import React, { useState, useRef } from "react";
import {
  Steps,
  Button,
  message,
  Progress,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Radio,
  Checkbox,
  Upload,
  Card,
  Spin,
  DatePicker,
} from "antd";

const BusinessDetails = ({ data, onSuccess, onBack, form }) => {
  const { Option } = Select;

  const [LoanAmount, setLoanAmount] = useState(0);
  const handleLoanAmount = (e) => {
    if (data.LoanSchemeCode == "state-subsidy" && (e < 1 || e > 50000)) {
      message.warning("Loan Amount upto 50,000");
    } else if (data.LoanSchemeCode == "state-mm" && (e < 1 || e > 500000)) {
      message.warning("Loan Amount upto 5,00,000");
    } else if (data.LoanSchemeCode == "state-df" && (e < 1 || e > 100000)) {
      message.warning("Loan Amount upto 1,00,000");
    } else if (
      data.LoanSchemeCode == "central-nsfdc-tl-a" &&
      (e < 1 || e > 3000000)
    ) {
      message.warning("Loan Amount upto 30,00,000");
      // } else if (
      //   data.LoanSchemeCode == "central-nsfdc-tl-b" &&
      //   (e < 500000 || e >= 1000000)
      // ) {
      //   message.warning("Loan Amount Above 5,00,000/- and  Upto 10,00,000/-");
      // } else if (
      //   data.LoanSchemeCode == "central-nsfdc-tl-c" &&
      //   (e < 1000000 || e >= 2000000)
      // ) {
      //   message.warning("Loan Amount Above 10,00,000/- and  Upto 20,00,000/-");
      // } else if (
      //   data.LoanSchemeCode == "central-nsfdc-tl-d" &&
      //   (e < 2000000 || e >= 4500000)
      // ) {
      //   message.warning("Loan Amount Above 20,00,000/- and  Upto 45,00,000/-");
    } else if (
      data.LoanSchemeCode == "central-nsfdc-mcf" &&
      (e < 1 || e > 140000)
    ) {
      message.warning(
        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-msy" &&
      (e < 1 || e > 140000)
    ) {
      message.warning(
        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost "
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-may" &&
      (e < 1 || e >= 500000)
    ) {
      message.warning(
        "Loan Amount Upto 1,40,000/- or Upto 90% of the Unit Cost "
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-mky" &&
      (e < 1 || e > 75000)
    ) {
      message.warning("Loan Amount Upto 75,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nsfdc-el-a" &&
      (e < 1 || e > 2000000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Cource Fee or 20,00,000 Whichever is less"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-el-b" &&
      (e < 1 || e > 3000000)
    ) {
      message.warning(
        "Loan Amount  Upto 90% of the Cource Fee or 30,00,000 Whichever is less "
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-gbsa" &&
      (e < 1 || e >= 750000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Unit Cost or Upto 7,50,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-gbsb" &&
      (e < 750000 || e >= 1500000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Unit Cost or Above 7,50,000/- and Upto 15,00,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-gbsc" &&
      (e < 1500000 || e >= 3000000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Unit Cost or Above 15,00,000/- and Upto 30,00,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nsfdc-lvy" &&
      (e < 1 || e >= 500000)
    ) {
      message.warning(
        "Loan Amount Upto 90% of the Project Cost or Upto 5,00,000/-"
      );
    } else if (
      data.LoanSchemeCode == "central-nskfdc-msy" &&
      (e < 1 || e > 60000)
    ) {
      message.warning("Loan Amount Upto 60,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-may" &&
      (e < 1 || e > 100000)
    ) {
      message.warning("Loan Amount Upto 1,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-mcf" &&
      (e < 1 || e > 60000)
    ) {
      message.warning("Loan Amount Upto 60,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-gtl" &&
      (e < 1 || e > 3000000)
    ) {
      message.warning("Loan Amount Upto 30,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-el-a" &&
      (e < 1 || e > 1000000)
    ) {
      message.warning("Loan Amount Upto 10,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-el-b" &&
      (e < 1 || e > 2000000)
    ) {
      message.warning("Loan Amount Upto 20,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-suy-a" &&
      (e < 1 || e >= 2500000)
    ) {
      message.warning("Loan Amount Upto 25,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-suy-b" &&
      (e < 1 || e >= 5000000)
    ) {
      message.warning("Loan Amount Upto 50,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-sms" &&
      (e < 1 || e >= 1500000)
    ) {
      message.warning("Loan Amount Upto 15,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-gbs" &&
      (e < 1 || e >= 200000)
    ) {
      message.warning("Loan Amount Upto 2,00,000/- ");
    } else if (
      data.LoanSchemeCode == "central-nskfdc-vetls" &&
      (e < 1 || e >= 400000)
    ) {
      message.warning("Loan Amount Upto 4,00,000/- ");
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onSuccess}
        data={data}
        autoComplete="off"
        form={form}
      >
        <Row>
          <Col span={7}>
            <Form.Item
              label="Business Name:"
              name="BusinessName"
              rules={[
                { required: true, message: "Please insert Business Name" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Beneficiary Investment Component(As per Schemes):"
              name="Investment"
            >
              <InputNumber style={{ width: 300 }} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Required Loan Amount"
              name="LoanAmount"
              rules={[
                { required: true, message: "Please insert Loan Amount" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      data.LoanSchemeCode == "state-subsidy" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 50000)
                    ) {
                      return Promise.reject("Loan Amount upto 50,000");
                    } else if (
                      data.LoanSchemeCode == "state-mm" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 500000)
                    ) {
                      return Promise.reject("Loan Amount upto 5,00,000");
                    } else if (
                      data.LoanSchemeCode == "state-df" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 100000)
                    ) {
                      return Promise.reject("Loan Amount upto 1,00,000");
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-tl-a" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 3000000)
                    ) {
                      return Promise.reject("Loan Amount upto 30,00,000");
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-mcf" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 140000)
                    ) {
                      return Promise.reject(
                        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost"
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-msy" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 140000)
                    ) {
                      return Promise.reject(
                        "Loan Amount Upto 1,40,000/- or Upto 90% of the Project Cost "
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-mky" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 75000)
                    ) {
                      return Promise.reject("Loan Amount Upto 75,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-el-a" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 2000000)
                    ) {
                      return Promise.reject(
                        "Loan Amount Upto 90% of the Cource Fee or 20,00,000 Whichever is less"
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nsfdc-el-b" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 3000000)
                    ) {
                      return Promise.reject(
                        "Loan Amount  Upto 90% of the Cource Fee or 30,00,000 Whichever is less "
                      );
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-gtl" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 3000000)
                    ) {
                      return Promise.reject("Loan Amount Upto 30,00,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-mcf" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 60000)
                    ) {
                      return Promise.reject("Loan Amount Upto 60,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-msy" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 60000)
                    ) {
                      return Promise.reject("Loan Amount Upto 60,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-may" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 100000)
                    ) {
                      return Promise.reject("Loan Amount Upto 1,00,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-el-a" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 1000000)
                    ) {
                      return Promise.reject("Loan Amount Upto 10,00,000/- ");
                    } else if (
                      data.LoanSchemeCode == "central-nskfdc-el-b" &&
                      (getFieldValue("LoanAmount") < 1 ||
                        getFieldValue("LoanAmount") > 2000000)
                    ) {
                      return Promise.reject("Loan Amount Upto 20,00,000/- ");
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: 300 }} onChange={handleLoanAmount} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Brief Information of Business:"
              name="BusinessInfo"
              rules={[
                {
                  required: true,
                  message: "Please insert Brief Information of Business",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Family Annual Income is Below 3 lakh?:"
              name="FamilyIncomeBelowThreeL"
              rules={[
                {
                  required: true,
                  message:
                    "Please select family annual income is below 3 lakh?",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (getFieldValue("FamilyIncomeBelowThreeL") == "No") {
                      return Promise.reject(
                        "Not eligible for the NSFDC Loan Scheme"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Radio.Group>
                <Radio value={"Yes"}>Yes</Radio>
                <Radio value={"No"}>No</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={7}>
            <Form.Item
              label="The Address of the place of Business"
              name="BusinessAdd"
              rules={[
                {
                  required: true,
                  message: "Please insert The Address of the place of Business",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={7}>
            <Form.Item
              label="Land Owned or Rented?:"
              name="OwnRented"
              rules={[
                {
                  required: true,
                  message: "Please select Land Owned or Rented?",
                },
              ]}
            >
              <Radio.Group>
                <Radio value={"Owned"}>Owned</Radio>
                <Radio value={"Rented"}>Rented</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <div className="steps-action">
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => onBack(data)}
          >
            Previous
          </Button>

          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>

        {/* <Button onClick={() => { onBack(data) }}>Back</Button>
                &nbsp;
                <Button type="primary" htmlType="submit">
                    Submit
                </Button> */}
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                </Form.Item> */}
      </Form>
    </div>
  );
};

export default BusinessDetails;
