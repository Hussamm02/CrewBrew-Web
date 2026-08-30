import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { brands, categories, products } from '../data/mockData';

const CategoryPage = () => {
  const { brandId, categoryId } = useParams();

  const brand = brands.find(b => b.id === brandId);
  const category = categories.find(c => c.id === categoryId);

  const categoryProducts = products.filter(
    p => p.brandId === brandId && p.categoryId === categoryId
  );

  if (!brand || !category) return <div className="container">Not found</div>;

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/brand/${brand.id}`}>{brand.name}</Link>
        <span>/</span>
        <span>{category.name}</span>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {brand.name} {category.name}
        </h1>
        <p>Showing {categoryProducts.length} products</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-3">
          {categoryProducts.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="card">
              <div className="card-img-wrapper">
                <img src={product.image} alt={product.name} className="card-img" />
              </div>
              <div className="card-content">
                <div className="card-subtitle">{brand.name}</div>
                <h3 className="card-title">{product.name}</h3>
                <div style={{ marginTop: '10px', fontWeight: '600', color: 'var(--color-gray-800)' }}>
                  {product.price}
                </div>
                <span className="card-action" style={{ marginTop: '20px' }}>View Details</span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: 'var(--color-gray-50)', borderRadius: 'var(--radius-md)' }}>
          <p>No products available in this category yet.</p>
          <Link to={`/brand/${brand.id}`} className="card-action" style={{ marginTop: '20px', display: 'inline-block' }}>
            Back to Categories
          </Link>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
