import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import SingleTextFooter from '../../components/SingleTextFooter/Footer';
import { languages } from '../../laguages';
import "./styles.css"
import {useNavigate} from "react-router-dom"
const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // You can perform additional actions when the language changes, if needed
  };

 

  return (
    <>
      <div className="languageContainerMain">
      
        <Header HeaderText="Set Your Language"/>
        <div className="languageSelectContainerMain">
          <div className="languageSelectContainer">
            {languages.map((language) => (
              <label key={language.type}>
                 {language.label}

                <input
                  nav-selectable="true"
                  type="radio"
                  value={language.value}
                  checked={selectedLanguage === language.value}
                  onChange={() => handleLanguageChange(language.value)}
                />
              
              </label>
            ))}
          </div>
        </div>
      <SingleTextFooter Text={'Select'}/>
      </div>
   
     
    </>
  );
};

export default LanguageSelector;
