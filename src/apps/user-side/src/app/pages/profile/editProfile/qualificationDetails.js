import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  DatePicker,
  Row,
  Col,
  message,
  Spin,
  Select,
  Modal,
} from "antd";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";
import { InputFields } from "./personalinfo";
import {
  DatePick,
  LoadContainer,
  FormItem,
  Completed,
  Incomplete,
} from "./style";
import stateData from "../../../../../../../data/states.json";
import data from "../../../../../../../data/dtdata.json";
import { Token } from "../../../../../../../libs/utils/sessionStorage";
import { REACT_APP_BASE_URL } from "../../../../../../../libs/utils/urls";
import { saveAs } from "file-saver";
import ImageViewer from "react-simple-image-viewer";

const { Option } = Select;

const QualificationDetails = (props) => {
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [talukaKey, setTalukaKey] = useState(0);
  const [selectVisible, setSelectVisible] = useState(true);
  const [state, setState] = useState("");
  const [qualificationLevel, setQualificationLevel] = useState("");
  const [marksheets, setMarksheets] = useState(null);
  const [resume, setResume] = useState(null);
  const [levelValue, setLevelValue] = useState(false);
  const [stream, setStream] = useState();
  const [result, setResult] = useState();
  const [wasAnyGap, setWasAnyGap] = useState();
  const handleQualificationLevel = (e) => {
    setQualificationLevel(e.target.value);
  };
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleMarksheets = (e) => {
    setMarksheets(e.target.files[0]);
  };
  const handleResume = (e) => {
    setResume(e.target.files[0]);
  };

  const formData = useRef();
  const handleState = (e) => {
    setState(e.target.value);
  };

  const disabledDate = (current) => {
    return current && current > moment().endOf("day");
  };

  const [qualificationPage, setQualificationPage] = useState(true);
  const [infoLoading, setInfoLoading] = useState(false);

  const [qualificationDetails, setQualificationDetails] = useState();

  useEffect(() => {
    const userResponseFunc = async () => {
      const response = await axios({
        method: "get",
        url: `${REACT_APP_BASE_URL}/applicant/ApplicantDetailView`,
        headers: { Authorization: `token ${Token}` },
      });
      setQualificationDetails(response.data.CustomUserQualificationInfo[0]);
      setDistrict(
        response.data.CustomUserQualificationInfo[0].instituteDistrict
      );
      setState(response.data.CustomUserQualificationInfo[0].instituteState);
      setTaluka(response.data.CustomUserQualificationInfo[0].instituteTaluka);
      setQualificationLevel(
        response.data.CustomUserQualificationInfo[0].qualificationLevel
      );
      setQualificationPage(false);
      setMarksheets(response.data.CustomUserQualificationInfo[0].marksheets);
      setResume(response.data.CustomUserQualificationInfo[0].resume);
      setResult(response.data.CustomUserQualificationInfo[0].result);
      setWasAnyGap(response.data.CustomUserQualificationInfo[0].wasAnyGap);
      setStream(response.data.CustomUserQualificationInfo[0].stream);
    };
    userResponseFunc();
  }, []);

  const [isMarksheetOpen, setIsMarksheetOpen] = useState(false);
  const openMarksheetViewer = useCallback(() => {
    setIsMarksheetOpen(true);
  }, []);
  const closeMakrsheetViewer = () => {
    setIsMarksheetOpen(false);
  };

  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const openResumeViewer = useCallback(() => {
    setIsResumeOpen(true);
  }, []);
  const closeResumeViewer = useCallback(() => {
    setIsResumeOpen(false);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const {
      completed,
      collegeSchoolName,
      course,
      boardUniversity,
      mode,
      admissionYear,
      passingYear,
      percentage,
      attempts,
      howMuchYear,
      instituteState,
      instituteDistrict,
      instituteTaluka,
    } = formData.current;

    const qualificationData = new FormData();

    if (qualificationLevel == "" || qualificationLevel == null) {
      message.warning("Qualification Level is empty");
    }
    if (qualificationLevel == "Upto 8th std (unskilled)") {
      if (completed.value == "") {
        message.warning("Select qualification status");
      } else if (collegeSchoolName.value == "") {
        message.warning("College School Name is empty");
      } else if (mode.value == "") {
        message.warning("Please select mode of exam");
      } else if (admissionYear.value == "") {
        message.warning("please select your admission year");
      } else if (passingYear.value == "") {
        message.warning("Please select your passing year");
      } else if (result == null) {
        message.warning("Please enter your result");
      } else if (percentage.value == "") {
        message.warning("Please enter your percentage");
      } else if (attempts.value == "") {
        message.warning("Please enter number of attempts");
        // } else if (marksheets == null) {
        //   message.warning("Please upload your Marsheets");
      } else if (wasAnyGap == null) {
        message.warning("Please specify if there is any gap");
      } else if (wasAnyGap == true) {
        if (howMuchYear.value == "") {
          message.warning("Please specify the years if gap");
          // } else if (resume == null) {
          //   message.warning("Please upload your Resume");
        } else if (state == null) {
          message.warning("Please select your Institute state");
        } else {
          qualificationData.append("qualificationLevel", qualificationLevel);
          qualificationData.append("completed", completed.value);
          qualificationData.append(
            "collegeSchoolName",
            collegeSchoolName.value
          );
          qualificationData.append("mode", mode.value);
          qualificationData.append("admissionYear", admissionYear.value);
          qualificationData.append("passingYear", passingYear.value);
          qualificationData.append("result", result);
          qualificationData.append("percentage", percentage.value);
          qualificationData.append("attempts", attempts.value);
          if (marksheets == null || typeof marksheets == "object") {
            qualificationData.append("marksheets", marksheets);
          }
          qualificationData.append("wasAnyGap", wasAnyGap);
          qualificationData.append("howMuchYear", howMuchYear.value);
          if (resume != null && typeof resume == "object") {
            qualificationData.append("resume", resume);
          }
          qualificationData.append("instituteState", state);
          qualificationData.append("isCompleted", true);
          axios({
            method: "patch",
            url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
            data: qualificationData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${Token}`,
            },
          }).then((response) => {
            if (response.status == 200 && response.data.status == "success") {
              setInfoLoading(true);
              setTimeout(() => {
                setInfoLoading(false);
                Modal.success({ title: response.data.message });
              }, 1000);
            } else if (
              response.status == 200 &&
              response.data.status == "error"
            ) {
              Modal.error({ title: response.data.message });
            }

            setTimeout(() => {
              window.location.replace("/residential-information");
            }, 1500);
          });
        }
      } else if (wasAnyGap == false) {
        if (resume == null) {
          message.warning("Please upload your Resume");
        } else if (state == null) {
          message.warning("Please select your Institute state");
        } else {
          qualificationData.append("qualificationLevel", qualificationLevel);
          qualificationData.append("completed", completed.value);
          qualificationData.append(
            "collegeSchoolName",
            collegeSchoolName.value
          );
          qualificationData.append("mode", mode.value);
          qualificationData.append("admissionYear", admissionYear.value);
          qualificationData.append("passingYear", passingYear.value);
          qualificationData.append("result", result);
          qualificationData.append("percentage", percentage.value);
          qualificationData.append("attempts", attempts.value);
          if (marksheets == null || typeof marksheets == "object") {
            qualificationData.append("marksheets", marksheets);
          }
          qualificationData.append("wasAnyGap", wasAnyGap);
          if (resume != null && typeof resume == "object") {
            qualificationData.append("resume", resume);
          }
          qualificationData.append("instituteState", state);
          qualificationData.append("isCompleted", true);
          axios({
            method: "patch",
            url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
            data: qualificationData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${Token}`,
            },
          }).then((response) => {
            if (response.status == 200 && response.data.status == "success") {
              setInfoLoading(true);
              setTimeout(() => {
                setInfoLoading(false);
                Modal.success({ title: response.data.message });
              }, 1000);
            } else if (
              response.status == 200 &&
              response.data.status == "error"
            ) {
              Modal.error({ title: response.data.message });
            }

            setTimeout(() => {
              window.location.replace("/residential-information");
            }, 1500);
          });
        }
      }
    } else if (
      qualificationLevel != "Upto 8th std (unskilled)" &&
      qualificationLevel != null
    ) {
      if (stream == null) {
        message.warning("Stream is empty");
      } else if (completed.value == "") {
        message.warning("Select qualification status");
      } else if (collegeSchoolName.value == "") {
        message.warning("College School Name is empty");
      } else if (course.value == "") {
        message.warning("Course is empty");
      } else if (boardUniversity.value == "") {
        message.warning("Board /  University is empty");
      } else if (mode.value == "") {
        message.warning("Please select mode of exam");
      } else if (admissionYear.value == "") {
        message.warning("please select your admission year");
      } else if (passingYear.value == "") {
        message.warning("Please select your passing year");
      } else if (result == null) {
        message.warning("Please enter your result");
      } else if (percentage.value == "") {
        message.warning("Please enter your percentage");
      } else if (attempts.value == "") {
        message.warning("Please enter number of attempts");
      } else if (marksheets == null) {
        message.warning("Please upload your Marsheets");
      } else if (wasAnyGap == null) {
        message.warning("Please specify if there is any gap");
      } else if (wasAnyGap == true) {
        if (howMuchYear.value == "") {
          message.warning("Please specify the years if gap");
          // } else if (resume == null) {
          //   message.warning("Please upload your Resume");
        } else if (state == null) {
          message.warning("Please select your Institute state");
        } else {
          qualificationData.append("qualificationLevel", qualificationLevel);
          qualificationData.append("stream", stream);
          qualificationData.append("completed", completed.value);
          qualificationData.append(
            "collegeSchoolName",
            collegeSchoolName.value
          );
          qualificationData.append("course", course.value);
          qualificationData.append("boardUniversity", boardUniversity.value);
          qualificationData.append("mode", mode.value);
          qualificationData.append("admissionYear", admissionYear.value);
          qualificationData.append("passingYear", passingYear.value);
          qualificationData.append("result", result);
          qualificationData.append("percentage", percentage.value);
          qualificationData.append("attempts", attempts.value);
          if (marksheets == null || typeof marksheets == "object") {
            qualificationData.append("marksheets", marksheets);
          }
          qualificationData.append("wasAnyGap", wasAnyGap);
          qualificationData.append("howMuchYear", howMuchYear.value);
          if (resume != null && typeof resume == "object") {
            qualificationData.append("resume", resume);
          }
          qualificationData.append("instituteState", state);
          qualificationData.append("isCompleted", true);
          axios({
            method: "patch",
            url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
            data: qualificationData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${Token}`,
            },
          }).then((response) => {
            if (response.status == 200 && response.data.status == "success") {
              setInfoLoading(true);
              setTimeout(() => {
                setInfoLoading(false);
                Modal.success({ title: response.data.message });
              }, 1000);
            } else if (
              response.status == 200 &&
              response.data.status == "error"
            ) {
              Modal.error({ title: response.data.message });
            }

            setTimeout(() => {
              window.location.replace("/residential-information");
            }, 1500);
          });
        }
      } else if (wasAnyGap == false) {
        // if (resume == null) {
        //   message.warning("Please upload your Resume");
        // } else
        if (state == null) {
          message.warning("Please select your Institute state");
        } else {
          qualificationData.append("qualificationLevel", qualificationLevel);
          qualificationData.append("stream", stream);
          qualificationData.append("completed", completed.value);
          qualificationData.append(
            "collegeSchoolName",
            collegeSchoolName.value
          );
          qualificationData.append("course", course.value);
          qualificationData.append("boardUniversity", boardUniversity.value);
          qualificationData.append("mode", mode.value);
          qualificationData.append("admissionYear", admissionYear.value);
          qualificationData.append("passingYear", passingYear.value);
          qualificationData.append("result", result);
          qualificationData.append("percentage", percentage.value);
          qualificationData.append("attempts", attempts.value);
          if (marksheets == null || typeof marksheets == "object") {
            qualificationData.append("marksheets", marksheets);
          }
          qualificationData.append("wasAnyGap", wasAnyGap);
          if (resume != null && typeof resume == "object") {
            qualificationData.append("resume", resume);
          }
          qualificationData.append("instituteState", state);
          qualificationData.append("isCompleted", true);
          axios({
            method: "patch",
            url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
            data: qualificationData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `token ${Token}`,
            },
          }).then((response) => {
            if (response.status == 200 && response.data.status == "success") {
              setInfoLoading(true);
              setTimeout(() => {
                setInfoLoading(false);
                Modal.success({ title: response.data.message });
              }, 1000);
            } else if (
              response.status == 200 &&
              response.data.status == "error"
            ) {
              Modal.error({ title: response.data.message });
            }

            setTimeout(() => {
              window.location.replace("/residential-information");
            }, 1500);
          });
        }
      }
    }

    // //   if (wasAnyGap == true) {
    // //     if (howMuchYear.value == "") {
    // //       message.warning("Please enter the years of gap");
    // //     } else if (resume == null) {
    // //       message.warning("Please upload your Resume");
    // //     } else if (state == null) {
    // //       message.warning("Please select your Institute state");
    // //     } else {
    // //       qualificationData.append("qualificationLevel", qualificationLevel);
    // //       qualificationData.append("completed", completed.value);
    // //       qualificationData.append(
    // //         "collegeSchoolName",
    // //         collegeSchoolName.value
    // //       );
    // //       qualificationData.append("mode", mode.value);
    // //       qualificationData.append("admissionYear", admissionYear.value);
    // //       qualificationData.append("passingYear", passingYear.value);
    // //       qualificationData.append("result", result);
    // //       qualificationData.append("percentage", percentage.value);
    // //       qualificationData.append("attempts", attempts.value);
    // //       qualificationData.append("wasAnyGap", wasAnyGap);
    // //       qualificationData.append("howMuchYear", howMuchYear.value);
    // //       qualificationData.append("instituteState", state);
    // //       qualificationData.append("isCompleted", true);
    // //       if (marksheets == null || typeof marksheets == "object") {
    // //         qualificationData.append("marksheets", marksheets);
    // //       } else if (resume == null || typeof resume == "object") {
    // //         qualificationData.append("resume", resume);
    // //       }
    // //       axios({
    // //         method: "patch",
    // //         url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
    // //         data: qualificationData,
    // //         headers: {
    // //           "Content-Type": "multipart/form-data",
    // //           Authorization: `token ${Token}`,
    // //         },
    // //       }).then((response) => {
    // //         if (response.status == 200 && response.data.status == "success") {
    // //           setInfoLoading(true);
    // //           setTimeout(() => {
    // //             setInfoLoading(false);
    // //             Modal.success({ title: response.data.message });
    // //           }, 1000);
    // //         } else if (
    // //           response.status == 200 &&
    // //           response.data.status == "error"
    // //         ) {
    // //           Modal.error({ title: response.data.message });
    // //         }

    // //         setTimeout(() => {
    // //           window.location.replace("/residential-information");
    // //         }, 1500);
    // //       });
    // //     }
    // //   } else {
    // //     if (resume == null) {
    // //       message.warning("Please upload your Resume");
    // //     } else if (state == null) {
    // //       message.warning("Please select your Institute state");
    // //     } else {
    // //       qualificationData.append("qualificationLevel", qualificationLevel);
    // //       qualificationData.append("completed", completed.value);
    // //       qualificationData.append(
    // //         "collegeSchoolName",
    // //         collegeSchoolName.value
    // //       );
    // //       qualificationData.append("mode", mode.value);
    // //       qualificationData.append("admissionYear", admissionYear.value);
    // //       qualificationData.append("passingYear", passingYear.value);
    // //       qualificationData.append("result", result);
    // //       qualificationData.append("percentage", percentage.value);
    // //       qualificationData.append("attempts", attempts.value);
    // //       qualificationData.append("wasAnyGap", wasAnyGap);
    // //       qualificationData.append("instituteState", state);
    // //       qualificationData.append("isCompleted", true);
    // //       if (marksheets == null || typeof marksheets == "object") {
    // //         qualificationData.append("marksheets", marksheets);
    // //       } else if (resume == null || typeof resume == "object") {
    // //         qualificationData.append("resume", resume);
    // //       }
    // //       axios({
    // //         method: "patch",
    // //         url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
    // //         data: qualificationData,
    // //         headers: {
    // //           "Content-Type": "multipart/form-data",
    // //           Authorization: `token ${Token}`,
    // //         },
    // //       }).then((response) => {
    // //         if (response.status == 200 && response.data.status == "success") {
    // //           setInfoLoading(true);
    // //           setTimeout(() => {
    // //             setInfoLoading(false);
    // //             Modal.success({ title: response.data.message });
    // //           }, 1000);
    // //         } else if (
    // //           response.status == 200 &&
    // //           response.data.status == "error"
    // //         ) {
    // //           Modal.error({ title: response.data.message });
    // //         }
    // //         setTimeout(() => {
    // //           window.location.replace("/residential-information");
    // //         }, 1500);
    // //       });
    // //     }
    // //   }
    // // } else {
    // //   if (stream == "") {
    // //     message.warning("Stream is Empty");
    // //   } else if (completed.value == "") {
    // //     message.warning("Select qualification status");
    // //   } else if (collegeSchoolName.value == "") {
    // //     message.warning("College School Name is empty");
    // //   } else if (course.value == "") {
    // //     message.warning("Course is empty");
    // //   } else if (boardUniversity.value == "") {
    // //     message.warning("Please enter your board university");
    // //   } else if (mode.value == "") {
    // //     message.warning("Please select mode of exam");
    // //   } else if (admissionYear.value == "") {
    // //     message.warning("please select your admission year");
    // //   } else if (passingYear.value == "") {
    // //     message.warning("Please select your passing year");
    // //   } else if (result == "") {
    // //     message.warning("Please enter your result");
    // //   } else if (percentage.value == "") {
    // //     message.warning("Please enter your percentage");
    // //   } else if (attempts.value == "") {
    // //     message.warning("Please enter number of attempts");
    // //     // } else if (wasAnyGap == "" || wasAnyGap == null) {
    // //     //   message.warning("Please specify if there is any gap");
    // //   }
    // //   if (wasAnyGap == true) {
    // //     if (howMuchYear.value == "") {
    // //       message.warning("Please enter the years of gap");
    // //     } else if (resume == null) {
    // //       message.warning("Please upload your Resume");
    // //     } else if (state == null) {
    // //       message.warning("Please select your Institute state");
    // //     } else {
    // //       qualificationData.append("qualificationLevel", qualificationLevel);
    // //       qualificationData.append("stream", stream);
    // //       qualificationData.append("completed", completed.value);
    // //       qualificationData.append(
    // //         "collegeSchoolName",
    // //         collegeSchoolName.value
    // //       );
    // //       qualificationData.append("course", course.value);
    // //       qualificationData.append("boardUniversity", boardUniversity.value);
    // //       qualificationData.append("mode", mode.value);
    // //       qualificationData.append("admissionYear", admissionYear.value);
    // //       qualificationData.append("passingYear", passingYear.value);
    // //       qualificationData.append("result", result);
    // //       qualificationData.append("percentage", percentage.value);
    // //       qualificationData.append("attempts", attempts.value);
    // //       qualificationData.append("wasAnyGap", wasAnyGap);
    // //       qualificationData.append("howMuchYear", howMuchYear.value);
    // //       qualificationData.append("instituteState", state);
    // //       qualificationData.append("isCompleted", true);
    // //       if (marksheets == null || typeof marksheets == "object") {
    // //         qualificationData.append("marksheets", marksheets);
    // //       } else if (resume == null || typeof resume == "object") {
    // //         qualificationData.append("resume", resume);
    // //       }
    // //       axios({
    // //         method: "patch",
    // //         url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
    // //         data: qualificationData,
    // //         headers: {
    // //           "Content-Type": "multipart/form-data",
    // //           Authorization: `token ${Token}`,
    // //         },
    // //       }).then((response) => {
    // //         if (response.status == 200 && response.data.status == "success") {
    // //           setInfoLoading(true);
    // //           setTimeout(() => {
    // //             setInfoLoading(false);
    // //             Modal.success({ title: response.data.message });
    // //           }, 1000);
    // //         } else if (
    // //           response.status == 200 &&
    // //           response.data.status == "error"
    // //         ) {
    // //           Modal.error({ title: response.data.message });
    // //         }

    // //         setTimeout(() => {
    // //           window.location.replace("/residential-information");
    // //         }, 1500);
    // //       });
    // //     }
    // //   } else {
    // //     if (resume == null) {
    // //       message.warning("Please upload your Resume");
    // //     } else if (state == null) {
    // //       message.warning("Please select your Institute state");
    // //     } else {
    // //       qualificationData.append("qualificationLevel", qualificationLevel);
    // //       qualificationData.append("stream", stream);
    // //       qualificationData.append("completed", completed.value);
    // //       qualificationData.append(
    // //         "collegeSchoolName",
    // //         collegeSchoolName.value
    // //       );
    // //       qualificationData.append("course", course.value);
    // //       qualificationData.append("boardUniversity", boardUniversity.value);
    // //       qualificationData.append("mode", mode.value);
    // //       qualificationData.append("admissionYear", admissionYear.value);
    // //       qualificationData.append("passingYear", passingYear.value);
    // //       qualificationData.append("result", result);
    // //       qualificationData.append("percentage", percentage.value);
    // //       qualificationData.append("attempts", attempts.value);
    // //       qualificationData.append("wasAnyGap", wasAnyGap);
    // //       qualificationData.append("instituteState", state);
    // //       qualificationData.append("isCompleted", true);
    // //       if (marksheets == null || typeof marksheets == "object") {
    // //         qualificationData.append("marksheets", marksheets);
    // //       } else if (resume == null || typeof resume == "object") {
    // //         qualificationData.append("resume", resume);
    // //       }
    // //       axios({
    // //         method: "patch",
    // //         url: `${REACT_APP_BASE_URL}/applicant/UpdateQualificationInfo`,
    // //         data: qualificationData,
    // //         headers: {
    // //           "Content-Type": "multipart/form-data",
    // //           Authorization: `token ${Token}`,
    // //         },
    // //       }).then((response) => {
    // //         if (response.status == 200 && response.data.status == "success") {
    // //           setInfoLoading(true);
    // //           setTimeout(() => {
    // //             setInfoLoading(false);
    // //             Modal.success({ title: response.data.message });
    // //           }, 1000);
    // //         } else if (
    // //           response.status == 200 &&
    // //           response.data.status == "error"
    // //         ) {
    // //           Modal.error({ title: response.data.message });
    // //         }
    // //         setTimeout(() => {
    // //           window.location.replace("/residential-information");
    // //         }, 1500);
    // //       });
    // //     }
    //   }
  };
  if (qualificationPage == true) {
    return (
      <LoadContainer>
        <Spin tip="Loading data" />
      </LoadContainer>
    );
  } else {
    return (
      <Spin spinning={infoLoading} tip="Saving Data">
        <MainContainer>
          {isMarksheetOpen && (
            <ImageViewer
              src={[REACT_APP_BASE_URL + marksheets]}
              onClose={closeMakrsheetViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}
          {isResumeOpen && (
            <ImageViewer
              src={[REACT_APP_BASE_URL + resume]}
              onClose={closeResumeViewer}
              backgroundStyle={{
                backgroundColor: "rgba(0,0,0,0.9)",
              }}
            />
          )}
          {/* {qualificationDetails.isCompleted == true ? (
            <Completed>Completed</Completed>
          ) : (
            <Incomplete>Incomplete</Incomplete>
          )} */}
          <form ref={formData}>
            <Row>
              <Col span={8}>
                <FormItem
                  label="Qualification Level"
                  name="qualificationLevel"
                  required
                >
                  <Select
                    showSearch
                    placholder="Select Qualification Level"
                    style={{
                      width: 250,
                    }}
                    onChange={(v) => {
                      setQualificationLevel(v);
                    }}
                    value={qualificationLevel}
                    name="qualificationLevel"
                    defaultValue={qualificationDetails.qualificationLevel}
                  >
                    <Option value="Upto 8th std (unskilled)">
                      Upto 8th std (unskilled)
                    </Option>
                    <Option value="8th - undergraduate/ITI (semi-skilled)">
                      8th - undergraduate/ITI (semi-skilled)
                    </Option>
                    <Option
                      value="Diploma, Techincal Degree, Architecture, R&D
                      (skilled-tech)"
                    >
                      Diploma, Technical Degree, Architecture, R&D
                      (skilled-tech)
                    </Option>
                    <Option
                      value="Medical, Humanity, Social Science, Political Studies
                      (skilled-specialized)"
                    >
                      Medical, Humanity, Social Science, Political Studies
                      (skilled-specialized)
                    </Option>
                    <Option
                      value="Arts/Science/Commerce(Graduate/postgraduate)
                      (skilled-general)"
                    >
                      Arts/Science/Commerce(Graduate/postgraduate)
                      (skilled-general)
                    </Option>
                    <Option value="Other (skilled-others)">
                      Other (skilled-others)
                    </Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                {qualificationLevel ==
                "8th - undergraduate/ITI (semi-skilled)" ? (
                  <FormItem label="Stream" required>
                    <Select
                      showSearch
                      placholder="Select Stream"
                      style={{
                        width: 250,
                      }}
                      onChange={(v, k) => {
                        setStream(v);
                      }}
                      value={stream}
                      name="qualificationLevel"
                      defaultValue={qualificationDetails.stream}
                    >
                      <Option value="9th">9th</Option>
                      <Option value="10th">10th</Option>
                      <Option value="Undergraduate">Undergraduate</Option>
                      <Option value="Courses/ITI">Courses/ITI</Option>
                    </Select>
                  </FormItem>
                ) : (
                  <FormItem label="Stream" required>
                    <InputFields
                      placeholder="Enter your stream"
                      name="stream"
                      value={stream}
                      onChange={(e) => {
                        setStream(e.target.value);
                      }}
                      defaultValue={qualificationDetails.stream}
                      disabled={
                        qualificationLevel == "Upto 8th std (unskilled)"
                          ? true
                          : false
                      }
                    />
                  </FormItem>
                )}
              </Col>
              <Col span={8}>
                <FormItem label="Is Qualification Completed" required>
                  <Radio.Group
                    name="completed"
                    defaultValue={qualificationDetails.completed}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="College / School Name" required>
                  <InputFields
                    placeholder="Enter your School College Name"
                    name="collegeSchoolName"
                    defaultValue={qualificationDetails.collegeSchoolName}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Course" required>
                  <InputFields
                    placeholder="Enter your Course"
                    name="course"
                    defaultValue={qualificationDetails.course}
                    disabled={
                      qualificationLevel == "Upto 8th std (unskilled)"
                        ? true
                        : false
                    }
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Board / University / Institute" required>
                  <InputFields
                    placeholder="Enter your Board University"
                    name="boardUniversity"
                    defaultValue={qualificationDetails.boardUniversity}
                    disabled={
                      qualificationLevel == "Upto 8th std (unskilled)"
                        ? true
                        : false
                    }
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="Mode of Exam" required>
                  <Radio.Group
                    name="mode"
                    defaultValue={qualificationDetails.mode}
                  >
                    <Radio value="online">Online</Radio>
                    <Radio value="offline">Offline</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Admission Year" required>
                  <DatePick
                    name="admissionYear"
                    picker="year"
                    disabledDate={disabledDate}
                    defaultValue={
                      qualificationDetails.admissionYear == null
                        ? ""
                        : moment(qualificationDetails.admissionYear.toString())
                    }
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Passing Year" required>
                  <DatePick
                    picker="year"
                    name="passingYear"
                    disabledDate={disabledDate}
                    defaultValue={
                      qualificationDetails.passingYear == null
                        ? ""
                        : moment(qualificationDetails.passingYear.toString())
                    }
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="Result" required>
                  <Radio.Group
                    name="result"
                    defaultValue={qualificationDetails.result}
                    onChange={(e) => {
                      setResult(e.target.value);
                    }}
                  >
                    <Radio value="Pass">Pass</Radio>
                    <Radio value="Fail">Fail</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Percentage" required>
                  <InputFields
                    placeholder="Enter your Percentage"
                    name="percentage"
                    defaultValue={qualificationDetails.percentage}
                    type="number"
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem label="Attempts" required>
                  <InputFields
                    placeholder="Enter your Attempts"
                    name="attempts"
                    min="0"
                    defaultValue={qualificationDetails.attempts}
                    type="number"
                  />
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="Marksheets" required>
                  <input
                    type="file"
                    name="marksheets"
                    onChange={handleMarksheets}
                    accept="image/jpeg, .pdf"
                  />
                </FormItem>
                {qualificationDetails.marksheets == null ? (
                  <></>
                ) : (
                  <span
                    style={{ display: "flex", cursor: "pointer" }}
                    // onClick={() => {
                    //   openMarksheetViewer();
                    // }}
                  >
                    <a
                      href={
                        REACT_APP_BASE_URL + qualificationDetails.marksheets
                      }
                      target="_blank"
                    >
                      Marksheets File
                    </a>
                    {/* <img
                      src={REACT_APP_BASE_URL + qualificationDetails.marksheets}
                      width="40px"
                      style={{ marginRight: "10px" }}
                    /> */}
                    {qualificationDetails.marksheets.slice(
                      qualificationDetails.marksheets.lastIndexOf("/") + 1
                    )}
                  </span>
                )}
              </Col>
              <Col span={8}>
                <FormItem label="Any Gap" required>
                  <Radio.Group
                    name="wasAnyGap"
                    onChange={(e) => {
                      setWasAnyGap(e.target.value);
                    }}
                    defaultValue={qualificationDetails.wasAnyGap}
                  >
                    <Radio value={true}>Yes</Radio>
                    <Radio value={false}>No</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col span={8}>
                {wasAnyGap == true ? (
                  <FormItem label="Year of Gap" required>
                    <InputFields
                      type="number"
                      name="howMuchYear"
                      min="0"
                      placeholder="Enter the year of gap"
                      defaultValue={qualificationDetails.howMuchYear}
                    />
                  </FormItem>
                ) : (
                  <></>
                )}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <FormItem label="Resume">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleResume}
                    accept="image/jpeg, .pdf"
                  />
                </FormItem>
                {qualificationDetails.resume == null ? (
                  <></>
                ) : (
                  <span
                    style={{ display: "flex", cursor: "pointer" }}
                    // onClick={() => {
                    //   openResumeViewer();
                    // }}
                  >
                    <a
                      href={REACT_APP_BASE_URL + qualificationDetails.resume}
                      target="_blank"
                    >
                      resume file
                    </a>
                    {/* <img
                      src={REACT_APP_BASE_URL + qualificationDetails.resume}
                      width="40px"
                      style={{ marginRight: "10px" }}
                    /> */}
                    {qualificationDetails.resume.slice(
                      qualificationDetails.resume.lastIndexOf("/") + 1
                    )}
                  </span>
                )}
              </Col>
              <Col span={8}>
                <FormItem
                  label="Institute State"
                  name="instituteState"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your state",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select state"
                    onChange={(v, k) => {
                      setState(v);
                    }}
                    value={state}
                    style={{ width: "250px" }}
                    name="instituteState"
                    defaultValue={qualificationDetails.instituteState}
                  >
                    {stateData.map((state, index) => {
                      return (
                        <Option
                          key={index}
                          value={state.name}
                          onChange={handleState}
                        >
                          {state.name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem>
              </Col>
              <Col span={8}>
                {/* <FormItem
                  label="Institute District"
                  name="instituteDistrict"
                  rules={[
                    {
                      required: true,
                      message: "Please input your District!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 250,
                    }}
                    placeholder="Select district"
                    optionFilterProp="children"
                    onChange={(v, k) => {
                      setDistrict(v);
                      setTalukaKey(k.key);
                      setSelectVisible(false);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={district}
                    name="instituteDistrict"
                    defaultValue={qualificationDetails.instituteDistrict}
                  >
                    {data.map((dis, index) => {
                      return (
                        <Option
                          key={index}
                          value={dis.district_name}
                          onChange={handleDistrict}
                        >
                          {dis.district_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem> */}
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                {/* <FormItem
                  label="Institute Taluka"
                  name="instituteTaluka"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Taluka!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    style={{
                      width: 250,
                    }}
                    placeholder="Select taluka"
                    optionFilterProp="children"
                    onChange={(v) => {
                      setTaluka(v);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    disabled={selectVisible}
                    name="instituteTaluka"
                    defaultValue={qualificationDetails.instituteTaluka}
                  >
                    {data[talukaKey].talukas.map((tal) => {
                      return (
                        <Option value={tal.taluka_name}>
                          {tal.taluka_name}
                        </Option>
                      );
                    })}
                  </Select>
                </FormItem> */}
              </Col>
            </Row>
            <Button type="primary" onClick={handleSubmit}>
              Save and Proceed
            </Button>
          </form>
        </MainContainer>
      </Spin>
    );
  }
};
export default QualificationDetails;
export const MainContainer = styled.div`
  margin: 25px 30px;
`;
