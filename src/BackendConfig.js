import { encrypt } from "./encryption";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL;

// const staticBackendFields = {
//   token: undefined,
// };

export const backendHeaders = {
  onlyJson: { "Content-Type": "application/json" },
  onlyAuth: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  auth_json: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const Backend = {
  sachet: () => {
    const url = apiUrl + "/auth/sachet";
    return {
      onboardSachetCustomer: ({ nin }, headers = backendHeaders.onlyJson) => {
        const data = JSON.stringify({ data: { nin } });
        const encryptedData = encrypt(data);
        return fetch(url + "/onboard", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      createPassword: (
        { phoneNumber, password },
        headers = backendHeaders.onlyJson
      ) => {
        const data = JSON.stringify({ data: { phoneNumber, password } });
        const encryptedData = encrypt(data);
        return fetch(url + "/password", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      login: ({ phoneNumber, password }, headers = backendHeaders.onlyJson) => {
        const data = JSON.stringify({ data: { phone: phoneNumber, password } });
        const encryptedData = encrypt(data);
        return fetch(url + "", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      getCustomerDetails: (
        { phoneNumber },
        headers = backendHeaders.auth_json
      ) => {
        const data = JSON.stringify({ data: { phoneNumber } });
        const encryptedData = encrypt(data);
        console.log(data);
        return fetch(url + "/customer", {
          method: "GET",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      verifyCustomer: ({ nin, photo }, headers = backendHeaders.auth_json) => {
        photo = photo.split(";base64,")[1];
        console.log(photo);

        const data = JSON.stringify({ data: { nin, photo } });
        const encryptedData = encrypt(data);
        return fetch(url + "/verify", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
    };
  },
};
