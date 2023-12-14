import React, { useEffect } from "react";
import { TranslateContainer } from "./style";

const Translater = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,mr",
        layout: "google.translate.TranslateElement.InlineLayout.SIMPLE",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <TranslateContainer id="google_translate_element"></TranslateContainer>
  );
};
export default Translater;
