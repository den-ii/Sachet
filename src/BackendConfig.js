import { encrypt } from "./encryption";

const apiUrls = {
  development: "http://localhost:3333",
  staging: "https://staging-api.getdevos.com/sachet/v1",
  production: "https://api.getdevos.com/sachet/v1",
};
const url = apiUrls.staging;

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
    const enrollUrl = url + "/enrollment";
    const managementUrl = url + "/management";
    return {
      onboardSachetCustomer: ({ nin }, headers = backendHeaders().onlyJson) => {
        const data = JSON.stringify({ data: { nin } });
        const encryptedData = encrypt(data);
        return fetch(enrollUrl + "/onboard", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      verifyOtp: ({ nin, otp }, headers = backendHeaders().onlyJson) => {
        const data = JSON.stringify({ data: { nin, otp } });
        const encryptedData = encrypt(data);
        return fetch(enrollUrl + "/verify-otp", {
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
        return fetch(enrollUrl + "/password", {
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
        return fetch(managementUrl + "/login", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      getCustomerDetails: (headers = backendHeaders().auth_json) => {
        return fetch(managementUrl + "/customer", {
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
        return fetch(enrollUrl + "/verify", {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
    };
  },
};
