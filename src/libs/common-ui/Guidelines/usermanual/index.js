import React, { useEffect, useState } from "react";
import { DataTable, MainContainer } from "../style";
import { FaFilePdf } from "react-icons/fa";
import { fetchDocs } from "../../../api/commonapi";
const Usermanual = () => {
  const [docs, setDocs] = useState(null);
  useEffect(async () => {
    const res = await fetchDocs();
    setDocs(res.data);
  }, []);

  const UserManualCol = [
    {
      title: "Name",
      dataIndex: "name",
      width: "60%",
    },
    {
      title: "View / Download",
      dataIndex: "link",
      render: (text) => {
        return (
          <>
            <FaFilePdf
              style={{ fontSize: "16px", color: "#cc0000", cursor: "pointer" }}
              onClick={() => {
                window.location.replace(text);
              }}
            />
          </>
        );
      },
    },
  ];

  const ManualData = [
    {
      name: "NBR User Manual Marathi",
      link: "https://bhugolapps.com/media/imppdf/NBR_User_Manual_Marathi.pdf",
    },
    {
      name: "NBR User Manual English",
      link: "https://bhugolapps.com/media/imppdf/NBR_User_Manual_English.pdf",
    },
    {
      name: "Guarantor's Letter of Guarantee",
      link: "https://bhugolapps.com/media/imppdf/Guarantor's_Letter.pdf",
    },
    {
      name: "Education Loan Process",
      link: "https://bhugolapps.com/media/imppdf/Education_loan_process.pdf",
    },
    {
      name: "NSFDC Loan Application Form",
      link: "https://bhugolapps.com/media/imppdf/NSFDC_Loan_Application_Form.pdf",
    },
    // {
    //   name: "NSKFDC Education Loan Process ",
    //   link: "/NSKFDC_Education_Loan_Process .pdf",
    // },
    // {
    //   name: "NSFDC Education Loan Process",
    //   link: "/NSFDC_Education_Loan_Process.pdf",
    // },

    {
      name: "Application Procedure for Education Loan",
      link: "https://bhugolapps.com/media/imppdf/App_Procedure_for_Edu_Loan.pdf",
    },
  ];
  return (
    <MainContainer>
      <h3>User Manual</h3>
      <DataTable columns={UserManualCol} dataSource={ManualData} />
    </MainContainer>
  );
};
export default Usermanual;
