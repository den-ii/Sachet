import { useEffect, useState } from "react";
import "./styles.css";
import Softkey from "../../components/softkey";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import { TextSkeleton } from "../../components/skeletons";
import { AvatarSkeleton } from "../../components/skeletons";
import { userDetails } from "../../constants";

function Home({ findScreen }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState();

  useEffect(() => {
    setPhoneNumber(userDetails.phoneNumber);
  }, []);
  useEffect(() => {
    Backend.sachet()
      .getCustomerDetails()
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        console.log(data);
        if (!result.status) {
          throw new Error(result.error);
        }
        setCustomer(result.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [phoneNumber]);
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
        const attr = menuItems[i].getAttribute("name");
        if (attr) findScreen(menuItems[i].getAttribute("name"));
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
          {customer ? (
            <img src="/assets/images/profile_doyle.svg" />
          ) : (
            <AvatarSkeleton />
          )}
        </div>
        <div className="profile__details">
          {customer ? (
            <>
              <div className="name">{`${customer.firstName} ${customer.lastName}`}</div>
              <div className="account_no">
                <span className="header">Tier 3 Account - </span>
                <span className="no">{customer.phoneNumber}</span>
              </div>
            </>
          ) : (
            <div
              style={{
                display: "flex",
                height: "100%",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ marginBottom: 8 }}>
                <TextSkeleton />
              </div>

              <TextSkeleton height={10} borderRadius={3} />
            </div>
          )}
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
