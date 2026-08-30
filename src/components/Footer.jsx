import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="logo" style={{ marginBottom: '1rem' }}>Crew Brew</h2>
        <p>Premium Coffee Tools</p>
        <p style={{ marginTop: '1rem', fontWeight: '500' }}>
          Online Store only based in Jordan (No physical showroom)
        </p>
        
        <div className="social-links">
          <a href="https://www.instagram.com/crewbrew_/" target="_blank" rel="noopener noreferrer">
            Follow us on Instagram
          </a>
        </div>
        
        <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'var(--color-gray-600)' }}>
          © {new Date().getFullYear()} Crew Brew Coffee Tools. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
