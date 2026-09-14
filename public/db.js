/**
 * CrewBrew Database Service Layer (db.js)
 * Universal DB Service attached to window.dbService
 * Supports local persistent database out-of-the-box + free-tier Supabase cloud REST integration.
 * Works seamlessly via file:// protocol and http server environments.
 */

(function () {
  const DEFAULT_BRANDS = [
    { id: 'aeropress', name: 'AeroPress', image: 'brands/aeropress.webp', description: 'Innovative handheld coffee makers and filters.' },
    { id: 'barista-artisan', name: 'Artisan Barista', image: 'brands/artisan.webp', description: 'Precision milk pitchers and espresso accessories.' },
    { id: 'barista-space', name: 'Barista Space', image: 'brands/barista space.webp', description: 'Professional grade latte art pitchers and coffee tools.' },
    { id: 'bunn', name: 'BUNN', image: 'brands/bunn.webp', description: 'Commercial grade coffee brewing machines.' },
    { id: 'cafec', name: 'Cafec', image: 'brands/cafec.webp', description: 'High-grade paper filter technology from Japan.' },
    { id: 'chemix', name: 'Chemix', image: 'brands/chemex.webp', description: 'Iconic glass pour-over coffeemakers.' },
    { id: 'mhw-3bomber', name: 'MHW-3Bomber', image: 'brands/3bomber.webp', description: 'Cutting edge specialty espresso gear and latte art pitchers.' },
    { id: 'nucleus-paragon', name: 'Nucleus Paragon', image: 'brands/paragon.webp', description: 'Extract chilling science for pour-over coffee.' },
    { id: 'timemore', name: 'Timemore', image: 'brands/timemore.webp', description: 'Sleek, award-winning hand grinders, scales, and kettles.' },
    { id: 'toddy', name: 'Toddy', image: 'brands/toddy.webp', description: 'Pioneer of cold brew coffee systems.' }
  ];

  const DEFAULT_CATEGORIES = [
    { id: 'grinders', name: 'Grinders', description: 'Precision grinding for perfect extraction.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12v12H6z"/><path d="M8 8h8"/><path d="M8 12h8"/><path d="M10 4V2h4v2"/><path d="M7 16l-1 4h12l-1-4"/></svg>' },
    { id: 'kettles', name: 'Kettles', description: 'Gooseneck control for professional pouring.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 14v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4"/><path d="M8 4h8v6H8z"/><path d="M18 14s2-2 3-1c1 1 0 3-2 3"/></svg>' },
    { id: 'scales', name: 'Scales', description: 'Accurate measurements for consistent brews.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="16" height="12" rx="2"/><path d="M8 12h8"/><path d="M12 16h.01"/><path d="M6 4h12v4H6z"/></svg>' },
    { id: 'drippers', name: 'Drippers', description: 'Expertly designed for optimal flow rates.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18l-4 10H7z"/><path d="M10 16v4h4v-4"/></svg>' },
    { id: 'accessories', name: 'Accessories', description: 'Essential tools to elevate your ritual.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><path d="M6 1v3"/><path d="M10 1v3"/><path d="M14 1v3"/></svg>' },
    { id: 'cold-brew', name: 'Cold Brew', description: 'Smooth, refreshing cold brew essentials.', icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8z"/><path d="M8 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8"/></svg>' }
  ];

  const DEFAULT_PRODUCTS = [
    // === AeroPress ===
    {
      id: 'aeropress-go', brandId: 'aeropress', categoryId: 'drippers',
      name: 'AeroPress Go', price: 'JOD 35.00', stockStatus: 'In Stock',
      description: 'The AeroPress Go travel coffee maker is engineered to fuel an active lifestyle. It gives you everything you need to conveniently brew superb coffee anywhere.',
      specs: { 'Capacity': '237ml', 'Material': 'BPA-Free Plastic', 'Includes': 'Mug, Lid, Filters, Scoop, Stirrer' },
      image: 'brands/aeropress.webp'
    },
    {
      id: 'aeropress-filters', brandId: 'aeropress', categoryId: 'accessories',
      name: 'AeroPress Micro-Filters', price: 'JOD 7.00', stockStatus: 'In Stock',
      description: 'Replacement micro-filters for the AeroPress coffee maker. Ensures a smooth, grit-free cup of coffee every time.',
      specs: { 'Material': 'Paper', 'Quantity': '350 pcs', 'Compatibility': 'AeroPress Original & Go' },
      image: 'brands/aeropress filters.webp'
    },
    // === Artisan Barista ===
    {
      id: 'artisan-350-black', brandId: 'barista-artisan', categoryId: 'accessories',
      name: 'Artisan Barista Pitcher 350ml - Black', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Professional milk frothing pitcher with precision spout, ideal for detailed latte art.',
      specs: { 'Capacity': '350ml', 'Color': 'Black', 'Material': 'Stainless Steel' },
      image: 'brands/artisan 350ml.webp'
    },
    {
      id: 'artisan-350-gold', brandId: 'barista-artisan', categoryId: 'accessories',
      name: 'Artisan Barista Pitcher 350ml - Gold', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Professional milk frothing pitcher with precision spout, ideal for detailed latte art.',
      specs: { 'Capacity': '350ml', 'Color': 'Gold', 'Material': 'Stainless Steel' },
      image: 'brands/artisan 350ml gold.webp'
    },
    {
      id: 'artisan-350-rainbow', brandId: 'barista-artisan', categoryId: 'accessories',
      name: 'Artisan Barista Pitcher 350ml - Rainbow', price: 'JOD 45.00', stockStatus: 'Out of Stock',
      description: 'Professional milk frothing pitcher with precision spout, ideal for detailed latte art.',
      specs: { 'Capacity': '350ml', 'Color': 'Rainbow', 'Material': 'Stainless Steel' },
      image: 'brands/artisan 350 rainbow.webp'
    },
    {
      id: 'artisan-600-black', brandId: 'barista-artisan', categoryId: 'accessories',
      name: 'Artisan Barista Pitcher 600ml - Black', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Professional milk frothing pitcher with precision spout, ideal for detailed latte art.',
      specs: { 'Capacity': '600ml', 'Color': 'Black', 'Material': 'Stainless Steel' },
      image: 'brands/artisan 600ml black.webp'
    },
    {
      id: 'artisan-600-gold', brandId: 'barista-artisan', categoryId: 'accessories',
      name: 'Artisan Barista Pitcher 600ml - Gold', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Professional milk frothing pitcher with precision spout, ideal for detailed latte art.',
      specs: { 'Capacity': '600ml', 'Color': 'Gold', 'Material': 'Stainless Steel' },
      image: 'brands/artisan 600ml gold.webp'
    },
    {
      id: 'artisan-600-rainbow', brandId: 'barista-artisan', categoryId: 'accessories',
      name: 'Artisan Barista Pitcher 600ml - Rainbow', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Professional milk frothing pitcher with precision spout, ideal for detailed latte art.',
      specs: { 'Capacity': '600ml', 'Color': 'Rainbow', 'Material': 'Stainless Steel' },
      image: 'brands/artisan 600ml rainbow.webp'
    },
    // === Barista Space ===
    {
      id: 'barista-space-pitcher', brandId: 'barista-space', categoryId: 'accessories',
      name: 'Barista Space Milk Pitcher 600ml', price: 'JOD 25.00', stockStatus: 'In Stock',
      description: 'Professional grade milk frothing pitcher with precision spout for detailed latte art.',
      specs: { 'Capacity': '600ml', 'Material': '304 Stainless Steel', 'Finish': 'Matte Black', 'Thickness': '1.0mm' },
      image: 'brands/barista space.webp'
    },
    // === Cafec ===
    {
      id: 'cafec-paper-filter', brandId: 'cafec', categoryId: 'accessories',
      name: 'Cafec Paper Filter', price: 'JOD 5.00', stockStatus: 'In Stock',
      description: 'High-quality paper filters designed for optimal extraction and a clean cup.',
      specs: { 'Material': 'Paper', 'Size': '02', 'Quantity': '100 pcs', 'Origin': 'Japan' },
      image: 'brands/cafec filter.webp'
    },
    // === Timemore ===
    {
      id: 'timemore-s3-black', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore Chestnut S3 Manual Grinder - Matt Black', price: 'JOD 85.00', stockStatus: 'In Stock',
      description: 'High-precision manual coffee grinder featuring the advanced S2C890 steel burrs, offering ultimate adjustment control and consistency from pour-over to espresso.',
      specs: { 'Burr Type': 'S2C890 (SUS420 Stainless Steel | 42 mm)', 'Capacity': 'Max. 35 g', 'Suitable For': 'Pour-over & Espresso compatible' },
      image: 'Timemore/Timemore S3-Matt Black.webp'
    },
    {
      id: 'timemore-s3-green', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore Chestnut S3 Manual Grinder - Olive Green', price: 'JOD 85.00', stockStatus: 'In Stock',
      description: 'High-precision manual coffee grinder featuring the advanced S2C890 steel burrs, offering ultimate adjustment control and consistency from pour-over to espresso.',
      specs: { 'Burr Type': 'S2C890 (SUS420 Stainless Steel | 42 mm)', 'Capacity': 'Max. 35 g', 'Suitable For': 'Pour-over & Espresso compatible' },
      image: 'Timemore/Timemore S3-Olive Green.webp'
    },
    {
      id: 'timemore-s3-red', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore Chestnut S3 Manual Grinder - Festival Red', price: 'JOD 85.00', stockStatus: 'In Stock',
      description: 'High-precision manual coffee grinder featuring the advanced S2C890 steel burrs, offering ultimate adjustment control and consistency from pour-over to espresso.',
      specs: { 'Burr Type': 'S2C890 (SUS420 Stainless Steel | 42 mm)', 'Capacity': 'Max. 35 g', 'Suitable For': 'Pour-over & Espresso compatible' },
      image: 'Timemore/Timemore S3-Festival Red.webp'
    },
    {
      id: 'timemore-c5-pro-black', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore C5 Pro Manual Grinder - Black', price: 'JOD 65.00', stockStatus: 'In Stock',
      description: 'Upgraded C-series grinder with S2C burrs, folding handle, and precision click adjustment.',
      specs: { 'Burrs': 'S2C Steel', 'Capacity': '30g', 'Handle': 'Folding' },
      image: 'Timemore/Timemore C5 Pro-Black.webp'
    },
    {
      id: 'timemore-c5-pro-white', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore C5 Pro Manual Grinder - White', price: 'JOD 65.00', stockStatus: 'In Stock',
      description: 'Upgraded C-series grinder with S2C burrs, folding handle, and precision click adjustment.',
      specs: { 'Burrs': 'S2C Steel', 'Capacity': '30g', 'Handle': 'Folding' },
      image: 'Timemore/Timemore C5 Pro-White.webp'
    },
    {
      id: 'timemore-g1-plus', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore Chestnut G1 Plus', price: 'JOD 120.00', stockStatus: 'In Stock',
      description: 'Flagship hand grinder with E&B titanium-coated burrs and dual-bearing stabilization for espresso-grade consistency.',
      specs: { 'Burrs': 'E&B Titanium-Coated 38mm', 'Body': 'Aluminum Alloy', 'Capacity': '25g' },
      image: 'Timemore/Timemore G1 Plus.webp'
    },
    {
      id: 'timemore-g3', brandId: 'timemore', categoryId: 'grinders',
      name: 'Timemore Chestnut G3', price: 'JOD 95.00', stockStatus: 'In Stock',
      description: 'Mid-range hand grinder with S2C burrs offering excellent value for pour-over and light espresso.',
      specs: { 'Burrs': 'S2C 42mm', 'Body': 'Aluminum Alloy' },
      image: 'Timemore/Timemore G3.webp'
    },
    {
      id: 'timemore-fish-smart-black', brandId: 'timemore', categoryId: 'kettles',
      name: 'Timemore FISH SMART Electric Kettle 600ml - Black', price: 'JOD 90.00', stockStatus: 'In Stock',
      description: 'Smart electric gooseneck kettle with precise temperature control and fast heating, tailored for pour-over brewing.',
      specs: { 'Capacity': '600 ml', 'Power': '1000 W', 'Temperature Range': '40℃ - 100℃ (UK Standard Plug 220V)' },
      image: 'Timemore/Timemore FISH SMART Electric Pour Over Kettle Black-600ml.webp'
    },
    {
      id: 'timemore-fish-smart-white', brandId: 'timemore', categoryId: 'kettles',
      name: 'Timemore FISH SMART Electric Kettle 600ml - White', price: 'JOD 90.00', stockStatus: 'In Stock',
      description: 'Smart electric gooseneck kettle with precise temperature control and fast heating, tailored for pour-over brewing.',
      specs: { 'Capacity': '600 ml', 'Power': '1000 W', 'Temperature Range': '40℃ - 100℃ (UK Standard Plug 220V)' },
      image: 'Timemore/Gemini_Generated_Image_nie5kxnie5kxnie5.webp'
    },
    {
      id: 'timemore-fish-pure-black', brandId: 'timemore', categoryId: 'kettles',
      name: 'Timemore Fish Pure Pour-over Kettle - Black', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Stovetop gooseneck kettle with slim spout for precise pour-over flow control.',
      specs: { 'Material': 'Stainless Steel', 'Color': 'Black' },
      image: 'Timemore/Timemore Fish Pure Pour-over Kettle-Black.webp'
    },
    {
      id: 'timemore-fish-pure-white', brandId: 'timemore', categoryId: 'kettles',
      name: 'Timemore Fish Pure Pour-over Kettle - White', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Stovetop gooseneck kettle with slim spout for precise pour-over flow control.',
      specs: { 'Material': 'Stainless Steel', 'Color': 'White' },
      image: 'Timemore/Timemore Fish Pure Pour-over Kettle-White.webp'
    },
    {
      id: 'timemore-black-mirror', brandId: 'timemore', categoryId: 'scales',
      name: 'Timemore Black Mirror Basic Plus', price: 'JOD 35.00', stockStatus: 'In Stock',
      description: 'Minimalist coffee scale with fast response time and high accuracy, perfect for espresso and pour-over brewing.',
      specs: { 'Accuracy': '0.1g', 'Max Weight': '2000g', 'Battery': 'Rechargeable (USB-C)', 'Features': 'Auto-timer, Water-resistant' },
      image: 'Timemore/Timemore Black Mirror.webp'
    },
    {
      id: 'timemore-basic-2-black', brandId: 'timemore', categoryId: 'scales',
      name: 'Timemore Basic 2 Scale - Black', price: 'JOD 30.00', stockStatus: 'In Stock',
      description: 'Affordable entry-level coffee scale with built-in timer.',
      specs: { 'Accuracy': '0.1g', 'Max Weight': '2000g' },
      image: 'Timemore/Timemore Basic 2-Black.webp'
    },
    {
      id: 'timemore-basic-2-white', brandId: 'timemore', categoryId: 'scales',
      name: 'Timemore Basic 2 Scale - White', price: 'JOD 30.00', stockStatus: 'In Stock',
      description: 'Affordable entry-level coffee scale with built-in timer.',
      specs: { 'Accuracy': '0.1g', 'Max Weight': '2000g' },
      image: 'Timemore/Timemore Basic 2-White.webp'
    },
    {
      id: 'timemore-mini-espresso-black', brandId: 'timemore', categoryId: 'scales',
      name: 'Timemore Mini Espresso Scale - Black', price: 'JOD 55.00', stockStatus: 'In Stock',
      description: 'Ultra-compact scale designed to fit under espresso machine drip trays.',
      specs: { 'Accuracy': '0.01g', 'Max Weight': '1000g', 'Features': 'Auto-timer, Flow-rate mode' },
      image: 'Timemore/Timemore Mini Espresso Scale-Black.webp'
    },
    {
      id: 'timemore-crystal-eye-01-black', brandId: 'timemore', categoryId: 'drippers',
      name: 'Timemore Crystal Eye Dripper 01 - Transparent Black', price: 'JOD 18.00', stockStatus: 'In Stock',
      description: 'Single-cup crystal clear dripper with unique eye-shaped ribs for optimal flow.',
      specs: { 'Size': '01 (1-2 cups)', 'Material': 'PCTG Resin', 'Color': 'Transparent Black' },
      image: 'Timemore/Timemore Crystal Eye Dripper 01-Transparent Black.webp'
    },
    {
      id: 'timemore-crystal-eye-02-clear', brandId: 'timemore', categoryId: 'drippers',
      name: 'Timemore Crystal Eye Dripper 02 - Transparent Clear', price: 'JOD 20.00', stockStatus: 'In Stock',
      description: 'Larger-capacity crystal clear dripper with unique eye-shaped ribs for optimal flow.',
      specs: { 'Size': '02 (2-4 cups)', 'Material': 'PCTG Resin', 'Color': 'Transparent Clear' },
      image: 'Timemore/Timemore Crystal Eye Dripper 02-Transparent Clear.webp'
    },
    {
      id: 'timemore-coffee-server-600', brandId: 'timemore', categoryId: 'accessories',
      name: 'Timemore Coffee Server 600ml - Black', price: 'JOD 22.00', stockStatus: 'In Stock',
      description: 'Heat-resistant glass server with graduated markings for precise brewing.',
      specs: { 'Capacity': '600ml', 'Material': 'Borosilicate Glass' },
      image: 'Timemore/Timemore Coffee Server Black-600ml.webp'
    },
    {
      id: 'timemore-thermometer-black', brandId: 'timemore', categoryId: 'accessories',
      name: 'Timemore Thermometer Stick - Black', price: 'JOD 12.00', stockStatus: 'In Stock',
      description: 'Stainless steel digital thermometer for measuring water and milk temperatures.',
      specs: { 'Range': '-50°C to 300°C', 'Material': 'Stainless Steel' },
      image: 'Timemore/Timemore Thermometer Stick Black.webp'
    },
    {
      id: 'timemore-b75-tasting-cup', brandId: 'timemore', categoryId: 'accessories',
      name: 'Timemore B75 Tasting Cup - Transparent Black', price: 'JOD 15.00', stockStatus: 'In Stock',
      description: 'Professional cupping bowl designed for SCA-standard tasting sessions.',
      specs: { 'Material': 'Borosilicate Glass', 'Color': 'Transparent Black' },
      image: 'Timemore/B75 Tasting Cup Transparent Black.webp'
    },
    {
      id: 'timemore-vacuum-pump', brandId: 'timemore', categoryId: 'accessories',
      name: 'Timemore Vacuum Pump Coffee Canister', price: 'JOD 28.00', stockStatus: 'In Stock',
      description: 'Airtight vacuum-sealed canister to preserve coffee bean freshness.',
      specs: { 'Type': 'Vacuum Pump Seal', 'Material': 'Glass + Stainless Steel' },
      image: 'Timemore/Timemore Vaccum Pump.webp'
    },
    // === MHW-3Bomber ===
    {
      id: 'mhw-3bomber-pitcher-3-white', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Milk Pitcher 3.0 (600ml) - White', price: 'JOD 25.00', stockStatus: 'In Stock',
      description: 'Premium milk frothing pitcher featuring the generation 3.0 design with a round spout for detailed latte art.',
      specs: { 'Generation': '3.0 Series', 'Capacity': '600 ml', 'Spout Type': 'Round Spout' },
      image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - White.webp'
    },
    {
      id: 'mhw-3bomber-pitcher-3-black', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Milk Pitcher 3.0 (600ml) - Matte Black', price: 'JOD 25.00', stockStatus: 'In Stock',
      description: 'Premium milk frothing pitcher featuring the generation 3.0 design with a round spout for detailed latte art.',
      specs: { 'Generation': '3.0 Series', 'Capacity': '600 ml', 'Spout Type': 'Round Spout' },
      image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - Matte Black.webp'
    },
    {
      id: 'mhw-3bomber-pitcher-3-silver', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Milk Pitcher 3.0 (600ml) - Silver Spot', price: 'JOD 25.00', stockStatus: 'In Stock',
      description: 'Premium milk frothing pitcher featuring the generation 3.0 design with a round spout for detailed latte art.',
      specs: { 'Generation': '3.0 Series', 'Capacity': '600 ml', 'Spout Type': 'Round Spout' },
      image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - Silver Spot.webp'
    },
    {
      id: 'mhw-3bomber-wright-cup', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Wright Cup (90ml)', price: 'JOD 12.00', stockStatus: 'In Stock',
      description: 'Hand-painted series limited edition glass cup, perfect for espresso shots and displaying beautiful crema.',
      specs: { 'Series': 'Wright Series', 'Capacity': '90 ml', 'Style': 'Limited Edition Hand-Painted' },
      image: 'MHW-3Bomber/MHW-3Bomber Wright Cup (90ml) - Limited Edition.webp'
    },
    {
      id: 'mhw-3bomber-sawada-cup-tiffany', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Tiffany Blue', price: 'JOD 16.00', stockStatus: 'In Stock',
      description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
      specs: { 'Series': 'Sawada Series', 'Capacity': '280 ml', 'Material': 'Premium Ceramic' },
      image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Tiffany Blue.webp'
    },
    {
      id: 'mhw-3bomber-sawada-cup-berlin', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Berlin Blue', price: 'JOD 16.00', stockStatus: 'In Stock',
      description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
      specs: { 'Series': 'Sawada Series', 'Capacity': '280 ml', 'Material': 'Premium Ceramic' },
      image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Berlin Blue.webp'
    },
    {
      id: 'mhw-3bomber-sawada-cup-hawthorn', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Hawthorn Red', price: 'JOD 16.00', stockStatus: 'In Stock',
      description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
      specs: { 'Series': 'Sawada Series', 'Capacity': '280 ml', 'Material': 'Premium Ceramic' },
      image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Hawthorn Red.webp'
    },
    {
      id: 'mhw-3bomber-lightning-wdt', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Lightning WDT Tool 2.0 - Black', price: 'JOD 18.00', stockStatus: 'In Stock',
      description: 'Advanced needle distribution tool featuring a mechanical lightning-like deployment mechanism for declumping espresso pucks.',
      specs: { 'Type': 'Needle Distribution Tool', 'Generation': '2.0 Series', 'Design': 'Lightning Mechanism' },
      image: 'MHW-3Bomber/Lightning Needle Distribution Tool 2.0-black.webp'
    },
    {
      id: 'mhw-3bomber-yu-cyclone-wdt', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Yu Series Cyclone WDT Tool (58.35mm) - Black', price: 'JOD 22.00', stockStatus: 'In Stock',
      description: 'Cyclone-style needle distribution tool from the premium Yu Series.',
      specs: { 'Series': 'Yu Series', 'Type': 'Cyclone Needle Distribution Tool', 'Compatibility': '58.35 mm Universal' },
      image: 'MHW-3Bomber/Yu Series Cyclone Needle Distribution Tool Black-58.35mm.webp'
    },
    {
      id: 'mhw-3bomber-blade-r3', brandId: 'mhw-3bomber', categoryId: 'grinders',
      name: 'MHW-3Bomber Blade R3 Manual Coffee Grinder - Black', price: 'JOD 95.00', stockStatus: 'In Stock',
      description: 'Premium manual grinder from the Rapidity Series, sporting an innovative 3-burr precision grinding mechanism.',
      specs: { 'Model': 'Blade R3 (Rapidity Series)', 'Burr Type': '3-Burr Precision Grinding Mechanism' },
      image: 'MHW-3Bomber/Blade R3 Manual Coffee Grinder Black.webp'
    },
    {
      id: 'mhw-3bomber-cube-scale-mini', brandId: 'mhw-3bomber', categoryId: 'scales',
      name: 'MHW-3Bomber Cube Coffee Scale - 2.0 Mini (Black)', price: 'JOD 35.00', stockStatus: 'In Stock',
      description: 'Compact 2.0 Mini version of the smart Cube Coffee Scale, built for espresso drip trays.',
      specs: { 'Series': 'Cube Series', 'Features': 'Smart Timer & Flow-rate tracking' },
      image: 'MHW-3Bomber/Cube Coffee Scale 2.0 Mini-Black.webp'
    },
    {
      id: 'mhw-3bomber-cube-scale-promax', brandId: 'mhw-3bomber', categoryId: 'scales',
      name: 'MHW-3Bomber Cube Coffee Scale - 3.0 Pro Max (Black)', price: 'JOD 45.00', stockStatus: 'In Stock',
      description: 'Professional 3.0 Pro Max edition of the Cube smart coffee scale with enhanced flow-rate diagnostics.',
      specs: { 'Series': 'Cube Series', 'Features': 'Smart Timer & Flow-rate tracking' },
      image: 'MHW-3Bomber/Cube Coffee Scale 3.0 Pro Max Black.webp'
    },
    {
      id: 'mhw-3bomber-formula-scale-black', brandId: 'mhw-3bomber', categoryId: 'scales',
      name: 'MHW-3Bomber Formula Smart Coffee Scale - Black', price: 'JOD 55.00', stockStatus: 'In Stock',
      description: 'Advanced Formula series smart scale with Bluetooth connectivity and automatic espresso modes.',
      specs: { 'Model': 'Formula Smart Scale', 'Features': 'Bluetooth connectivity & Smart Espresso modes' },
      image: 'MHW-3Bomber/Formula Smart Coffee Scale-Black.webp'
    },
    {
      id: 'mhw-3bomber-assassin-kettle-black', brandId: 'mhw-3bomber', categoryId: 'kettles',
      name: 'MHW-3Bomber Assassin Electric Pour Over Kettle (600ml) - Black', price: 'JOD 90.00', stockStatus: 'In Stock',
      description: 'Assassin series smart electric kettle featuring precise variable temperature PID control and a fast heating base.',
      specs: { 'Series': 'Assassin Series', 'Capacity': '600 ml', 'Temperature Control': 'Smart PID Variable Temperature' },
      image: 'MHW-3Bomber/Assassin electric pour over kettle Black.webp'
    },
    {
      id: 'mhw-3bomber-assassin-kettle-white', brandId: 'mhw-3bomber', categoryId: 'kettles',
      name: 'MHW-3Bomber Assassin Electric Pour Over Kettle (600ml) - White', price: 'JOD 90.00', stockStatus: 'In Stock',
      description: 'Assassin series smart electric kettle featuring precise variable temperature PID control.',
      specs: { 'Series': 'Assassin Series', 'Capacity': '600 ml', 'Temperature Control': 'Smart PID Variable Temperature' },
      image: 'MHW-3Bomber/Assassin electric pour over kettle White.webp'
    },
    {
      id: 'mhw-3bomber-meteorite-dripper', brandId: 'mhw-3bomber', categoryId: 'drippers',
      name: 'MHW-3Bomber Meteorite Dripper - Obsidian Black', price: 'JOD 25.00', stockStatus: 'In Stock',
      description: 'Unique geometric rib configuration resembling a meteorite crater to facilitate clean water draw-down.',
      specs: { 'Model': 'Meteorite Series', 'Color': 'Obsidian Black' },
      image: 'MHW-3Bomber/Meteorite Dripper-Obsidian Black.webp'
    },
    {
      id: 'mhw-3bomber-eggonaut-dripper-pink', brandId: 'mhw-3bomber', categoryId: 'drippers',
      name: 'MHW-3Bomber Eggonaut Dripper - Pink', price: 'JOD 20.00', stockStatus: 'In Stock',
      description: 'Food-grade resin/PCTG transparent dripper shaped like an astronaut helmet, ensuring optimal heat retention.',
      specs: { 'Model': 'Eggonaut Series', 'Material': 'Premium Resin/PCTG' },
      image: 'MHW-3Bomber/mhw 3bomber eggonaut Eggonaut Dripper-Pink.webp'
    },
    {
      id: 'mhw-3bomber-eggonaut-dripper-blue', brandId: 'mhw-3bomber', categoryId: 'drippers',
      name: 'MHW-3Bomber Eggonaut Dripper - Blue', price: 'JOD 20.00', stockStatus: 'In Stock',
      description: 'Food-grade resin/PCTG transparent dripper shaped like an astronaut helmet, ensuring optimal heat retention.',
      specs: { 'Model': 'Eggonaut Series', 'Material': 'Premium Resin/PCTG' },
      image: 'MHW-3Bomber/mhw 3bomber eggonaut Eggonaut Dripper-Blue.webp'
    },
    {
      id: 'mhw-3bomber-eggonaut-dripper-black', brandId: 'mhw-3bomber', categoryId: 'drippers',
      name: 'MHW-3Bomber Eggonaut Dripper - Black', price: 'JOD 20.00', stockStatus: 'In Stock',
      description: 'Food-grade resin/PCTG transparent dripper shaped like an astronaut helmet, ensuring optimal heat retention.',
      specs: { 'Model': 'Eggonaut Series', 'Material': 'Premium Resin/PCTG' },
      image: 'MHW-3Bomber/mhw 3bomber eggonaut Eggonaut Dripper-Black.webp'
    },
    {
      id: 'mhw-3bomber-m1-set-basic', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber M1 Drip Coffee Set - Basic 7-Pcs', price: 'JOD 80.00', stockStatus: 'In Stock',
      description: 'Essential drip coffee setup containing a grinder, dripper, server, kettle, scales, filters, and carrying case.',
      specs: { 'Series': 'M1 Series', 'Composition': '7-Pieces Basic Brew Set' },
      image: 'MHW-3Bomber/M1 Drip Coffee Set-Basic-7 pcs in one.webp'
    },
    {
      id: 'mhw-3bomber-dosing-ring', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Magnetic Dosing Ring (58mm) - Black', price: 'JOD 14.00', stockStatus: 'In Stock',
      description: 'High-strength magnetic dosing ring compatible with 58mm portafilters.',
      specs: { 'Mounting': 'High-Strength Magnetic', 'Size': '58 mm Universal' },
      image: 'MHW-3Bomber/Magnetic Dosing Ring-58mm universal.webp'
    },
    {
      id: 'mhw-3bomber-rdt-dosing-set', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber RDT Spray Bottle & Dosing Cup Set', price: 'JOD 10.00', stockStatus: 'In Stock',
      description: 'Complete dosing kit containing an RDT spray bottle and a bean dosing tray to reduce static build-up.',
      specs: { 'Contents': '1x RDT Spray Bottle, 1x Dosing Tray' },
      image: 'MHW-3Bomber/RDT Spray Bottle Coffee Bean Dosing Cup-Set.webp'
    },
    {
      id: 'mhw-3bomber-scale-stand', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Coffee Scale Stand - Black', price: 'JOD 15.00', stockStatus: 'In Stock',
      description: 'Espresso scale stand with height-adjustment, finished in matte black.',
      specs: { 'Application': 'Espresso Scale Stand', 'Color': 'Matte Black' },
      image: 'MHW-3Bomber/Coffee scale stand-Black.webp'
    },
    {
      id: 'mhw-3bomber-thermometer', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Digital Thermometer', price: 'JOD 14.00', stockStatus: 'In Stock',
      description: 'High-accuracy digital thermometer stick with interchangeable units.',
      specs: { 'Range': '-45°C to 200°C', 'Unit': 'Celsius / Fahrenheit' },
      image: 'MHW-3Bomber/MHW-3Bomber Digital Thermometer.webp'
    },
    {
      id: 'mhw-3bomber-air-blower', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Silicone Air Blower - Nardo Grey', price: 'JOD 8.00', stockStatus: 'In Stock',
      description: 'Medical-grade silicone air blower for clearing residual grounds from grinders and baskets.',
      specs: { 'Material': 'Medical-grade Silicone', 'Application': 'Grinder & Portafilter cleaning' },
      image: 'MHW-3Bomber/Air Blower-silicone.webp'
    },
    {
      id: 'mhw-3bomber-cooki-cup-black', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Cooki Reusable Cup (360ml) - Obsidian Black', price: 'JOD 15.00', stockStatus: 'In Stock',
      description: 'Premium leak-proof travel cup from the Cooki series.',
      specs: { 'Model': 'Cooki Travel Series', 'Capacity': '360 ml' },
      image: 'MHW-3Bomber/Cookie Reusable Cup-360ml-Black.webp'
    },
    {
      id: 'mhw-3bomber-chilling-ball', brandId: 'mhw-3bomber', categoryId: 'accessories',
      name: 'MHW-3Bomber Smooth Pour Over Chilling Ball Stand - Black', price: 'JOD 24.00', stockStatus: 'In Stock',
      description: 'Stainless steel chilling ball and stand designed to retain volatile coffee aromas during extraction.',
      specs: { 'Purpose': 'Flash chilling extract retention', 'Color': 'Obsidian Black' },
      image: 'MHW-3Bomber/Smooth Pour Over Chilling Ball Stand-Black.webp'
    }
  ];

  const DEFAULT_VARIANTS = [
    { id: 'var-s3-black', productId: 'timemore-s3-black', linkedProductId: 'timemore-s3-black', name: 'Matt Black', color: '#111111', price: 'JOD 85.00', stockStatus: 'In Stock', image: 'Timemore/Timemore S3-Matt Black.webp' },
    { id: 'var-s3-green', productId: 'timemore-s3-black', linkedProductId: 'timemore-s3-green', name: 'Olive Green', color: '#556B2F', price: 'JOD 85.00', stockStatus: 'In Stock', image: 'Timemore/Timemore S3-Olive Green.webp' },
    { id: 'var-s3-red', productId: 'timemore-s3-black', linkedProductId: 'timemore-s3-red', name: 'Festival Red', color: '#C41E3A', price: 'JOD 85.00', stockStatus: 'In Stock', image: 'Timemore/Timemore S3-Festival Red.webp' },
    { id: 'var-pitcher-3-white', productId: 'mhw-3bomber-pitcher-3-white', linkedProductId: 'mhw-3bomber-pitcher-3-white', name: 'White / Round Spout', color: '#FFFFFF', price: 'JOD 25.00', stockStatus: 'In Stock', image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - White.webp' },
    { id: 'var-pitcher-3-black', productId: 'mhw-3bomber-pitcher-3-white', linkedProductId: 'mhw-3bomber-pitcher-3-black', name: 'Matte Black / Round Spout', color: '#1A1A1A', price: 'JOD 25.00', stockStatus: 'In Stock', image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - Matte Black.webp' },
    { id: 'var-pitcher-3-silver', productId: 'mhw-3bomber-pitcher-3-white', linkedProductId: 'mhw-3bomber-pitcher-3-silver', name: 'Silver Spot / Round Spout', color: '#C0C0C0', price: 'JOD 25.00', stockStatus: 'In Stock', image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - Silver Spot.webp' }
  ];

  const KEYS = {
    BRANDS: 'crewbrew_db_brands',
    CATEGORIES: 'crewbrew_db_categories',
    PRODUCTS: 'crewbrew_db_products',
    VARIANTS: 'crewbrew_db_variants',
    SUPABASE_CONFIG: 'crewbrew_supabase_config'
  };

  class DBService {
    constructor() {
      this.supabase = null;
      this._inFlight = {};
      this._cache = {
        brands: { data: null, time: 0 },
        categories: { data: null, time: 0 },
        products: { data: null, time: 0 }
      };
      this._CACHE_TTL = 5 * 60 * 1000; // 5 minutes cache for public queries to avoid rate limits
      this.init();
      this.initSupabaseClient();
    }

    invalidateCache(key = null) {
      if (key && this._cache[key]) {
        this._cache[key] = { data: null, time: 0 };
        delete this._inFlight[key];
      } else {
        this._cache = {
          brands: { data: null, time: 0 },
          categories: { data: null, time: 0 },
          products: { data: null, time: 0 }
        };
        this._inFlight = {};
      }
    }

    init() {
      const currentVer = 'v6';
      if (localStorage.getItem('crewbrew_db_version') !== currentVer) {
        localStorage.setItem(KEYS.BRANDS, JSON.stringify(DEFAULT_BRANDS));
        localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
        localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem(KEYS.VARIANTS, JSON.stringify(DEFAULT_VARIANTS));
        localStorage.setItem('crewbrew_db_version', currentVer);
      }
    }

    getSupabaseConfig() {
      const globalCfg = window.CREWBREW_CONFIG || { supabaseUrl: '', supabasePublishableKey: '', cloudEnabled: false };
      
      return {
        url: globalCfg.supabaseUrl,
        key: globalCfg.supabasePublishableKey,
        active: globalCfg.cloudEnabled,
        isOverride: false
      };
    }

    // Local storage config override support has been completely removed to prevent stale configs from replacing production.
    saveSupabaseConfig(config) {
      console.warn("saveSupabaseConfig is deprecated. Please update supabase-config.js directly.");
    }

    initSupabaseClient() {
      const cfg = this.getSupabaseConfig();
      if (cfg.url && cfg.key && window.supabase) {
        this.supabase = window.supabase.createClient(cfg.url, cfg.key);
      } else {
        this.supabase = null;
      }
    }

    isSupabaseConfigured() {
      const cfg = this.getSupabaseConfig();
      return !!(cfg.url && cfg.key);
    }

    isSupabaseActive() {
      const cfg = this.getSupabaseConfig();
      return !!(cfg.active && this.supabase);
    }

    // --- Authentication ---
    async login(email, password) {
      if (!this.supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    }

    async logout() {
      if (this.supabase) await this.supabase.auth.signOut();
    }

    async getCurrentSession() {
      if (!this.supabase) return null;
      const { data, error } = await this.supabase.auth.getSession();
      if (error) {
        throw new Error('Session restoration failed: ' + error.message);
      }
      return data.session;
    }

    subscribeToAuthChanges(callback) {
      if (!this.supabase) return null;
      const { data: { subscription } } = this.supabase.auth.onAuthStateChange(callback);
      return subscription;
    }

    async testSupabaseConnection(url, key) {
      if (!url || !url.startsWith('https://')) return { success: false, stage: 'URL Format', message: 'URL must start with https://' };
      if (!window.supabase) return { success: false, stage: 'Client Initialization', message: 'Supabase JS library not loaded.' };
      
      let tempClient;
      try {
        tempClient = window.supabase.createClient(url, key);
      } catch (e) {
        return { success: false, stage: 'Client Initialization', message: e.message };
      }

      // Test Auth
      const { error: authError } = await tempClient.auth.getSession();
      if (authError) return { success: false, stage: 'Authentication Service', message: authError.message };

      // Test Brands
      const { error: bError } = await tempClient.from('brands').select('id').limit(1);
      if (bError) return { success: false, stage: 'brands table', message: bError.message };

      // Test Categories
      const { error: cError } = await tempClient.from('categories').select('id').limit(1);
      if (cError) return { success: false, stage: 'categories table', message: cError.message };

      // Test Products
      const { error: pError } = await tempClient.from('products').select('id').limit(1);
      if (pError) return { success: false, stage: 'products table', message: pError.message };

      // Test Variants
      const { error: vError } = await tempClient.from('product_variants').select('id').limit(1);
      if (vError) return { success: false, stage: 'product_variants table', message: vError.message };

      return { success: true, stage: 'All tests passed', message: 'Connection successful.' };
    }

    // --- Data Methods ---
    async getBrands(force = false) {
      if (!force && this._cache.brands.data && (Date.now() - this._cache.brands.time < this._CACHE_TTL)) {
        return this._cache.brands.data;
      }
      if (!force && !this._cache.brands.data) {
        try {
          const local = JSON.parse(localStorage.getItem(KEYS.BRANDS));
          if (local && Array.isArray(local) && local.length > 0) {
            this._cache.brands = { data: local, time: Date.now() };
            if (this.isSupabaseActive() && !this._inFlight.brands) {
              this.getBrands(true).catch(() => {});
            }
            return local;
          }
        } catch(e) {}
      }
      if (this._inFlight.brands) return this._inFlight.brands;

      const filterRogueBrands = (brands) => {
        return brands.filter(b => {
          if (!b.name) return true;
          const n = b.name.toLowerCase().replace(/\s+/g, '');
          return b.id !== 'cold-brew' && b.id !== 'hussam' && n !== 'coldbrewcoffee' && n !== 'generic';
        });
      };

      this._inFlight.brands = (async () => {
        try {
          let result = [];
          if (this.isSupabaseActive()) {
            const { data, error } = await this.supabase.from('brands').select('*').order('name', { ascending: true });
            if (error) throw new Error('Failed to fetch brands from Supabase: ' + error.message);
            result = filterRogueBrands(data).map(b => this.normalizeBrand(b));
            try {
              localStorage.setItem(KEYS.BRANDS, JSON.stringify(result));
            } catch(e) {}
          } else {
            result = filterRogueBrands(JSON.parse(localStorage.getItem(KEYS.BRANDS)) || []);
          }
          this._cache.brands = { data: result, time: Date.now() };
          return result;
        } finally {
          delete this._inFlight.brands;
        }
      })();

      return this._inFlight.brands;
    }

    async getBrandById(id) {
      const brands = await this.getBrands();
      return brands.find(b => b.id === id) || null;
    }

    async saveBrand(brandData, isEdit = false) {
      this.invalidateCache();
      const generatedId = brandData.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      if (!isEdit) {
        brandData.id = brandData.id || generatedId;
        const allBrands = await this.getBrands(true);
        if (allBrands.some(b => b.id === brandData.id)) {
          throw new Error('This brand already exists.');
        }
      } else {
        if (!brandData.id) throw new Error('Brand ID is missing for edit operation.');
      }
      
      const dbData = {
        id: brandData.id,
        name: brandData.name.trim(),
        image: brandData.image,
        description: brandData.description
      };

      if (this.isSupabaseActive()) {
        if (isEdit) {
          const { error } = await this.supabase.from('brands').update(dbData).eq('id', brandData.id);
          if (error) throw new Error('Supabase save brand error: ' + error.message);
        } else {
          const { error } = await this.supabase.from('brands').insert([dbData]);
          if (error) {
            if (error.code === '23505') throw new Error('This brand already exists.');
            throw new Error('Supabase save brand error: ' + error.message);
          }
        }
      }

      // Update local storage only if cloud succeeds or we are offline
      let brands = JSON.parse(localStorage.getItem(KEYS.BRANDS)) || [];
      const index = brands.findIndex(b => b.id === brandData.id);
      if (index >= 0) { brands[index] = { ...brands[index], ...brandData }; }
      else { brands.push(brandData); }
      localStorage.setItem(KEYS.BRANDS, JSON.stringify(brands));
      
      return brandData;
    }

    async deleteBrand(id) {
      this.invalidateCache();
      if (this.isSupabaseActive()) {
        const { error } = await this.supabase.from('brands').delete().eq('id', id);
        if (error) throw new Error('Supabase delete brand error: ' + error.message);
      }
      
      let brands = JSON.parse(localStorage.getItem(KEYS.BRANDS)) || [];
      brands = brands.filter(b => b.id !== id);
      localStorage.setItem(KEYS.BRANDS, JSON.stringify(brands));
      return true;
    }

    async getCategories(force = false) {
      if (!force && this._cache.categories.data && (Date.now() - this._cache.categories.time < this._CACHE_TTL)) {
        return this._cache.categories.data;
      }
      if (!force && !this._cache.categories.data) {
        try {
          const local = JSON.parse(localStorage.getItem(KEYS.CATEGORIES));
          if (local && Array.isArray(local) && local.length > 0) {
            this._cache.categories = { data: local, time: Date.now() };
            if (this.isSupabaseActive() && !this._inFlight.categories) {
              this.getCategories(true).catch(() => {});
            }
            return local;
          }
        } catch(e) {}
      }
      if (this._inFlight.categories) return this._inFlight.categories;

      this._inFlight.categories = (async () => {
        try {
          let result = [];
          if (this.isSupabaseActive()) {
            const { data, error } = await this.supabase.from('categories').select('*');
            if (error) throw new Error('Failed to fetch categories from Supabase: ' + error.message);
            
            const hasColdBrew = data.some(c => c.id === 'cold-brew');
            if (!hasColdBrew) {
              data.push({
                id: 'cold-brew',
                name: 'Cold Brew',
                description: 'Smooth, refreshing cold brew essentials.',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8z"/><path d="M8 8v12a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V8"/></svg>'
              });
            }
            result = data;
            try {
              localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(result));
            } catch(e) {}
          } else {
            result = JSON.parse(localStorage.getItem(KEYS.CATEGORIES)) || [];
          }
          this._cache.categories = { data: result, time: Date.now() };
          return result;
        } finally {
          delete this._inFlight.categories;
        }
      })();

      return this._inFlight.categories;
    }

    async getProducts(filters = {}, force = false) {
      let allProducts = [];
      if (!force && this._cache.products.data && (Date.now() - this._cache.products.time < this._CACHE_TTL)) {
        allProducts = this._cache.products.data;
      } else if (!force && !this._cache.products.data) {
        try {
          const local = JSON.parse(localStorage.getItem(KEYS.PRODUCTS));
          if (local && Array.isArray(local) && local.length > 0) {
            allProducts = local;
            this._cache.products = { data: local, time: Date.now() };
            if (this.isSupabaseActive() && !this._inFlight.products) {
              this.getProducts({}, true).catch(() => {});
            }
          }
        } catch(e) {}
      }

      if (allProducts.length === 0) {
        if (this._inFlight.products) {
          allProducts = await this._inFlight.products;
        } else {
          this._inFlight.products = (async () => {
            try {
              let res = [];
              if (this.isSupabaseActive()) {
                const { data, error } = await this.supabase.from('products').select('*');
                if (error) throw new Error('Failed to fetch products from Supabase: ' + error.message);
                res = data.map(p => this.normalizeProduct(p));
                try {
                  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(res));
                } catch(e) {}
              } else {
                res = JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || [];
              }
              this._cache.products = { data: res, time: Date.now() };
              return res;
            } finally {
              delete this._inFlight.products;
            }
          })();
          allProducts = await this._inFlight.products;
        }
      }

      let products = allProducts;
      if (filters.brandId) { products = products.filter(p => p.brandId === filters.brandId || p.brand_id === filters.brandId); }
      if (filters.categoryId) { products = products.filter(p => p.categoryId === filters.categoryId || p.category_id === filters.categoryId); }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)));
      }
      return products;
    }

    async getProductById(id) {
      const products = await this.getProducts();
      return products.find(p => p.id === id) || null;
    }

    normalizeProduct(p) {
      return {
        id: p.id,
        brandId: p.brand_id || p.brandId,
        brand_id: p.brand_id || p.brandId,
        categoryId: p.category_id || p.categoryId,
        category_id: p.category_id || p.categoryId,
        name: p.name,
        price: p.price,
        stockStatus: p.stock_status || p.stockStatus,
        stock_status: p.stock_status || p.stockStatus,
        description: p.description,
        image: p.image,
        specs: p.specs
      };
    }

    normalizeBrand(b) {
      return {
        id: b.id,
        name: b.name,
        image: b.image,
        description: b.description
      };
    }

    async saveProduct(productData) {
      this.invalidateCache();
      if (!productData.id) { productData.id = 'prod-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4); }
      if (!productData.stockStatus) { productData.stockStatus = 'In Stock'; }
      if (!productData.specs) { productData.specs = {}; }
      
      const dbData = {
        id: productData.id,
        brand_id: productData.brandId || productData.brand_id,
        category_id: productData.categoryId || productData.category_id,
        name: productData.name,
        price: productData.price,
        stock_status: productData.stockStatus || productData.stock_status,
        description: productData.description,
        image: productData.image,
        specs: productData.specs
      };

      if (this.isSupabaseActive()) {
        const { error } = await this.supabase.from('products').upsert(dbData);
        if (error) throw new Error('Supabase save product error: ' + error.message);
      }

      let products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || [];
      const index = products.findIndex(p => p.id === productData.id);
      if (index >= 0) { products[index] = { ...products[index], ...productData }; }
      else { products.push(productData); }
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      return productData;
    }

    async deleteProduct(id) {
      this.invalidateCache();
      if (this.isSupabaseActive()) {
        const { error } = await this.supabase.from('products').delete().eq('id', id);
        if (error) throw new Error('Supabase delete product error: ' + error.message);
      }

      let products = JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || [];
      products = products.filter(p => p.id !== id);
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
      let variants = JSON.parse(localStorage.getItem(KEYS.VARIANTS)) || [];
      variants = variants.filter(v => v.productId !== id && v.product_id !== id);
      localStorage.setItem(KEYS.VARIANTS, JSON.stringify(variants));
      return true;
    }

    async toggleProductStock(id) {
      this.invalidateCache();
      const product = await this.getProductById(id);
      if (product) {
        const nextStatus = (product.stockStatus === 'Out of Stock' || product.stock_status === 'Out of Stock') ? 'In Stock' : 'Out of Stock';
        product.stockStatus = nextStatus;
        product.stock_status = nextStatus;
        await this.saveProduct(product);
        return nextStatus;
      }
      return null;
    }

    async getVariantsByProduct(productId) {
      let variants = [];
      if (this.isSupabaseActive()) {
        const { data, error } = await this.supabase.from('product_variants').select('*').eq('product_id', productId);
        if (error) throw new Error('Failed to fetch variants: ' + error.message);
        variants = data.map(v => ({...v, productId: v.product_id, stockStatus: v.stock_status, linkedProductId: v.linked_product_id}));
      } else {
        variants = JSON.parse(localStorage.getItem(KEYS.VARIANTS)) || [];
      }
      return variants.filter(v => v.productId === productId || v.product_id === productId);
    }

    async saveVariant(variantData) {
      this.invalidateCache();
      if (!variantData.id) { variantData.id = 'var-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4); }
      
      const dbData = {
        id: variantData.id,
        product_id: variantData.productId || variantData.product_id,
        name: variantData.name,
        color: variantData.color,
        size: variantData.size,
        spout_type: variantData.spout_type,
        price: variantData.price,
        stock_status: variantData.stockStatus || variantData.stock_status,
        image: variantData.image,
        linked_product_id: variantData.linkedProductId || variantData.linked_product_id || null
      };

      if (this.isSupabaseActive()) {
        const { error } = await this.supabase.from('product_variants').upsert(dbData);
        if (error) throw new Error('Supabase save variant error: ' + error.message);
      }

      let variants = JSON.parse(localStorage.getItem(KEYS.VARIANTS)) || [];
      const idx = variants.findIndex(v => v.id === variantData.id);
      if (idx >= 0) { variants[idx] = { ...variants[idx], ...variantData }; }
      else { variants.push(variantData); }
      localStorage.setItem(KEYS.VARIANTS, JSON.stringify(variants));
      return variantData;
    }

    async deleteVariant(id) {
      this.invalidateCache();
      if (this.isSupabaseActive()) {
        const { error } = await this.supabase.from('product_variants').delete().eq('id', id);
        if (error) throw new Error('Supabase delete variant error: ' + error.message);
      }
      
      let variants = JSON.parse(localStorage.getItem(KEYS.VARIANTS)) || [];
      variants = variants.filter(v => v.id !== id);
      localStorage.setItem(KEYS.VARIANTS, JSON.stringify(variants));
      return true;
    }

    async uploadImage(file, entityType, entityId) {
      if (!this.isSupabaseConfigured() || !this.supabase) throw new Error("Supabase is not configured");
      
      const session = await this.getCurrentSession();
      if (!session) throw new Error("User is not authenticated. Please log in.");

      if (entityType !== 'product' && entityType !== 'brand') {
        throw new Error("Invalid entity type. Must be 'product' or 'brand'.");
      }

      if (!entityId || typeof entityId !== 'string' || !entityId.trim()) {
        throw new Error("Invalid or missing entity ID.");
      }

      const sanitizedEntityId = entityId.trim().replace(/[^a-zA-Z0-9\-_]/g, '_');

      if (!file) throw new Error("No file provided");
      
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed.");
      
      if (file.size > 5 * 1024 * 1024) throw new Error("File exceeds maximum size of 5MB.");

      const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
      const timestamp = Date.now();
      const folder = entityType === 'product' ? 'products' : 'brands';
      const path = `${folder}/${sanitizedEntityId}/${timestamp}-${safeFilename}`;

      const { data, error } = await this.supabase.storage
        .from('crewbrew-assets')
        .upload(path, file, { cacheControl: '3600', upsert: false });

      if (error) {
        if (error.message.includes('Bucket not found') || error.message.includes('bucket')) {
          throw new Error("Storage bucket 'crewbrew-assets' does not exist.");
        }
        throw new Error("Upload failed: " + error.message);
      }

      const { data: publicUrlData } = this.supabase.storage
        .from('crewbrew-assets')
        .getPublicUrl(path);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error("Failed to generate public URL for uploaded image.");
      }

      return { publicUrl: publicUrlData.publicUrl, path };
    }

    async deleteUploadedImage(path) {
      if (!this.isSupabaseConfigured() || !this.supabase) return;
      if (!path) return;
      await this.supabase.storage.from('crewbrew-assets').remove([path]);
    }

    async testStorageAccess() {
      let result = { success: false, stage: '', message: '', cleanupWarning: false };
      
      try {
        result.stage = 'Supabase configured';
        if (!this.isSupabaseConfigured() || !this.supabase) {
          throw new Error("Supabase client not initialized.");
        }

        result.stage = 'Authenticated session exists';
        const session = await this.getCurrentSession();
        if (!session) {
          throw new Error("No current Admin session. Please login.");
        }

        result.stage = 'crewbrew-assets bucket can be retrieved';
        const { error: bucketError } = await this.supabase.storage.getBucket('crewbrew-assets');
        if (bucketError) {
          throw new Error("Bucket check failed: " + bucketError.message);
        }

        result.stage = 'Upload permission works';
        // Create 1x1 PNG blob directly in memory (avoids browser CSP connect-src blocking data: fetch)
        const byteCharacters = atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=");
        const byteNumbers = new Uint8Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const blob = new Blob([byteNumbers], { type: 'image/png' });
        
        const testPath = `_healthchecks/storage-test-${Date.now()}.webp`;
        const { error: upError } = await this.supabase.storage.from('crewbrew-assets').upload(testPath, blob);
        
        if (upError) {
          throw new Error("Upload permission check failed: " + upError.message);
        }
        
        result.stage = 'Temporary test file can be removed';
        const { error: rmError } = await this.supabase.storage.from('crewbrew-assets').remove([testPath]);
        
        if (rmError) {
          result.cleanupWarning = true;
          throw new Error("Test file was uploaded but could not be removed: " + rmError.message);
        }

        result.success = true;
        result.stage = 'All checks passed';
        result.message = 'Storage is fully reachable and configured correctly.';
      } catch (err) {
        result.message = err.message;
      }
      
      return result;
    }

    resetToDefaultCatalog() {
      localStorage.setItem(KEYS.BRANDS, JSON.stringify(DEFAULT_BRANDS));
      localStorage.setItem(KEYS.CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
      localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(KEYS.VARIANTS, JSON.stringify(DEFAULT_VARIANTS));
      localStorage.setItem('crewbrew_db_version', 'v4');
      return true;
    }

    exportCatalogJson() {
      const data = {
        brands: JSON.parse(localStorage.getItem(KEYS.BRANDS)) || [],
        categories: JSON.parse(localStorage.getItem(KEYS.CATEGORIES)) || [],
        products: JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || [],
        variants: JSON.parse(localStorage.getItem(KEYS.VARIANTS)) || []
      };
      const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
      const dlAnchor = document.createElement('a');
      dlAnchor.setAttribute("href", jsonStr);
      dlAnchor.setAttribute("download", `crewbrew_catalog_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(dlAnchor);
      dlAnchor.click();
      dlAnchor.remove();
    }

    async uploadLocalCatalogToSupabase(onProgress) {
      if (!this.supabase || !this.getSupabaseConfig().active) {
        throw new Error('Supabase must be active and configured to upload the catalog.');
      }
      
      const counts = { brands: 0, categories: 0, products: 0, variants: 0 };

      // 1. Upload Brands
      let brands = JSON.parse(localStorage.getItem(KEYS.BRANDS)) || [];
      for (let i = 0; i < brands.length; i++) {
        if (onProgress) onProgress('brands', i + 1, brands.length);
        const brand = brands[i];
        const { error } = await this.supabase.from('brands').upsert({
          id: brand.id, name: brand.name, image: brand.image, description: brand.description
        });
        if (error) throw new Error('Error uploading brand ' + brand.name + ': ' + error.message);
        counts.brands++;
      }

      // 2. Upload Categories
      let cats = JSON.parse(localStorage.getItem(KEYS.CATEGORIES)) || [];
      for (let i = 0; i < cats.length; i++) {
        if (onProgress) onProgress('categories', i + 1, cats.length);
        const cat = cats[i];
        const { error } = await this.supabase.from('categories').upsert({
          id: cat.id, name: cat.name, description: cat.description, icon: cat.icon
        });
        if (error) throw new Error('Error uploading category ' + cat.name + ': ' + error.message);
        counts.categories++;
      }

      // 3. Upload Products
      let prods = JSON.parse(localStorage.getItem(KEYS.PRODUCTS)) || [];
      for (let i = 0; i < prods.length; i++) {
        if (onProgress) onProgress('products', i + 1, prods.length);
        const prod = prods[i];
        const { error } = await this.supabase.from('products').upsert({
          id: prod.id,
          brand_id: prod.brandId || prod.brand_id,
          category_id: prod.categoryId || prod.category_id,
          name: prod.name,
          price: prod.price,
          stock_status: prod.stockStatus || prod.stock_status,
          description: prod.description,
          image: prod.image,
          specs: prod.specs
        });
        if (error) throw new Error('Error uploading product ' + prod.name + ': ' + error.message);
        counts.products++;
      }

      // 4. Upload Variants
      let vars = JSON.parse(localStorage.getItem(KEYS.VARIANTS)) || [];
      for (let i = 0; i < vars.length; i++) {
        if (onProgress) onProgress('variants', i + 1, vars.length);
        const v = vars[i];
        const { error } = await this.supabase.from('product_variants').upsert({
          id: v.id,
          product_id: v.productId || v.product_id,
          name: v.name,
          color: v.color,
          size: v.size,
          spout_type: v.spout_type,
          price: v.price,
          stock_status: v.stockStatus || v.stock_status,
          image: v.image
        });
        if (error) throw new Error('Error uploading variant ' + v.name + ': ' + error.message);
        counts.variants++;
      }

      return counts;
    }
  }

  window.dbService = new DBService();
})();
