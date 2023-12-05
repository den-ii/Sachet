import logo from '../../assets/images/logo.png';
import './styles.css';

function Splash() {
  return (
    <div className="splash">
      <div className="splash-img">
        <img src={logo} className="splash-logo" alt="logo" />
      </div>
    </div>
  );
}

export default Splash;