import { encrypt } from "./encryption";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL;

export const Backend = {
  sachet() {
    const headers = {
      "Content-Type": "application/json",
    };
    const url = apiUrl + "/auth";
    return {
      async onboardSachetCustomer({ nin }) {
        const fullUrl = url + "/sachet/onboard";
        const data = JSON.stringify({ data: { nin } });
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
