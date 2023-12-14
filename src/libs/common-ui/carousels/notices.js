import React from "react";
import { Read, Cards, SubTitle, LoadContainer } from "./style";
import { Construction, Housing, Landscape, Mahogani } from "../../../media";
import { Token, UserGroup } from "../../utils/sessionStorage";
import { Modal, Spin } from "antd";
import useCarousel from "./container";
import Slider from "react-slick";

const NoticesCarousel = (props) => {
  const { userList, schemeList, listLoading, schemeCount } = useCarousel();

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: schemeCount - 1,
    slidesToScroll: 2,
  };
  if (listLoading == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data.." />
      </LoadContainer>
    );
  } else {
    return (
      <Slider
        style={{
          borderRadius: "10px",
        }}
        {...settings}
      >
        {schemeList.results.map((schemeData, key) => {
          return (
            <Cards
              bordered={false}
              key={schemeData.id}
              cover={
                <img
                  src={schemeData.SpecialSchemeImage}
                  width="240px"
                  height="200px"
                  style={{ padding: "0px" }}
                />
              }
            >
              <SubTitle title={schemeData.schemeName} />
              <Read
                type="primary"
                onClick={() => {
                  if (Token == null && UserGroup != "beneficiary") {
                    Modal.warning({
                      title: "Please login as beneficiary to continue",
                      onOk() {
                        window.location.replace("/login");
                      },
                    });
                  } else if (userList.UserPersonalInfo[0].isCompleted != true) {
                    Modal.warning({
                      title: "Please Completed your Personal Information",
                      onOk() {
                        window.location.replace("/personal-information");
                      },
                    });
                  } else if (
                    userList.CustomUserIncomeAndDomicileInfo[0].isCompleted !=
                    true
                  ) {
                    Modal.warning({
                      title: "Please Completed your Income Information",
                      onOk() {
                        window.location.replace(
                          "/income-and-domicile-information"
                        );
                      },
                    });
                  } else if (
                    userList.CustomUsereligibilityInfo[0].isCompleted != true
                  ) {
                    Modal.warning({
                      title: "Please Completed your Eligibility Information",
                      onOk() {
                        window.location.replace("/eligibility-information");
                      },
                    });
                  } else if (
                    userList.CustomUserQualificationInfo[0].isCompleted != true
                  ) {
                    Modal.warning({
                      title: "Please Completed your Qualification Information",
                      onOk() {
                        window.location.replace("/qualification-information");
                      },
                    });
                  } else if (
                    userList.CustomUserResidentialInfo[0].isCompleted != true
                  ) {
                    Modal.warning({
                      title: "Please Completed your Residential Information",
                      onOk() {
                        window.location.replace("/residential-information");
                      },
                    });
                  } else if (
                    userList.CustomUserBankInfo[0].isCompleted != true
                  ) {
                    Modal.warning({
                      title: "Please Completed your Bank Information",
                      onOk() {
                        window.location.replace("/bank-information");
                      },
                    });
                  } else if (
                    userList.CustomUserOtherInfo[0].isCompleted != true
                  ) {
                    Modal.warning({
                      title: "Please Completed Other Information",
                      onOk() {
                        window.location.replace("/other-information");
                      },
                    });
                  } else {
                    if (schemeData.id == 1) {
                      window.location.replace("/apply-mahogani-scheme");
                    } else if (schemeData.id == 2) {
                      window.location.replace("/apply-ews-scheme");
                    } else if (schemeData.id == 3) {
                      window.location.replace("/apply-housing-scheme");
                    } else if (schemeData.id == 4) {
                      window.location.replace(
                        "/plantation-beautification-scheme"
                      );
                    } else if (schemeData.id == 5) {
                      window.location.replace("e-rickshaw-scheme");
                    }
                  }
                }}
              >
                Apply
              </Read>
            </Cards>
          );
        })}
      </Slider>
    );
  }
  return (
    <div
      style={{
        borderRadius: "10px",
        display: "flex",
      }}
    >
      <Cards
        bordered={false}
        cover={
          <img
            src={Mahogani}
            width="240px"
            height="200px"
            style={{ padding: "0px" }}
          />
        }
      >
        <SubTitle title=" Mahogani Plantation" />
        <Read
          type="primary"
          onClick={() => {
            if (Token == null && UserGroup != "beneficiary") {
              Modal.warning({
                title: "Please login as beneficiary to continue",
                onOk() {
                  window.location.replace("/login");
                },
              });
            } else if (userList.UserPersonalInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Personal Information",
                onOk() {
                  window.location.replace("/personal-information");
                },
              });
            } else if (
              userList.CustomUserIncomeAndDomicileInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Income Information",
                onOk() {
                  window.location.replace("/income-and-domicile-information");
                },
              });
            } else if (
              userList.CustomUsereligibilityInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Eligibility Information",
                onOk() {
                  window.location.replace("/eligibility-information");
                },
              });
            } else if (
              userList.CustomUserQualificationInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Qualification Information",
                onOk() {
                  window.location.replace("/qualification-information");
                },
              });
            } else if (
              userList.CustomUserResidentialInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Residential Information",
                onOk() {
                  window.location.replace("/residential-information");
                },
              });
            } else if (userList.CustomUserBankInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Bank Information",
                onOk() {
                  window.location.replace("/bank-information");
                },
              });
            } else if (userList.CustomUserOtherInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed Other Information",
                onOk() {
                  window.location.replace("/other-information");
                },
              });
            } else {
              window.location.replace("/apply-mahogani-scheme");
            }
          }}
        >
          Apply
        </Read>
      </Cards>
      <Cards
        bordered={false}
        cover={
          <img
            src={Housing}
            width="100px"
            height="200px"
            style={{ padding: "0px" }}
          />
        }
      >
        <SubTitle title="Affordable Housing" />
        <Read
          type="primary"
          onClick={() => {
            if (Token == null && UserGroup != "beneficiary") {
              Modal.warning({
                title: "Please login as beneficiary to continue",
                onOk() {
                  window.location.replace("/login");
                },
              });
            } else if (userList.UserPersonalInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Personal Information",
                onOk() {
                  window.location.replace("/personal-information");
                },
              });
            } else if (
              userList.CustomUserIncomeAndDomicileInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Income Information",
                onOk() {
                  window.location.replace("/income-and-domicile-information");
                },
              });
            } else if (
              userList.CustomUsereligibilityInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Eligibility Information",
                onOk() {
                  window.location.replace("/eligibility-information");
                },
              });
            } else if (
              userList.CustomUserQualificationInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Qualification Information",
                onOk() {
                  window.location.replace("/qualification-information");
                },
              });
            } else if (
              userList.CustomUserResidentialInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Residential Information",
                onOk() {
                  window.location.replace("/residential-information");
                },
              });
            } else if (userList.CustomUserBankInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Bank Information",
                onOk() {
                  window.location.replace("/bank-information");
                },
              });
            } else if (userList.CustomUserOtherInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed Other Information",
                onOk() {
                  window.location.replace("/other-information");
                },
              });
            } else {
              window.location.replace("/apply-ews-scheme");
            }
          }}
        >
          Apply
        </Read>
      </Cards>
      <Cards
        bordered={false}
        cover={
          <img
            src={Construction}
            width="100px"
            height="200px"
            style={{ padding: "0px" }}
          />
        }
      >
        <SubTitle title="Construction Activities" />
        <Read
          type="primary"
          onClick={() => {
            if (Token == null && UserGroup != "beneficiary") {
              Modal.warning({
                title: "Please login as beneficiary to continue",
                onOk() {
                  window.location.replace("/login");
                },
              });
            } else if (userList.UserPersonalInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Personal Information",
                onOk() {
                  window.location.replace("/personal-information");
                },
              });
            } else if (
              userList.CustomUserIncomeAndDomicileInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Income Information",
                onOk() {
                  window.location.replace("/income-and-domicile-information");
                },
              });
            } else if (
              userList.CustomUsereligibilityInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Eligibility Information",
                onOk() {
                  window.location.replace("/eligibility-information");
                },
              });
            } else if (
              userList.CustomUserQualificationInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Qualification Information",
                onOk() {
                  window.location.replace("/qualification-information");
                },
              });
            } else if (
              userList.CustomUserResidentialInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Residential Information",
                onOk() {
                  window.location.replace("/residential-information");
                },
              });
            } else if (userList.CustomUserBankInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Bank Information",
                onOk() {
                  window.location.replace("/bank-information");
                },
              });
            } else if (userList.CustomUserOtherInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed Other Information",
                onOk() {
                  window.location.replace("/other-information");
                },
              });
            } else {
              window.location.replace("/apply-housing-scheme");
            }
          }}
        >
          Apply
        </Read>
      </Cards>
      <Cards
        bordered={false}
        cover={
          <img
            src={Landscape}
            width="100px"
            height="200px"
            style={{ padding: "0px" }}
          />
        }
      >
        <SubTitle title="Plantation, Beautification & Landscaping Works" />
        <Read
          type="primary"
          onClick={() => {
            if (Token == null && UserGroup != "beneficiary") {
              Modal.warning({
                title: "Please login as beneficiary to continue",
                onOk() {
                  window.location.replace("/login");
                },
              });
            } else if (userList.UserPersonalInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Personal Information",
                onOk() {
                  window.location.replace("/personal-information");
                },
              });
            } else if (
              userList.CustomUserIncomeAndDomicileInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Income Information",
                onOk() {
                  window.location.replace("/income-and-domicile-information");
                },
              });
            } else if (
              userList.CustomUsereligibilityInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Eligibility Information",
                onOk() {
                  window.location.replace("/eligibility-information");
                },
              });
            } else if (
              userList.CustomUserQualificationInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Qualification Information",
                onOk() {
                  window.location.replace("/qualification-information");
                },
              });
            } else if (
              userList.CustomUserResidentialInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Residential Information",
                onOk() {
                  window.location.replace("/residential-information");
                },
              });
            } else if (userList.CustomUserBankInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Bank Information",
                onOk() {
                  window.location.replace("/bank-information");
                },
              });
            } else if (userList.CustomUserOtherInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed Other Information",
                onOk() {
                  window.location.replace("/other-information");
                },
              });
            } else {
              window.location.replace("/plantation-beautification-scheme");
            }
          }}
        >
          Apply
        </Read>
      </Cards>
      <Cards
        bordered={false}
        cover={
          <img
            src={Landscape}
            width="100px"
            height="200px"
            style={{ padding: "0px" }}
          />
        }
      >
        <SubTitle title="Plantation, Beautification & Landscaping Works" />
        <Read
          type="primary"
          onClick={() => {
            if (Token == null && UserGroup != "beneficiary") {
              Modal.warning({
                title: "Please login as beneficiary to continue",
                onOk() {
                  window.location.replace("/login");
                },
              });
            } else if (userList.UserPersonalInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Personal Information",
                onOk() {
                  window.location.replace("/personal-information");
                },
              });
            } else if (
              userList.CustomUserIncomeAndDomicileInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Income Information",
                onOk() {
                  window.location.replace("/income-and-domicile-information");
                },
              });
            } else if (
              userList.CustomUsereligibilityInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Eligibility Information",
                onOk() {
                  window.location.replace("/eligibility-information");
                },
              });
            } else if (
              userList.CustomUserQualificationInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Qualification Information",
                onOk() {
                  window.location.replace("/qualification-information");
                },
              });
            } else if (
              userList.CustomUserResidentialInfo[0].isCompleted != true
            ) {
              Modal.warning({
                title: "Please Completed your Residential Information",
                onOk() {
                  window.location.replace("/residential-information");
                },
              });
            } else if (userList.CustomUserBankInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed your Bank Information",
                onOk() {
                  window.location.replace("/bank-information");
                },
              });
            } else if (userList.CustomUserOtherInfo[0].isCompleted != true) {
              Modal.warning({
                title: "Please Completed Other Information",
                onOk() {
                  window.location.replace("/other-information");
                },
              });
            } else {
              window.location.replace("/plantation-beautification-scheme");
            }
          }}
        >
          Apply
        </Read>
      </Cards>
    </div>
  );
};
export default NoticesCarousel;
