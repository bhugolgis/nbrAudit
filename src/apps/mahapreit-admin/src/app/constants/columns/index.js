export const JobApplicationList = [
  {
    title: "Beneficiary Name",
    dataIndex: "candidate__name",
    width: "20%",
  },
  {
    title: "Phone Number",
    dataIndex: "candidate__phoneNumber",
    width: "15%",
  },
  {
    title: "Caste",
    dataIndex: "candidate__CasteName",
  },
  {
    title: "District",
    dataIndex: "candidate__district",
  },
  {
    title: "Applied Date",
    dataIndex: "createdDate",
    render: (text) => {
      return <>{text.slice(0, 10)}</>;
    },
  },
  {
    title: "Cgm Status",
    dataIndex: "JobTabStatus",
  },
  {
    title: "Cgm Remarks",
    dataIndex: "CgmRemarks",
  },
  { title: "CGM Check Date", dataIndex: "CgmApplicationCheckDate" },
  { title: "Final Status", dataIndex: "FinalJobApplicationStatus" },
];
