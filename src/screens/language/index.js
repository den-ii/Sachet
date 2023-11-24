import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Assuming you're using React Router

const LanguageSelection = () => {
  const history = useHistory();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const handleLanguageSelect = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSelectButtonClick = () => {
    if (selectedLanguage) {
      // Navigate to success screen (update the path accordingly)
      history.push('/success');
    } else {
      alert('Please select a language!');
    }
  };

  return (
    <div style={{
      backgroundColor: '#19332F',
      textAlign: 'center',
      color: '#FFF',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 700,
      lineHeight: '24px',
      textTransform: 'capitalize',
      padding: '20px'
    }}>
      <h2>Set Your Language</h2>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block' }}>
          <input
            type="radio"
            name="language"
            value="English"
            checked={selectedLanguage === 'English'}
            onChange={handleLanguageSelect}
          />
          English
        </label>
        {/* Repeat similar labels for other languages */}
        <label style={{ display: 'block' }}>
          <input
            type="radio"
            name="language"
            value="Yoruba"
            checked={selectedLanguage === 'Yoruba'}
            onChange={handleLanguageSelect}
          />
          Yoruba
        </label>
        {/* Add labels for other languages */}
      </div>
      <button
        style={{
          backgroundColor: '#19332F',
          color: '#FFF',
          fontSize: '16px',
          fontStyle: 'normal',
          fontWeight: 700,
          padding: '4px 8px',
          border: 'none'
        }}
        onClick={handleSelectButtonClick}
      >
        SELECT
      </button>
    </div>
  );
};

export default LanguageSelection;
