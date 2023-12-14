import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Form, Spin, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import axios from "axios";
import {
  DataTable,
  StatusFields,
  LoadContainer,
  ApprovedStatus,
  PendingStatus,
} from "./style";
import { REACT_APP_BASE_URL } from "../../utils/urls";
import { Token } from "../../utils/sessionStorage";

const Loanlogspage = (props) => {
  const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState();
  const getdt = () => {
    axios({
      method: "get",
      url: `${REACT_APP_BASE_URL}/loan/LoanFormDetailView/${props.id}`,
    }).then((response) => {
      setUserData(response.data);
      setOpen(true);
      //setModalLoading(false);
    });
  };

  useEffect(() => {
    getdt();
  }, [props]);

  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: "Status Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        const formatDate = (text) => {
          const options = {
            day: "2-digit",
            year: "numeric",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          };
          return new Date(text).toLocaleDateString(undefined, options);
        };

        return formatDate(text);
      },
    },
    {
      title: "Approval Status",
      dataIndex: "previoustatus",
      render: (text) => {
        if (text == "SC") {
          return <PendingStatus>Scrutiny</PendingStatus>;
        } else if (text == "SC-QUERY") {
          return <PendingStatus>Scrunity Query</PendingStatus>;
        } else if (text == "DM") {
          return <PendingStatus>District Manager</PendingStatus>;
        } else if (text == "DM-QUERY") {
          return <PendingStatus>District Manager Query</PendingStatus>;
        } else if (text == "RM") {
          return <PendingStatus>Regional Manager</PendingStatus>;
        } else if (text == "RM-REJECT") {
          return <PendingStatus>Regional Manager Rejected</PendingStatus>;
        } else if (text == "BO") {
          return <PendingStatus>Bank Process</PendingStatus>;
        } else if (text == "MPBCDC-MD") {
          return <PendingStatus>MPBCDC-MD</PendingStatus>;
        } else if (text == "LOAN-ACTIVE") {
          return <ApprovedStatus>{text}</ApprovedStatus>;
        } else {
          return <>{text}</>;
        }
      },
    },
    {
      title: "Remarks",
      dataIndex: "approvalremarks",
      key: "approvalremarks",
    },
  ];

  if (open == true) {
    return (
      <div>
        <Form layout="vertical">
          <StatusFields>
            <DataTable columns={columns} dataSource={userData.LoanFormInfo} />
          </StatusFields>
        </Form>
      </div>
    );
  } else {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  }
};
export default Loanlogspage;
