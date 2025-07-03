import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [isActivePopup, setActivePopup] = useState(false);

  return (
    <PopupContext.Provider value={{ isActivePopup, setActivePopup }}>
      {children}
    </PopupContext.Provider>
  );
};
