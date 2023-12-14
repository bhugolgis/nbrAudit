export const pastJobsColumn = [
  {
    title: "Job Name",
    dataIndex: "JobName",
  },
  {
    title: "Start Date",
    dataIndex: "ApplicationStartDate",
    render: (text) => {
      return text.slice(0, 10);
    },
  },
  {
    title: "End Date",
    dataIndex: "ApplicationEndDate",
    render: (text) => {
      return text.slice(0, 10);
    },
  },
  {
    title: "Vacancy",
    dataIndex: "TotalVacancy",
  },
  {
    title: "Duration",
    dataIndex: "Duration",
  },
];
export const districtColumns = [
  {
    title: "District",
    dataIndex: "district",
  },
  {
    title: "Beneficiary",
    dataIndex: "beneficaryCount",
  },
  {
    title: "Job Application",
    dataIndex: "jobApplicationCount",
  },
  {
    title: "Training Application",
    dataIndex: "trainingApplicationCount",
  },
];
