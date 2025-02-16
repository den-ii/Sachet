import { useEffect, useState } from "react";
import "./styles.css";
import Softkey from "../../components/softkey";
import { Backend } from "../../BackendConfig";
import { decrypt } from "../../encryption";
import { TextSkeleton } from "../../components/skeletons";
import { AvatarSkeleton } from "../../components/skeletons";
import { userDetails } from "../../constants";

function Home({ findScreen, goLogin }) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState(
    JSON.parse(localStorage.getItem("customer")) ?? null
  );
  const [customerPhoto, setCustomerPhoto] = useState(
    localStorage.getItem("customerPhoto") ?? null
  );
  const [showPhoto, setShowPhoto] = useState(
    localStorage.getItem("customerPhoto") ? true : false
  );

  useEffect(() => {
    setPhoneNumber(userDetails.phoneNumber);
  }, []);

  useEffect(() => {
    if (customer) return;
    Backend.sachet()
      .getCustomerDetails()
      .then((res) => res.json())
      .then((data) => {
        const result = decrypt(JSON.stringify(data.data));
        if (!result.status) {
          if (result.data === "jwt expired") {
            return goLogin();
          }
          throw new Error(result.error);
        }
        let photo = _arrayBufferToBase64(result.data.photo.data);
        photo = window.atob(window.atob(photo));

        setCustomer(result.data);
        localStorage.setItem("customerPhoto", photo);
        localStorage.setItem("customer", JSON.stringify(result.data));
        setShowPhoto(true);
        setCustomerPhoto(photo);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [phoneNumber]);

  function _arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

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
          {showPhoto ? (
            <img
              src={"data:image/png;base64," + customerPhoto}
              style={{ objectFit: "cover" }}
              onError={(e) => setShowPhoto(false)}
            />
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
        {/* <li className="menu_item">
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
        </li> */}
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
