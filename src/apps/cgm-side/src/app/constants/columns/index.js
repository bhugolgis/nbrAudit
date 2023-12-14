import SearchFilter from "../../../../../../libs/common-ui/searchFilter";
import { ApprovedStatus, PendingStatus } from "../../../../style";
import { Button } from "antd";

export const BeneficiaryListcolumns = [
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
    title: "Cgm Status",
    dataIndex: "CgmJobApplicationResult",
    render: (text) => {
      return (
        <>
          {text == true ? (
            <ApprovedStatus>Approved</ApprovedStatus>
          ) : (
            <PendingStatus>Pending</PendingStatus>
          )}
        </>
      );
    },
  },
  {
    title: "Cgm Remarks",
    dataIndex: "CgmRemarks",
  },
  {
    title: "Actions",
    render: (text) => {
      return <Button>View Profile</Button>;
    },
  },
];
export const SpecialSchemesColumns = [
  {
    title: "Beneficiary Name",
    dataIndex: "NameOfBeneficiary",
  },
  {
    title: "Aadhar Number",
    dataIndex: "aadharNumber",
  },
  {
    title: "Region",
    dataIndex: "Region",
  },
  {
    title: "Email Id",
    dataIndex: "emailId",
  },
  {
    title: "Beneficiary Name",
    dataIndex: "NameOfBeneficiary",
  },
];

export const DistrictWiseSchemeApps = [
  {
    title: "District",
    dataIndex: "district",
  },
  {
    title: "Application Count",
    dataIndex: "SpecialSchemeApplication",
  },
];

export const schemeOfferings = [
  { title: "Scheme Name", dataIndex: "specialScheme__schemeName" },
  { title: "Total Count", dataIndex: "count" },
  { title: "Pending", dataIndex: "pending" },
  { title: "Sortlisted", dataIndex: "sortlisted" },
  { title: "Selected", dataIndex: "selected" },
];
