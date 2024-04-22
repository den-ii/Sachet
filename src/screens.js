import Splash from "./screens/Splash";
import DataConsent from "./screens/dataconsent/";
import ConfirmAgreement from "./screens/confirm-agreement";
import CreateAccount from "./screens/create-account";
import VerifyIdentity from "./screens/verify-identity";
import TakePhoto from "./screens/take-photo";
//import SmileTakePhoto from "./screens/smile-takephoto";
import Otp from "./screens/otp";
import VerificationStatus from "./screens/verification-status";
import PasswordSetup from "./screens/password-setup";
import LogIn from "./screens/login";
import Home from "./screens/home";
import Nav from "./screens/nav";
import Status from "./screens/status";
import PasswordSettings from "./screens/password-settings";
import ServerError from "./screens/server-error";
import NotFound from "./screens/user-not-found";
<<<<<<< HEAD
import ForgotPassword from "./screens/forgot-password";
=======
>>>>>>> 3dbbd3ebc829dc88dc4da94f486cc122c4f5422b

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
  // {
  //   header: false,
  //   component: ({ next, findScreen }) => (
  //     <SmileTakePhoto next={next} findScreen={findScreen} />
  //   ),
  // },
  {
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
      <Status next={next} findScreen={findScreen} />
    ),
  },
  {
    header: false,
    component: ({ next, back, findScreen }) => (
      <PasswordSetup next={next} back={back} findScreen={findScreen} />
    ),
  },
  {
    name: "login",
    header: false,
    component: ({ next, login, findScreen, goUserNotFound, goServerError }) => (
      <LogIn
        next={next}
        login={login}
        findScreen={findScreen}
        goUserNotFound={goUserNotFound}
        goServerError={goServerError}
      />
<<<<<<< HEAD
    ),
  },
  {
    name: "forgot-password",
    header: false,
    component: ({ findScreen, goUserNotFound, goServerError }) => (
      <ForgotPassword
        findScreen={findScreen}
        goUserNotFound={goUserNotFound}
        goServerError={goServerError}
      />
=======
>>>>>>> 3dbbd3ebc829dc88dc4da94f486cc122c4f5422b
    ),
  },
];

const registeredUserScreens = [
  {
    component: ({ next }) => <Splash next={next} />,
  },
  {
    name: "home",
    header: "Sachet",
    component: ({ findScreen }) => <Home findScreen={findScreen} />,
  },
  {
    name: "password-settings",
    header: false,
    component: ({ findScreen }) => <PasswordSettings findScreen={findScreen} />,
  },
];

const errorScreens = [
  {
    name: "not-found",
    component: ({ goLogin }) => <NotFound goLogin={goLogin} />,
  },
  {
    name: "server-error",
    component: ({ goLogin }) => <ServerError goLogin={goLogin} />,
  },
];

const withoutTCScreens = screens.slice(3);
withoutTCScreens.unshift(screens[0]);

const allScreen = localStorage.getItem("t&c") ? withoutTCScreens : screens;

export { allScreen, registeredUserScreens, errorScreens };
