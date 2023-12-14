import {
  DatePicker,
  Form,
  Input,
  Row,
  Button,
  message,
  Select,
  Modal,
  Spin,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useRef, useState } from "react";
import { FormItem, MainContainer } from "./style";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import { Token } from "../../../../../../libs/utils/sessionStorage";
import trainingType from "../../../../../../data/trainingType.json";
import data from "../../../../../../data/dtdata.json";
import moment from "moment";
const Option = Select;
const AddTraining = () => {
  const formData = useRef();
  const [category, setCategory] = useState();
  const [qualificationLevel, setQualificationLevel] = useState();
  const [district, setDistrict] = useState();
  const handleTrainingType = (e) => {
    setCategory(e.target.value);
  };

  const disabledDate = (current) => {
    return current && current.valueOf() < moment();
  };

  const [isCreated, setIsCreated] = useState(false);
  const handleSubmit = (e) => {
    setIsCreated(true);
    e.preventDefault();
    const {
      trainingName,
      trainigDescription,
      vacancy,
      duration,
      applicationStartDate,
      applicationEndDate,
      trainingStartDate,
      trainingEndDate,
    } = formData.current;
    if (trainingName.value == "") {
      message.warning("Training Name is missing");
    } else if (category == null) {
      message.warning("Please select Training category");
    } else if (trainigDescription.value == "") {
      message.warning("Training Description is missing");
    } else if (district == null) {
      message.warning("Please select a district");
    } else if (qualificationLevel == null) {
      message.warning("Please select a qualification level");
    } else if (vacancy.value == "") {
      message.warning("Vacancy is missing");
    } else if (duration.value == "") {
      message.warning("Duration is missing");
    } else if (applicationStartDate.value == "") {
      message.warning("Application Start Date is missing");
    } else if (applicationEndDate.value == "") {
      message.warning("Application End Date is missing");
    } else if (trainingStartDate.value == "") {
      message.warning("Please enter Training Start Date");
    } else if (trainingEndDate.value == "") {
      message.warning("Please enter Training End Date");
    } else {
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/training/addtraining/`,
        data: {
          trainingName: trainingName.value,
          category: category,
          trainigDescription: trainigDescription.value,
          district: district,
          qualification: qualificationLevel,
          vacancy: vacancy.value,
          duration: duration.value,
          applicationStartDate: applicationStartDate.value,
          applicationEndDate: applicationEndDate.value,
          trainingStartDate: trainingStartDate.value,
          trainingEndDate: trainingEndDate.value,
          trainingInstitute: null,
        },
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      }).then((response) => {
        setIsCreated(false);
        if (response.status == 200 && response.data.status == "success") {
          Modal.success({ title: response.data.message });
          setTimeout(() => {
            window.location.replace("/current-training");
          }, 1000);
        } else if (response.status == 200 && response.data.status == "error") {
          Modal.error("Server Error");
        }
      });
    }
  };
  return (
    <Spin tip="Creating training..." spinning={isCreated}>
      <div>
        <form
          ref={formData}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <FormItem label="Training Name" required>
              <Input
                name="trainingName"
                placeholder="Training Name"
                required
                style={{
                  width: 500,
                }}
              />
            </FormItem>
            <FormItem label="Category" name="category" required>
              <Select
                showSearch
                placholder="Select Category"
                style={{
                  width: 400,
                }}
                name="category"
                value={category}
                onChange={(v, k) => {
                  setCategory(v);
                }}
              >
                {trainingType.map((trainingType, index) => {
                  return (
                    <Option
                      key={index}
                      value={trainingType.type}
                      onChange={handleTrainingType}
                    >
                      {trainingType.type}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
          </span>
          <FormItem
            label="Training Description"
            name="trainigDescription"
            required
          >
            <TextArea placeholder="Enter Training Description" />
          </FormItem>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <FormItem label="Location" name="location" required>
              <Select
                showSearch
                placeholder="Select a Location"
                onChange={(v, k) => {
                  setDistrict(v);
                }}
                style={{ width: "200px" }}
                name="district"
                value={district}
              >
                {data.map((dis) => {
                  return (
                    <Option value={dis.district_name} name="district">
                      {dis.district_name}
                    </Option>
                  );
                })}
              </Select>
            </FormItem>
            <FormItem label="Qualification Level" required>
              <Select
                showSearch
                placholder="Select Qualification Level"
                style={{
                  width: 300,
                }}
                onChange={(v, k) => {
                  setQualificationLevel(v);
                }}
                value={qualificationLevel}
                name="qualificationLevel"
              >
                <Option value="Upto 8th std (unskilled)">
                  Upto 8th std (unskilled)
                </Option>
                <Option value="8th - undergraduate/ITI (semi-skilled)">
                  8th - undergraduate/ITI (semi-skilled)
                </Option>
                <Option
                  value=" Diploma, Techincal Degree, Architecture, R&D
                      (skilled-tech)"
                >
                  Diploma, Technical Degree, Architecture, R&D (skilled-tech)
                </Option>
                <Option
                  value="Medical, Humanity, Social Science, Political Studies
                      (skilled-specialized)"
                >
                  Medical, Humanity, Social Science, Political Studies
                  (skilled-specialized)
                </Option>
                <Option
                  value=" Arts/Science/Commerce(Graduate/postgraduate)
                      (skilled-general)"
                >
                  Arts/Science/Commerce(Graduate/postgraduate) (skilled-general)
                </Option>
                <Option value="Yiminghe">Other (skilled-others)</Option>
              </Select>
            </FormItem>
            <FormItem label="Vacancy" name="vacancy" required>
              <Input type="number" placeholder="Enter Vacancy" />
            </FormItem>
            <FormItem label="Duration (In Months)" name="duration" required>
              <Input type="number" placeholder="Enter Duration" />
            </FormItem>
          </span>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <FormItem
              label="Application Start Date"
              name="applicationStartDate"
              required
            >
              <DatePicker
                placeholder="Enter Start Date"
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </FormItem>
            <FormItem
              label="Application End Date"
              name="applicationEndDate"
              required
            >
              <DatePicker
                placeholder="Enter End Date"
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </FormItem>
            <FormItem
              label="Training Start Date"
              name="trainingStartDate"
              required
            >
              <DatePicker
                placeholder="Enter End Date"
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </FormItem>
            <FormItem label="Training End Date" name="trainingEndDate" required>
              <DatePicker
                placeholder="Enter End Date"
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </FormItem>
          </Row>
          <FormItem>
            <Button type="primary" onClick={handleSubmit}>
              <PlusCircleOutlined />
              Create Training
            </Button>
          </FormItem>
        </form>
      </div>
    </Spin>
  );
};
export default AddTraining;
