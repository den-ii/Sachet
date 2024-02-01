import { encrypt } from "./encryption";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "development"
    ? "http://localhost:3001"
    : process.env.REACT_APP_API_URL;

export class Backend {
  url = "";
  static token = undefined;
  #headers = {};
  constructor() {
    this.url += apiUrl;
  }
  useJsonContent() {
    this.#headers["Content-Type"] = "application/json";
    return this;
  }
  useAuth() {
    this.#headers["Authorization"] = `Bearer ${Backend.token}`;
    return this;
  }
  useCustom(key, value) {
    this.#headers[key] = value``;
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
          headers: { ...this.#headers },
          body: JSON.stringify({ data: encryptedData }),
        });
      },
      login: ({ phoneNumber, password }) => {
        this.url += "/login";
        console.log(this);
        const data = JSON.stringify({ data: { phone: phoneNumber, password } });
        console.log(data);
        const encryptedData = encrypt(data);
        console.log(this.#headers);
        return fetch(this.url, {
          method: "POST",
          header: { ...this.#headers },
          body: JSON.stringify({ data: encryptedData }),
        });
      },
    };
  }
}
