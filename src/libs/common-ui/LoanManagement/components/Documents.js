import React, { useState, useRef, useEffect } from "react";
import { Button, message, Form, Input, Select, Row, Col, Checkbox } from "antd";
import {
  RequiredDocIMGA,
  RequiredDocIMGB,
  PhotographIMG,
  SignatureIMG,
} from "../../../../media";
import { REACT_APP_BASE_URL } from "../../../utils/urls";

const Documents = ({ data, onSuccess, onBack, form }) => {
  const { Option } = Select;
  const style = { border: "2px solid #eceff1", padding: "8px 0 0 8px" };
  const [selectedFileList, setselectedFileList] = useState([]);

  const [DocList, setDocList] = useState({
    AckApproval: false,
    Photopath: data.Photopath,
    Signaturepath: data.Signaturepath,
    AddressProofpath: data.AddressProofpath,
    AadharBackpath: data.AadharBackpath,
    AadharFrontpath: data.AadharFrontpath,
    IncomeCertificatepath: data.IncomeCertificatepath,
    CasteCertificatepath: data.CasteCertificatepath,
    Rationcardpath: data.Rationcardpath,
    ProjectReportpath: data.ProjectReportpath,
    Pancardpath: data.Pancardpath,
    Passbookcqpath: data.Passbookcqpath,
    Uaadharpath: data.Uaadharpath,
    EducationCertificatepath: data.EducationCertificatepath,
    Voterspath: data.Voterspath,
    Passportpath: data.Passportpath,
    Visapath: data.Visapath,
    Eduexpnpath: data.Eduexpnpath,
    Admissionpath: data.Admissionpath,
    Guarantorpath: data.Guarantorpath,
    Recoverycompetentpath: data.Recoverycompetentpath,
    SKDpath: data.SKDpath,
  });

  const [passportrequired, setpassportrequired] = useState();

  const [AckApproval, setAckApproval] = useState(false);
  const handleAckApproval = (event) => {
    setAckApproval(event.target.checked);
    setDocList({
      ...DocList,
      AckApproval: event.target.checked,
    });
  };

  const [Photopath, setPhotopath] = useState("");
  const [Signaturepath, setSignaturepath] = useState();
  const [Uaadharpath, setUaadharpath] = useState();
  const [AddressProofpath, setAddressProofpath] = useState();
  const [AadharFrontpath, setAadharFrontpath] = useState();
  const [AadharBackpath, setAadharBackpath] = useState();
  const [CasteCertificatepath, setCasteCertificatepath] = useState();
  const [IncomeCertificatepath, setIncomeCertificatepath] = useState();
  const [EducationCertificatepath, setEducationCertificatepath] = useState();
  const [SKDpath, setSKDpath] = useState();
  const [ProjectReportpath, setProjectReportpath] = useState();
  const [Pancardpath, setPancardpath] = useState();
  const [Rationcardpath, setRationcardpath] = useState();
  const [Voterspath, setVoterspath] = useState();
  const [Passportpath, setPassportpath] = useState();
  const [Visapath, setVisapath] = useState();
  const [Passbookcqpath, setPassbookcqpath] = useState();
  const [Eduexpnpath, setEduexpnpath] = useState();
  const [Admissionpath, setAdmissionpath] = useState();
  const [Guarantorpath, setGuarantorpath] = useState();
  const [Recoverycompetentpath, setRecoverycompetentpath] = useState();

  useEffect(() => {
    setDocList({ ...DocList, Photopath: data.Photopath });
    setDocList({ ...DocList, Signaturepath: data.Signaturepath });
    setDocList({ ...DocList, AddressProofpath: data.AddressProofpath });
    setDocList({ ...DocList, AadharFrontpath: data.AadharFrontpath });
    setDocList({ ...DocList, AadharBackpath: data.AadharBackpath });
    setDocList({
      ...DocList,
      IncomeCertificatepath: data.IncomeCertificatepath,
    });
    setDocList({ ...DocList, Rationcardpath: data.Rationcardpath });
    setDocList({ ...DocList, Pancardpath: data.Pancardpath });
    setDocList({ ...DocList, CasteCertificatepath: data.CasteCertificatepath });
    if (
      data.LoanSchemeCode !== "central-nsfdc-el-a" ||
      data.LoanSchemeCode !== "central-nsfdc-el-b" ||
      data.LoanSchemeCode !== "central-nskfdc-el-a" ||
      data.LoanSchemeCode !== "central-nskfdc-el-b"
    ) {
      setDocList({ ...DocList, ProjectReportpath: data.ProjectReportpath });
    }
    setDocList({ ...DocList, Passbookcqpath: data.Passbookcqpath });
    setDocList({ ...DocList, Uaadharpath: data.Uaadharpath });
    setDocList({
      ...DocList,
      EducationCertificatepath: data.EducationCertificatepath,
    });
    setDocList({ ...DocList, Voterspath: data.Voterspath });
    setDocList({ ...DocList, Passportpath: data.Passportpath });
    setDocList({ ...DocList, Visapath: data.Visapath });
    setDocList({ ...DocList, Eduexpnpath: data.Eduexpnpath });
    setDocList({ ...DocList, Admissionpath: data.Admissionpath });
    setDocList({ ...DocList, Guarantorpath: data.Guarantorpath });
    setDocList({
      ...DocList,
      Recoverycompetentpath: data.Recoverycompetentpath,
    });
    setDocList({ ...DocList, SKDpath: data.SKDpath });
  }, []);
  const [PhotographIMGB, setPhotographIMGB] = useState();
  const handlePhotopath = (event) => {
    if (event.target.files[0].type != "image/jpeg") {
      message.warning("File does not support. You must use .jpg ");
    }
    if (event.target.files[0].size / 1024 <= 300) {
      setPhotographIMGB(URL.createObjectURL(event.target.files[0]));
      setPhotopath(event.target.files[0]);
      setDocList({
        ...DocList,
        Photopath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Photopath: "",
      });
      message.warning("The size of the photograph should fall less than 300KB");
    }
  };

  const [SignatureIMGB, setSignatureIMGB] = useState();
  const handleSignaturepath = (event) => {
    if (event.target.files[0].type != "image/jpeg") {
      message.warning("File does not support. You must use .jpg ");
    }
    if (
      // event.target.files[0].size / 1024 > 5 &&
      event.target.files[0].size / 1024 <=
      300
    ) {
      setSignatureIMGB(URL.createObjectURL(event.target.files[0]));
      setSignaturepath(event.target.files[0]);
      setDocList({
        ...DocList,
        Signaturepath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Signaturepath: "",
      });
      message.warning("The size of the Signature should fall less than 300KB");
    }
  };

  const handleUaadharpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }
    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setUaadharpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Uaadharpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Uaadharpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleAddressProofpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setAddressProofpath(event.target.files[0]);
      setDocList({
        ...DocList,
        AddressProofpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        AddressProofpath: "",
      });

      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleAadharFrontpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setAadharFrontpath(event.target.files[0]);
      setDocList({
        ...DocList,
        AadharFrontpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        AadharFrontpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleAadharBackpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setAadharBackpath(event.target.files[0]);
      setDocList({
        ...DocList,
        AadharBackpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        AadharBackpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleCasteCertificatepath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setCasteCertificatepath(event.target.files[0]);
      setDocList({
        ...DocList,
        CasteCertificatepath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        // CasteCertificatepath: "",
        CasteCertificatepath: event.target.files[0],
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleIncomeCertificatepath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setIncomeCertificatepath(event.target.files[0]);
      setDocList({
        ...DocList,
        IncomeCertificatepath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        IncomeCertificatepath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleEducationCertificatepath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setEducationCertificatepath(event.target.files[0]);
      setDocList({
        ...DocList,
        EducationCertificatepath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        // EducationCertificatepath: "",
        EducationCertificatepath: event.target.files[0],
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleSKDpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setSKDpath(event.target.files[0]);
      setDocList({
        ...DocList,
        SKDpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        SKDpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleProjectReportpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setProjectReportpath(event.target.files[0]);
      setDocList({
        ...DocList,
        ProjectReportpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        ProjectReportpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handlePancardpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setPancardpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Pancardpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Pancardpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleRationcardpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setRationcardpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Rationcardpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Rationcardpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleVoterspath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setVoterspath(event.target.files[0]);
      setDocList({
        ...DocList,
        Voterspath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Voterspath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handlePassportpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setPassportpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Passportpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Passportpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleVisapath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setVisapath(event.target.files[0]);
      setDocList({
        ...DocList,
        Visapath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Visapath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handlePassbookcqpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setPassbookcqpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Passbookcqpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Passbookcqpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  const handleEduexpnpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setEduexpnpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Eduexpnpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Eduexpnpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };
  const handleAdmissionpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setAdmissionpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Admissionpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Admissionpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };
  const handleGuarantorpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setGuarantorpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Guarantorpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Guarantorpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };
  const handleRecoverycompetentpath = (event) => {
    if (
      event.target.files[0].type != "image/jpeg" &&
      event.target.files[0].type != "application/pdf"
    ) {
      message.warning("File does not support. You must use .jpg or .pdf ");
    }

    if (
      event.target.files[0].size / 1024 > 75 &&
      event.target.files[0].size / 1024 <= 2048
    ) {
      setRecoverycompetentpath(event.target.files[0]);
      setDocList({
        ...DocList,
        Recoverycompetentpath: event.target.files[0],
      });
    } else {
      setDocList({
        ...DocList,
        Recoverycompetentpath: "",
      });
      message.warning("The size of the documents between 75 KB to 2 MB.");
    }
  };

  useEffect(() => {
    form.setFieldsValue({ Photopath: form.getFieldsValue().Photopath });
  });

  return (
    <div>
      {/* {console.log(data.LoanScheme)} */}
      <Form
        layout="vertical"
        // onFinish={onSuccess}
        onFinish={() => onSuccess(DocList)}
        // data={data}
        // autoComplete="off"
        // form={form}
      >
        <Row>
          <Col span={12}>
            <Row>
              <Col style={style} span={20}>
                <h4>Document Format should be JPEG/ PDF.</h4>
              </Col>
            </Row>
            <Row>
              <Col style={style} span={20}>
                <h4>The size of the documents between 75 KB to 2 MB.</h4>
              </Col>
            </Row>
            <Row>
              <Col style={style} span={20}>
                <h4>
                  <img src={RequiredDocIMGA} /> The size of the photograph
                  should fall between less than 300KB
                </h4>
              </Col>
            </Row>
            <Row>
              <Col style={style} span={20}>
                <h4>
                  <img src={RequiredDocIMGB} /> Photograph and Signature Format
                  should be JPG or JPEG.
                </h4>
              </Col>
            </Row>
            {/* <Row>
              <Col style={style} span={20}>
                <h4>
                  <img src={RequiredDocIMGC} /> The width of the photograph
                  should be 160 pixels.
                </h4>
              </Col>
            </Row>
            <Row>
              <Col style={style} span={20}>
                <h4>
                  <img src={RequiredDocIMGD} /> The height of the photograph
                  should fall between 200 to 212 pixels.
                </h4>
              </Col>
            </Row>
            <Row>
              <Col style={style} span={20}>
                <h4>
                  <img src={RequiredDocIMGE} /> The height of the Signature
                  should fall between 50 to 55 pixels.
                </h4>
              </Col>
            </Row> */}
          </Col>
          <Col span={6}>
            <Row>
              <Form.Item
                label="Photograph:"
                valuePropName="fileList"
                name="Photopath"
                rules={[
                  {
                    required: false,
                  },
                  () => ({
                    validator(_, value) {
                      if (!DocList.Photopath) {
                        return Promise.reject(
                          "Photograph should fall less than 300KB"
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <img
                  src={PhotographIMGB || PhotographIMG}
                  style={{ width: "160px", height: "187px" }}
                />
                <input
                  type="file"
                  onChange={handlePhotopath}
                  accept="image/jpeg"
                />
                {data.Photopath == null ? (
                  <></>
                ) : (
                  <a
                    href={
                      typeof data.Photopath == "object"
                        ? URL.createObjectURL(data.Photopath)
                        : `${REACT_APP_BASE_URL}${data.Photopath}`
                    }
                    target="_blank"
                  >
                    Photo
                  </a>
                )}
              </Form.Item>
            </Row>
          </Col>
          <Col span={6}>
            <Row>
              <Form.Item
                label="Signature:"
                valuePropName="fileList"
                name="Signaturepath"
                rules={[
                  {
                    required: false,
                    message:
                      "Please select Signature should fall less than 300KB",
                  },
                  () => ({
                    validator(_, value) {
                      if (!DocList.Signaturepath) {
                        return Promise.reject(
                          "Signature should fall less than 300KB."
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                {/* <img src={SignatureIMG} /> */}
                <img
                  src={SignatureIMGB || SignatureIMG}
                  style={{ width: "256px", height: "64px" }}
                />
                <Input
                  type="file"
                  onChange={handleSignaturepath}
                  accept="image/jpeg"
                />
                {data.Signaturepath == null ? (
                  <></>
                ) : (
                  <a
                    href={
                      typeof data.Signaturepath == "object"
                        ? URL.createObjectURL(data.Signaturepath)
                        : `${REACT_APP_BASE_URL}${data.Signaturepath}`
                    }
                    target="_blank"
                  >
                    Signature
                  </a>
                )}
              </Form.Item>
            </Row>
          </Col>
        </Row>

        <Row>{/* <Imagecrop /> */}</Row>
        <Row>
          {data.LoanSchemeCode == "central-nsfdc-el-a" ||
          data.LoanSchemeCode == "central-nsfdc-el-b" ||
          data.LoanSchemeCode == "central-nskfdc-el-a" ||
          data.LoanSchemeCode == "central-nskfdc-el-b" ? (
            ""
          ) : (
            <Col span={6}>
              <Form.Item
                label="Udyam Aadhar Copy:"
                valuePropName="fileList"
                name="Uaadharpath"
                // rules={[
                //   {
                //     required: false,
                //     message: "Please select Udyam Aadhar Copy",
                //   },
                //   () => ({
                //     validator(_, value) {
                //       if (!DocList.Uaadharpath) {
                //         return Promise.reject(
                //           "The size of the documents between 75 KB to 2 MB."
                //         );
                //       }
                //       return Promise.resolve();
                //     },
                //   }),
                // ]}
              >
                <Input
                  type="file"
                  onChange={handleUaadharpath}
                  accept="image/jpeg, .pdf"
                />
                {data.Uaadharpath == null ? (
                  <></>
                ) : (
                  <a
                    href={
                      typeof data.Uaadharpath == "object"
                        ? URL.createObjectURL(data.Uaadharpath)
                        : `${REACT_APP_BASE_URL}${data.Uaadharpath}`
                    }
                    target="_blank"
                  >
                    Udyam Aadhar
                  </a>
                )}
              </Form.Item>
            </Col>
          )}

          <Col span={6}>
            <Form.Item
              label="Copy of Address Proof:"
              valuePropName="fileList"
              name="AddressProofpath"
              rules={[
                { required: false, message: "Please select Address Proof" },
                () => ({
                  validator(_, value) {
                    if (!DocList.AddressProofpath) {
                      return Promise.reject(
                        "The size of the documents between 75 KB to 2 MB."
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type="file"
                onChange={handleAddressProofpath}
                accept="image/jpeg, .pdf"
              />
              {data.AddressProofpath == null ? (
                <></>
              ) : (
                <a
                  href={
                    typeof data.AddressProofpath == "object"
                      ? URL.createObjectURL(data.AddressProofpath)
                      : `${REACT_APP_BASE_URL}${data.AddressProofpath}`
                  }
                  target="_blank"
                >
                  Address Proof
                </a>
              )}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Copy of Aadhar Card (Front Side):"
              valuePropName="fileList"
              name="AadharFrontpath"
              rules={[
                {
                  required: false,
                  message: "Please select Aadhar Card (Front Side)",
                },
                () => ({
                  validator(_, value) {
                    if (!DocList.AadharFrontpath) {
                      return Promise.reject(
                        "The size of the documents between 75 KB to 2 MB."
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type="file"
                onChange={handleAadharFrontpath}
                accept="image/jpeg, .pdf"
              />
              {data.AadharFrontpath == null ? (
                <></>
              ) : (
                <a
                  href={
                    typeof data.AadharFrontpath == "object"
                      ? URL.createObjectURL(data.AadharFrontpath)
                      : `${REACT_APP_BASE_URL}${data.AadharFrontpath}`
                  }
                  target="_blank"
                >
                  Aadhar Front
                </a>
              )}
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Copy of Aadhar Card (back side):"
              valuePropName="fileList"
              name="AadharBackpath"
              rules={[
                {
                  required: false,
                  message: "Please select Aadhar Card (back side)",
                },
                () => ({
                  validator(_, value) {
                    if (!DocList.AadharBackpath) {
                      return Promise.reject(
                        "The size of the documents between 75 KB to 2 MB."
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type="file"
                onChange={handleAadharBackpath}
                accept="image/jpeg, .pdf"
              />
              {data.AadharBackpath == null ? (
                <></>
              ) : (
                <a
                  href={
                    typeof data.AadharBackpath == "object"
                      ? URL.createObjectURL(data.AadharBackpath)
                      : `${REACT_APP_BASE_URL}${data.AadharBackpath}`
                  }
                  target="_blank"
                >
                  Aadhar Back
                </a>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          {data.LoanSchemeCode == "state-subsidy" ||
          data.LoanSchemeCode == "state-mm" ||
          data.LoanSchemeCode == "state-df" ||
          data.LoanSchemeCode == "central-nsfdc-mky" ||
          data.LoanSchemeCode == "central-nsfdc-msy" ||
          data.LoanSchemeCode == "central-nsfdc-mcf" ||
          data.LoanSchemeCode == "central-nsfdc-tl-a" ||
          data.LoanSchemeCode == "central-nsfdc-tl-b" ||
          data.LoanSchemeCode == "central-nsfdc-tl-c" ||
          data.LoanSchemeCode == "central-nsfdc-tl-d" ? (
            <>
              <Col span={6}>
                <Form.Item
                  label="Income Certificate"
                  valuePropName="fileList"
                  name="IncomeCertificatepath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Income Certificate",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.IncomeCertificatepath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleIncomeCertificatepath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.IncomeCertificatepath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.IncomeCertificatepath == "object"
                          ? URL.createObjectURL(data.IncomeCertificatepath)
                          : `${REACT_APP_BASE_URL}${data.IncomeCertificatepath}`
                      }
                      target="_blank"
                    >
                      Income Certificate
                    </a>
                  )}
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Col span={6}>
                <Form.Item
                  label="Education Certificate"
                  valuePropName="fileList"
                  name="EducationCertificatepath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Education Certificate",
                    },
                    // () => ({
                    //   validator(_, value) {
                    //     if (!DocList.EducationCertificatepath) {
                    //       return Promise.reject("The size of the documents between 75 KB to 2 MB.");
                    //     }
                    //     return Promise.resolve();
                    //   },
                    // }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleEducationCertificatepath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.EducationCertificatepath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.EducationCertificatepath == "object"
                          ? URL.createObjectURL(data.EducationCertificatepath)
                          : `${REACT_APP_BASE_URL}${data.EducationCertificatepath}`
                      }
                      target="_blank"
                    >
                      Education Certificate
                    </a>
                  )}
                </Form.Item>
              </Col>

              {data.LoanSchemeCode == "central-nsfdc-el-a" ||
              data.LoanSchemeCode == "central-nsfdc-el-b" ||
              data.LoanSchemeCode == "central-nsfdc-tl-a" ||
              data.LoanSchemeCode == "central-nsfdc-tl-b" ||
              data.LoanSchemeCode == "central-nsfdc-tl-b" ||
              data.LoanSchemeCode == "central-nsfdc-tl-d" ||
              data.LoanSchemeCode == "central-nsfdc-mcf" ||
              data.LoanSchemeCode == "central-nsfdc-msy" ||
              data.LoanSchemeCode == "central-nsfdc-mky" ||
              data.LoanSchemeCode == "central-nsfdc-may" ||
              data.LoanSchemeCode == "central-nsfdc-gbsa" ||
              data.LoanSchemeCode == "central-nsfdc-gbsb" ||
              data.LoanSchemeCode == "central-nsfdc-gbsc" ||
              data.LoanSchemeCode == "central-nsfdc-lvy" ? (
                ""
              ) : (
                <Col span={6}>
                  <Form.Item
                    label="Safai Karmachari Dhakla(Attested Nagar Sevak):"
                    valuePropName="fileList"
                    name="SKDpath"
                    rules={[
                      {
                        required: false,
                        message: "Please select Safai Karmachari Dhakla",
                      },
                      () => ({
                        validator(_, value) {
                          if (!DocList.SKDpath) {
                            return Promise.reject(
                              "The size of the documents between 75 KB to 2 MB."
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <Input
                      type="file"
                      onChange={handleSKDpath}
                      accept="image/jpeg, .pdf"
                    />
                    {data.SKDpath == null ? (
                      <></>
                    ) : (
                      <a
                        href={
                          typeof data.SKDpath == "object"
                            ? URL.createObjectURL(data.SKDpath)
                            : `${REACT_APP_BASE_URL}${data.SKDpath}`
                        }
                        target="_blank"
                      >
                        Passbook/cheque
                      </a>
                    )}
                  </Form.Item>
                </Col>
              )}
            </>
          )}

          {data.LoanSchemeCode == "state-subsidy" ||
          data.LoanSchemeCode == "state-mm" ||
          data.LoanSchemeCode == "state-df" ||
          data.LoanSchemeCode == "central-nsfdc-el-a" ||
          data.LoanSchemeCode == "central-nsfdc-el-b" ||
          data.LoanSchemeCode == "central-nskfdc-el-a" ||
          data.LoanSchemeCode == "central-nskfdc-el-b" ||
          data.LoanSchemeCode == "central-nsfdc-mky" ||
          data.LoanSchemeCode == "central-nsfdc-msy" ||
          data.LoanSchemeCode == "central-nsfdc-mcf" ||
          data.LoanSchemeCode == "central-nsfdc-tl-a" ||
          data.LoanSchemeCode == "central-nsfdc-tl-b" ||
          data.LoanSchemeCode == "central-nsfdc-tl-c" ||
          data.LoanSchemeCode == "central-nsfdc-tl-d" ? (
            <>
              <Col span={6}>
                <Form.Item
                  label="Caste Certificate:"
                  valuePropName="fileList"
                  name="CasteCertificatepath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Caste Certificate",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.CasteCertificatepath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleCasteCertificatepath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.CasteCertificatepath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.CasteCertificatepath == "object"
                          ? URL.createObjectURL(data.CasteCertificatepath)
                          : `${REACT_APP_BASE_URL}${data.CasteCertificatepath}`
                      }
                      target="_blank"
                    >
                      Caste Certificate
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Ration Card:"
                  valuePropName="fileList"
                  name="Rationcardpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Ration Card",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Rationcardpath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleRationcardpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Rationcardpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Rationcardpath == "object"
                          ? URL.createObjectURL(data.Rationcardpath)
                          : `${REACT_APP_BASE_URL}${data.Rationcardpath}`
                      }
                      target="_blank"
                    >
                      Ration card
                    </a>
                  )}
                </Form.Item>
              </Col>
            </>
          ) : (
            ""
          )}

          {data.LoanSchemeCode == "central-nsfdc-mky" ||
          data.LoanSchemeCode == "central-nsfdc-msy" ||
          data.LoanSchemeCode == "central-nsfdc-mcf" ||
          data.LoanSchemeCode == "central-nsfdc-tl-a" ||
          data.LoanSchemeCode == "central-nsfdc-tl-b" ||
          data.LoanSchemeCode == "central-nsfdc-tl-c" ||
          data.LoanSchemeCode == "central-nsfdc-tl-d" ||
          data.LoanSchemeCode == "central-nsfdc-el-a" ||
          data.LoanSchemeCode == "central-nsfdc-el-b" ||
          data.LoanSchemeCode == "central-nskfdc-el-a" ||
          data.LoanSchemeCode == "central-nskfdc-el-b" ? (
            <>
              <Col span={6}>
                <Form.Item
                  label="Passbook / Cancel Cheque copy:"
                  valuePropName="fileList"
                  name="Passbookcqpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Passbook / Cancel Cheque",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Passbookcqpath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handlePassbookcqpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Passbookcqpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Passbookcqpath == "object"
                          ? URL.createObjectURL(data.Passbookcqpath)
                          : `${REACT_APP_BASE_URL}${data.Passbookcqpath}`
                      }
                      target="_blank"
                    >
                      Passbook/cheque
                    </a>
                  )}
                </Form.Item>
              </Col>
            </>
          ) : (
            ""
          )}

          {data.LoanSchemeCode == "central-nsfdc-el-a" ||
          data.LoanSchemeCode == "central-nsfdc-el-b" ||
          data.LoanSchemeCode == "central-nskfdc-el-a" ||
          data.LoanSchemeCode == "central-nskfdc-el-b" ? (
            <>
              <Col span={6}>
                <Form.Item
                  label="Voters ID:"
                  valuePropName="fileList"
                  name="Voterspath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Voters ID",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Voterspath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleVoterspath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Voterspath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Voterspath == "object"
                          ? URL.createObjectURL(data.Voterspath)
                          : `${REACT_APP_BASE_URL}${data.Voterspath}`
                      }
                      target="_blank"
                    >
                      Voter ID
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Passport:"
                  valuePropName="fileList"
                  name="Passportpath"
                  rules={[
                    {
                      required:
                        data.LoanSchemeCode == "central-nsfdc-el-b" &&
                        data.LoanSchemeCode == "central-nskfdc-el-b"
                          ? true
                          : false,
                      message: "Please select Passport",
                    },
                    () => ({
                      validator(_, value) {
                        if (
                          data.LoanSchemeCode == "central-nsfdc-el-b" &&
                          data.LoanSchemeCode == "central-nskfdc-el-b" &&
                          !DocList.Passportpath
                        ) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handlePassportpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Passportpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Passportpath == "object"
                          ? URL.createObjectURL(data.Passportpath)
                          : `${REACT_APP_BASE_URL}${data.Passportpath}`
                      }
                      target="_blank"
                    >
                      Passport
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Visa:"
                  valuePropName="fileList"
                  name="Visapath"
                  rules={[
                    {
                      required:
                        data.LoanSchemeCode == "central-nsfdc-el-b" &&
                        data.LoanSchemeCode == "central-nskfdc-el-b"
                          ? true
                          : false,
                      message: "Please select Visa",
                    },
                    () => ({
                      validator(_, value) {
                        if (
                          data.LoanSchemeCode == "central-nsfdc-el-b" &&
                          data.LoanSchemeCode == "central-nskfdc-el-b" &&
                          !DocList.Visapath
                        ) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleVisapath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Visapath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Visapath == "object"
                          ? URL.createObjectURL(data.Visapath)
                          : `${REACT_APP_BASE_URL}${data.Visapath}`
                      }
                      target="_blank"
                    >
                      Visa
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Letter by Institute About Educational Expenses"
                  valuePropName="fileList"
                  name="Eduexpnpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Educational Expenses",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Eduexpnpath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleEduexpnpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Eduexpnpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Eduexpnpath == "object"
                          ? URL.createObjectURL(data.Eduexpnpath)
                          : `${REACT_APP_BASE_URL}${data.Eduexpnpath}`
                      }
                      target="_blank"
                    >
                      Education expenses
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Admission Letter"
                  valuePropName="fileList"
                  name="Admissionpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Admission Letter",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Admissionpath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleAdmissionpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Admissionpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Admissionpath == "object"
                          ? URL.createObjectURL(data.Admissionpath)
                          : `${REACT_APP_BASE_URL}${data.Admissionpath}`
                      }
                      target="_blank"
                    >
                      Admission Letter
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Guarantor's letter"
                  valuePropName="fileList"
                  name="Guarantorpath"
                  rules={[
                    {
                      required: false,
                      message: "Please select Guarantor's letter",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Guarantorpath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleGuarantorpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Guarantorpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Guarantorpath == "object"
                          ? URL.createObjectURL(data.Guarantorpath)
                          : `${REACT_APP_BASE_URL}${data.Guarantorpath}`
                      }
                      target="_blank"
                    >
                      Guarantor's Letter
                    </a>
                  )}
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Affidavit of recovery by two competent surities"
                  valuePropName="fileList"
                  name="Recoverycompetentpath"
                  rules={[
                    {
                      required: false,
                      message:
                        "Please select Affidavit of recovery by two competent surities",
                    },
                    () => ({
                      validator(_, value) {
                        if (!DocList.Recoverycompetentpath) {
                          return Promise.reject(
                            "The size of the documents between 75 KB to 2 MB."
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input
                    type="file"
                    onChange={handleRecoverycompetentpath}
                    accept="image/jpeg, .pdf"
                  />
                  {data.Recoverycompetentpath == null ? (
                    <></>
                  ) : (
                    <a
                      href={
                        typeof data.Recoverycompetentpath == "object"
                          ? URL.createObjectURL(data.Recoverycompetentpath)
                          : `${REACT_APP_BASE_URL}${data.Recoverycompetentpath}`
                      }
                      target="_blank"
                    >
                      Recovery Affidavit
                    </a>
                  )}
                </Form.Item>
              </Col>
            </>
          ) : (
            ""
          )}

          <Col span={6}>
            {data.LoanSchemeCode == "central-nsfdc-el-a" ||
            data.LoanSchemeCode == "central-nsfdc-el-b" ||
            data.LoanSchemeCode == "central-nskfdc-el-a" ||
            data.LoanSchemeCode == "central-nskfdc-el-b" ? (
              ""
            ) : (
              <Form.Item
                label="Project Report (Documents related to the business such as price list of goods, proof of place of business if required)"
                valuePropName="fileList"
                name="ProjectReportpath"
                rules={[
                  { required: false, message: "Please Project Report" },
                  () => ({
                    validator(_, value) {
                      if (!DocList.ProjectReportpath) {
                        return Promise.reject(
                          "The size of the documents between 75 KB to 2 MB."
                        );
                      }
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <Input
                  type="file"
                  onChange={handleProjectReportpath}
                  accept="image/jpeg, .pdf"
                />
                {data.ProjectReportpath == null ? (
                  <></>
                ) : (
                  <a
                    href={
                      typeof data.ProjectReportpath == "object"
                        ? URL.createObjectURL(data.ProjectReportpath)
                        : `${REACT_APP_BASE_URL}${data.ProjectReportpath}`
                    }
                    target="_blank"
                  >
                    Project Report
                  </a>
                )}
              </Form.Item>
            )}
          </Col>

          <Col span={6}>
            <Form.Item
              label="Copy of Pan Card:"
              valuePropName="fileList"
              name="Pancardpath"
              rules={[
                { required: false, message: "Please select Pan Card" },
                () => ({
                  validator(_, value) {
                    if (!DocList.Pancardpath) {
                      return Promise.reject(
                        "The size of the documents between 75 KB to 2 MB."
                      );
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                type="file"
                onChange={handlePancardpath}
                accept="image/jpeg, .pdf"
              />
              {data.Pancardpath == null ? (
                <></>
              ) : (
                <a
                  href={
                    typeof data.Pancardpath == "object"
                      ? URL.createObjectURL(data.Pancardpath)
                      : `${REACT_APP_BASE_URL}${data.Pancardpath}`
                  }
                  target="_blank"
                >
                  Pancard
                </a>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Form.Item
            label="Acknowledgement:"
            //name="AckApproval"
            valuePropName="checked"
            rules={[
              { required: true, message: "Please select Acknowledgement" },
            ]}
          >
            <Checkbox required name="AckApproval" onChange={handleAckApproval}>
              {data.LoanSchemeCode == "central-nsfdc-el-a" ||
              data.LoanSchemeCode == "central-nsfdc-el-b" ||
              data.LoanSchemeCode == "central-nskfdc-el-a" ||
              data.LoanSchemeCode == "central-nskfdc-el-b" ? (
                <p>
                  I certify that, to the best of my knowledge and belief, the i
                  nformation furnished herein is true and correct. I promise to
                  abide by the following terms and conditions governing the
                  sanction of loan and to utilize the loan for the purpose for
                  which it is sanctioned.
                </p>
              ) : (
                <p>
                  I write on the true pledge that all the above information is
                  true. Also, as per the companion's business report, I will use
                  the requested grant/application only for directed business and
                  if I misuse it, I will be liable for legal action. The loan
                  amount should be recovered from me with interest. Also, as per
                  IPC 142, I have given all the information to the government
                  officials and I will be eligible for further action. No one in
                  my family has a job. I will regularize the bank loan Fed. The
                  information I have given is true. As a matter of fact
                </p>
              )}

              {/* <p>
                मी सत्य प्रति ज्ञवर लि हून देतो की , वरी ल संपूर्ण मा हि ती सत्य
                आहे. तसेच मी सो बती च्या व्यवसा या च्या अहवा ला नुसा र मा गि
                तलेले अनुदा न/अर्ज फक्त नि र्देशि त धंदा करण्या चं वा परी न व
                हेयचा गैरवा पर केल्या स मी का यदेशी र का र्यवा ही पा त्र रा ही
                न. कर्ज रक्कम व्या जा सह मा झ्या कडून वसूल करण्या त या वी . तसेच
                IPC १४२ प्रमा णे सर्व्या मा हि ती सरका री अधि का री यां ना दि ला
                या पुढी ल का रवा ईस मी पा त्र रा ही न. मा झ्या कुटुंबा ती ल को
                णी ही व्यक्ती नो करी स ना ही . मी बँकेच्या कर्जा ची फेड नि यमि त
                करी न. मी दि लेली मा हि ती सत्य आहे. प्रति ज्ञवरी ल सत्यतेकरि ता
                सा क्षी दा र म्हणून दो न व्यक्तीं चे ना व सा क्षी दा र म्हणून
                देत आहे
              </p> */}
            </Checkbox>
          </Form.Item>
        </Row>

        <div className="steps-action">
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => onBack(data)}
          >
            Previous
          </Button>

          <Button
            type="primary"
            htmlType="submit"
            //onClick={() => onSuccess(DocList)}
          >
            Next
          </Button>
        </div>

        {/* <Button onClick={() => { onBack(data) }}>Back</Button>
                &nbsp;
                <Button type="primary" htmlType="submit">
                    Submit
                </Button> */}
        {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                </Form.Item> */}
      </Form>
    </div>
  );
};

export default Documents;
