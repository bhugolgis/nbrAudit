import styled from "styled-components";
import { Card, Table, Row } from "antd";
import { FaUsers } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { AiFillProfile } from "react-icons/ai";
export const MainContainer = styled.div`
  padding: 15px 30px 30px 30px;
`;
export const FlexStyle = styled.span`
  display: flex;
  justify-content: flex-end;
`;
export const DataTable = styled(Table)`
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
    > th:not(:last-child):not(.ant-table-selection-column):not(
      .ant-table-row-expand-icon-cell
    ):not([colspan])::before {
    display: none;
  }
`;
export const CardContainer = styled.span`
  margin-top: 15px;
`;
export const Cards = styled(Card)`
  width: 210px;
  height: 90px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const UserIcon = styled(FaUsers)`
  font-size: 35px;
  color: #fd7e14;
`;
export const JobIcon = styled(HiOutlineNewspaper)`
  font-size: 40px;
  color: #20c997;
`;
export const TrainingIcon = styled(GiTeacher)`
  font-size: 35px;
  color: #6610f2;
`;
export const VerticalIcon = styled(AiFillProfile)`
  font-size: 35px;
  color: #e83e8c;
`;
export const CardItem = styled.span`
  display: flex;
  justify-content: space-between;
`;
export const Count = styled.h2`
  color: #000;
`;
export const JobCount = styled.h2`
  color: #ff8000;
`;
export const TrainingCount = styled.h2`
  color: #29a329;
`;
export const VerticalCount = styled.h2`
  color: #ff4d4d;
`;
export const LoadContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10%;
`;
export const VerticalCard = styled(Card)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const CountContainer = styled(Row)`
  margin-top: 30px;
`;
export const CardTable = styled(Card)`
  height: 420px;
  margin-right: 20px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
export const SecondaryCards = styled(Card)`
  width: 210px;
  height: 110px;
  box-shadow: -8px 12px 18px 0 #dadee8;
  border-radius: 5px;
  .ant-card-body {
    padding: 15px;
  }
`;
