/**
 * CrewBrew Storefront (script.js)
 * Read-only dynamic storefront — fetches products, brands, categories from dbService.
 * Zero admin code. Admin lives in admin.html.
 */

const dbService = window.dbService;

window.getFallbackImage = function (product, brandName) {
  let folder = 'brands';
  const bName = (brandName || '').toLowerCase();
  if (bName.includes('timemore')) folder = 'Timemore';
  else if (bName.includes('bomber')) folder = 'MHW-3Bomber';
  else if (bName.includes('aeropress')) folder = 'Aeropress';
  else if (bName.includes('bunn')) folder = 'BUNN';
  else if (bName.includes('cafec')) folder = 'Cafec';
  else if (bName.includes('chemix')) folder = 'Chemix';
  else if (bName.includes('toddy')) folder = 'Toddy';
  else if (bName.includes('barista space')) folder = 'Barista Space';
  else if (bName.includes('artisan')) folder = 'Barista artisan';
  else if (bName.includes('paragon')) folder = 'Nucleus paragon';

  let filename = '';
  if (product.image) {
    const parts = product.image.split('/');
    filename = parts[parts.length - 1];
  } else {
    filename = product.name + '.webp';
  }
  return encodeURI(`${folder}/${filename}`);
};

function safeImg(src) {
  if (!src) return '';
  if (src.startsWith('data:') || src.startsWith('http://') || src.startsWith('https://')) return src;
  return encodeURI(src);
}



const appRoot = document.getElementById('app-root');

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();

// =========================================================
// MOTION OBSERVERS & SCROLL LISTENERS
// =========================================================
let revealObserver = null;
// =========================================================
// FEATURED GEAR SLIDER LOGIC - REMOVED
// =========================================================

function initObservers() {
  if (revealObserver) revealObserver.disconnect();
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
  document.querySelectorAll('[data-reveal], .card').forEach(el => revealObserver.observe(el));
}

const headerEl = document.querySelector('.header');
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (headerEl) {
        if (scrollY > 50) headerEl.classList.add('scrolled');
        else headerEl.classList.remove('scrolled');
      }
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg && scrollY < window.innerHeight && !prefersReducedMotion) {
        heroBg.style.transform = `translateY(${scrollY * 0.2}px)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });


// =========================================================
// SHARED NAVIGATION
// =========================================================
const brewingEquipmentNav = [
  { name: 'Brewers / Drippers', href: '#/category/drippers' },
  { name: 'AeroPress', href: '#/brand/aeropress' },
  { name: 'Cold Brew Essentials', href: '#/collections/cold-brew' },
  { name: 'Kettles', href: '#/category/kettles' },
  { name: 'Scales', href: '#/category/scales' }
];

async function renderDesktopNav() {
  const setupDropdown = (trigger, wrapper) => {
    const toggleMenu = (force) => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      const nextState = force !== undefined ? force : !isExpanded;
      trigger.setAttribute('aria-expanded', String(nextState));
    };

    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      toggleMenu();
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });

    wrapper.addEventListener('mouseenter', () => toggleMenu(true));
    wrapper.addEventListener('mouseleave', () => toggleMenu(false));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
        trigger.focus();
      }
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) toggleMenu(false);
    });
  };

  // Brewing Equipment dropdown
  const equipMenu = document.getElementById('brewing-equipment-menu');
  const equipTrigger = document.getElementById('brewing-equipment-trigger');
  const equipWrapper = document.getElementById('brewing-equipment-dropdown-wrapper');
  if (equipMenu && equipTrigger && equipWrapper) {
    equipMenu.innerHTML = '';
    brewingEquipmentNav.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.textContent = item.name;
      a.role = 'menuitem';
      equipMenu.appendChild(a);
    });
    setupDropdown(equipTrigger, equipWrapper);
  }

  // Brands dropdown
  const brandsMenu = document.getElementById('brands-menu');
  const brandsTrigger = document.getElementById('brands-trigger');
  const brandsWrapper = document.getElementById('brands-dropdown-wrapper');
  if (brandsMenu && brandsTrigger && brandsWrapper) {
    brandsMenu.innerHTML = '<div style="color:var(--color-gray); padding:10px;">Loading...</div>';
    let brands = [];
    try {
      brands = await dbService.getBrands();
    } catch(err) {
      console.error(err);
    }
    brandsMenu.innerHTML = '';
    brands.forEach(b => {
      const a = document.createElement('a');
      a.href = `#/brand/${b.id}`;
      a.textContent = b.name;
      a.role = 'menuitem';
      brandsMenu.appendChild(a);
    });
    const viewAll = document.createElement('a');
    viewAll.href = '#/brands';
    viewAll.textContent = 'View All Brands';
    viewAll.role = 'menuitem';
    viewAll.style.fontWeight = '600';
    viewAll.style.borderTop = '1px solid rgba(255,255,255,0.1)';
    brandsMenu.appendChild(viewAll);
    setupDropdown(brandsTrigger, brandsWrapper);
  }
}

// =========================================================
// SIDEBAR
// =========================================================
async function renderSidebar() {
  const sidebarLinks = document.getElementById('sidebar-links');
  if (!sidebarLinks) return;
  sidebarLinks.innerHTML = '<div style="color: var(--color-gray); padding: 10px; font-size:0.9rem;">Loading brands...</div>';
  let brands = [];
  try {
    brands = await dbService.getBrands();
  } catch (err) {
    console.error('Failed to load brands for sidebar:', err);
    sidebarLinks.innerHTML = `<div style="color:var(--color-espresso); padding:10px; font-size:0.9rem;">Unable to load brands.</div>`;
    return;
  }
  sidebarLinks.innerHTML = '';
  
  // Brewing Equipment Dropdown
  const equipTitle = document.createElement('button');
  equipTitle.className = 'sidebar-link sidebar-dropdown-btn';
  equipTitle.innerHTML = `Brewing Equipment <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  
  const equipSubmenu = document.createElement('div');
  equipSubmenu.className = 'sidebar-submenu';
  equipSubmenu.style.display = 'none';

  equipTitle.addEventListener('click', () => {
    const isExpanded = equipSubmenu.style.display === 'flex';
    equipSubmenu.style.display = isExpanded ? 'none' : 'flex';
    equipTitle.setAttribute('aria-expanded', !isExpanded);
  });

  sidebarLinks.appendChild(equipTitle);
  sidebarLinks.appendChild(equipSubmenu);

  brewingEquipmentNav.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'sidebar-sublink';
    a.textContent = item.name;
    equipSubmenu.appendChild(a);
  });

  const divider = document.createElement('div');
  divider.className = 'sidebar-links-divider';
  sidebarLinks.appendChild(divider);

  // Brands Dropdown
  const brandsTitle = document.createElement('button');
  brandsTitle.className = 'sidebar-link sidebar-dropdown-btn';
  brandsTitle.innerHTML = `Brands <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="dropdown-chevron"><polyline points="6 9 12 15 18 9"></polyline></svg>`;
  
  const brandsSubmenu = document.createElement('div');
  brandsSubmenu.className = 'sidebar-submenu';
  brandsSubmenu.style.display = 'none';

  brandsTitle.addEventListener('click', () => {
    const isExpanded = brandsSubmenu.style.display === 'flex';
    brandsSubmenu.style.display = isExpanded ? 'none' : 'flex';
    brandsTitle.setAttribute('aria-expanded', !isExpanded);
  });

  sidebarLinks.appendChild(brandsTitle);
  sidebarLinks.appendChild(brandsSubmenu);

  brands.forEach(brand => {
    const a = document.createElement('a');
    a.href = `#/brand/${brand.id}`;
    a.className = 'sidebar-sublink';
    a.textContent = brand.name;
    brandsSubmenu.appendChild(a);
  });
  
  const viewAllBrands = document.createElement('a');
  viewAllBrands.href = '#/brands';
  viewAllBrands.className = 'sidebar-sublink';
  viewAllBrands.textContent = 'View All Brands';
  viewAllBrands.style.fontWeight = '600';
  brandsSubmenu.appendChild(viewAllBrands);

  // Additional Nav Links
  const navDivider = document.createElement('div');
  navDivider.className = 'sidebar-links-divider';
  sidebarLinks.appendChild(navDivider);

  const directLinks = [
    { name: 'Accessories', href: '#/category/accessories' },
    { name: 'About Us', href: '#/about' },
    { name: 'Contact', href: '#/contact' },
    { name: 'Privacy Policy', href: '#/privacy' }
  ];

  directLinks.forEach(item => {
    const a = document.createElement('a');
    a.href = item.href;
    a.className = 'sidebar-link';
    a.textContent = item.name;
    sidebarLinks.appendChild(a);
  });
}

// =========================================================
// PRODUCT CARD TEMPLATE
// =========================================================
function productCard(product, brandName) {
  const safeSrc = safeImg(product.image);
  const fallbackSrc = window.getFallbackImage(product, brandName);
  const stockStatus = product.stockStatus || product.stock_status || 'In Stock';
  const isOutOfStock = stockStatus === 'Out of Stock';
  
  return `
    <a href="#/product/${product.id}" class="card" data-reveal="up">
      <div class="card-img-wrapper">
        <img src="${safeSrc || fallbackSrc}" onerror="this.onerror=null; this.src='${fallbackSrc}';" onload="this.classList.add('loaded');" alt="${product.name}" class="card-img" />
      </div>
      <div class="card-content">
        <div class="card-subtitle">${brandName}</div>
        <h3 class="card-title">${product.name}</h3>
        <div class="card-footer-wrapper">
          <div class="card-price">${product.price}</div>
          ${isOutOfStock ? `<span class="stock-label out-of-stock">Out of Stock</span>` : `<span class="stock-label in-stock">In Stock</span>`}
          <div class="card-action">View Product</div>
        </div>
      </div>
    </a>
  `;
}

// =========================================================
// HOME PAGE
// =========================================================
async function renderHome() {
  let brands = [], categories = [], products = [];
  try {
    brands = await dbService.getBrands();
    categories = await dbService.getCategories();
    products = await dbService.getProducts();
  } catch (err) {
    console.error('Failed to load home data:', err);
    appRoot.innerHTML = `<div class="container section-padding" style="color:#f87171; text-align:center;"><h2>Unable to load catalog</h2><p>Please check your connection. (${err.message})</p></div>`;
    return;
  }


  // Brands Strip
  let brandsStripInnerHtml = '';
  const categoryNamesNormalized = categories.map(c => c.name.toLowerCase().replace(/\s+/g, ''));
  categoryNamesNormalized.push('coldbrewcoffee', 'coldbrew');

  const validBrandsForMarquee = brands.filter(brand => {
    const normalizedBrandName = brand.name.toLowerCase().replace(/\s+/g, '');
    const isCategoryCollision = categoryNamesNormalized.includes(normalizedBrandName);
    const isGeneric = normalizedBrandName === 'generic';
    return !isCategoryCollision && !isGeneric;
  });

  validBrandsForMarquee.forEach(brand => {
    if (brand.image && brand.image.trim() !== '') {
      brandsStripInnerHtml += `
        <a href="#/brand/${brand.id}" class="brand-logo-item" aria-label="${brand.name}">
          <img src="${safeImg(brand.image)}" alt="${brand.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
          <span style="display:none; font-weight: 700; text-transform: uppercase; color: var(--color-gray); letter-spacing: 1px; font-size: 1.2rem; white-space: nowrap;">${brand.name}</span>
        </a>
      `;
    } else {
      brandsStripInnerHtml += `
        <a href="#/brand/${brand.id}" class="brand-logo-item no-logo" aria-label="${brand.name}" style="text-decoration:none;">
          <span style="font-weight: 700; text-transform: uppercase; color: var(--color-gray); letter-spacing: 1px; font-size: 1.2rem; white-space: nowrap;">${brand.name}</span>
        </a>
      `;
    }
  });
  const brandsStripHtml = `
    <div class="brand-strip-track">
      ${brandsStripInnerHtml}
      <div aria-hidden="true" style="display:flex;">
        ${brandsStripInnerHtml}
      </div>
    </div>
  `;

  function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  let storedLatestIds = null;
  try {
    storedLatestIds = JSON.parse(sessionStorage.getItem('crewbrew_latest_arrivals'));
  } catch (e) {}

  let latestProducts = [];

  if (storedLatestIds && Array.isArray(storedLatestIds) && storedLatestIds.length > 0) {
    latestProducts = storedLatestIds.map(id => products.find(p => p.id === id)).filter(p => p);
    if (latestProducts.length < Math.min(4, products.length)) {
      latestProducts = []; // reset if data changed heavily
    }
  }

  if (latestProducts.length === 0) {
    let sortedProducts = [...products];
    if (sortedProducts.some(p => p.created_at || p.createdAt)) {
      sortedProducts.sort((a, b) => {
        const timeA = new Date(a.created_at || a.createdAt || 0).getTime();
        const timeB = new Date(b.created_at || b.createdAt || 0).getTime();
        return timeB - timeA; // Newest first
      });
    }
    const candidatePool = sortedProducts.slice(0, 24);
    const shuffledCandidates = shuffleArray([...candidatePool]);
    latestProducts = shuffledCandidates.slice(0, 4); // Display exactly 4
    
    try {
      sessionStorage.setItem('crewbrew_latest_arrivals', JSON.stringify(latestProducts.map(p => p.id)));
    } catch (e) {}
  }
  let latestHtml = '';
  latestProducts.forEach(product => {
    const brand = brands.find(b => b.id === (product.brandId || product.brand_id)) || { name: '' };
    latestHtml += productCard(product, brand.name);
  });

  appRoot.innerHTML = `
    <div class="page-transition">
      <!-- 1. HERO -->
      <section class="hero">
        <img src="New-Video.webp" class="hero-bg-video" alt="Hero background" aria-hidden="true" />
        <div class="hero-overlay"></div>
        <div class="container">
          <h1 data-reveal="up" class="stagger-1">Brew Better.<br/>Every Detail Matters.</h1>
          <p data-reveal="up" class="stagger-2">Premium coffee tools for home brewers, baristas, and people who take coffee seriously.</p>
          <div class="hero-actions stagger-3" data-reveal="up">
            <a href="#/brewing-equipment" class="hero-btn">Shop Equipment</a>
            <a href="#/brands" class="btn-secondary">Explore Brands</a>
          </div>
        </div>
      </section>
      
      <!-- 2. BRAND MARQUEE -->
      <div class="brand-strip">
        ${brandsStripHtml}
      </div>

      <!-- 3. BRAND STORY / OUR APPROACH -->
      <section class="brand-story-section section-padding">
        <div class="container">
          <div class="brand-story-grid">
            <div class="brand-story-image" data-reveal="up">
              <img src="home-coffee-corner.webp" alt="Better Brewing" onerror="this.src='coffee_bg.webp'" />
            </div>
            <div class="brand-story-content" data-reveal="up" style="transition-delay: 0.2s;">
              <span class="eyebrow">OUR APPROACH</span>
              <h2>Built for Better Brewing</h2>
              <p>We curate carefully selected coffee tools that combine precision, quality, and beautiful design for people who value the ritual as much as the result.</p>
              <a href="#/brands" class="btn-outline-dark" style="margin-top: 20px;">Explore Our Brands &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. EDITORIAL BANNER -->
      <section class="editorial-banner">
        <img src="coffee-brewing-setup.webp" class="editorial-banner-bg" alt="Coffee Setup" onerror="this.style.display='none'" />
        <div class="editorial-banner-overlay"></div>
        <div class="container editorial-banner-content">
          <span class="eyebrow" data-reveal="up">THE RITUAL</span>
          <h2 data-reveal="up" class="stagger-1">Tools chosen for the ritual, not just the result.</h2>
          <a href="#/brewing-equipment" class="btn-secondary stagger-2" data-reveal="up" style="margin-top: 10px;">Explore Equipment &rarr;</a>
        </div>
      </section>

      <!-- 5. SHOP BY PURPOSE -->
      <section class="shop-by-purpose-section section-padding">
        <div class="container">
          <h2 class="section-title" data-reveal="up">Shop by Purpose</h2>
          <div class="purpose-grid">
            <a href="#/brewing-equipment" class="purpose-card" data-reveal="up">
              <div class="purpose-card-bg">
                <img src="home-coffee-corner.webp" alt="For Home Brewers" onerror="this.src='coffee_bg.webp';" />
                <div class="purpose-overlay"></div>
              </div>
              <div class="purpose-card-content">
                <h3>For Home Brewers</h3>
                <p>Thoughtfully selected gear for better coffee at home.</p>
                <span class="purpose-cta">Explore Home Brewing &rarr;</span>
              </div>
            </a>
            <a href="#/category/accessories" class="purpose-card" data-reveal="up" style="transition-delay: 0.2s;">
              <div class="purpose-card-bg">
                <img src="barista-cafe-tools-scene.webp" alt="For Baristas" onerror="this.src='coffee_bg.webp';" />
                <div class="purpose-overlay"></div>
              </div>
              <div class="purpose-card-content">
                <h3>For Baristas</h3>
                <p>Professional tools designed for consistency, workflow, and craft.</p>
                <span class="purpose-cta">Explore Barista Tools &rarr;</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- 6. LATEST ARRIVALS -->
      <section class="section-padding" style="background-color: var(--color-warm-cream);">
        <div class="container">
          <h2 class="section-title" data-reveal="up">Latest Arrivals</h2>
          <div class="grid grid-4">
            ${latestHtml}
          </div>
          <div style="text-align: center; margin-top: 50px;" data-reveal="up">
            <a href="#/brewing-equipment" class="btn-outline-dark">View All Products &rarr;</a>
          </div>
        </div>
      </section>

      <!-- 7. WHY CREWBREW -->
      <section class="why-crewbrew-section section-padding">
        <div class="container">
          <h2 class="section-title" data-reveal="up" style="text-align: center; margin-bottom: 50px;">Why CrewBrew</h2>
          <div class="why-crewbrew-grid">
            <div class="why-card" data-reveal="up">
              <div class="why-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
              <h3 class="why-title">Curated Coffee Equipment</h3>
              <p class="why-desc">Carefully selected tools for better brewing.</p>
            </div>
            <div class="why-card" data-reveal="up" style="transition-delay: 0.1s;">
              <div class="why-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
              </div>
              <h3 class="why-title">Trusted Brands</h3>
              <p class="why-desc">Equipment from recognized coffee brands.</p>
            </div>
            <div class="why-card" data-reveal="up" style="transition-delay: 0.2s;">
              <div class="why-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <h3 class="why-title">Based in Jordan</h3>
              <p class="why-desc">Built for coffee lovers in Jordan.</p>
            </div>
            <div class="why-card" data-reveal="up" style="transition-delay: 0.3s;">
              <div class="why-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <h3 class="why-title">Direct Support</h3>
              <p class="why-desc">Easy contact and ordering through WhatsApp.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

// =========================================================
// BRAND PAGE
// =========================================================
async function renderBrand(brandId) {
  let brand = null, products = [];
  try {
    brand = await dbService.getBrandById(brandId);
    if (!brand) {
      appRoot.innerHTML = '<div class="container section-padding">Brand not found</div>';
      return;
    }
    products = await dbService.getProducts({ brandId });
  } catch (err) {
    console.error('Failed to load brand data:', err);
    appRoot.innerHTML = `<div class="container section-padding" style="color:#f87171; text-align:center;"><h2>Unable to load brand</h2><p>${err.message}</p></div>`;
    return;
  }
  let productsHtml = '';
  if (products.length === 0) {
    productsHtml = '<div style="color: var(--color-gray); padding: 40px; text-align: center; grid-column: 1/-1;">No products found for this brand yet.</div>';
  } else {
    products.forEach(p => {
      productsHtml += productCard(p, brand.name);
    });
  }

  appRoot.innerHTML = `
    <div class="container page-transition section-padding">
      <div class="breadcrumbs">
        <a href="#/">Home</a> <span>/</span> <span>${brand.name}</span>
      </div>
      <h1 style="font-size: 2.2rem; margin-bottom: 40px; display: flex; align-items: center; gap: 20px;">
        ${brand.image ? `<img src="${safeImg(brand.image)}" alt="${brand.name}" style="max-height: 40px; object-fit:contain;" />` : ''}
        ${brand.name}
      </h1>
      <div class="grid grid-4">
        ${productsHtml}
      </div>
    </div>
  `;
}

// =========================================================
// CATEGORY PAGE
// =========================================================
async function renderCategory(categoryId) {
  // Original router handled #/brand/:brandId/category/:categoryId, but let's make it more generic
  let category = null, products = [], allBrands = [];
  try {
    const categories = await dbService.getCategories();
    category = categories.find(c => c.id === categoryId) || { name: 'Category' };
    products = await dbService.getProducts({ categoryId });
    allBrands = await dbService.getBrands();
  } catch (err) {
    console.error('Failed to load category data:', err);
    appRoot.innerHTML = `<div class="container section-padding" style="color:#f87171; text-align:center;"><h2>Unable to load category</h2><p>${err.message}</p></div>`;
    return;
  }

  let productsHtml = '';
  if (products.length === 0) {
    productsHtml = '<div style="color: var(--color-gray); padding: 40px; text-align: center; grid-column: 1/-1;">No products found.</div>';
  } else {
    products.forEach(p => {
      const b = allBrands.find(br => br.id === (p.brandId || p.brand_id)) || { name: '' };
      productsHtml += productCard(p, b.name);
    });
  }

  appRoot.innerHTML = `
    <div class="container page-transition section-padding">
      <div class="breadcrumbs">
        <a href="#/">Home</a> <span>/</span> <span>${category.name}</span>
      </div>
      <h1 style="font-size: 2.2rem; margin-bottom: 40px;">${category.name}</h1>
      <div class="grid grid-4">
        ${productsHtml}
      </div>
    </div>
  `;
}

// =========================================================
// SINGLE PRODUCT PAGE
// =========================================================
async function renderProduct(productId) {
  window.currentProductPageQty = 1;
  window.currentProduct = null;
  let product = null, brand = { name: '', id: '' };
  try {
    product = await dbService.getProductById(productId);
    if (!product) {
      appRoot.innerHTML = '<div class="container section-padding">Product not found</div>';
      return;
    }
    window.currentProduct = product;
    brand = await dbService.getBrandById(product.brandId || product.brand_id) || { name: '', id: '' };

  } catch (err) {
    console.error('Failed to load product data:', err);
    appRoot.innerHTML = `<div class="container section-padding" style="color:#f87171; text-align:center;"><h2>Unable to load product</h2><p>${err.message}</p></div>`;
    return;
  }

  const stockStatus = product.stockStatus || product.stock_status || 'In Stock';
  const isOutOfStock = stockStatus === 'Out of Stock';

  const safeSrc = safeImg(product.image);
  const fallbackSrc = window.getFallbackImage(product, brand.name);

  const phoneNumber = '962792801376';
  const qty = window.currentProductPageQty || 1;
  const message = encodeURIComponent(`Hello CrewBrew! I would like to order: ${qty}x ${product.name} (${product.price})`);
  const waLink = `https://wa.me/${phoneNumber}?text=${message}`;

  let specsRowsHtml = '';
  const specsObj = product.specs || {};
  for (const [key, value] of Object.entries(specsObj)) {
    specsRowsHtml += `
      <tr>
        <td class="spec-label">${key}</td>
        <td class="spec-value">${value}</td>
      </tr>
    `;
  }
  if (specsRowsHtml === '') {
    specsRowsHtml = '<tr><td colspan="2" style="color: var(--color-gray);">No detailed specs available.</td></tr>';
  }



  appRoot.innerHTML = `
    <div class="container page-transition section-padding">
      <div class="breadcrumbs">
        <a href="#/">Home</a> <span>/</span>
        <a href="#/brand/${brand.id}">${brand.name}</a> <span>/</span>
        <span>${product.name}</span>
      </div>
      <div class="product-details">
        <div class="product-gallery">
          <img id="main-product-img" src="${safeSrc || fallbackSrc}" onerror="this.onerror=null; this.src='${fallbackSrc}';" onload="this.classList.add('loaded')" alt="${product.name}" style="width: 100%; object-fit: contain;" />
        </div>
        <div class="product-info">
          <div class="product-brand">${brand.name}</div>
          <h1 class="product-title">${product.name}</h1>
          <div id="product-main-price" class="product-price">${product.price}</div>
          
          <div style="margin-bottom: 20px;">
            ${isOutOfStock ? `<span class="stock-label out-of-stock">Out of Stock</span>` : `<span class="stock-label in-stock">In Stock</span>`}
          </div>

          <p style="line-height: 1.8; color: var(--color-gray); margin-bottom: 30px; font-size: 1.05rem;">${product.description}</p>


          <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 40px;">
            <div class="product-qty-selector">
              <span class="product-qty-label">Quantity:</span>
              <button class="product-qty-btn" onclick="updateProductPageQty(-1)">-</button>
              <span class="product-qty-value" id="product-page-qty">1</span>
              <button class="product-qty-btn" onclick="updateProductPageQty(1)">+</button>
            </div>

            <button id="add-to-cart-btn" class="btn-primary" onclick="addToCart('${product.id}')" ${isOutOfStock ? 'disabled style="opacity:0.5; pointer-events:none;"' : ''} style="width: 100%;">
              ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>

            <a id="whatsapp-buy-btn" href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-outline-dark" ${isOutOfStock ? 'style="opacity:0.5; pointer-events:none;"' : ''} style="width: 100%;">
              Buy Now via WhatsApp
            </a>
          </div>
          
          <div class="product-specs">
            <h3>Technical Specifications</h3>
            <table class="specs-table">
              <tbody>
                ${specsRowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;}

// =========================================================
// COLD BREW COLLECTION PAGE
// =========================================================
async function renderColdBrewCollection() {
  let products = [], brands = [], categories = [];
  try {
    products = await dbService.getProducts();
    brands = await dbService.getBrands();
    categories = await dbService.getCategories();
  } catch (err) {
    console.error('Failed to load collection data:', err);
    appRoot.innerHTML = `<div class="container section-padding" style="color:#f87171; text-align:center;"><h2>Unable to load collection</h2><p>${err.message}</p></div>`;
    return;
  }
  
  // Dynamically find the Cold Brew category by name
  const coldBrewCategory = categories.find(c => c.name && c.name.trim().toLowerCase() === 'cold brew');
  
  let coldBrewProducts = [];
  if (coldBrewCategory) {
    const cid = coldBrewCategory.id;
    coldBrewProducts = products.filter(p => p.categoryId === cid || p.category_id === cid);
  }

  let productsHtml = '';
  if (coldBrewProducts.length === 0) {
    productsHtml = '<div style="color: var(--color-gray); padding: 40px; text-align: center; grid-column: 1/-1;">Cold Brew products are coming soon.</div>';
  } else {
    coldBrewProducts.forEach(p => {
      const brand = brands.find(b => b.id === (p.brandId || p.brand_id)) || { name: '' };
      productsHtml += productCard(p, brand.name);
    });
  }

  appRoot.innerHTML = `
    <div class="container page-transition section-padding">
      <div class="breadcrumbs">
        <a href="#/">Home</a> <span>/</span> <span>Cold Brew Essentials</span>
      </div>
      
      <div style="background-color: var(--color-pure-white); border: 1px solid var(--color-light-border); border-radius: var(--radius-md); padding: 60px 40px; text-align: center; margin-bottom: 50px;">
        <h1 style="font-size: 2.8rem; margin-bottom: 20px;">Cold Brew Essentials</h1>
        <p style="color: var(--color-gray); font-size: 1.1rem; max-width: 600px; margin: 0 auto;">
          Everything you need to craft smooth, low-acidity cold brew coffee at home or in your cafe.
        </p>
      </div>

      <div class="grid grid-4">
        ${productsHtml}
      </div>
    </div>
  `;
}

// =========================================================
// ABOUT & CONTACT
// =========================================================
function renderAbout() {
  appRoot.innerHTML = `
    <div class="container page-transition section-padding" style="max-width: 800px; margin: 0 auto; text-align: center;">
      <h1 style="font-size: 3rem; margin-bottom: 30px;">About CrewBrew</h1>
      <p style="font-size: 1.2rem; color: var(--color-gray); line-height: 1.8; margin-bottom: 50px;">
        Welcome to CrewBrew Coffee Tools. We are an exclusive boutique based in Jordan, dedicated to elevating the coffee experience for professional baristas and passionate home brewers alike.
      </p>
      <div style="background-color: var(--color-pure-white); padding: 50px; border-radius: var(--radius-md); border: 1px solid var(--color-light-border); text-align: left;">
        <h2 style="margin-bottom: 20px;">Our Mission</h2>
        <p style="color: var(--color-gray); line-height: 1.8; font-size: 1.05rem;">
          We believe that great coffee requires great tools. Our mission is to carefully curate and provide the highest quality coffee equipment from world-renowned brands like Timemore, Barista Space, AeroPress, MHW-3Bomber, and more.
        </p>
      </div>
    </div>
  `;
}

function renderContact() {
  appRoot.innerHTML = `
    <div class="container page-transition section-padding" style="max-width: 900px; margin: 0 auto; text-align: center;">
      <h1 style="font-size: 3rem; margin-bottom: 30px;">Contact Us</h1>
      <p style="font-size: 1.2rem; color: var(--color-gray); line-height: 1.8; margin-bottom: 50px;">
        We operate exclusively as an online store in Jordan. All orders and inquiries are handled directly to ensure a personalized, premium experience.
      </p>
      <div class="grid grid-2" style="text-align: left;">
        <div style="background-color: var(--color-pure-white); padding: 50px; border-radius: var(--radius-md); border: 1px solid var(--color-light-border);">
          <h2 style="margin-bottom: 20px;">How to Order</h2>
          <p style="color: var(--color-gray); line-height: 1.8; margin-bottom: 30px;">
            Found the perfect tool? Simply click the "Buy Now via WhatsApp" button on any product page to chat directly with us.
          </p>
          <a href="https://wa.me/962792801376" target="_blank" rel="noopener noreferrer" class="btn-primary" style="width: auto;">
            Chat on WhatsApp
          </a>
        </div>
        <div style="background-color: var(--color-pure-white); padding: 50px; border-radius: var(--radius-md); border: 1px solid var(--color-light-border);">
          <h2 style="margin-bottom: 20px;">Get in Touch</h2>
          <ul style="color: var(--color-gray); line-height: 2.5; font-size: 1.05rem;">
            <li><strong style="color: var(--color-charcoal-black); display: inline-block; width: 100px;">Location:</strong> Jordan (Online Only)</li>
            <li><strong style="color: var(--color-charcoal-black); display: inline-block; width: 100px;">WhatsApp:</strong> +962792801376</li>
            <li><strong style="color: var(--color-charcoal-black); display: inline-block; width: 100px;">Instagram:</strong> @crewbrew_</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

// =========================================================
// CART LOGIC
// =========================================================
let cart = JSON.parse(localStorage.getItem('crewbrew_cart')) || [];

function saveCart() {
  localStorage.setItem('crewbrew_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
}

function updateCartBadge() {
  const badge = document.getElementById('cart-badge');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.textContent = totalItems;
  }
}

window.addToCart = async function (productId) {
  const product = await dbService.getProductById(productId);
  if (!product) return;

  const stockStatus = product.stockStatus || product.stock_status || 'In Stock';
  if (stockStatus === 'Out of Stock') {
    alert('Sorry, this product is currently out of stock.');
    return;
  }

  const qtyToAdd = window.currentProductPageQty || 1;
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += qtyToAdd;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qtyToAdd
    });
  }

  saveCart();
  document.getElementById('cart-overlay').classList.add('active');
  document.getElementById('cart-panel').classList.add('active');
};

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

window.updateQuantity = function (productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
    }
  }
};

window.updateProductPageQty = function (delta) {
  let qty = (window.currentProductPageQty || 1) + delta;
  if (qty < 1) qty = 1;
  window.currentProductPageQty = qty;
  const el = document.getElementById('product-page-qty');
  if (el) el.textContent = qty;
  
  const waBtn = document.getElementById('whatsapp-buy-btn');
  if (waBtn && window.currentProduct) {
    const phoneNumber = '962792801376';
    const message = encodeURIComponent(`Hello CrewBrew! I would like to order: ${qty}x ${window.currentProduct.name} (${window.currentProduct.price})`);
    waBtn.href = `https://wa.me/${phoneNumber}?text=${message}`;
  }
};

function parsePrice(priceStr) {
  return parseFloat(priceStr.replace('JOD ', '')) || 0;
}

function getCartTotal() {
  return cart.reduce((total, item) => total + (parsePrice(item.price) * item.quantity), 0);
}

function renderCartItems() {
  const container = document.getElementById('cart-items-container');
  const totalPriceEl = document.getElementById('cart-total-price');
  if (!container || !totalPriceEl) return;

  if (cart.length === 0) {
    container.innerHTML = '<div style="text-align: center; color: var(--color-gray); margin-top: 40px;">Your cart is empty.</div>';
    totalPriceEl.textContent = 'JOD 0.00';
    return;
  }

  let html = '';
  cart.forEach(item => {
    html += `
      <div class="cart-item">
        <img src="${safeImg(item.image)}" onerror="this.onerror=null; this.src=window.getFallbackImage(item, '');" onload="this.classList.add('loaded')" alt="${item.name}" class="cart-item-img" />
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">JOD ${parsePrice(item.price).toFixed(2)}</div>
          <div class="cart-item-controls">
            <div class="quantity-control">
              <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
            </div>
            <button class="remove-item-btn" onclick="removeFromCart('${item.id}')">Remove</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  totalPriceEl.textContent = `JOD ${getCartTotal().toFixed(2)}`;
}

// Cart Drawer Event Listeners
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const cartPanel = document.getElementById('cart-panel');
const checkoutBtn = document.getElementById('checkout-whatsapp-btn');

if (openCartBtn) {
  openCartBtn.addEventListener('click', () => {
    cartOverlay.classList.add('active');
    cartPanel.classList.add('active');
  });
}

function closeCart() {
  if (cartOverlay) cartOverlay.classList.remove('active');
  if (cartPanel) cartPanel.classList.remove('active');
}

if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

if (checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;

    let message = 'Hello CrewBrew! I would like to order:\n\n';
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (JOD ${parsePrice(item.price).toFixed(2)})\n`;
    });
    message += `\nTotal: JOD ${getCartTotal().toFixed(2)}`;

    const phoneNumber = '962792801376';
    const waLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
  });
}

// Mobile Menu Event Listeners
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const menuOverlay = document.getElementById('menu-overlay');
const sidebar = document.getElementById('sidebar');

function openMobileMenu() {
  if (sidebar) sidebar.classList.add('active');
  if (menuOverlay) menuOverlay.classList.add('active');
}

function closeMobileMenu() {
  if (sidebar) sidebar.classList.remove('active');
  if (menuOverlay) menuOverlay.classList.remove('active');
}

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

// =========================================================
// ALL BRANDS PAGE
// =========================================================
async function renderAllBrands() {
  let brands = [];
  try {
    brands = await dbService.getBrands();
  } catch (err) {
    appRoot.innerHTML = `<div class="container section-padding" style="color:#f87171; text-align:center;"><h2>Unable to load brands</h2><p>${err.message}</p></div>`;
    return;
  }

  let brandsHtml = '';
  if (brands.length === 0) {
    brandsHtml = '<div style="color: var(--color-gray); padding: 40px; text-align: center; grid-column: 1/-1;">No brands found.</div>';
  } else {
    brands.forEach(b => {
      const safeSrc = safeImg(b.image);
      const imgHtml = safeSrc ? `<img src="${safeSrc}" alt="${b.name}" class="brand-card-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />` : '';
      const textFallback = `<div class="brand-card-fallback" style="${safeSrc ? 'display:none;' : 'display:flex;'}">${b.name}</div>`;
      
      brandsHtml += `
        <a href="#/brand/${b.id}" class="brand-card" data-reveal="up">
          <div class="brand-card-img-wrapper">
            ${imgHtml}
            ${textFallback}
          </div>
          <div class="brand-card-content">
            <h3>${b.name}</h3>
          </div>
        </a>
      `;
    });
  }

  appRoot.innerHTML = `
    <div class="container page-transition section-padding">
      <div class="breadcrumbs">
        <a href="#/">Home</a> <span>/</span> <span>Brands</span>
      </div>
      <h1 style="font-size: 2.8rem; margin-bottom: 20px; text-align: center;">Explore Our Brands</h1>
      <div class="grid grid-4" style="margin-top: 40px;">
        ${brandsHtml}
      </div>
    </div>
  `;
}

// =========================================================
// PRIVACY POLICY
// =========================================================
function renderPrivacyPolicy() {
  appRoot.innerHTML = `
    <div class="container page-transition section-padding" style="max-width: 800px; margin: 0 auto;">
      <h1 style="font-size: 3rem; margin-bottom: 30px; text-align: center;">Privacy Policy</h1>
      <div style="background-color: var(--color-pure-white); padding: 50px; border-radius: var(--radius-md); border: 1px solid var(--color-light-border); color: var(--color-gray); line-height: 1.8;">
        <p style="margin-bottom: 20px;">At CrewBrew Coffee Tools, we value your privacy. We operate as an online store based in Jordan and aim to be transparent about how we handle your data.</p>
        
        <h3 style="color: var(--color-charcoal-black); margin-top: 30px; margin-bottom: 15px;">Information We Collect</h3>
        <p style="margin-bottom: 20px;">We do not require you to create an account to browse or purchase. We collect information you provide voluntarily when placing an order via WhatsApp. Your local shopping cart data is saved securely in your browser's local storage.</p>

        <h3 style="color: var(--color-charcoal-black); margin-top: 30px; margin-bottom: 15px;">How We Use Your Information</h3>
        <p style="margin-bottom: 20px;">Any information provided through WhatsApp is used strictly to fulfill your order, answer inquiries, and coordinate delivery.</p>

        <h3 style="color: var(--color-charcoal-black); margin-top: 30px; margin-bottom: 15px;">Third-Party Services</h3>
        <p style="margin-bottom: 20px;">We use Supabase as our secure database provider to serve product and catalog information. We process orders and communications through WhatsApp. We do not use third-party marketing trackers or analytics cookies.</p>

        <h3 style="color: var(--color-charcoal-black); margin-top: 30px; margin-bottom: 15px;">Data Retention</h3>
        <p style="margin-bottom: 20px;">We retain WhatsApp communication for as long as necessary to ensure your order is successfully completed and to handle any immediate customer service requests.</p>
        
        <h3 style="color: var(--color-charcoal-black); margin-top: 30px; margin-bottom: 15px;">Contact Us</h3>
        <p>If you have any questions about this Privacy Policy, please contact us via WhatsApp or Instagram.</p>
      </div>
    </div>
  `;
}

// =========================================================
// SEARCH LOGIC
// =========================================================
const searchOverlay = document.getElementById('search-overlay');
const openSearchBtn = document.getElementById('open-search-btn');
const closeSearchBtn = document.getElementById('close-search-btn');
const searchInput = document.getElementById('global-search-input');
const searchResults = document.getElementById('search-results');

window.openSearch = function() {
  if(searchOverlay) {
    searchOverlay.classList.add('active');
    searchOverlay.setAttribute('aria-hidden', 'false');
    setTimeout(() => searchInput && searchInput.focus(), 100);
  }
}

window.closeSearch = function() {
  if(searchOverlay) {
    searchOverlay.classList.remove('active');
    searchOverlay.setAttribute('aria-hidden', 'true');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }
}

if (openSearchBtn) openSearchBtn.addEventListener('click', window.openSearch);
if (closeSearchBtn) closeSearchBtn.addEventListener('click', window.closeSearch);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('active')) {
    window.closeSearch();
  }
});

let searchDebounceTimer;
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchDebounceTimer);
    searchDebounceTimer = setTimeout(() => {
      performSearch(e.target.value.trim().toLowerCase());
    }, 300);
  });
}

async function performSearch(query) {
  if (!query) {
    searchResults.innerHTML = '';
    return;
  }
  
  searchResults.innerHTML = '<div class="search-empty">Searching...</div>';
  
  try {
    const [products, brands, categories] = await Promise.all([
      dbService.getProducts(),
      dbService.getBrands(),
      dbService.getCategories()
    ]);

    const matchedBrands = brands.filter(b => b.name.toLowerCase().includes(query));
    const matchedCategories = categories.filter(c => c.name.toLowerCase().includes(query));
    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.description && p.description.toLowerCase().includes(query))
    );

    let html = '';

    if (matchedBrands.length > 0) {
      html += `<div class="search-section-title">Brands</div>`;
      matchedBrands.forEach(b => {
        html += `<a href="#/brand/${b.id}" class="search-result-item" onclick="closeSearch()">
          <div class="search-result-info"><div class="search-result-name">${b.name}</div></div>
        </a>`;
      });
    }

    if (matchedCategories.length > 0) {
      html += `<div class="search-section-title">Categories</div>`;
      matchedCategories.forEach(c => {
        html += `<a href="#/category/${c.id}" class="search-result-item" onclick="closeSearch()">
          <div class="search-result-info"><div class="search-result-name">${c.name}</div></div>
        </a>`;
      });
    }

    if (matchedProducts.length > 0) {
      html += `<div class="search-section-title">Products</div>`;
      matchedProducts.forEach(p => {
        const brand = brands.find(br => br.id === (p.brandId || p.brand_id)) || { name: '' };
        const imgSrc = safeImg(p.image) || window.getFallbackImage(p, brand.name);
        html += `<a href="#/product/${p.id}" class="search-result-item" onclick="closeSearch()">
          <img src="${imgSrc}" class="search-result-img" onerror="this.style.display='none'" />
          <div class="search-result-info">
            <div class="search-result-name">${p.name}</div>
            <div class="search-result-meta">${brand.name} • ${p.price}</div>
          </div>
        </a>`;
      });
    }

    if (!html) {
      html = '<div class="search-empty">No products, brands, or categories found.</div>';
    }

    searchResults.innerHTML = html;

  } catch (err) {
    searchResults.innerHTML = `<div class="search-empty" style="color:#f87171;">Search error: ${err.message}</div>`;
  }
}

// =========================================================
// BREWING EQUIPMENT PAGE
// =========================================================
async function renderBrewingEquipment() {
  let categories = [], products = [], brands = [];
  try {
    [categories, products, brands] = await Promise.all([
      dbService.getCategories(),
      dbService.getProducts(),
      dbService.getBrands()
    ]);
  } catch (err) {
    appRoot.innerHTML = `<div class="container section-padding">Unable to load Brewing Equipment.</div>`;
    return;
  }

  const equipCategoryIds = ['grinders', 'kettles', 'scales', 'drippers', 'cold-brew'];
  const equipCategories = categories.filter(c => equipCategoryIds.includes(c.id.toLowerCase()));
  const equipProducts = products.filter(p => equipCategoryIds.includes((p.categoryId || p.category_id || '').toLowerCase()));

  let shortcutsHtml = '';
  equipCategories.forEach((cat, idx) => {
    const iconContent = cat.icon ? cat.icon : '<span>☕</span>';
    const iconHtml = `<div class="category-icon-circle">
        <div class="category-icon-mark">
            ${iconContent}
        </div>
    </div>`;
    const navItem = brewingEquipmentNav.find(n => n.name.toLowerCase() === cat.name.toLowerCase());
    const href = navItem ? navItem.href : `#/category/${cat.id}`;
    
    shortcutsHtml += `
      <a href="${href}" class="category-tile" data-reveal="up" style="transition-delay: ${idx * 0.1}s;">
        ${iconHtml}
        <h3 class="category-title">${cat.name}</h3>
      </a>
    `;
  });

  let productsHtml = '';
  if (equipProducts.length === 0) {
    productsHtml = '<div style="color: var(--color-gray); padding: 40px; text-align: center; grid-column: 1/-1;">No products found.</div>';
  } else {
    equipProducts.forEach(product => {
      const brand = brands.find(b => b.id === (product.brandId || product.brand_id)) || { name: '' };
      productsHtml += productCard(product, brand.name);
    });
  }

  appRoot.innerHTML = `
    <div class="container page-transition section-padding">
      <div class="breadcrumbs">
        <a href="#/">Home</a> <span>/</span> <span>Brewing Equipment</span>
      </div>
      <h1 style="font-size: 2.8rem; margin-bottom: 40px; text-align: center;">Brewing Equipment</h1>
      
      ${shortcutsHtml ? `
        <div class="grid grid-4" style="margin-bottom: 60px;">
          ${shortcutsHtml}
        </div>
      ` : ''}

      <div class="grid grid-4">
        ${productsHtml}
      </div>
    </div>
  `;
}

// =========================================================
// APP ROUTER
// =========================================================
async function render() {
  const hash = window.location.hash || '#/';
  
  if (window.stopFeaturedAutoplay) {
    window.stopFeaturedAutoplay();
  }

  if (appRoot.innerHTML.trim() !== '') {
    appRoot.classList.remove('page-enter');
    appRoot.classList.add('page-exit');
    await new Promise(r => setTimeout(r, 280));
  }
  
  appRoot.classList.remove('page-exit');
  appRoot.classList.add('page-enter');

  const hashLower = hash.toLowerCase();

  if (hashLower === '#/' || hashLower === '') {
    await renderHome();
  } else if (hashLower.startsWith('#/brand/') && hashLower.includes('/category/')) {
    const parts = hash.split('/');
    const categoryId = parts[4];
    await renderCategory(categoryId);
  } else if (hashLower.startsWith('#/brand/')) {
    const parts = hash.split('/');
    const brandId = parts[2];
    await renderBrand(brandId);
  } else if (hashLower.startsWith('#/category/')) {
    const parts = hash.split('/');
    const categoryId = parts[2];
    await renderCategory(categoryId);
  } else if (hashLower.startsWith('#/product/')) {
    const parts = hash.split('/');
    const productId = parts[2];
    await renderProduct(productId);
  } else if (hashLower === '#/brewing-equipment') {
    await renderBrewingEquipment();
  } else if (hashLower === '#/collections/cold-brew') {
    await renderColdBrewCollection();
  } else if (hashLower === '#/brands') {
    await renderAllBrands();
  } else if (hashLower === '#/about') {
    renderAbout();
  } else if (hashLower === '#/contact') {
    renderContact();
  } else if (hashLower === '#/privacy') {
    renderPrivacyPolicy();
  } else {
    appRoot.innerHTML = `
      <div class="container page-transition section-padding" style="text-align: center; min-height: 50vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h1 style="font-size: 4rem; margin-bottom: 20px;">404</h1>
        <p style="color: var(--color-gray); font-size: 1.2rem; margin-bottom: 30px;">The page you're looking for doesn't exist.</p>
        <a href="#/" class="btn-primary">Return Home</a>
      </div>
    `;
  }

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      appRoot.classList.remove('page-enter');
      initObservers();
      if (hash === '#/' || hash === '') {
        if (window.initFeaturedSliderEvents) {
          window.initFeaturedSliderEvents();
        }
      }
    });
  });
}

// Router Event Listeners
window.addEventListener('hashchange', () => {
  closeMobileMenu();
  window.scrollTo(0, 0);
  render();
});

// Initial App Boot
renderDesktopNav();
renderSidebar();
updateCartBadge();
renderCartItems();
render();
