import "./styles.css"
function Home() {
  return (
    <div className="home">
      <div className="profile">
        <div className="profile__avatar"><img src="/assets/images/profile_doyle.svg"/></div>
        <div className="profile__details">
          <div className="name">Ireti Doyle</div>
          <div className="account_no">
            <span className="header">Tier 3 Account - </span>
            <span className="no">09059874509</span>
          </div>

        </div>
      </div>
      <ul className="menu">
        <li className="menu_item">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/personal_details.svg"/>
            </div>
            <div className="menu_item__details">
              <div className="heading">Personal Details</div>
              <div className="subtext__personal">Verified</div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
        <li className="menu_item">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/password_change.svg"/>
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
              <img src="/assets/images/phone_settings.svg"/>
            </div>
            <div className="menu_item__details">
              <div className="heading">Phone Settings</div>
              <div className="subtext">language, time & date, restore factory</div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
        <li className="menu_item">
          <div className="menu_item__container">
            <div className="menu_item__avatar">
              <img src="/assets/images/logo2.svg"/>
            </div>
            <div className="menu_item__details">
              <div className="heading">About Sachet</div>
              <div className="subtext">Verified</div>
            </div>
          </div>
          <div className="menu_item__border"></div>
        </li>
      </ul>

    </div>
  )
}

export default Home