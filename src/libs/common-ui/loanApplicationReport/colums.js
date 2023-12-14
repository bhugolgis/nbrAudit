import disData from "../../../data/disFilter.json";

export const countReport = [
  {
    title: "Scheme",
    dataIndex: "LoanSchemeCode",
    render: (schemeName) => {
      return <>{schemeName}</>;
    },
    // filters: [
    //   {
    //     text: "central-nsfdc-el-a",
    //     value: "central-nsfdc-el-a",
    //   },
    //   {
    //     text: "central-nsfdc-el-b",
    //     value: "central-nsfdc-el-b",
    //   },
    //   {
    //     text: "central-nskfdc-el-a",
    //     value: "central-nskfdc-el-a",
    //   },
    //   {
    //     text: "central-nskfdc-el-b",
    //     value: "central-nskfdc-el-b",
    //   },
    // ],
    // onFilter: (value, record) => record.LoanSchemeCode.indexOf(value) === 0,
  },
  {
    title: "Sub Scheme",
    dataIndex: "SubSchemeName",
    // filters: [
    //   {
    //     text: "Domestic",
    //     value: "Domestic",
    //   },
    //   {
    //     text: "International",
    //     value: "International",
    //   },
    // ],
    // onFilter: (value, record) => record.SubSchemeName.indexOf(value) === 0,
  },
  // { title: "Division", dataIndex: "Division" },
  {
    title: "District",
    dataIndex: "District",
    // filters: disData,
    // filterSearch: true,
    // onFilter: (value, record) => record.District.indexOf(value) === 0,
  },
  { title: "Taluka", dataIndex: "Taluka" },
  { title: "Received", dataIndex: "received_count" },
];

export const detailReport = [
  { title: "Application ID", dataIndex: "Applicationid" },
  { title: "Scheme", dataIndex: "LoanScheme" },
  { title: "Sub Scheme", dataIndex: "SubSchemeName" },
  {
    title: "Applicant Name",
    dataIndex: ["id", "loanData"],
    render: (id, data) => {
      return (
        <>
          {data.FirstName} {data.LastName}
        </>
      );
    },
  },
  {
    title: "Application Date",
    dataIndex: "createdDate",
    render: (text) => {
      return <>{text.slice(0, 10)}</>;
    },
  },
  // { title: "Division", dataIndex: "Division" },
  { title: "District", district: "District" },
  { title: "Taluka", dataIndex: "Taluka" },
  // { title: "Caste" },
  // { title: "Sub Caste" },
  {
    title: "Business Name",
    dataIndex: "ProposedBusinessName",
    render: (text) => {
      if (text == "undefined") {
        return <>NA</>;
      } else {
        return <>{text}</>;
      }
    },
  },
  { title: "Family Income", dataIndex: "AnnualFamilyIncome" },
  // {
  //   title: "View Profile",
  //   dataIndex: ["id", "loanData"],
  //   render: (id, data) => {
  //     return <></>;
  //   },
  // },
];
