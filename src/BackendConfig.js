import { encrypt } from "./encryption";

const apiUrls = {
  development: "http://localhost:3001",
  staging: "https://staging-api.getdevos.com",
  production: "https://api.getdevos.com",
};

const apiUrl = apiUrls[process.env.REACT_APP_NODE_ENV];

export const backendHeaders = () => {
  const token = localStorage.getItem("jwt");
  return {
    onlyJson: { "Content-Type": "application/json" },
    onlyAuth: {
      Authorization: `Bearer ${token}`,
    },
    auth_json: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
};

export const Backend = {
  sachet: () => {
    const url = apiUrl + "/auth/sachet";
    return {
      onboardSachetCustomer: ({ nin }, headers = backendHeaders().onlyJson) => {
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
        headers = backendHeaders().onlyJson
      ) => {
        const data = JSON.stringify({ data: { phoneNumber, password } });
        const encryptedData = encrypt(data);
        return fetch(url + "/password", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      login: (
        { phoneNumber, password },
        headers = backendHeaders().onlyJson
      ) => {
        const data = JSON.stringify({ data: { phone: phoneNumber, password } });
        const encryptedData = encrypt(data);
        return fetch(url + "/login", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      getCustomerDetails: (headers = backendHeaders().auth_json) => {
        return fetch(url + "/customer", {
          method: "GET",
          headers,
        });
      },
      verifyCustomer: (
        { nin, photo },
        headers = backendHeaders().auth_json
      ) => {
        photo = photo.split(";base64,")[1];

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
