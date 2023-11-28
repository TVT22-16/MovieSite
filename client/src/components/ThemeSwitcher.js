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
