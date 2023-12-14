import styled from "styled-components";
import { RiDashboardLine, RiTeamLine, RiUser3Line } from "react-icons/ri";
import { BsBagDash } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import { GrWorkshop } from "react-icons/gr";
import { FaUsers } from "react-icons/fa";
export const NavDashboard = styled(RiDashboardLine)`
  font-size: 50px;
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
export const NavTraining = styled(GrWorkshop)`
  color: #193367;
`;
export const UserIcon = styled(FaUsers)`
  font-size: 35px;
  color: #fd7e14;
`;
