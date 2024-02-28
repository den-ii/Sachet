import Softkey from "../../components/softkey";

function Nav({ findScreen }) {
  return (
    <div>
      <div
        style={{
          height: 300,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src="/assets/images/nav_sachet_logo.svg" />
      </div>
      <Softkey
        left="Register"
        onKeyLeft={() => findScreen("register")}
        right="LogIn"
        onKeyRight={() => findScreen("login")}
      />
    </div>
  );
}

export default Nav;
