/*
import React from 'react';
import { NavLink } from 'react-router-dom';

const ThemeSwitcher = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="theme-switcher">
      <NavLink to="#" onClick={toggleTheme} className="nav-link">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </NavLink>
    </div>
  );
};

export default ThemeSwitcher;
*/

// ThemeSwitcher.js

/*
import React from 'react';
import { NavLink } from 'react-router-dom';

const ThemeSwitcher = ({ toggleTheme, isDarkMode }) => {
  const handleToggleClick = (event) => {
    event.preventDefault(); // Prevent the default behavior (e.g., navigation)
    toggleTheme();
  };

  return (
    <div className="theme-switcher">
      <NavLink to="#" onClick={handleToggleClick} className="nav-link">
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </NavLink>
    </div>
  );
};

export default ThemeSwitcher;
*/
// ThemeSwitcher.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const ThemeSwitcher = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="theme-switcher">
      <NavLink
        to="#"
        onClick={(event) => {
          event.preventDefault();
          toggleTheme();
        }}
        className={`nav-link ${isDarkMode ? 'dark-mode-text' : ''}`}
      >
        {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </NavLink>
    </div>
  );
};

export default ThemeSwitcher;
