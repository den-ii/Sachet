import logo from './assets/images/logo.png';
// import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LanguageSelector from './screens/languageSelectorPage';
import SuccessPage from './screens/SuccessPage/SuccessPage';
import DataConsentPage from './screens/DataConsentPage/DataConsentPage';
import ConfirmAgreement from './screens/ConfirmAgreementPage/ConfirmAgreement';
import CreateAccount from './screens/CreateAccountPage/CreateAccount';
import VerifyIdentity from './screens/VerifyIdentityPage/VerifyIdentity';
import Otp from './screens/EnterOtpPage/Otp';
import OtpSuccess from './screens/OtpSuccessPage/OtpSuccess';
import PasswordSuccess from './screens/PasswordSuccessPage/PasswordSuccess';
import SetUpPassword from './screens/SetUpPasswordPage/SetUpPassword';
import Login from './screens/LoginPage/Login';
import ConfirmPicture from './screens/ConfirmPicturePage/ConfirmPicture';
import TakePhoto from './screens/TakePhotoPage/TakePhoto';
import Splash from './screens/Splash';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/language" element ={<LanguageSelector/>} />
      <Route path="/success" element ={<SuccessPage/>} />
      <Route path="/consent" element ={<DataConsentPage/>} />
      <Route path="/agree" element ={<ConfirmAgreement/>} />
      <Route path="/create" element ={<CreateAccount/>} />
      <Route path="/verify" element ={<VerifyIdentity/>} />
      <Route path="/otp" element ={<Otp/>} />
      <Route path="/otpsuccess" element ={<OtpSuccess/>} />
      <Route path="/passwordsuccess" element ={<PasswordSuccess/>} />
      <Route path="/setuppassword" element ={<SetUpPassword/>} />
      <Route path="/" element ={<Splash/>} />
      <Route path="/login" element ={<Login/>} />
      <Route path="/confirmpic" element ={<ConfirmPicture/>} />
      <Route path="/takePhoto" element ={<TakePhoto/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
