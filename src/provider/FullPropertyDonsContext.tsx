import { createContext, useContext, useState } from "react";

const FullPropertyDonsContext = createContext();

export const FullPropertyDonsProvider = ({ children }) => {
  const [fullPropertyDons, setFullDons] = useState([]);

  return (
    <FullPropertyDonsContext.Provider value={{ fullPropertyDons, setFullDons }}>
      {children}
    </FullPropertyDonsContext.Provider>
  );
};

export const useFullPropertyDons = () => {
  return useContext(FullPropertyDonsContext);
};
