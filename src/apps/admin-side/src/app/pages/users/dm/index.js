import React, { useState, useRef, useEffect } from "react";
import { Row, Col, Button, message, Select } from "antd";
import { FormItem, InputFields, ProfileDataModal } from "./style";
import { columns } from "./constants";
import axios from "axios";
import data from "../../../../../../../data/dtdata.json";
import { DataTable } from "../../../../../style";
import useUserData from "../container";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";

// District Manager common component for all users.

const { Option } = Select;

const DistrictManager = () => {
  const [open, setOpen] = useState(false);
  // const [dmlist, setDmList] = useState();
  const [district, setDistrict] = useState("");

  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };
  const formData = useRef();

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  const handleCreate = (e) => {
    e.preventDefault();
    const { username, name, email, departmenName, designation, password } =
      formData.current;

    if (username.value == "") {
      message.warning("Username is empty");
    } else if (name.value == "") {
      message.warning("Name is empty");
    } else if (email.value == "") {
      message.warning("Email is empty");
    } else if (departmenName.value == "") {
      message.warning("Department Name is empty");
    } else if (designation.value == "") {
      message.warning("Designation is empty");
    } else if (password.value == "") {
      message.warning("Password is empty");
    } else {
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/adminmodule/AddDistrictManagerAPI`,
        data: {
          username: username.value,
          name: name.value,
          email: email.value,
          departmenName: departmenName.value,
          designation: designation.value,
          dmDistrict: district,
          password: password.value,
        },
      })
        .then((response) => {
          if (response.data.status == "success") {
            message.success(response.data.message);
            setOpen(false);
          } else if (response.data.status == "error") {
            message.error(response.data);
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  };

  const { dmList } = useUserData();
  return (
    <div>
      <h3>District Managers</h3>
      {/* <FlexStyle>
        <Button type="primary" onClick={showModal}>
          <PlusCircleOutlined />
          Add District Manager
        </Button>
      </FlexStyle> */}
      <DataTable
        columns={columns}
        dataSource={dmList}
        pagination={{ pageSize: 5 }}
      />
      <ProfileDataModal
        title="Title"
        visible={open}
        onCancel={handleCancel}
        footer={
          <Button type="primary" onClick={handleCreate}>
            Create District Manager
          </Button>
        }
      >
        <form ref={formData}>
          <Row>
            <Col span={12}>
              <FormItem label="Username">
                <InputFields placeholder="Enter the username" name="username" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Name">
                <InputFields placeholder="Enter the name" name="name" />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="Email">
                <InputFields placeholder="Enter the email" name="email" />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Department Name">
                <InputFields
                  placeholder="Enter the Department name"
                  name="departmenName"
                />
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="Designation">
                <InputFields
                  placeholder="Enter the Department name"
                  name="designation"
                />
              </FormItem>
            </Col>
            <Col span={12}>
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
                  placeholder="Select a district"
                  onChange={(v, k) => {
                    setDistrict(v);
                  }}
                  style={{ width: "250px" }}
                  name="district"
                >
                  {data.map((dis, index) => {
                    return (
                      <Option
                        value={dis.district_name}
                        onChange={handleDistrict}
                        name="district"
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
            <Col span={12}>
              <FormItem label="Password">
                <InputFields.Password
                  placeholder="Enter the Department name"
                  name="password"
                />
              </FormItem>
            </Col>
          </Row>
        </form>
      </ProfileDataModal>
    </div>
  );
};
export default DistrictManager;
