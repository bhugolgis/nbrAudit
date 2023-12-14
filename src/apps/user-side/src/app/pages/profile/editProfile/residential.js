import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Select, Button, Radio, message, Spin } from "antd";
import {
  SelectDropDown,
  LoadContainer,
  Container,
  FormItem,
  Completed,
  Incomplete,
} from "./style";
import data from "../../../../../../../data/dtdata.json";
import stateData from "../../../../../../../data/states.json";
import TextArea from "antd/lib/input/TextArea";
import { InputFields } from "./personalinfo";
import axios from "axios";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
const { Option } = Select;

const ResidentialInfo = () => {
  const formData = useRef();
  const [district, setDistrict] = useState("");
  const [correspondenceDistrict, setCorrespondenceDistrict] = useState("");
  const [correspondenceState, setCorrespondenceState] = useState("");

  const [correspondenceTaluka, setCorrespondenceTaluka] = useState("");
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const [talukaKey, setTalukaKey] = useState(0);
  const [selectVisible, setSelectVisible] = useState(true);
  const [taluka, setTaluka] = useState("");
  const [infoLoading, setInfoLoading] = useState(false);

  const [state, setState] = useState("");

  const [residentialDetails, setResidentialDetails] = useState();
  const [residentialPageLoading, setResidentialPageLoading] = useState(true);
  const [addressSameAsPermanent, setAddressSameAsPermanent] = useState();
  const handleAddress = (e) => {
    setAddressSameAsPermanent(e.target.value);
  };

  const [addressValue, setAddressValue] = useState("");
  const handleAddressValue = (e) => {
    setAddressValue(e.target.value);
  };
  const [village, setVillage] = useState("");
  const handleVillage = (e) => {
    setVillage(e.target.value);
  };
  const [pinCode, setPincode] = useState("");
  const handlePincode = (e) => {
    setPincode(e.target.value);
  };
  const [corAddress, setCorAddress] = useState("");
  const handleCorAddress = (e) => {
    setCorAddress(e.target.value);
  };
  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setResidentialDetails(response.data.CustomUserResidentialInfo[0]);
      setDistrict(response.data.CustomUserResidentialInfo[0].district);
      setState(response.data.CustomUserResidentialInfo[0].state);
      setTaluka(response.data.CustomUserResidentialInfo[0].taluka);
      setAddressValue(response.data.CustomUserResidentialInfo[0].address);
      setVillage(response.data.CustomUserResidentialInfo[0].village);
      setPincode(response.data.CustomUserResidentialInfo[0].pinCode);
      setCorAddress(
        response.data.CustomUserResidentialInfo[0].correspondenceAddress
      );
      setCorrespondenceState(
        response.data.CustomUserResidentialInfo[0].correspondenceState
      );
      setAddressSameAsPermanent(
        response.data.CustomUserResidentialInfo[0].addressSameAsPermanent
      );
      setResidentialPageLoading(false);
    };
    userResponseFunc();
  }, []);

  const onSubmit = (e) => {
    if (addressSameAsPermanent == true) {
      e.preventDefault();
      const {
        address,
        village,
        pinCode,
        isAddressSameAsPermanent,
        correspondenceAddress,
        correspondenceState,
        correspondenceDistrict,
        correspondenceTaluka,
        correspondencePinCode,
        correspondenceVillage,
      } = formData.current;

      if (address.value == "") {
        message.warning("Address is empty");
      } else if (district == "" || district == null) {
        message.warning("District is empty");
      } else if (taluka == "" || taluka == null) {
        message.warning("Taluka is empty");
        // } else if (village.value == "" || village == null) {
        //   message.warning("Village is empty");
      } else if (pinCode.value == "" || pinCode.value == null) {
        message.warning("Pincode is empty");
      } else if (correspondenceAddress == "" || correspondenceAddress == null) {
        message.warning("Correspondence Address is empty");
      } else if (
        isAddressSameAsPermanent == "" ||
        isAddressSameAsPermanent == false
      ) {
        message.warning("Please select if address is same or different");
      } else {
        const sameAddress = new FormData();
        sameAddress.append("address", address.value);
        sameAddress.append("state", state);
        sameAddress.append("district", district);
        sameAddress.append("taluka", taluka);
        sameAddress.append("village", village.value);
        sameAddress.append("pinCode", pinCode.value);
        sameAddress.append(
          "isAddressSameAsPermanent",
          isAddressSameAsPermanent.value
        );
        sameAddress.append(
          "correspondenceAddress",
          correspondenceAddress.value
        );
        sameAddress.append("correspondenceState", "Maharashtra");
        sameAddress.append(
          "correspondencePinCode",
          correspondencePinCode.value
        );
        sameAddress.append(
          "correspondenceDistrict",
          correspondenceDistrict.value
        );
        sameAddress.append("correspondenceTaluka", correspondenceTaluka.value);
        sameAddress.append(
          "correspondenceVillage",
          correspondenceVillage.value
        );
        sameAddress.append("isCompleted", true);

        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdateResidentialInfo`,
          data: sameAddress,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${Token}`,
          },
        }).then((response) => {
          setInfoLoading(true);
          setTimeout(() => {
            setInfoLoading(false);
            message.success("Data Updated");
          }, 1000);
          setTimeout(() => {
            window.location.replace("/bank-information");
          }, 1500);
        });
      }
    } else {
      e.preventDefault();
      const {
        address,
        village,
        pinCode,
        isAddressSameAsPermanent,
        correspondenceAddress,
        correspondencePinCode,
        correspondenceVillage,
      } = formData.current;

      if (address.value == "") {
        message.warning("Address is empty");
      } else if (district == "" || district == null) {
        message.warning("District is empty");
      } else if (taluka == "" || taluka == null) {
        message.warning("Taluka is empty");
      } else if (village.value == "" || village == null) {
        message.warning("Village is empty");
      } else if (pinCode.value == "" || pinCode.value == null) {
        message.warning("Pincode is empty");
      } else if (
        correspondenceAddress.value == "" ||
        correspondenceAddress.value == null
      ) {
        message.warning("Correspondence Address is empty");
      } else {
        const differentAddress = new FormData();
        differentAddress.append("address", address.value);
        differentAddress.append("state", state);
        differentAddress.append("district", district);
        differentAddress.append("taluka", taluka);
        differentAddress.append("village", village.value);
        differentAddress.append("pinCode", pinCode.value);
        differentAddress.append(
          "isAddressSameAsPermanent",
          isAddressSameAsPermanent.value
        );
        differentAddress.append(
          "correspondenceAddress",
          correspondenceAddress.value
        );
        differentAddress.append("correspondenceState", "Maharashtra");
        differentAddress.append(
          "correspondencePinCode",
          correspondencePinCode.value
        );
        differentAddress.append(
          "correspondenceDistrict",
          correspondenceDistrict
        );
        differentAddress.append("correspondenceTaluka", correspondenceTaluka);
        differentAddress.append(
          "correspondenceVillage",
          correspondenceVillage.value
        );
        differentAddress.append("isCompleted", true);
        axios({
          method: "patch",
          url: `${REACT_APP_BASE_URL}/applicant/UpdateResidentialInfo`,
          data: differentAddress,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `token ${Token}`,
          },
        }).then((response) => {
          setInfoLoading(true);
          setTimeout(() => {
            setInfoLoading(false);
            message.success("Data Updated");
          }, 1000);
          setTimeout(() => {
            window.location.replace("/bank-information");
          }, 1500);
        });
      }
    }
  };

  if (residentialPageLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <Spin spinning={infoLoading} tip="Saving Data">
        <Container>
          {/* {residentialDetails.isCompleted == true ? (
            <Completed>Completed</Completed>
          ) : (
            <Incomplete>Incomplete</Incomplete>
          )} */}
          <form ref={formData}>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Permanent Address"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your Address" },
                  ]}
                >
                  <TextArea
                    placeholder="Please input your Address"
                    name="address"
                    value={addressValue}
                    onChange={handleAddressValue}
                    defaultValue={residentialDetails.address}
                    style={{ width: "250px" }}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="State"
                  name="State"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your state",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select state"
                    optionFilterProp="children"
                    style={{ width: "250px" }}
                    name="state"
                    defaultValue="Maharashtra"
                    disabled
                  >
                    {stateData.map((state, index) => {
                      return (
                        <Option key={index} value={state.name}>
                          {state.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="District"
                  rules={[
                    {
                      required: true,
                      message: "Please input your District!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select district"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setDistrict(v);
                      setTalukaKey(k.key);
                      setSelectVisible(false);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={district}
                    style={{ width: "250px" }}
                    name="district"
                    defaultValue={residentialDetails.district}
                  >
                    {data.map((dis, index) => {
                      return (
                        <Option
                          key={index}
                          value={dis.district_name}
                          onChange={handleDistrict}
                        >
                          {dis.district_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <FormItem
                  label="Taluka"
                  name="taluka"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Taluka!",
                    },
                  ]}
                >
                  <SelectDropDown
                    showSearch
                    placeholder="Select taluka"
                    optionFilterProp="children"
                    onChange={(v) => {
                      setTaluka(v);
                    }}
                    disabled={selectVisible}
                    name="taluka"
                    defaultValue={residentialDetails.taluka}
                  >
                    {data[talukaKey].talukas.map((tal) => {
                      return (
                        <Option value={tal.taluka_name}>
                          {tal.taluka_name}
                        </Option>
                      );
                    })}
                  </SelectDropDown>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Village" name="village">
                  <InputFields
                    value={village}
                    onChange={handleVillage}
                    placeholder="Please input your Village"
                    name="village"
                    defaultValue={residentialDetails.village}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Pincode"
                  name="pinCode"
                  rules={[
                    { required: true, message: "Please input your Pincode" },
                  ]}
                >
                  <InputFields
                    value={pinCode}
                    onChange={handlePincode}
                    placeholder="Please input your Pincode"
                    name="pinCode"
                    type="tel"
                    maxLength={6}
                    defaultValue={residentialDetails.pinCode}
                  />
                </FormItem>
              </Col>

              <Col span={12}>
                <FormItem label="Is Correspondence Address same as Permanent Address?">
                  <Radio.Group
                    name="isAddressSameAsPermanent"
                    value={addressSameAsPermanent}
                    onChange={handleAddress}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            {addressSameAsPermanent == true ? (
              <>
                <Row>
                  <Col span={8}>
                    <FormItem label="Correspondence Address">
                      <TextArea
                        value={addressValue}
                        defaultValue={residentialDetails.correspondenceAddress}
                        name="correspondenceAddress"
                        style={{ width: "250px" }}
                        disabled
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="Correspondence State">
                      <InputFields
                        name="correspondenceState"
                        value="Maharashtra"
                        disabled
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="Correspondence District">
                      <InputFields
                        value={district}
                        defaultValue={residentialDetails.correspondenceDistrict}
                        name="correspondenceDistrict"
                        disabled
                      />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <FormItem label="Correspondence Taluka">
                      <InputFields
                        value={taluka}
                        defaultValue={residentialDetails.correspondenceTaluka}
                        name="correspondenceTaluka"
                        disabled
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="Correspondence Village">
                      <InputFields
                        value={village}
                        defaultValue={residentialDetails.correspondenceVillage}
                        name="correspondenceVillage"
                        disabled
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem label="Correspondence Pincode">
                      <InputFields
                        value={pinCode}
                        defaultValue={residentialDetails.correspondencePinCode}
                        name="correspondencePinCode"
                        disabled
                      />
                    </FormItem>
                  </Col>
                </Row>
              </>
            ) : (
              <>
                <Row>
                  <Col span={8}>
                    <FormItem label="Correspondence Address">
                      <TextArea
                        placeholder="Please input your Address"
                        name="correspondenceAddress"
                        onChange={handleCorAddress}
                        value={corAddress}
                        defaultValue={residentialDetails.correspondenceAddress}
                        style={{ width: "250px" }}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Correspondence State"
                      name="correspondenceState"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your state",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select state"
                        optionFilterProp="children"
                        style={{ width: "250px" }}
                        name="correspondenceState"
                        defaultValue="Maharashtra"
                        disabled
                      >
                        {stateData.map((state, index) => {
                          return (
                            <Option key={index} value={state.name}>
                              {state.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Correspondence District"
                      name="correspondenceDistrict"
                      rules={[
                        {
                          required: true,
                          message: "Please input your District!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Select district"
                        optionFilterProp="children"
                        onChange={(v, k) => {
                          setCorrespondenceDistrict(v);
                          setTalukaKey(k.key);
                          setSelectVisible(false);
                        }}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        value={correspondenceDistrict}
                        style={{ width: "250px" }}
                        name="correspondenceDistrict"
                        defaultValue={residentialDetails.correspondenceDistrict}
                      >
                        {data.map((dis, index) => {
                          return (
                            <Option
                              key={index}
                              value={dis.district_name}
                              onChange={handleDistrict}
                            >
                              {dis.district_name}
                            </Option>
                          );
                        })}
                      </Select>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={8}>
                    <FormItem
                      label="Correspondence Taluka"
                      name="correspondenceTaluka"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Taluka!",
                        },
                      ]}
                    >
                      <SelectDropDown
                        showSearch
                        placeholder="Select taluka"
                        optionFilterProp="children"
                        onChange={(v) => {
                          setCorrespondenceTaluka(v);
                        }}
                        disabled={selectVisible}
                        value={correspondenceTaluka}
                        name="correspondenceTaluka"
                        defaultValue={residentialDetails.correspondenceTaluka}
                      >
                        {data[talukaKey].talukas.map((tal) => {
                          return (
                            <Option value={tal.taluka_name}>
                              {tal.taluka_name}
                            </Option>
                          );
                        })}
                      </SelectDropDown>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Correspondence Village"
                      name="correspondenceVillage"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Village",
                        },
                      ]}
                    >
                      <InputFields
                        placeholder="Please input your Village"
                        name="correspondenceVillage"
                        defaultValue={residentialDetails.correspondenceVillage}
                      />
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormItem
                      label="Correspondence Pincode"
                      name="correspondencePinCode"
                      rules={[
                        {
                          required: true,
                          message: "Please input your Pincode",
                        },
                      ]}
                    >
                      <InputFields
                        placeholder="Please input your Pincode"
                        name="correspondencePinCode"
                        type="tel"
                        maxLength={6}
                        defaultValue={residentialDetails.correspondencePinCode}
                      />
                    </FormItem>
                  </Col>
                </Row>
              </>
            )}
            {/* <Row>
              <Col span={8}>
                <FormItem
                  label="Correspondence Address"
                  name="correspondenceAddress"
                  rules={[
                    { required: true, message: "Please input your Address" },
                  ]}
                >
                  <TextArea
                    placeholder="Please input your Correspondence Address"
                    name="correspondenceAddress"
                    value={corrAddress}
                    style={{ width: "250px" }}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Correspondence State"
                  name="correspondenceState"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your state",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select state"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setCorrespondenceState(v);
                    }}
                    style={{ width: "250px" }}
                    name="correspondenceState"
                    value={correspondenceState}
                    defaultValue={residentialDetails.correspondenceState}
                  >
                    {stateData.map((state, index) => {
                      return (
                        <Option key={index} value={state.name}>
                          {state.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Correspondence District"
                  name="correspondenceDistrict"
                  rules={[
                    {
                      required: true,
                      message: "Please input your District!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select district"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setCorrespondenceDistrict(v);
                      setTalukaKey(k.key);
                      setSelectVisible(false);
                    }}
                    style={{ width: "250px" }}
                    name="correspondenceDistrict"
                    defaultValue={residentialDetails.correspondenceDistrict}
                  >
                    {data.map((dis, index) => {
                      return (
                        <Option key={index} value={dis.district_name}>
                          {dis.district_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Correspondence Taluka"
                  name="correspondenceTaluka"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Taluka!",
                    },
                  ]}
                >
                  <SelectDropDown
                    showSearch
                    placeholder="Select taluka"
                    optionFilterProp="children"
                    onChange={(v) => {
                      setCorrespondenceTaluka(v);
                    }}
                    disabled={selectVisible}
                    name="correspondenceTaluka"
                    defaultValue={residentialDetails.correspondenceTaluka}
                  >
                    {data[talukaKey].talukas.map((tal) => {
                      return (
                        <Option value={tal.taluka_name}>
                          {tal.taluka_name}
                        </Option>
                      );
                    })}
                  </SelectDropDown>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Correspondence Village"
                  name="correspondenceVillage"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Correspondence Village",
                    },
                  ]}
                >
                  <InputFields
                    placeholder="Please input your Village"
                    name="correspondenceVillage"
                    defaultValue={residentialDetails.correspondenceVillage}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  label="Pincode"
                  name="correspondencePinCode"
                  rules={[
                    { required: true, message: "Please input your Pincode" },
                  ]}
                >
                  <InputFields
                    placeholder="Please input your Pincode"
                    name="correspondencePinCode"
                    defaultValue={residentialDetails.correspondencePinCode}
                  />
                </FormItem>
              </Col>
            </Row> */}
            <FormItem>
              <Button type="primary" onClick={onSubmit}>
                Save and Proceed
              </Button>
            </FormItem>
          </form>
        </Container>
      </Spin>
    );
  }
};
export default ResidentialInfo;
