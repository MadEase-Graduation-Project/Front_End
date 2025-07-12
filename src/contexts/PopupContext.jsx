import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [isActivePopup, setActivePopup] = useState(false);
  const [popupType, setPopupType] = useState("error"); // default: error

  const showPopup = (type = "error") => {
    setPopupType(type);
    setActivePopup(true);
  };
  return (
    <PopupContext.Provider
      value={{ isActivePopup, setActivePopup, showPopup, popupType }}
    >
      {children}
    </PopupContext.Provider>
  );
};
