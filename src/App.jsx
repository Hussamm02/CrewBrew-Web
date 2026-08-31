import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

// We will create these components and pages next
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BrandPage from './pages/BrandPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="page-wrapper">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand/:brandId" element={<BrandPage />} />
            <Route path="/brand/:brandId/category/:categoryId" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Analytics />
    </Router>
  );
}

export default App;
