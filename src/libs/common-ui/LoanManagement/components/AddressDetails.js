import React, { useState } from "react";
import { useEffect } from "react";
import { Button, Form, Input, Select, Row, Col, Radio, Checkbox } from "antd";
import regions from "../../../../data/regions.json";
import dtdata from "../../../../data/dtdata.json";

const AddressDetails = ({ data, onSuccess, onBack, form }) => {
  const { Option } = Select;

  const [districtKey, setDistrictKey] = useState(0);
  const [districtBKey, setDistrictBKey] = useState(0);

  const [talukaKey, setTalukaKey] = useState(0);
  const [talukaBKey, setTalukaBKey] = useState(0);

  useEffect(() => {
    const qoutes = dtdata
      .map((dis, index) => {
        return dis.district_name == form.getFieldsValue().District
          ? index
          : null;
      })
      .filter((qoutes) => {
        if (qoutes !== null) {
          return qoutes;
        }
      });
    // setTalukaKey(qoutes[0]);

    const qoutesB = dtdata
      .map((dis, index) => {
        return dis.district_name == form.getFieldsValue().DistrictB
          ? index
          : null;
      })
      .filter((qoutesB) => {
        if (qoutes !== null) {
          return qoutesB;
        }
      });
    // setTalukaBKey(qoutesB[0]);
  }, []);

  const handleDivision = (e) => {
    setDistrictKey(e);
    // console.log(e);
    // form.setFieldsValue({ Division: "Maharashtra" });
    form.setFieldsValue({ District: "" });
    form.setFieldsValue({ Taluka: "" });
    onChangefield(e);
  };
  const handleDivisionB = (e) => {
    setDistrictBKey(e);
    // console.log(e);
    // form.setFieldsValue({ Division: "Maharashtra" });
    form.setFieldsValue({ DistrictB: "" });
    form.setFieldsValue({ TalukaB: "" });
    onChangefield(e);
  };

  const handleDistrict = (e) => {
    setTalukaKey(e);
    // console.log(e);
    // form.setFieldsValue({ Division: "Maharashtra" });
    form.setFieldsValue({ Taluka: "" });
    onChangefield(e);
  };

  const handleDistrictB = (e) => {
    setTalukaBKey(e);
    // form.setFieldsValue({ DivisionB: "Maharashtra" });
    form.setFieldsValue({ TalukaB: "" });
    onChangefield(e);
  };

  const [PermanentAddDisable, setPermanentAddDisable] = useState(false);
  const handleisAddressSameAsPermanent = (e) => {
    if (e.target.checked == true) {
      setPermanentAddDisable(true);
      form.setFieldsValue({
        UrbanRuralB: form.getFieldsValue().UrbanRural,
      });
      form.setFieldsValue({
        DivisionB: form.getFieldsValue().Division,
      });
      form.setFieldsValue({
        DistrictB: form.getFieldsValue().District,
      });
      form.setFieldsValue({
        TalukaB: form.getFieldsValue().Taluka,
      });

      form.setFieldsValue({
        PermanentAddline1: form.getFieldsValue().PresentAddline1,
      });
      form.setFieldsValue({
        PermanentAddline2: form.getFieldsValue().PresentAddline2,
      });
      form.setFieldsValue({
        PermanentAddline3: form.getFieldsValue().PresentAddline3,
      });
      form.setFieldsValue({
        PermanentPincode: form.getFieldsValue().PresentPincode,
      });
    } else {
      setPermanentAddDisable(false);
    }
  };
  const onChangefield = (e) => {
    if (PermanentAddDisable) {
      form.setFieldsValue({
        UrbanRuralB: form.getFieldsValue().UrbanRural,
      });
      form.setFieldsValue({
        DivisionB: form.getFieldsValue().Division,
      });
      form.setFieldsValue({
        DistrictB: form.getFieldsValue().District,
      });
      form.setFieldsValue({
        TalukaB: form.getFieldsValue().Taluka,
      });
      form.setFieldsValue({
        PermanentAddline1: form.getFieldsValue().PresentAddline1,
      });
      form.setFieldsValue({
        PermanentAddline2: form.getFieldsValue().PresentAddline2,
      });
      form.setFieldsValue({
        PermanentAddline3: form.getFieldsValue().PresentAddline3,
      });
      form.setFieldsValue({
        PermanentPincode: form.getFieldsValue().PresentPincode,
      });
    }
  };

  return (
    <div>
      <Form
        name="basic"
        layout="vertical"
        onFinish={onSuccess}
        data={data}
        autoComplete="off"
        form={form}
      >
        <Row>
          <Col span={24}>
            <h3>Present Address:</h3>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="Urban/Rural:"
              name="UrbanRural"
              rules={[{ required: true, message: "Please select" }]}
            >
              <Radio.Group onChange={onChangefield}>
                <Radio value={"Urban"}>Urban</Radio>
                <Radio value={"Rural"}>Rural</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              label="Division:"
              name="Division"
              rules={[{ required: true, message: "Please select Division" }]}
            >
              <Select
                showSearch
                placeholder="Select Division"
                onChange={(v, k) => {
                  //setDistrict(v);
                  //setTalukaKey(k.key);
                  handleDivision(k.key);
                  //setselecttalukaVisible(false);
                }}
                // onChange={onChangefield}
                // value={Division}
                style={{ width: "250px" }}
                // name="Division"
                required
                // disabled
                defaultValue={""}
              >
                {regions.map((Division, index) => {
                  return (
                    <Option
                      key={index}
                      value={Division.name}
                      //onChange={handleDivision}
                    >
                      {Division.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="District"
              name="District"
              rules={[
                {
                  required: true,
                  message: "Please select your District!",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 250,
                }}
                placeholder="Select district"
                optionFilterProp="children"
                onChange={(v, k) => {
                  //setDistrict(v);
                  //setTalukaKey(k.key);
                  handleDistrict(k.key);
                  //setselecttalukaVisible(false);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                // value={District}
                // name="District"
                required
                //defaultValue={District}
              >
                {regions[districtKey].districts.map((dis, index) => {
                  return (
                    <Option
                      key={index}
                      value={dis.district_name}
                      name="District"
                      //onChange={handleDistrict}
                    >
                      {dis.district_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="Taluka"
              name="Taluka"
              rules={[
                {
                  required: true,
                  message: "Please select your Taluka!",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 250,
                }}
                placeholder="Select taluka"
                optionFilterProp="children"
                // onChange={(v) => {
                //     setTaluka(v);
                // }}
                onChange={onChangefield}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                //disabled={selecttalukaVisible}
                // name="Taluka"
                // required
                // defaultValue={Taluka}
                defaultValue={""}
              >
                {regions[districtKey].districts[talukaKey].talukas.map(
                  (tal) => {
                    return (
                      <Option value={tal.taluka_name}>{tal.taluka_name}</Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <Form.Item
              label="HouseNo/FlatNo:"
              name="PresentAddline1"
              rules={[
                {
                  required: true,
                  message: "Please insert your HouseNo/FlatNo",
                },
              ]}
            >
              <Input onChange={onChangefield} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="Building Name:"
              name="PresentAddline2"
              rules={[
                { required: true, message: "Please insert your Building Name" },
              ]}
            >
              <Input onChange={onChangefield} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="Village/Area/Landmark:"
              name="PresentAddline3"
              rules={[
                { required: true, message: "Please insert your area Name" },
              ]}
            >
              <Input onChange={onChangefield} />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="PinCode:"
              name="PresentPincode"
              rules={[
                { required: true, message: "Please insert your Pincode" },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Zip code has to be a number.");
                    }
                    if (value.length < 6) {
                      return Promise.reject(
                        "Zip code can't be less than 6 digits"
                      );
                    }
                    if (value.length > 6) {
                      return Promise.reject(
                        "Zip code can't be more than 6 digits"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input onChange={onChangefield} />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <h3>Permanent Address:</h3>
          </Col>
          <Form.Item
            label="Same as Present Address:"
            name="isAddressSameAsPermanent"
            valuePropName="checked"
          >
            <Checkbox onChange={handleisAddressSameAsPermanent} />
          </Form.Item>
          {/* <Checkbox checked={isAddressSameAsPermanent} onChange={handleisAddressSameAsPermanent} name="isAddressSameAsPermanent"
                    >Same as Present Address:</Checkbox> */}
        </Row>
        <Row>
          <Col span={6}>
            <Form.Item
              label="Urban/Rural:"
              name="UrbanRuralB"
              rules={[{ required: true, message: "Please select" }]}
            >
              <Radio.Group disabled={PermanentAddDisable}>
                <Radio value={"Urban"}>Urban</Radio>
                <Radio value={"Rural"}>Rural</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col span={5}>
            <Form.Item
              label="Division:"
              name="DivisionB"
              rules={[{ required: true, message: "Please select Division" }]}
            >
              <Select
                showSearch
                placeholder="Select Division"
                onChange={(v, k) => {
                  //setDistrict(v);
                  //setTalukaKey(k.key);
                  handleDivisionB(k.key);
                  //setselecttalukaVisible(false);
                }}
                // onChange={onChangefield}
                // value={Division}
                style={{ width: "250px" }}
                // name="Division"
                required
                // disabled
                disabled={PermanentAddDisable}
                defaultValue={""}
              >
                {regions.map((DivisionB, index) => {
                  return (
                    <Option
                      key={index}
                      value={DivisionB.name}
                      //onChange={handleDivision}
                    >
                      {DivisionB.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="District"
              name="DistrictB"
              rules={[
                {
                  required: true,
                  message: "Please select your District!",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 250,
                }}
                placeholder="Select district"
                optionFilterProp="children"
                disabled={PermanentAddDisable}
                onChange={(v, k) => {
                  //setDistrict(v);
                  //setTalukaKey(k.key);
                  handleDistrictB(k.key);
                  //setselecttalukaVisible(false);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                // value={District}
                // name="District"
                required
                //defaultValue={District}
              >
                {regions[districtBKey].districts.map((dis, index) => {
                  return (
                    <Option
                      key={index}
                      value={dis.district_name}
                      name="DistrictB"
                      //onChange={handleDistrict}
                    >
                      {dis.district_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="Taluka"
              name="TalukaB"
              rules={[
                {
                  required: true,
                  message: "Please select your Taluka!",
                },
              ]}
            >
              <Select
                showSearch
                style={{
                  width: 250,
                }}
                placeholder="Select taluka"
                optionFilterProp="children"
                disabled={PermanentAddDisable}
                // onChange={(v) => {
                //     setTaluka(v);
                // }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                //disabled={selecttalukaVisible}
                // name="Taluka"
                // required
                // defaultValue={Taluka}
                defaultValue={""}
              >
                {regions[districtBKey].districts[talukaBKey].talukas.map(
                  (talB) => {
                    return (
                      <Option value={talB.taluka_name}>
                        {talB.taluka_name}
                      </Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={5}>
            <Form.Item
              label="HouseNo/FlatNo:"
              name="PermanentAddline1"
              rules={[
                {
                  required: true,
                  message: "Please insert your HouseNo/FlatNo",
                },
              ]}
            >
              <Input
                disabled={PermanentAddDisable}
                //onChange={handlePermanentAddline1}
              />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="Building Name:"
              name="PermanentAddline2"
              rules={[
                { required: true, message: "Please insert your Building Name" },
              ]}
            >
              <Input
                disabled={PermanentAddDisable}
                //onChange={handlePermanentAddline2}
              />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="Area/Landmark:"
              name="PermanentAddline3"
              rules={[
                { required: true, message: "Please insert your area Name" },
              ]}
            >
              <Input
                disabled={PermanentAddDisable}
                //onChange={handlePermanentAddline3}
              />
            </Form.Item>
          </Col>

          <Col span={1}></Col>
          <Col span={5}>
            <Form.Item
              label="PinCode:"
              name="PermanentPincode"
              rules={[
                { required: true, message: "Please insert your Pincode" },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (isNaN(value)) {
                      return Promise.reject("Pin code has to be a number.");
                    }
                    if (value.length < 6) {
                      return Promise.reject(
                        "Pin code can't be less than 6 digits"
                      );
                    }
                    if (value.length > 6) {
                      return Promise.reject(
                        "Pin code can't be more than 6 digits"
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                disabled={PermanentAddDisable}
                //onChange={handlePermanentPincode}
              />
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

export default AddressDetails;
