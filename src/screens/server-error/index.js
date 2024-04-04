import Softkey from "../../components/softkey";
import "./styles.css";

function ServerError({ goLogin }) {
  return (
    <>
      <div className="serverError">
        <div className="serverError_image">
          <img src="/assets/images/server_error.svg" />
        </div>
        <div className="server_info">
          <p className="heading">You encountered an error!</p>
          <p className="info">
            We're experiencing technical difficulties. Our team is on it.
          </p>
        </div>
      </div>
      <Softkey
        left="Back"
        onKeyLeft={goLogin}
        noCenter={true}
        fitContent={true}
        right="Contact Support"
      />
    </>
  );
}

export default ServerError;
