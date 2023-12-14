import React, { useState, useRef, useReducer } from "react";
import {
  Button,
  message,
  Form,
  Input,
  DatePicker,
  Switch,
  Select,
  Modal,
  Space,
  Spin,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

import {
  Token,
  VerticalId,
} from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
import dist from "react-image-crop";
import data from "../../../../../../../data/dtdata.json";
import { upload } from "@testing-library/user-event/dist/upload";
const { Option } = Select;
const AddJob = () => {
  const disabledDate = (current) => {
    return current && current.valueOf() < moment();
  };

  let fieldId = 0;
  const [fieldName, setFieldName] = useState("");
  const [fieldList, setFieldList] = useState([]);

  const [jobName, setJobName] = useState("");
  const handleJobName = (e) => {
    setJobName(e.target.value);
  };
  const [jobDescription, setJobDescription] = useState("");
  const handleJobDescription = (e) => {
    setJobDescription(e.target.value);
  };
  const [totalVacancy, setTotalVacancy] = useState();
  const handleTotalVacancy = (e) => {
    setTotalVacancy(e.target.value);
  };
  const [duration, setDuration] = useState();
  const handleDuration = (e) => {
    setDuration(e.target.value);
  };
  const [startDate, setStartDate] = useState("");
  const handleStartDate = (date, dateString) => {
    setStartDate(date);
  };
  const [endDate, setEndDate] = useState("");
  const handleEndDate = (date, dateString) => {
    setEndDate(date);
  };
  const [jobStartDate, setJobStartDate] = useState();
  const handleJobStartDate = (date, dateString) => {
    setJobStartDate(date);
  };
  const [jobEndDate, setJobEndDate] = useState();
  const handleJobEndDate = (date, dateString) => {
    setJobEndDate(date);
  };
  const [qualificationReq, setQualificationReq] = useState("");
  const [district, setDistrict] = useState("");
  const [location, setLocation] = useState("");
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (jobName == "" || jobName == null) {
      message.warning("Please enter Job Name");
    } else if (qualificationReq == "" || qualificationReq == null) {
      message.warning("Please enter Qualification Required");
    } else if (jobDescription == "" || jobDescription == null) {
      message.warning("Please enter Job Description");
    } else if (district == "" || district == null) {
      message.warning("Please enter District");
    } else if (location == "" || location == null) {
      message.warning("Please enter Location");
    } else if (duration == "" || duration == null) {
      message.warning("Please enter Duration");
    } else if (totalVacancy == "" || totalVacancy == null) {
      message.warning("Please enter Total Vacancy");
    } else if (startDate == "" || startDate == null) {
      message.warning("Please enter Application Start Date");
    } else if (endDate == "" || endDate == null) {
      message.warning("Please enter Application End Date");
    } else if (jobStartDate == "" || jobStartDate == null) {
      message.warning("Please enter Job Start Date");
    } else if (jobEndDate == "" || jobEndDate == null) {
      message.warning("Please enter Job End Date");
    } else {
      setLoading(true);
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/adminmodule/InsertJobType`,
        data: {
          JobName: jobName,
          vertical: VerticalId,
          JobDescription: jobDescription,
          TotalVacancy: totalVacancy,
          JobStartDate: jobStartDate,
          JobEndDate: jobEndDate,
          Duration: `${duration} Months`,
          location: location,
          district: district,
          MinimumQualificationRequired: qualificationReq,
          ApplicationStartDate: startDate,
          ApplicationEndDate: endDate,
          JobApplicationForm: fieldList,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${Token}`,
        },
      }).then((response) => {
        if (response.status == 200 && response.data.status == "success") {
          message.success(response.data.message);
          setLoading(false);
          setTimeout(() => {
            window.location.replace("/cgm-current-jobs");
          }, 1000);
        } else if (response.status == 200 && response.data.status == "error") {
          Modal.error("Server Error");
        }
      });
    }
  };
  return (
    <Spin tip="Creating job..." spinning={loading}>
      <div>
        <Form layout="vertical">
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item
              label="Job Name"
              style={{
                width: 500,
              }}
              required
            >
              <Input
                placeholder="Enter Job Name"
                name="JobName"
                value={jobName}
                onChange={handleJobName}
                required
              />
            </Form.Item>
            <Form.Item label="Minimum Qualification" required>
              <Select
                showSearch
                placholder="Select Qualification Level"
                style={{
                  width: 400,
                }}
                name="qualificationLevel"
                value={qualificationReq}
                onChange={(v, k) => {
                  setQualificationReq(v);
                }}
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
                  Diploma, Techincal Degree, Architecture, R&D (skilled-tech)
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
            </Form.Item>
          </span>
          <Form.Item label="Job Description" required>
            <TextArea
              placeholder="Enter the Job Description"
              name="JobDescription"
              value={jobDescription}
              onChange={handleJobDescription}
              required
            />
          </Form.Item>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item label="District" name="district" required>
              <Select
                showSearch
                placeholder="Select a district"
                onChange={(v, k) => {
                  setDistrict(v);
                }}
                name="district"
                style={{ width: "200px" }}
              >
                {data.map((dis, index) => {
                  return (
                    <Option value={dis.district_name} name="district">
                      {dis.district_name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Location" style={{ width: "200px" }} required>
              <Input
                placeholder="Enter Location"
                name="location"
                value={location}
                onChange={handleLocation}
                required
              />
            </Form.Item>
            <Form.Item
              label="No of Positions"
              style={{ width: "200px" }}
              required
            >
              <Input
                type="number"
                placeholder="Enter the vacancy"
                name="TotalVacancy"
                value={totalVacancy}
                onChange={handleTotalVacancy}
                min="1"
                required
              />
            </Form.Item>
            <Form.Item
              label="Duration (in Months)"
              style={{ width: "200px" }}
              required
            >
              <Input
                type="number"
                placeholder="Enter the Duration"
                onChange={handleDuration}
              />
            </Form.Item>
          </span>
          <span
            style={{ display: "flex", justifyContent: "space-between" }}
            required
          >
            <Form.Item label="Application Start Date" required>
              <DatePicker
                name="StartDate"
                value={startDate}
                onChange={handleStartDate}
                required
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item label="Application End Date" required>
              <DatePicker
                name="EndDate"
                value={endDate}
                onChange={handleEndDate}
                required
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item label="Job Start Date" required>
              <DatePicker
                name="EndDate"
                value={jobStartDate}
                onChange={handleJobStartDate}
                required
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </Form.Item>
            <Form.Item label="Job End Date" required>
              <DatePicker
                name="EndDate"
                value={jobEndDate}
                onChange={handleJobEndDate}
                required
                disabledDate={disabledDate}
                style={{ width: "200px" }}
              />
            </Form.Item>
          </span>
          {/* <Form.Item label="Fields">
          <Input
            style={{ width: "200px", marginRight: "50px" }}
            placeholder="Enter the Field name"
            value={fieldName}
            onChange={(e) => {
              setFieldName(e.target.value);
            }}
          />
          <Button
            type="dashed"
            style={{ width: "200px", marginRight: "50px" }}
            onClick={() => {
              setFieldName("");
              fieldList.push({
                fieldName: fieldName,
              });
            }}
          >
            Add Upload Field
          </Button>
          <Button
            type="dashed"
            style={{ width: "200px" }}
            onClick={() => {
              fieldList.pop();
            }}
          >
            Remove Upload Field
          </Button>
        </Form.Item> */}
          {/* <h4>Below Fields will be added as a upload field in this Job</h4>
        <ul>
          {fieldList.map((field) => (
            <li key={field.id}>{field.fieldName}</li>
          ))}
        </ul> */}
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={onSubmit}>
              <PlusCircleOutlined />
              Create Job
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Spin>
  );
};
export default AddJob;
