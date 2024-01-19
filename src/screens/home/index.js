import { useEffect } from "react";
import "./styles.css";
import Softkey from "../../components/softkey";

function Home({ findScreen }) {
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleUp = (evt, menuItems) => {
    evt.preventDefault();
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].classList.contains("item_active")) {
        menuItems[i].classList.remove("item_active");
        const prevIndex = i === 0 ? menuItems.length - 1 : i - 1;
        menuItems[prevIndex].classList.add("item_active");
        break;
      }
    }
  };

  const handleDown = (evt, menuItems) => {
    evt.preventDefault();
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].classList.contains("item_active")) {
        menuItems[i].classList.remove("item_active");
        const nextIndex = i === menuItems.length - 1 ? 0 : i + 1;
        menuItems[nextIndex].classList.add("item_active");
        break;
      }
    }
  };

  const handleEnter = (evt, menuItems) => {
    evt.preventDefault();
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i].classList.contains("item_active")) {
        console.log(menuItems[i].getAttribute("name"));
        findScreen(menuItems[i].getAttribute("name"));
        break;
      }
    }
  };

  const handleKeyDown = (evt) => {
    const menuItems = document.querySelectorAll(".menu_item");
    switch (evt.key) {
      case "ArrowUp":
        return handleUp(evt, menuItems);
      case "ArrowDown":
        return handleDown(evt, menuItems);
      case "Enter":
        return handleEnter(evt, menuItems);
      default:
        return;
    }
  };

  return (
    <div className="home">
      <div className="profile">
        <div className="profile__avatar">
          <img src="/assets/images/profile_doyle.svg" />
        </div>
        <div className="profile__details">
          <div className="name">Ireti Doyle</div>
          <div className="account_no">
            <span className="header">Tier 3 Account - </span>
            <span className="no">09059874509</span>
          </div>
        </div>
      </div>
      <ul className="menu">
        <li className="menu_item item_active">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/personal_details.svg" />
            </div>
            <div className="menu_item__details">
              <div className="heading">Personal Details</div>
              <div className="subtext__personal">Verified</div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
        <li className="menu_item" name="password-settings">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/password_change.svg" />
            </div>
            <div className="menu_item__details">
              <div className="heading">Password Settings</div>
              <div className="subtext">Change Password</div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
        <li className="menu_item">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/phone_settings.svg" />
            </div>
            <div className="menu_item__details">
              <div className="heading">Phone Settings</div>
              <div className="subtext">
                language, time & date, restore factory
              </div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
        <li className="menu_item">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/logo2.svg" />
            </div>
            <div className="menu_item__details">
              <div className="heading">About Sachet</div>
              <div className="subtext">Discover Sachet</div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
      </ul>
      <Softkey center="Select" />
    </div>
  );
}

export default Home;
