import { encrypt } from "./encryption";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL;

export const Backend = {
  sachet: () => {
    const headers = {
      "Content-Type": "application/json",
    };
    const url = apiUrl + "/auth/sachet";
    return {
      onboardSachetCustomer: ({ nin }) => {
        const fullUrl = url + "/onboard";
        const data = JSON.stringify({ data: { nin } });
        const encryptedData = encrypt(data);
        return fetch(fullUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      login: ({ phoneNumber, password }) => {
        const fullUrl = url + "/login";
        const data = JSON.stringify({ data: { phone: phoneNumber, password } });
        const encryptedData = encrypt(data);
        return fetch(fullUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
    };
  },
};
