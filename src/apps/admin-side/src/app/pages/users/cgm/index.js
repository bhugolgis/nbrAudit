import { Button, Row, Col, message } from "antd";
import React, { useRef, useState, useEffect } from "react";
import { MainContainer, FormItem, InputFields } from "./style";
import { columns } from "./contants";
import axios from "axios";
import { ProfileDataModal } from "../../beneficiary/style";
import { DataTable } from "../../../../../style";
import useUserData from "../container";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";

// CGM User List common component.

const AdminCgm = () => {
  const [open, setOpen] = useState(false);
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
        url: `${REACT_APP_BASE_URL}/adminmodule/AddCgmAPI`,
        data: {
          username: username.value,
          name: name.value,
          email: email.value,
          departmenName: departmenName.value,
          designation: designation.value,
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

  const { cgmList } = useUserData();
  return (
    <div>
      <h3>Cgms</h3>
      {/* <FlexStyle>
        <Button type="primary" onClick={showModal}>
          <PlusCircleOutlined />
          Add Cgm
        </Button>
      </FlexStyle> */}
      <DataTable
        columns={columns}
        dataSource={cgmList}
        pagination={{ pageSize: 5 }}
      />
      <ProfileDataModal
        title="Title"
        visible={open}
        onCancel={handleCancel}
        footer={
          <Button type="primary" onClick={handleCreate}>
            Create Cgm
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
export default AdminCgm;
