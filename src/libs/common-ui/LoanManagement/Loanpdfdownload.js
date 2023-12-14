import React from "react";
import moment from "moment";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { REACT_APP_BASE_URL } from "../../utils/urls";
// const style = { border: "0px solid #eceff1", padding: "8px 0 0 8px" };

Font.register({
  family: "Open Sans",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf",
    },
    {
      src: "https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-600.ttf",
      fontWeight: "normal",
    },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    padding: 10,
    paddingBottom: 30,
    // backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },

  h1: {
    // display: "table",
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
    // margin: "auto",
    textAlign: "left",
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    fontFamily: "Open Sans",
    // backgroundColor: "lightblue",
    color: "blue",
  },
  h2: {
    width: "100%",
    // margin: "auto",
    textAlign: "left",
    marginTop: 5,
    fontSize: 11,
    fontWeight: "bold",
    fontFamily: "Open Sans",
    // backgroundColor: "lightblue",
  },
  lable: {
    fontWeight: "normal",
    fontFamily: "Open Sans",
  },

  image: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px",
    width: "160px",
    // height: "auto",
    // unbreakable: { width: '100%'},
  },

  tableb: {
    display: "table",
    width: "100%",
    textAlign: "left",
    borderStyle: "solid",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0
  },
  tablebRow: {
    // margin: "auto",
    width: "100%",
    textAlign: "left",
    alignItems: "flex-start",
    flexDirection: "row",
    borderStyle: "solid",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  tablebCol2: {
    width: "50%",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  tablebCol3: {
    width: "33.33%",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  tablebCol7: {
    width: "6.5%",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  tablebCol8: {
    width: "54.5%",
    height: "100%",
    borderStyle: "solid",
    borderColor: "#E4E4E4",
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },

  table: {
    display: "table",
    width: "100%",
    textAlign: "left",
  },
  tableRow: {
    // margin: "auto",
    width: "100%",
    textAlign: "left",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  tableCol2: {
    width: "50%",
    borderStyle: "solid",
  },
  tableCol3: {
    width: "33.33%",
    borderStyle: "solid",
  },

  tableCell: {
    // margin: "auto",
    justifyContent: "stretch",
    textAlign: "left",
    marginTop: 5,
    fontSize: 10,
    color: "black",
    fontWeight: "bold",
    fontFamily: "Open Sans",
    wordWrap: "break-word",
    // maxWidth: "33.33333333%",
    display: "block",
    marginBlockStart: "1.33em",
    marginBlockEnd: "1.33em",
    marginInlineStart: "0px",
    marginInlineEnd: "0px",
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },

  /* Red border */
  hrNew1: {
    borderTop: "1px solid black",
  },
});

const LoanpdfdownloadA = ({ data }) => (
  <Document>
    <Page>
      <View>
        {data.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

const Loanpdfdownload = ({ userData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.h2}>{userData.LoanScheme}</Text>
          <Text style={styles.h5}>{userData.Applicationid}</Text>
          <Text style={styles.h1}>BASIC DETAILS :</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    FirstName:{" "}
                    <Text style={styles.lable}>{userData.FirstName}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    MiddleName:{" "}
                    <Text style={styles.lable}>{userData.MiddleName}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    LastName:{" "}
                    <Text style={styles.lable}>{userData.LastName}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Birth Date:{" "}
                    <Text style={styles.lable}>
                      {moment(userData.Birthdate).format("DD-MMM-YYYY")}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Age: <Text style={styles.lable}>{userData.Age}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Father's Full Name:{" "}
                    <Text style={styles.lable}>{userData.FatherName}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Husband Full Name:{" "}
                    <Text style={styles.lable}>{userData.HusbandFullName}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Basic Education:{" "}
                    <Text style={styles.lable}>{userData.Education}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}></View>
              </View>
            </View>
          </View>

          <Text style={styles.h1}>ADDRESS DETAILS :</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    City/Rural:{" "}
                    <Text style={styles.lable}>{userData.UrbanRural}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    District:{" "}
                    <Text style={styles.lable}>{userData.District}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Taluka: <Text style={styles.lable}>{userData.Taluka}</Text>
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Present Address:
                    <Text style={styles.lable}>
                      {userData.PresentAddline1} , {userData.PresentAddline2} ,{" "}
                      {userData.PresentAddline3} , {userData.PresentPincode}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Permanent Address:
                    <Text style={styles.lable}>
                      {userData.PermanentAddline1} ,{" "}
                      {userData.PermanentAddline2} ,{" "}
                      {userData.PermanentAddline3} , {userData.PermanentPincode}
                    </Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Proposed Business Name:
                    <Text style={styles.lable}>
                      {userData.ProposedBusinessName}
                    </Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Ration Card Type:
                    <Text style={styles.lable}>{userData.RationCardType}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Business Name:
                    <Text style={styles.lable}>{userData.BusinessName}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Address of Business Place:
                    <Text style={styles.lable}>{userData.BusinessAdd}</Text>
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Beneficiary Investment Component:
                    <Text style={styles.lable}>{userData.Investment}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Brief Information of Business:
                    <Text style={styles.lable}>{userData.BusinessInfo}</Text>
                  </Text>
                </View>
              </View>
              <View style={styles.tableCol3}>
                <View style={[styles.tableCell]}>
                  <Text>
                    Land Owned or Rented?:
                    <Text style={styles.lable}>{userData.OwnRented}</Text>
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {userData.LoanSchemeCode == "central-nsfdc-el-a" ||
          userData.LoanSchemeCode == "central-nsfdc-el-b" ||
          userData.LoanSchemeCode == "central-nskfdc-el-a" ||
          userData.LoanSchemeCode == "central-nskfdc-el-b" ? (
            <>
              <Text style={styles.h1}>EDUCATION DETAILS :</Text>
              <Text style={styles.h2}>PERSONAL DATA - </Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Caste:{" "}
                        <Text style={styles.lable}>{userData.Caste}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        SubCaste:{" "}
                        <Text style={styles.lable}>{userData.SubCaste}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Annual Family Income:{" "}
                        <Text style={styles.lable}>
                          {userData.AnnualFamilyIncome}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Contact No:{" "}
                        <Text style={styles.lable}>{userData.ContactNo}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Valid Passport No:{" "}
                        <Text style={styles.lable}>{userData.PassportNo}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Valid Passport Expiry Date:{" "}
                        <Text style={styles.lable}>
                          {userData.PassportExpDate}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.tableRow}>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Valid Visa/Permit No:{" "}
                        <Text style={styles.lable}>
                          {userData.VisaPermitNo}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Valid Visa/Permit Expiry Date:{" "}
                        <Text style={styles.lable}>{userData.VisaExpDate}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}></View>
                  </View>
                </View>

                <Text> </Text>
                <View style={styles.tableb}>
                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Examination</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Institution/University</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Year of passing</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Percentage of marks/grade</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>SSC</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.SSLCInstitution}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.SSLCYearofpassing}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.SSLCPercentageofmarks}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>10 + 2</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.HSCInstitution}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.HSCYearofpassing}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.HSCPercentageofmarks}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Graduation</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.GraduationInstitution}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.GraduationYearofpassing}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.GraduationPercentageofmarks}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>P.G.</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.PGInstitution}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.PGYearofpassing}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.PGPercentageofmarks}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Any Other (please specify)</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.OtherInstitution}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.OtherYearofpassing}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          <Text style={styles.lable}>
                            {userData.OtherPercentageofmarks}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <Text> </Text>
                <View style={styles.hrNew1}></View>
                <Text style={styles.h2}>PARTICULARS OF PARENTS/GUARDIAN :</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Full Name:{" "}
                          <Text style={styles.lable}>
                            {userData.ParentsFullName}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Age:{" "}
                          <Text style={styles.lable}>
                            {userData.ParentsAge}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Phone Number Res:
                          <Text style={styles.lable}>
                            {userData.ParentsResidencePhone}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Phone Number Office:
                          <Text style={styles.lable}>
                            {userData.ParentsPlaceofworkPhone}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Permanent Address: Residence
                          <Text style={styles.lable}>
                            {userData.ParentsResidenceAddress}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Address: Place of work
                          <Text style={styles.lable}>
                            {userData.ParentsPlaceofworkAddress}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.hrNew1}></View>
                <Text style={styles.h2}>COURSE DETAILS :</Text>
                <View style={styles.table}>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Fulltime Professional/Technical Course{" "}
                          <Text style={styles.lable}>
                            {userData.CourseName}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Details of placement to be provided by the Educational
                          Institute, if any:{" "}
                          <Text style={styles.lable}>
                            {userData.DetailsOfPlacement}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          DataContainerlege/Institute/University:
                          <Text style={styles.lable}>
                            {userData.CourseDataContainerlegeName}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Duration of the Course:
                          <Text style={styles.lable}>
                            {userData.CourseDuration}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.tableRow}>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Entrance exam, if any, qualified
                          <Text style={styles.lable}>
                            {userData.EntranceExam}
                          </Text>
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tableCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Country
                          <Text style={styles.lable}>
                            {userData.CourseCountry}
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.hrNew1}></View>
                <Text style={styles.h2}>TOTAL STUDY EXPENSES:</Text>
                <View style={styles.tableb}>
                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>Year wise / Semester wise</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>1</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>2</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>3</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>4</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>5</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>6</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>Total</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>Admission Fees & Tuition Fee</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtAdmissionFeesT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Books, Stationery and other instruments required for
                          the course
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtinstrumentsT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>Examination Fee</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtExaminationFeeT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>Boarding and Lodging Expenses</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtBoardingT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Insurance premium for policy for insuring loanees
                          against loan in case of death or permanent disability
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtInsurancepremiumT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Travel Expenses/Passage Money for studying abroad.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtTravelExpensesT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>Caution Money, Development Fund etc.</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.ExpnAmtCautionMoneyT}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol8}>
                      <View style={[styles.tableCell]}>
                        <Text>Total</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesA +
                            userData.ExpnAmtinstrumentsA +
                            userData.ExpnAmtExaminationFeeA +
                            userData.ExpnAmtBoardingA +
                            userData.ExpnAmtInsurancepremiumA +
                            userData.ExpnAmtTravelExpensesA +
                            userData.ExpnAmtCautionMoneyA}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesB +
                            userData.ExpnAmtinstrumentsB +
                            userData.ExpnAmtExaminationFeeB +
                            userData.ExpnAmtBoardingB +
                            userData.ExpnAmtInsurancepremiumB +
                            userData.ExpnAmtTravelExpensesB +
                            userData.ExpnAmtCautionMoneyB}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesC +
                            userData.ExpnAmtinstrumentsC +
                            userData.ExpnAmtExaminationFeeC +
                            userData.ExpnAmtBoardingC +
                            userData.ExpnAmtInsurancepremiumC +
                            userData.ExpnAmtTravelExpensesC +
                            userData.ExpnAmtCautionMoneyC}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesD +
                            userData.ExpnAmtinstrumentsD +
                            userData.ExpnAmtExaminationFeeD +
                            userData.ExpnAmtBoardingD +
                            userData.ExpnAmtInsurancepremiumD +
                            userData.ExpnAmtTravelExpensesD +
                            userData.ExpnAmtCautionMoneyD}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesE +
                            userData.ExpnAmtinstrumentsE +
                            userData.ExpnAmtExaminationFeeE +
                            userData.ExpnAmtBoardingE +
                            userData.ExpnAmtInsurancepremiumE +
                            userData.ExpnAmtTravelExpensesE +
                            userData.ExpnAmtCautionMoneyE}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesF +
                            userData.ExpnAmtinstrumentsF +
                            userData.ExpnAmtExaminationFeeF +
                            userData.ExpnAmtBoardingF +
                            userData.ExpnAmtInsurancepremiumF +
                            userData.ExpnAmtTravelExpensesF +
                            userData.ExpnAmtCautionMoneyF}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol7}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          {userData.ExpnAmtAdmissionFeesA +
                            userData.ExpnAmtinstrumentsA +
                            userData.ExpnAmtExaminationFeeA +
                            userData.ExpnAmtBoardingA +
                            userData.ExpnAmtInsurancepremiumA +
                            userData.ExpnAmtTravelExpensesA +
                            userData.ExpnAmtCautionMoneyA +
                            userData.ExpnAmtAdmissionFeesB +
                            userData.ExpnAmtinstrumentsB +
                            userData.ExpnAmtExaminationFeeB +
                            userData.ExpnAmtBoardingB +
                            userData.ExpnAmtInsurancepremiumB +
                            userData.ExpnAmtTravelExpensesB +
                            userData.ExpnAmtCautionMoneyB +
                            userData.ExpnAmtAdmissionFeesC +
                            userData.ExpnAmtinstrumentsC +
                            userData.ExpnAmtExaminationFeeC +
                            userData.ExpnAmtBoardingC +
                            userData.ExpnAmtInsurancepremiumC +
                            userData.ExpnAmtTravelExpensesC +
                            userData.ExpnAmtCautionMoneyC +
                            userData.ExpnAmtAdmissionFeesD +
                            userData.ExpnAmtinstrumentsD +
                            userData.ExpnAmtExaminationFeeD +
                            userData.ExpnAmtBoardingD +
                            userData.ExpnAmtInsurancepremiumD +
                            userData.ExpnAmtTravelExpensesD +
                            userData.ExpnAmtCautionMoneyD +
                            userData.ExpnAmtAdmissionFeesE +
                            userData.ExpnAmtinstrumentsE +
                            userData.ExpnAmtExaminationFeeE +
                            userData.ExpnAmtBoardingE +
                            userData.ExpnAmtInsurancepremiumE +
                            userData.ExpnAmtTravelExpensesE +
                            userData.ExpnAmtCautionMoneyE +
                            userData.ExpnAmtAdmissionFeesF +
                            userData.ExpnAmtinstrumentsF +
                            userData.ExpnAmtExaminationFeeF +
                            userData.ExpnAmtBoardingF +
                            userData.ExpnAmtInsurancepremiumF +
                            userData.ExpnAmtTravelExpensesF +
                            userData.ExpnAmtCautionMoneyF}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.hrNew1}></View>
                <Text style={styles.h2}>MEANS OF FINANCE:</Text>
                <View style={styles.tableb}>
                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text></Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Amount</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Percentage %</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Promoters Contribution</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.AmtPromoters}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.PerPromoters}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          Loan from{" "}
                          {userData.LoanSchemeCode == "central-nsfdc-el-a" ||
                          userData.LoanSchemeCode == "central-nsfdc-el-b"
                            ? "NSFDC"
                            : "NSKFDC"}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>{userData.LoanAmount}</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.PerLoanNSFDC}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Loan from State Channelising Agency</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.AmtLoanStateAgency}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.PerLoanStateAgency}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Subsidy</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>{userData.AmtSubsidy}</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>{userData.PerSubsidy}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>Total</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text>{userData.AmtTotal}</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol3}>
                      <View style={[styles.tableCell]}>
                        <Text></Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.hrNew1}></View>
                <Text style={styles.h2}>OTHER DETAILS::</Text>
                <View style={styles.tableb}>
                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>
                          State in brief how the completion of the course is
                          going to help for improving your prospects of earning
                          your livelihood.
                        </Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.OtherDetails}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>Expected income per month</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.Expectedincomepm}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>Anticipated monthly expenses</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.Anticipatedmonthlyexpn}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.tablebRow}>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text>Amount available for Repayment of Loan</Text>
                      </View>
                    </View>
                    <View style={styles.tablebCol2}>
                      <View style={[styles.tableCell]}>
                        <Text style={styles.lable}>
                          {userData.Amtavailableforrepayment}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.h1}>BUSINESS DETAILS :</Text>
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Business Name:{" "}
                        <Text style={styles.lable}>
                          {userData.BusinessName}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Beneficiary Investment Component:{" "}
                        <Text style={styles.lable}>{userData.Investment}</Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Required Loan Amount:{" "}
                        <Text style={styles.lable}>{userData.LoanAmount}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        Brief Information of Business:{" "}
                        <Text style={styles.lable}>
                          {userData.BusinessInfo}
                        </Text>
                      </Text>
                    </View>
                  </View>
                  <View style={styles.tableCol3}>
                    <View style={[styles.tableCell]}>
                      <Text>
                        The Address of the place of Business:{" "}
                        <Text style={styles.lable}>{userData.BusinessAdd}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}

          <Text> </Text>
          <View style={styles.hrNew1}></View>
          <View style={styles.tableb}>
            <View style={styles.tablebRow}>
              <View style={styles.tablebCol2}>
                <View style={[styles.tableCell]}>
                  <Text>Photo</Text>
                  {userData.Photopath ? (
                    <Image
                      style={styles.image}
                      src={REACT_APP_BASE_URL + userData.Photopath}
                      fixed
                    />
                  ) : (
                    ""
                  )}
                </View>
              </View>
              <View style={styles.tablebCol2}>
                <View style={[styles.tableCell]}>
                  <Text>Signature</Text>
                  {userData.Signaturepath ? (
                    <Image
                      style={styles.image}
                      src={REACT_APP_BASE_URL + userData.Signaturepath}
                      fixed
                    />
                  ) : (
                    ""
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.section}> */}
        {/* <Text>Section #2</Text> */}
        {/* {data.map((item, index) => (
            <Text key={index}>{item}</Text>
          ))} */}
        {/* </View> */}
      </Page>
    </Document>
  );
};

export default Loanpdfdownload;
