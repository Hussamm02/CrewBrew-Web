import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { brands, categories } from '../data/mockData';

const BrandPage = () => {
  const { brandId } = useParams();
  const brand = brands.find(b => b.id === brandId);

  if (!brand) {
    return <div className="container">Brand not found</div>;
  }

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{brand.name}</span>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>{brand.name}</h1>
        <p>Explore our selection of {brand.name} coffee tools.</p>
      </div>

      <h2 style={{ marginBottom: '20px' }}>Categories</h2>
      <div className="grid grid-4">
        {categories.map((category) => (
          <Link 
            to={`/brand/${brand.id}/category/${category.id}`} 
            key={category.id} 
            className="card"
          >
            <div className="card-img-wrapper" style={{ aspectRatio: '16/9' }}>
              <h3 style={{ color: 'var(--color-gray-500)' }}>{category.name}</h3>
            </div>
            <div className="card-content">
              <h3 className="card-title">{category.name}</h3>
              <span className="card-action">Explore</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BrandPage;
