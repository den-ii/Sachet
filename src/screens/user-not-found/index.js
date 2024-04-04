import Softkey from "../../components/softkey";
import "./styles.css";

function UserNotFound({ goLogin }) {
  return (
    <>
      <div className="userNotFound">
        <div className="userNotFound_image">
          <img src="/assets/images/user_not_found.svg" />
        </div>
        <div className="userNotFound_info">
          <p className="heading">User Not Found!</p>
          <p className="info">
            We couldn't locate your account. Please verify the information
            provided or contact support for assistance.
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

export default UserNotFound;
