import { useState, useEffect } from 'react';
import './../styles/header.css';
import CopyButton from './CopyButton';

const Header = ({ tempEmail }) => {
  return (
    <header className="header">
      <div className="header-container">
        <h4 className="logo">Temp Mail</h4>
        <div className="email-display">
          <span className="email-address">{tempEmail.address}</span>
          <CopyButton textToCopy={tempEmail.address} />
        </div>
      </div>
    </header>
  );
};

export default Header;