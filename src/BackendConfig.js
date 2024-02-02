import { encrypt } from "./encryption";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL;

const staticBackendFields = {
  token: undefined,
};
export class Backend {
  url = "";
  _headers = {};
  constructor() {
    this.url += apiUrl;
  }
  useJsonContent() {
    this._headers["Content-Type"] = "application/json";
    return this;
  }
  useAuth() {
    this._headers["Authorization"] = `Bearer ${staticBackendFields.token}`;
    return this;
  }
  useCustom(key, value) {
    this._headers[key] = value``;
    return this;
  }
  sachet() {
    this.url += "/auth/sachet";
    return {
      onboardSachetCustomer: ({ nin }) => {
        this.url += "/onboard";
        const data = JSON.stringify({ data: { nin } });
        const encryptedData = encrypt(data);
        return fetch(this.url, {
          method: "POST",
          headers: { ...this._headers },
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      createPassword: ({ userId, password }) => {
        const fullUrl = url + "/password";
        const data = JSON.stringify({ data: { userId, password } });
        const encryptedData = encrypt(data);
        return fetch(fullUrl, {
          method: "POST",
          headers,
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      login: ({ phoneNumber, password }) => {
        this.url += "/login";
        const data = JSON.stringify({ data: { phone: phoneNumber, password } });
        const encryptedData = encrypt(data);
        return fetch(this.url, {
          method: "POST",
          headers: { ...this._headers },
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      getCustomerDetails: ({ phoneNumber }) => {
        this.url += "/customer";
        const data = JSON.stringify({ data: { phoneNumber } });
        const encryptedData = encrypt(data);
        console.log(data);
        return fetch(this.url, {
          method: "GET",
          header: { ...this._headers },
          // body: JSON.stringify({ data: encryptedData }),
        });
      },
    };
  }
}
