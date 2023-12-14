import styled from "styled-components";
import { Input } from "antd";
import { BiUserCircle } from "react-icons/bi";
const { Search } = Input;
export const ChildContainer = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
`;
export const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;
export const MahaPreit = styled.img`
  height: 50px;
  margin-right: 10px;
`;
export const SearchBar = styled(Search)`
  width: 250px;
  margin: 0px 20px;
`;
export const ProfileImage = styled.img`
  font-size: 20px;
  border-radius: 50%;
  margin: 0px 10px;
`;
export const TranslateContainer = styled.div`
  margin: 0px 10px;
  .goog-te-gadget .goog-te-combo {
    padding: 4px;
    border-radius: 6px;
    border: 1px solid #cccccc;
    color: #404040;
  }
  #text {
    display: none;
  }
`;
