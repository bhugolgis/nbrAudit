import axios from "axios";
import { useEffect, useState } from "react";
import Layout from "./components/layout";
import { Modal, message } from "antd";
import { REACT_APP_BASE_URL } from "./libs/utils/urls";
import { useTranslation } from "react-i18next";
import { Token } from "./libs/utils/sessionStorage";
import countapi from "countapi-js";

function App() {
  const MainUrl = window.location.pathname;
  const res = MainUrl.slice(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      axios({
        method: "post",
        url: `${REACT_APP_BASE_URL}/applicant/logout`,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `token ${Token}`,
        },
      }).then((response) => {
        sessionStorage.clear();
        message.warning(
          "Sorry your session has expired Redirecting to login..."
        );
        setTimeout(() => {
          window.location.replace("/login");
        }, 2000);
      });
    }, 3600000);
  }, []);

  return (
    <div className="App" style={{ overflow: "hidden" }}>
      <Layout locPath={res} />
      <Modal title="Basic Modal" visible={isModalOpen}>
        Sorry You are not an authenticated User ! Logging you out...
      </Modal>
    </div>
  );
}

export default App;
