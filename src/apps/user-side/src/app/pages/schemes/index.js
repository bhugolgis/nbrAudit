import { useState, useRef } from "react";
import React from "react";
import { DataTable } from "../../../../style";
import useBeneficiaryData from "../container";
import { Col, Modal, Row, Input, Space, Button } from "antd";
import { FileTextOutlined } from "@ant-design/icons";
import { REACT_APP_BASE_URL } from "../../../../../../libs/utils/urls";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiArrowBack } from "react-icons/bi";
import { MainContainer } from "../dashboard/style";

const UserSchemesApplication = () => {
  const { schemeList } = useBeneficiaryData();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState();
  const columns = [
    {
      title: "Scheme",
      dataIndex: "specialScheme",
      render: (text) => {
        return <>{text.id}</>;
      },
    },
    { title: "Name", dataIndex: "NameOfBeneficiary" },
    { title: "District", dataIndex: "District" },
    {
      title: "Scheme Name",
      dataIndex: "specialScheme",
      render: (text) => {
        return <>{text.schemeName}</>;
      },
    },
    {
      title: "Application Start Date",
      dataIndex: "specialScheme",
      render: (text) => {
        return <>{text.ApplicationStartDate.slice(0, 10)}</>;
      },
    },
    {
      title: "Application End Date",
      dataIndex: "specialScheme",
      render: (text) => {
        return <>{text.ApplicationEndDate.slice(0, 10)}</>;
      },
    },
    {
      title: "Applied Date",
      dataIndex: "createdDate",
      ...getColumnSearchProps("createdDate"),
      render: (text) => {
        return <>{text.slice(0, 10)}</>;
      },
    },

    { title: "Address", dataIndex: "Address" },
    {
      title: "Scheme Application Status",
      dataIndex: "SchemeApplicationStatus",
      filters: [
        {
          text: "Pending",
          value: "Pending",
        },
        {
          text: "Shortlisted",
          value: "Shortlisted",
        },
        {
          text: "Selected",
          value: "Selected",
        },
        {
          text: "Rejected",
          value: "Rejected",
        },
      ],
      onFilter: (value, record) =>
        record.SchemeApplicationStatus.indexOf(value) === 0,
    },
    {
      title: "View Form",
      dataIndex: ["specialScheme", "schemeData"],
      render: (id, data) => {
        return (
          <>
            <HiOutlineDocumentText
              style={{ fontSize: "15px", cursor: "pointer" }}
              onClick={() => {
                setFormVisible(true);
                setFormData(data);
              }}
            />
          </>
        );
      },
    },
    // {
    //   title: "Form",
    //   dataIndex: "[id, data]",
    //   render: (id, data) => {
    //     return (
    //       <>
    //         <FileTextOutlined onClick={showForm} />
    //         <Modal
    //           title={data.specialScheme.schemeName}
    //           open={isFormOpen}
    //           onOk={handleForm}
    //           onCancel={handleCancelForm}
    //         >
    //           {data.specialScheme.id == 4 ? (
    //             <>
    //               <Row>
    //                 <Col span={12}>
    //                   <h4>Excavation : </h4>
    //                   {data.Excavation === true ? "Yes" : "No"}
    //                 </Col>
    //                 <Col span={12}>
    //                   <h4>Levelling : </h4>
    //                   {data.Levelling === true ? "Yes" : "No"}
    //                 </Col>
    //               </Row>
    //               <Row style={{ marginTop: "10px" }}>
    //                 <Col span={12}>
    //                   <h4>RCC_PCC_work : </h4>
    //                   {data.RCC_PCC_work === true ? "Yes" : "No"}
    //                 </Col>
    //                 <Col span={12}>
    //                   <h4>Brickwork and Plastering : </h4>
    //                   {data.Brickwork_and_Plastering === true ? "Yes" : "No"}
    //                 </Col>
    //               </Row>
    //               <Row style={{ marginTop: "10px" }}>
    //                 <Col span={12}>
    //                   <h4>Solar Panel Fitting : </h4>
    //                   {data.Solarpanelfitting === true ? "Yes" : "No"}
    //                 </Col>
    //                 <Col span={12}>
    //                   <h4>Tree plantation Landscaping : </h4>
    //                   {data.Tree_plantation_Landscaping === true ? "Yes" : "No"}
    //                 </Col>
    //               </Row>
    //               <Row style={{ marginTop: "10px" }}>
    //                 <Col span={12}>
    //                   <h4>Labour work for ancillary activities : </h4>
    //                   {data.Labour_work_for_ancillary_activities === true
    //                     ? "Yes"
    //                     : "No"}
    //                 </Col>
    //                 <Col span={12}>
    //                   <h4>
    //                     Finishing Electrical work Plumbing work Tiling work
    //                     Painting:
    //                   </h4>
    //                   {data.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ===
    //                   true
    //                     ? "Yes"
    //                     : "No"}
    //                 </Col>
    //               </Row>
    //               <Row>
    //                 <Col span={12}>
    //                   <h4>Aadhar Card</h4>
    //                   <a href={REACT_APP_BASE_URL + data.aadharCard}>
    //                     Aadhar Card
    //                   </a>
    //                 </Col>
    //                 <Col span={12}>
    //                   <h4>Pan Card</h4>
    //                   <a href={REACT_APP_BASE_URL + data.panCard}>
    //                     Aadhar Card
    //                   </a>
    //                 </Col>
    //               </Row>
    //               <Row>
    //                 <Col span={12}>
    //                   <h4>Education Certificate</h4>
    //                   <a href={REACT_APP_BASE_URL + data.EducationCertificate}>
    //                     Education Certificate
    //                   </a>
    //                 </Col>
    //                 <Col span={12}>
    //                   <h4>Exp Certificate</h4>
    //                   <a href={REACT_APP_BASE_URL + data.ExpCertificate}>
    //                     Exp Certificate
    //                   </a>
    //                 </Col>
    //               </Row>
    //             </>
    //           ) : (
    //             ""
    //           )}
    //         </Modal>
    //       </>
    //     );
    //   },
    // },
  ];
  if (formVisible == true) {
    return (
      <MainContainer>
        <BiArrowBack
          style={{ fontSize: "20px", cursor: "pointer" }}
          onClick={() => {
            setFormVisible(false);
          }}
        />
        <div style={{ marginTop: "20px" }}>
          <b> {formData.NameOfBeneficiary}</b>
          <br />
          <br />
          {formData.specialScheme.id == 1 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={9}>
                  <b>Do you possess or hold minimum one Acer land ?</b>
                  <p>
                    {formData.Is_Beneficiaries_shall_possess_hold_minimum_one_Acer_land ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Availability of water sources</b>
                  <p>
                    {formData.Availability_of_water_sources == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Document_7_12</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.Document_7_12}
                    target="_blank"
                  >
                    Document_7_12
                  </a>
                </Col>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={9}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme.id == 2 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={4}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={8}>
                  <b>Have your own house under PMAY or EWC ?</b>
                  <p>
                    {formData.haveyourownhouseunderPMAYorEWC == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={7}>
                  <b>Under which scheme you need home ?</b>
                  <p>{formData.Under_which_scheme_you_need_home}</p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Annual Family Income</b>
                  <p>{formData.Annual_Family_Income}</p>
                </Col>
                <Col span={4}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={8}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
                <Col span={6}></Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme.id == 3 ? (
            <div>
              <Row>
                <Col span={5}>
                  {" "}
                  <b>Do you belong to SC ?</b>
                  <p>
                    {formData.IsBeneficiariesbelongstoScheduledCastecommunities ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Region</b>
                  <p>{formData.Region}</p>
                </Col>
                <Col span={6}>
                  <b>Name of Company</b>
                  <p>{formData.nameOfCompany}</p>
                </Col>
                <Col span={8}>
                  <b>Owner of Company</b>
                  <p>{formData.OwnerOfCompany}</p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Excavation</b>
                  <p>{formData.Excavation == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Levelling</b>
                  <p>{formData.Levelling == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>RCC_PCC_work</b>
                  <p>{formData.RCC_PCC_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    Demarcation of plot boundaries Construction of compound wall
                  </b>
                  <p>
                    {formData.Demarcation_of_plot_boundaries_Construction_of_compound_wall ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Brickwork and Plastering</b>
                  <p>
                    {formData.Brickwork_and_Plastering == true ? "Yes" : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Doorsandwindowsfitting</b>
                  <p>
                    {formData.Doorsandwindowsfitting == true ? "Yes" : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Solarpanelfitting</b>
                  <p>{formData.Solarpanelfitting == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    work Reinforcement Cutting Bending of steel and fabrication
                  </b>
                  <p>
                    {formData.work_Reinforcement_Cutting_Bending_of_steel_and_fabrication ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Tree plantation Landscaping</b>
                  <p>
                    {formData.Tree_plantation_Landscaping == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>Drainage Line and Services Laying</b>
                  <p>
                    {formData.Drainage_Line_and_Services_Laying == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  <b>PQC</b>
                  <p>{formData.PQC == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={9}>
                  <b>
                    Finishing Electrical work Plumbing work Tiling work Painting
                  </b>
                  <p>
                    {formData.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Storm water works</b>
                  <p>{formData.Storm_water_works == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Waterproofing work</b>
                  <p>{formData.Waterproofing_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Transit Mixer Driver and Helper</b>
                  <p>
                    {formData.Transit_Mixer_Driver_and_Helper == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={9}>
                  <b>Labour work for ancillary activities</b>
                  <p>
                    {formData.Labour_work_for_ancillary_activities == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
                <Col span={8}>
                  <b>Company Incorporation Certificate</b>
                  <br />
                  <a
                    href={
                      REACT_APP_BASE_URL +
                      formData.CompanyIncorporationCertificate
                    }
                  >
                    CompanyIncorporationCertificate
                  </a>
                </Col>
              </Row>
              <br />
              <Row>
                <Col span={5}>
                  <b>OtherDocument</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.OtherDocument}
                    target="_blank"
                  >
                    OtherDocument
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme.id == 4 ? (
            <div>
              <Row>
                <Col span={5}>
                  <b>Excavation</b>
                  <p>{formData.Excavation == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>Levelling</b>
                  <p>{formData.Levelling == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  <b>RCC_PCC_work</b>
                  <p>{formData.RCC_PCC_work == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={8}>
                  <b>Brickwork and Plastering</b>
                  <p>
                    {formData.Brickwork_and_Plastering == true ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>Solarpanelfitting</b>
                  <p>{formData.Solarpanelfitting == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={5}>
                  {" "}
                  <b>Tree plantation Landscaping</b>
                  <p>
                    {formData.Tree_plantation_Landscaping == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={5}>
                  {" "}
                  <b>Labour work for ancillary activities</b>
                  <p>
                    {formData.Labour_work_for_ancillary_activities == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
                <Col span={8}>
                  {" "}
                  <b>
                    Finishing Electrical work Plumbing work Tiling work Painting
                  </b>
                  <p>
                    {formData.Finishing_Electrical_work_Plumbing_work_Tiling_work_Painting ==
                    true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={5}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>Education Certificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.EducationCertificate}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={5}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={8}>
                  <b>Experience Certificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.ExpCertificate}
                    target="_blank"
                  >
                    Experience Certificate
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
          {formData.specialScheme.id == 5 ? (
            <div>
              <Row>
                <Col span={6}>
                  <b>Pan Card Number</b>
                  <p>{formData.panNumber}</p>
                </Col>
                <Col span={6}>
                  <b>Area of Operation District</b>
                  <p>{formData.areaOfOperationDistrict}</p>
                </Col>
                <Col span={6}>
                  <b>Area of Operation Taluka</b>
                  <p>{formData.areaOfOperationTaluka}</p>
                </Col>
                <Col span={6}>
                  <b>Availed MPBCDC Loan Before ?</b>
                  <p>
                    {formData.DoyouavailMPBCDCLoanBefore == true ? "Yes" : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>Loan Account number</b>
                  <p>
                    {formData.LoanAccountnumber == null
                      ? "NA"
                      : formData.LoanAccountnumber}
                  </p>
                </Col>
                <Col span={6}>
                  <b>Loan Scheme Name</b>
                  <p>{formData.loanSchemeName}</p>
                </Col>
                <Col span={6}>
                  <b>Loan Present Status</b>
                  <p>{formData.loanPresentStatus}</p>
                </Col>
                <Col span={6}>
                  <b>Want Loan other than MPBCDC ?</b>
                  <p>
                    {formData.willingToHaveLoanOtherThanMpbdc == true
                      ? "Yes"
                      : "No"}
                  </p>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>Have Driving License</b>
                  <p>{formData.haveDrivingLicense == true ? "Yes" : "No"}</p>
                </Col>
                <Col span={6}>
                  <b>Driving License Number</b>
                  <p>{formData.drivingLicenseNumber}</p>
                </Col>
                <Col span={6}>
                  <b>Photo</b>
                  <br />
                  <a href={REACT_APP_BASE_URL + formData.photo} target="_blank">
                    Photo
                  </a>
                </Col>
                <Col span={6}>
                  <b>Signature</b>
                  <br />
                  <a href={REACT_APP_BASE_URL + formData.sign} target="_blank">
                    Signature
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>AadharCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.aadharCard}
                    target="_blank"
                  >
                    AadharCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>PanCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.panCard}
                    target="_blank"
                  >
                    PanCard
                  </a>
                </Col>
                <Col span={6}>
                  <b>Driving License</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.drivingLicense}
                    target="_blank"
                  >
                    Driving License
                  </a>
                </Col>
                <Col span={6}>
                  <b>IncomeCertificate</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.IncomeCertificate}
                    target="_blank"
                  >
                    IncomeCertificate
                  </a>
                </Col>
              </Row>
              <Row>
                <Col span={6}>
                  <b>MpbdcLoanDoc</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.mpbdcLoanDoc}
                    target="_blank"
                  >
                    MpbdcLoanDoc
                  </a>
                </Col>
                <Col span={6}>
                  <b>RationCard</b>
                  <br />
                  <a
                    href={REACT_APP_BASE_URL + formData.rationCard}
                    target="_blank"
                  >
                    RationCard
                  </a>
                </Col>
              </Row>
            </div>
          ) : (
            <></>
          )}
        </div>
      </MainContainer>
    );
  } else {
    return (
      <div style={{ margin: "30px" }}>
        <h3>Special Schemes Application</h3>
        <DataTable columns={columns} dataSource={schemeList} />
      </div>
    );
  }
};
export default UserSchemesApplication;
