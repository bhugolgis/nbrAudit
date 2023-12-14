var CryptoJS = require("crypto-js");

const decryptToken = () => {
  if (sessionStorage.getItem("token") === null) {
    return null;
  } else {
    var bytes = CryptoJS.AES.decrypt(
      sessionStorage.getItem("token"),
      "y9L@91nYW%BRfc1g"
    );
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedData;
  }
};

export const Token = decryptToken();
export const Name = sessionStorage.getItem("name");
export const UserGroup = sessionStorage.getItem("userGroup");
export const VerticalName = sessionStorage.getItem("verticalName");
export const DmDistrict = sessionStorage.getItem("dmDistrict");
export const ResetToken = sessionStorage.getItem("resetToken");
export const VerticalId = sessionStorage.getItem("verticalId");
export const BeneficiaryId = sessionStorage.getItem("id");
export const FullName = sessionStorage.getItem("fullName");
export const Id = sessionStorage.getItem("BeneficiaryId");
