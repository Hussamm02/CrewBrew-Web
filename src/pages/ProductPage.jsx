import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, brands, categories } from '../data/mockData';
import WhatsAppButton from '../components/WhatsAppButton';

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id === productId);

  if (!product) return <div className="container">Product not found</div>;

  const brand = brands.find(b => b.id === product.brandId);
  const category = categories.find(c => c.id === product.categoryId);

  return (
    <div className="container">
      <div className="breadcrumbs">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to={`/brand/${brand?.id}`}>{brand?.name}</Link>
        <span>/</span>
        <Link to={`/brand/${brand?.id}/category/${category?.id}`}>{category?.name}</Link>
        <span>/</span>
        <span style={{ color: 'var(--color-black)' }}>{product.name}</span>
      </div>

      <div className="product-details">
        <div className="product-gallery">
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', maxWidth: '500px', objectFit: 'contain' }} 
          />
        </div>

        <div className="product-info">
          <div className="product-brand">{brand?.name}</div>
          <h1 className="product-title">{product.name}</h1>
          
          <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '20px' }}>
            {product.price}
          </div>
          
          <p>{product.description}</p>
          
          <div className="product-specs">
            <h3>Technical Specifications</h3>
            <table className="specs-table">
              <tbody>
                {Object.entries(product.specs).map(([key, value]) => (
                  <tr key={key}>
                    <td className="spec-label">{key}</td>
                    <td className="spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: '30px' }}>
            <WhatsAppButton productName={product.name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
