import React from 'react';
import { Link } from 'react-router-dom';
import { brands } from '../data/mockData';

const Home = () => {
  return (
    <div>
      <section className="hero">
        <div className="container">
          <h1>Minimal. Premium. Professional.</h1>
          <p>
            Curated selection of the finest coffee tools for professional baristas and home brewing enthusiasts. 
            Elevate your coffee experience.
          </p>
        </div>
      </section>

      <section className="container" style={{ marginBottom: '60px' }}>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>Featured Brands</h2>
        <div className="grid grid-3">
          {brands.map((brand) => (
            <Link to={`/brand/${brand.id}`} key={brand.id} className="card">
              <div className="card-img-wrapper">
                {/* Fallback pattern for brand logos */}
                <h3 style={{ fontSize: '2rem', color: 'var(--color-gray-400)' }}>{brand.name}</h3>
              </div>
              <div className="card-content">
                <h3 className="card-title">{brand.name}</h3>
                <span className="card-action">View Products</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
