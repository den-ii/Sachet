import { createContext, useContext, useState } from "react";

const IdentityContext = createContext({
  identityNumber: undefined,
  phoneNumber: undefined,
  setIdentityNumber: () => undefined,
  setPhoneNumber: () => undefined,
});

export const IdentityProvider = ({ children }) => {
  const [identityNumber, setIdentityNumber] = useState(undefined);
  const [phoneNumber, setPhoneNumber] = useState("123456789");

  const value = {
    identityNumber,
    setIdentityNumber,
    phoneNumber,
    setPhoneNumber,
  };
  return (
    <IdentityContext.Provider value={value}>
      {children}
    </IdentityContext.Provider>
  );
};

export const useIdentity = () => {
  const context = useContext(IdentityContext);
  return { ...context };
};
