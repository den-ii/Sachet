import Splash from "./screens/Splash";
import DataConsent from "./screens/dataconsent/";
import ConfirmAgreement from "./screens/confirm-agreement";
import CreateAccount from "./screens/create-account";
import VerifyIdentity from "./screens/verify-identity";
import TakePhoto from "./screens/take-photo";
//import SmileTakePhoto from "./screens/smile-takephoto";
import Otp from "./screens/otp";
import VerificationStatus from "./screens/verification-status";
import PasswordSetup from "./screens/password-setup/password";
import PasscodeStatus from "./screens/status/passcode_status";
import LogIn from "./screens/login";
import Home from "./screens/home";
import Nav from "./screens/nav";
import Status from "./screens/status";
import SuccessStatus from "./screens/status/status";
import PasswordSettings from "./screens/password-settings";
import ServerError from "./screens/server-error";
import NotFound from "./screens/user-not-found";
import ForgotPassword from "./screens/forgot-password";

const screens = [
  {
    name: "create-account",
    header: "Create Account",
    component: ({ next, back, findScreen }) => (
      <CreateAccount next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "register",
    header: "Data Consent Agreement",
    component: ({ next, back }) => <DataConsent next={next} back={back} />,
  },
  {
    header: "Confirm Agreement",
    component: ({ next, back, findScreen }) => (
      <ConfirmAgreement next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "verify-identity",
    header: "Verify Identity",
    component: ({ next, back, findScreen }) => (
      <VerifyIdentity next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "take-photo",
    header: false,
    component: ({ next, findScreen }) => (
      <TakePhoto next={next} findScreen={findScreen} />
    ),
  },
  {
    name: "verification-status",
    header: false,
    component: ({ next, back, findScreen }) => (
      <VerificationStatus next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "status",
    header: false,
    component: ({ next, findScreen }) => (
      <SuccessStatus next={next} findScreen={findScreen} />
    ),
  },
  {
    name: "passcode-status",
    header: false,
    component: ({ next, back, findScreen }) => (
      <PasscodeStatus next={next} findScreen={findScreen} />
    ),
  },
  {
    header: false,
    component: ({ next, back, findScreen }) => <Otp next={next} back={back} />,
  },
  {
    name: "password-setup",
    header: false,
    component: ({ next, back, findScreen }) => (
      <PasswordSetup next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "login",
    header: false,
    component: ({ next, login, findScreen }) => (
      <LogIn next={next} login={login} findScreen={findScreen} />
    ),
  },
  {
    name: "forgot-password",
    header: false,
    component: ({ findScreen }) => <ForgotPassword findScreen={findScreen} />,
  },
  {
    name: "not-found",
    component: ({ goLogin }) => <NotFound goLogin={goLogin} />,
  },
  {
    name: "server-error",
    component: ({ goLogin }) => <ServerError goLogin={goLogin} />,
  },
];

const registeredUserScreens = [
  {
    component: ({ next }) => <Splash next={next} />,
  },
  {
    name: "home",
    header: "Sachet",
    component: ({ findScreen, goLogin }) => (
      <Home findScreen={findScreen} goLogin={goLogin} />
    ),
  },
  {
    name: "password-settings",
    header: false,
    component: ({ findScreen }) => <PasswordSettings findScreen={findScreen} />,
  },
  {
    name: "not-found",
    component: ({ goLogin }) => <NotFound goLogin={goLogin} />,
  },
  {
    name: "server-error",
    component: ({ goLogin }) => <ServerError goLogin={goLogin} />,
  },
];

// const errorScreens = [];

const withoutTCScreens = screens.slice(3);
withoutTCScreens.unshift(screens[0]);

const allScreen = localStorage.getItem("t&c") ? withoutTCScreens : screens;

export { allScreen, registeredUserScreens };
