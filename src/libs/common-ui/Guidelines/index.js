import React from "react";
import { DataTable, MainContainer } from "./style";
import { FaFilePdf } from "react-icons/fa";

const Guidelines = () => {
  const data = [
    {
      srno: "1",
      DepartmentName: "Social Justice and Special Assistance ",
      code: "20080926144305001",
      date: "25 Sept 2008",
      link: "https://bhugolapps.com/media/imppdf/sc_sub_castes.pdf",
    },
  ];
  const GuideLinesCol = [
    {
      title: "Sr No.",
      dataIndex: "srno",
    },
    {
      title: "Department Name",
      dataIndex: "DepartmentName",
    },
    {
      title: "Unique Code",
      dataIndex: "code",
    },
    {
      title: "G.R Date",
      dataIndex: "date",
    },
    {
      title: "Download",
      dataIndex: "link",
      render: (text) => {
        return (
          <FaFilePdf
            style={{ fontSize: "16px", color: "#cc0000", cursor: "pointer" }}
            onClick={() => {
              window.location.replace(text);
            }}
          />
        );
      },
    },
  ];
  return (
    <MainContainer>
      <h3>Goverment Resolutions (GR's)</h3>
      <DataTable columns={GuideLinesCol} dataSource={data} />
    </MainContainer>
  );
};
export default Guidelines;
