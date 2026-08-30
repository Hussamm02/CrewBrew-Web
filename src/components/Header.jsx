import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { brands } from '../data/mockData';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container header-content">
        <Link to="/" className="logo">
          Crew Brew
        </Link>
        <nav className="nav-links">
          {brands.slice(0, 4).map(brand => (
            <Link 
              key={brand.id} 
              to={`/brand/${brand.id}`}
              className={location.pathname.includes(`/brand/${brand.id}`) ? 'active' : ''}
            >
              {brand.name}
            </Link>
          ))}
        </nav>
        <button className="mobile-menu-btn">☰</button>
      </div>
    </header>
  );
};

export default Header;
