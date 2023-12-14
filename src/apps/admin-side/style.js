import styled from "styled-components";
import { RiDashboardLine, RiTeamLine, RiUser3Line } from "react-icons/ri";
import { BsBagDash } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import { GrWorkshop } from "react-icons/gr";
import { Table, Card, Input, Modal, Button } from "antd";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
export const NavDashboard = styled(RiDashboardLine)`
  color: #193367;
`;
export const NavBeneficiary = styled(RiTeamLine)`
  color: #193367;
`;
export const NavUser = styled(RiUser3Line)`
  color: #193367;
`;
export const NavJob = styled(BsBagDash)`
  color: #193367;
`;
export const NavLoan = styled(AiOutlineBank)`
  color: #193367;
`;
export const NavTraining = styled(GiTeacher)`
  color: #193367;
`;
export const UserIcon = styled(FaUsers)`
  font-size: 35px;
  color: #fd7e14;
`;
export const DataTable = styled(Table)`
  margin-top: 15px;
  .ant-table-pagination.ant-pagination {
    margin: 20px 0px;
  }
  .ant-table-thead > tr > th {
    padding: 10px 15px;
  }
  .ant-table table {
  }
  .ant-table-tbody > tr > td {
    padding: 15px;
  }
  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    display: none;
  }
`;
export const SearchInput = styled(Input)`
  width: 200px;
  margin: 0px 10px;
`;
export const Cards = styled(Card)`
  width: 280px;
  height: 90px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const CardTable = styled(Card)`
  margin-right: 20px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const ClearButton = styled(Button)`
  margin-left: 10px;
`;
