import DotsLoader from "../dots-loader";
import "./styles.css";

function PopUpLoader({ text }) {
  return (
    <div className="popUpLoader">
      <div className="popUpLoader--leading">{text}</div>
      <div>
        <DotsLoader />
      </div>
    </div>
  );
}

export default PopUpLoader;
