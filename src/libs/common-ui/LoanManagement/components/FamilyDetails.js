import React, { useState, useRef } from "react";
import { useEffect } from "react";
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
import { DataTable, LoadContainer } from "../style";

const FamilyDetails = ({ data, FamilyDataa, onSuccess, onBack, form }) => {
  const { Option } = Select;

  const [FamilyData, setFamilyData] = useState(FamilyDataa);
  // {
  //   FamilyPersonName: "",
  //   FamilyAge: "",
  //   FamilyRelations: "",
  //   FamilyOccupation: ""
  // }

  // const handleInputChange = event => {
  //   const { name, value } = event.target;
  //   setFamilyDetails({ ...FamilyDetails, [name]: value });
  // };

  const [FamilyPersonName, setFamilyPersonName] = useState("");
  const handleFamilyPersonName = (e) => {
    setFamilyPersonName(e.target.value);
  };
  const [FamilyAge, setFamilyAge] = useState("");
  const handleFamilyAge = (e) => {
    setFamilyAge(e.target.value);
  };
  const [FamilyRelations, setFamilyRelations] = useState("");
  const handleFamilyRelations = (e) => {
    setFamilyRelations(e);
  };
  const [FamilyOccupation, setFamilyOccupation] = useState("Business");
  const handleFamilyOccupation = (e) => {
    // setFamilyOccupation(e.target.value);
    setFamilyOccupation(e);
  };

  const handleDelete = (index) => {
    setFamilyData((current) =>
      current.filter((FamilyData) => {
        return FamilyData.id !== index;
      })
    );
  };

  const onFamilyAdd = (e) => {
    const id =
      FamilyData.length > 0
        ? FamilyData.reduce(
            (max, p) => (p.id > max ? p.id : max),
            FamilyData[0].id
          ) + 1
        : 1;
    setFamilyData([
      ...FamilyData,
      {
        id: id,
        FamilyPersonName: FamilyPersonName,
        FamilyAge: FamilyAge,
        FamilyRelations: FamilyRelations,
        FamilyOccupation: FamilyOccupation,
      },
    ]);
    //console.log(FamilyData);
    setFamilyPersonName("");
    setFamilyAge("");
    setFamilyRelations("");
    setFamilyOccupation("Business");

  };

  const columns = [
    {
      title: "Person Name",
      dataIndex: "FamilyPersonName",
      width: "25%",
    },
    {
      title: "Age",
      dataIndex: "FamilyAge",
    },
    {
      title: "Relations",
      dataIndex: "FamilyRelations",
    },
    {
      title: "Occupation",
      dataIndex: "FamilyOccupation",
    },
    {
      title: "Delete",
      dataIndex: "id",
      render: (index) => {
        return (
          <>
            <Form.Item>
              <Button type="secondary" onClick={() => handleDelete(index)}>
                Delete
              </Button>
            </Form.Item>
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Form
        layout="vertical"
        //onFinish={() => onSuccess(FamilyData)}
        // onFinish={onSuccess}
        // data={data}
        // autoComplete="off"
        // form={form}
      >
        <Form layout="vertical" autoComplete="off">
          <Row>
            <Col span={5}>
              <Form.Item
                label="Person Name:"
                // rules={[
                //   { required: true, message: "Please insert Person Name" },
                // ]}
              >
                <Input
                  placeholder="Enter Person Name"
                  required
                  name="FamilyPersonName"
                  value={FamilyPersonName}
                  onChange={handleFamilyPersonName}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item
                label="Age:"
                // rules={[
                //   { required: true, message: "Please insert Age" },
                // ]}
              >
                <Input
                  placeholder="Enter Age"
                  type={"Number"}
                  required
                  name="FamilyAge"
                  value={FamilyAge}
                  onChange={handleFamilyAge}
                />
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item
                label="Relations:"
                // rules={[
                //   { required: true, message: "Please insert Relations" },
                // ]}
              >
                <Select
                  showSearch
                  required
                  placeholder="Select Relations"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  name="FamilyRelations"
                  value={FamilyRelations}
                  onChange={handleFamilyRelations}
                >
                  <Option value="Self">Self</Option>
                  <Option value="Father">Father</Option>
                  <Option value="Mother">Mother</Option>
                  <Option value="Son">Son</Option>
                  <Option value="Daughter">Daughter</Option>
                  <Option value="Brother">Brother</Option>
                  <Option value="Sister">Sister</Option>
                  <Option value="Wife">Wife</Option>
                  <Option value="Husband">Husband</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={1}></Col>
            <Col span={5}>
              <Form.Item
                label="Occupation:"
                // rules={[
                //   { required: true, message: "Please insert Occupation" },
                // ]}
              >
                {/* <Radio.Group
                  onChange={handleFamilyOccupation}
                  value={FamilyOccupation}
                  required
                  name="FamilyOccupation"
                >
                  <Radio value={"Business"}>Business</Radio>
                  <Radio value={"Job"}>Job</Radio>
                  <Radio value={"Unemployed"}>Unemployed</Radio>
                  <Radio value={"Housewife"}>Housewife</Radio>
                  <Radio value={"Others"}>Others</Radio>
                </Radio.Group> */}

                <Select
                  showSearch
                  required
                  placeholder="Select Occupation"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  name="FamilyOccupation"
                  value={FamilyOccupation}
                  onChange={handleFamilyOccupation}
                >
                  <Option value="Business">Business</Option>
                  <Option value="Job">Job</Option>
                  <Option value="Unemployed">Unemployed</Option>
                  <Option value="Housewife">Housewife</Option>
                  <Option value="Student">Student</Option>
                  <Option value="Others">Others</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={7}>
              <Form.Item>
                <Button type="primary" onClick={() => onFamilyAdd(data)}>
                  Add
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <h3>
              Note - 'Please click on 'Add' button post filling above details to
              add family member'
            </h3>
          </Row>
          <Row>
            <Col span={24}>
              <DataTable columns={columns} dataSource={FamilyData} />
            </Col>
          </Row>
        </Form>

        <div className="steps-action">
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => onBack(data)}
          >
            Previous
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onSuccess(FamilyData)}
          >
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

export default FamilyDetails;
