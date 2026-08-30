export const brands = [
  { id: 'timemore', name: 'Timemore' },
  { id: 'barista-space', name: 'Barista Space' },
  { id: 'melitta', name: 'Melitta' },
  { id: 'aeropress', name: 'AeroPress' },
  { id: 'mhw-3bomber', name: 'MHW-3Bomber' }
];

export const categories = [
  { id: 'grinders', name: 'Grinders' },
  { id: 'kettles', name: 'Kettles' },
  { id: 'scales', name: 'Scales' },
  { id: 'accessories', name: 'Accessories' }
];

export const products = [
  {
    id: 'timemore-c2',
    brandId: 'timemore',
    categoryId: 'grinders',
    name: 'Timemore Chestnut C2 Grinder',
    price: 'JOD 45.00',
    description: 'A high-quality, entry-level hand grinder with stainless steel burrs, providing excellent consistency for pour-over and AeroPress.',
    specs: {
      'Burrs': '38mm Stainless Steel',
      'Capacity': '25g',
      'Weight': '430g',
      'Material': 'Aluminum Alloy'
    },
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'timemore-black-mirror',
    brandId: 'timemore',
    categoryId: 'scales',
    name: 'Timemore Black Mirror Basic Plus',
    price: 'JOD 35.00',
    description: 'Minimalist coffee scale with fast response time and high accuracy, perfect for espresso and pour-over brewing.',
    specs: {
      'Accuracy': '0.1g',
      'Max Weight': '2000g',
      'Battery': 'Rechargeable (USB-C)',
      'Features': 'Auto-timer, Water-resistant'
    },
    image: 'https://images.unsplash.com/photo-1620189507195-68309c04c4d0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'barista-space-pitcher',
    brandId: 'barista-space',
    categoryId: 'accessories',
    name: 'Barista Space Milk Pitcher 600ml',
    price: 'JOD 25.00',
    description: 'Professional grade milk frothing pitcher with precision spout for detailed latte art.',
    specs: {
      'Capacity': '600ml',
      'Material': '304 Stainless Steel',
      'Finish': 'Matte Black',
      'Thickness': '1.0mm'
    },
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'melitta-pour-over',
    brandId: 'melitta',
    categoryId: 'accessories',
    name: 'Melitta Ceramic Pour-Over',
    price: 'JOD 18.00',
    description: 'Classic ceramic pour-over cone for a clean and flavorful cup of coffee.',
    specs: {
      'Material': 'Ceramic',
      'Size': '1x4',
      'Color': 'White',
      'Dishwasher Safe': 'Yes'
    },
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mhw-3bomber-pitcher-3-white',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Milk Pitcher 3.0 (600ml) - White',
    price: 'JOD 25.00',
    description: 'Premium milk frothing pitcher featuring the generation 3.0 design with a round spout for detailed latte art.',
    specs: {
      'Generation': '3.0 Series',
      'Capacity': '600 ml',
      'Spout Type': 'Round Spout'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - White.jpg'
  },
  {
    id: 'mhw-3bomber-pitcher-3-black',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Milk Pitcher 3.0 (600ml) - Matte Black',
    price: 'JOD 25.00',
    description: 'Premium milk frothing pitcher featuring the generation 3.0 design with a round spout for detailed latte art.',
    specs: {
      'Generation': '3.0 Series',
      'Capacity': '600 ml',
      'Spout Type': 'Round Spout'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - Matte Black.jpg'
  },
  {
    id: 'mhw-3bomber-pitcher-3-silver',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Milk Pitcher 3.0 (600ml) - Silver Spot',
    price: 'JOD 25.00',
    description: 'Premium milk frothing pitcher featuring the generation 3.0 design with a round spout for detailed latte art.',
    specs: {
      'Generation': '3.0 Series',
      'Capacity': '600 ml',
      'Spout Type': 'Round Spout'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Milk Pitcher 3.0 (600ml) - Silver Spot.jpg'
  },
  {
    id: 'mhw-3bomber-wright-cup',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Wright Cup (90ml)',
    price: 'JOD 12.00',
    description: 'Hand-painted series limited edition glass cup, perfect for espresso shots and displaying beautiful crema.',
    specs: {
      'Series': 'Wright Series',
      'Capacity': '90 ml',
      'Style': 'Limited Edition Hand-Painted'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Wright Cup (90ml) - Limited Edition.jpg'
  },
  {
    id: 'mhw-3bomber-sawada-cup-tiffany',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Tiffany Blue',
    price: 'JOD 16.00',
    description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
    specs: {
      'Series': 'Sawada Series',
      'Capacity': '280 ml',
      'Material': 'Premium Ceramic'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Tiffany Blue.jpg'
  },
  {
    id: 'mhw-3bomber-sawada-cup-berlin',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Berlin Blue',
    price: 'JOD 16.00',
    description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
    specs: {
      'Series': 'Sawada Series',
      'Capacity': '280 ml',
      'Material': 'Premium Ceramic'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Berlin Blue.jpg'
  },
  {
    id: 'mhw-3bomber-sawada-cup-hawthorn',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Hawthorn Red',
    price: 'JOD 16.00',
    description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
    specs: {
      'Series': 'Sawada Series',
      'Capacity': '280 ml',
      'Material': 'Premium Ceramic'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Hawthorn Red.jpg'
  },
  {
    id: 'mhw-3bomber-sawada-cup-apricot',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Sawada Ceramic Cup (280ml) - Apricot Color',
    price: 'JOD 16.00',
    description: 'Premium ceramic latte cup designed in collaboration with world-class baristas for optimal milk pouring and thermal retention.',
    specs: {
      'Series': 'Sawada Series',
      'Capacity': '280 ml',
      'Material': 'Premium Ceramic'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Sawada Ceramic Cup (280ml) - Apricot Color.jpg'
  },
  {
    id: 'mhw-3bomber-cd-distributor',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber CD-Texture Tamper & Distributor (58.35mm)',
    price: 'JOD 30.00',
    description: 'Premium four oars distributor in black with a distinct CD-texture finish for consistent espresso extraction.',
    specs: {
      'Base Type': 'Four Oars / Paddles',
      'Diameter': '58.35 mm',
      'Finish': 'CD-Texture Black'
    },
    image: 'MHW-3Bomber/CD-Texture Tamper & Distributor 58.35mm-four oars-black.jpg'
  },
  {
    id: 'mhw-3bomber-lightning-wdt',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Lightning WDT Tool 2.0 - Black',
    price: 'JOD 18.00',
    description: 'Advanced needle distribution tool featuring a mechanical lightning-like deployment mechanism for declumping espresso pucks.',
    specs: {
      'Type': 'Needle Distribution Tool',
      'Generation': '2.0 Series',
      'Design': 'Lightning Mechanism'
    },
    image: 'MHW-3Bomber/Lightning Needle Distribution Tool 2.0-black.jpg'
  },
  {
    id: 'mhw-3bomber-yu-cyclone-wdt',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Yu Series Cyclone WDT Tool (58.35mm) - Black',
    price: 'JOD 22.00',
    description: 'Cyclone-style needle distribution tool from the premium Yu Series, compatible with 58.35mm filter baskets.',
    specs: {
      'Series': 'Yu Series',
      'Type': 'Cyclone Needle Distribution Tool',
      'Compatibility': '58.35 mm Universal'
    },
    image: 'MHW-3Bomber/Yu Series Cyclone Needle Distribution Tool Black-58.35mm.jpg'
  },
  {
    id: 'mhw-3bomber-yu-impact-tamper-threaded',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Yu Series Impact Tamper (58.35mm) - Threaded Base',
    price: 'JOD 35.00',
    description: 'Spring-loaded impact tamper from the Yu Series featuring a threaded base design to prevent channeling.',
    specs: {
      'Series': 'Yu Series',
      'Type': 'Impact / Spring-Loaded Tamper',
      'Diameter': '58.35 mm'
    },
    image: 'MHW-3Bomber/Yu Series-Impact Tamper-Thread 58.35mm.jpg'
  },
  {
    id: 'mhw-3bomber-yu-impact-tamper-flat',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Yu Series Impact Tamper (58.35mm) - Flat Base',
    price: 'JOD 35.00',
    description: 'Spring-loaded impact tamper from the Yu Series featuring a classic flat base design to ensure an even level tamp.',
    specs: {
      'Series': 'Yu Series',
      'Type': 'Impact / Spring-Loaded Tamper',
      'Diameter': '58.35 mm'
    },
    image: 'MHW-3Bomber/Yu Series-mpact Tamper-Flat base-58.35mm.jpg'
  },
  {
    id: 'mhw-3bomber-yu-portafilter',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Yu Series Unibody Bottomless Portafilter (58mm)',
    price: 'JOD 45.00',
    description: 'Premium flat unibody bottomless portafilter designed for ultimate strength and style.',
    specs: {
      'Series': 'Yu Series',
      'Type': 'Unibody Bottomless Portafilter',
      'Size': '58 mm'
    },
    image: 'MHW-3Bomber/Yu Series-Unibody Bottomless Portafilter-Flat-58mm.jpg'
  },
  {
    id: 'mhw-3bomber-knight-tamper-white',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Knight Impact Tamper (58.35mm) - White (Threaded)',
    price: 'JOD 38.00',
    description: 'Knight Series premium spring-loaded impact tamper with a threaded base and stylish white grip.',
    specs: {
      'Series': 'Knight Series',
      'Type': 'Impact Tamper',
      'Diameter': '58.35 mm'
    },
    image: 'MHW-3Bomber/Knight Impact Tamper White Thread-58.35mm.jpg'
  },
  {
    id: 'mhw-3bomber-knight-tamper-pink',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Knight Impact Tamper (58.35mm) - Pink (Threaded)',
    price: 'JOD 38.00',
    description: 'Knight Series premium spring-loaded impact tamper with a threaded base and stylish pink grip.',
    specs: {
      'Series': 'Knight Series',
      'Type': 'Impact Tamper',
      'Diameter': '58.35 mm'
    },
    image: 'MHW-3Bomber/Knight Impact Tamper Pink Thread-58.35mm.jpg'
  },
  {
    id: 'mhw-3bomber-scale-stand',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Coffee Scale Stand - Black',
    price: 'JOD 15.00',
    description: 'Espresso scale stand with height-adjustment, finished in matte black. Avoids direct heat and steam exposure to your scale.',
    specs: {
      'Application': 'Espresso Scale Stand Height-Adjustment',
      'Color': 'Matte Black'
    },
    image: 'MHW-3Bomber/Coffee scale stand-Black.jpg'
  },
  {
    id: 'mhw-3bomber-cube-scale-mini',
    brandId: 'mhw-3bomber',
    categoryId: 'scales',
    name: 'MHW-3Bomber Cube Coffee Scale - 2.0 Mini (Black)',
    price: 'JOD 35.00',
    description: 'Compact 2.0 Mini version of the smart Cube Coffee Scale, built for espresso drip trays.',
    specs: {
      'Series': 'Cube Series',
      'Features': 'Smart Timer & Flow-rate tracking'
    },
    image: 'MHW-3Bomber/Cube Coffee Scale 2.0 Mini-Black.jpg'
  },
  {
    id: 'mhw-3bomber-cube-scale-promax',
    brandId: 'mhw-3bomber',
    categoryId: 'scales',
    name: 'MHW-3Bomber Cube Coffee Scale - 3.0 Pro Max (Black)',
    price: 'JOD 45.00',
    description: 'Professional 3.0 Pro Max edition of the Cube smart coffee scale with enhanced flow-rate diagnostics.',
    specs: {
      'Series': 'Cube Series',
      'Features': 'Smart Timer & Flow-rate tracking'
    },
    image: 'MHW-3Bomber/Cube Coffee Scale 3.0 Pro Max Black.jpg'
  },
  {
    id: 'mhw-3bomber-formula-scale-white',
    brandId: 'mhw-3bomber',
    categoryId: 'scales',
    name: 'MHW-3Bomber Formula Smart Coffee Scale - White',
    price: 'JOD 55.00',
    description: 'Advanced Formula series smart scale with Bluetooth connectivity and automatic espresso modes.',
    specs: {
      'Model': 'Formula Smart Scale',
      'Features': 'Bluetooth connectivity & Smart Espresso modes'
    },
    image: 'MHW-3Bomber/Formula Smart Coffee Scale-White.jpg'
  },
  {
    id: 'mhw-3bomber-formula-scale-black',
    brandId: 'mhw-3bomber',
    categoryId: 'scales',
    name: 'MHW-3Bomber Formula Smart Coffee Scale - Black',
    price: 'JOD 55.00',
    description: 'Advanced Formula series smart scale with Bluetooth connectivity and automatic espresso modes.',
    specs: {
      'Model': 'Formula Smart Scale',
      'Features': 'Bluetooth connectivity & Smart Espresso modes'
    },
    image: 'MHW-3Bomber/Formula Smart Coffee Scale-Black.jpg'
  },
  {
    id: 'mhw-3bomber-rdt-dosing-set',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber RDT Spray Bottle & Dosing Cup Set',
    price: 'JOD 10.00',
    description: 'Complete dosing kit containing an RDT spray bottle and a bean dosing tray in black to reduce static build-up during grinding.',
    specs: {
      'Contents': '1x RDT Spray Bottle, 1x Dosing Tray'
    },
    image: 'MHW-3Bomber/RDT Spray Bottle Coffee Bean Dosing Cup-Set.jpg'
  },
  {
    id: 'mhw-3bomber-dosing-ring',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Magnetic Dosing Ring (58mm) - Black',
    price: 'JOD 14.00',
    description: 'High-strength magnetic dosing ring compatible with 58mm portafilters to prevent coffee grounds spill.',
    specs: {
      'Mounting': 'High-Strength Magnetic',
      'Size': '58 mm Universal'
    },
    image: 'MHW-3Bomber/Magnetic Dosing Ring-58mm universal.jpg'
  },
  {
    id: 'mhw-3bomber-blade-r3',
    brandId: 'mhw-3bomber',
    categoryId: 'grinders',
    name: 'MHW-3Bomber Blade R3 Manual Coffee Grinder - Black',
    price: 'JOD 95.00',
    description: 'Premium manual grinder from the Rapidity Series, sporting an innovative 3-burr precision grinding mechanism for ultimate speed and uniformity.',
    specs: {
      'Model': 'Blade R3 (Rapidity Series)',
      'Burr Type': '3-Burr Precision Grinding Mechanism'
    },
    image: 'MHW-3Bomber/Blade R3 Manual Coffee Grinder Black.jpg'
  },
  {
    id: 'mhw-3bomber-m1-set-basic',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber M1 Drip Coffee Set - Basic 7-Pcs Set (Black)',
    price: 'JOD 80.00',
    description: 'Essential drip coffee setup containing a grinder, dripper, server, kettle, scales, filters, and carrying case.',
    specs: {
      'Series': 'M1 Series',
      'Composition': '7-Pieces Basic Brew Set'
    },
    image: 'MHW-3Bomber/M1 Drip Coffee Set-Basic-7 pcs in one.jpg'
  },
  {
    id: 'mhw-3bomber-m1-set-flipped',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber M1 Drip Coffee Set - Flipped Pour Over Gift Box (9-Pcs Set)',
    price: 'JOD 110.00',
    description: 'Deluxe expanded brew set with specialized glassware and drip tray, packaged inside a premium gift box.',
    specs: {
      'Series': 'M1 Series',
      'Composition': '9-Pieces Deluxe Gift Set'
    },
    image: 'MHW-3Bomber/M1 Drip Coffee Set-Flipped Pour Over Gift Box-9pcs.jpg'
  },
  {
    id: 'mhw-3bomber-m1-set-snake',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber M1 Drip Coffee Set - Assassin Year of the Snake Limited Edition [EU] (9-Pcs Set)',
    price: 'JOD 130.00',
    description: 'Collector\'s limited edition Year of the Snake brew kit, designed with gold/crimson detailing and premium packaging.',
    specs: {
      'Series': 'M1 Series',
      'Composition': '9-Pieces Limited Edition Collector\'s Set'
    },
    image: 'MHW-3Bomber/Assassin M1 Drip Coffee Set-Year of the Snake Limited Edition-9 pcs.jpg'
  },
  {
    id: 'mhw-3bomber-assassin-kettle-white',
    brandId: 'mhw-3bomber',
    categoryId: 'kettles',
    name: 'MHW-3Bomber Assassin Electric Pour Over Kettle (600ml) - White [CN]',
    price: 'JOD 90.00',
    description: 'Assassin series smart electric kettle featuring precise variable temperature PID control and a fast heating base.',
    specs: {
      'Series': 'Assassin Series',
      'Capacity': '600 ml',
      'Temperature Control': 'Smart PID Variable Temperature'
    },
    image: 'MHW-3Bomber/Assassin electric pour over kettle White.jpg'
  },
  {
    id: 'mhw-3bomber-assassin-kettle-black',
    brandId: 'mhw-3bomber',
    categoryId: 'kettles',
    name: 'MHW-3Bomber Assassin Electric Pour Over Kettle (600ml) - Black [EU]',
    price: 'JOD 90.00',
    description: 'Assassin series smart electric kettle featuring precise variable temperature PID control and a fast heating base.',
    specs: {
      'Series': 'Assassin Series',
      'Capacity': '600 ml',
      'Temperature Control': 'Smart PID Variable Temperature'
    },
    image: 'MHW-3Bomber/Assassin electric pour over kettle Black.jpg'
  },
  {
    id: 'mhw-3bomber-meteorite-dripper',
    brandId: 'mhw-3bomber',
    categoryId: 'drippers',
    name: 'MHW-3Bomber Meteorite Dripper - Obsidian Black',
    price: 'JOD 25.00',
    description: 'Unique geometric rib configuration resembling a meteorite crater to facilitate clean water draw-down and avoid clogging.',
    specs: {
      'Model': 'Meteorite Series',
      'Color': 'Obsidian Black'
    },
    image: 'MHW-3Bomber/Meteorite Dripper-Obsidian Black.jpg'
  },
  {
    id: 'mhw-3bomber-eggonaut-dripper-pink',
    brandId: 'mhw-3bomber',
    categoryId: 'drippers',
    name: 'MHW-3Bomber Eggonaut Dripper - Pink',
    price: 'JOD 20.00',
    description: 'Food-grade resin/PCTG transparent dripper shaped like an astronaut helmet, ensuring optimal heat retention and high extraction control.',
    specs: {
      'Model': 'Eggonaut Series',
      'Material': 'Premium Resin/PCTG'
    },
    image: 'MHW-3Bomber/mhw 3bomber eggonaut Eggonaut Dripper-Pink.jpg'
  },
  {
    id: 'mhw-3bomber-eggonaut-dripper-blue',
    brandId: 'mhw-3bomber',
    categoryId: 'drippers',
    name: 'MHW-3Bomber Eggonaut Dripper - Blue',
    price: 'JOD 20.00',
    description: 'Food-grade resin/PCTG transparent dripper shaped like an astronaut helmet, ensuring optimal heat retention and high extraction control.',
    specs: {
      'Model': 'Eggonaut Series',
      'Material': 'Premium Resin/PCTG'
    },
    image: 'MHW-3Bomber/mhw 3bomber eggonaut Eggonaut Dripper-Blue.jpg'
  },
  {
    id: 'mhw-3bomber-eggonaut-dripper-black',
    brandId: 'mhw-3bomber',
    categoryId: 'drippers',
    name: 'MHW-3Bomber Eggonaut Dripper - Black',
    price: 'JOD 20.00',
    description: 'Food-grade resin/PCTG transparent dripper shaped like an astronaut helmet, ensuring optimal heat retention and high extraction control.',
    specs: {
      'Model': 'Eggonaut Series',
      'Material': 'Premium Resin/PCTG'
    },
    image: 'MHW-3Bomber/mhw 3bomber eggonaut Eggonaut Dripper-Black.jpg'
  },
  {
    id: 'mhw-3bomber-snail-holder-black',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Snail Filter Paper Holder - Black',
    price: 'JOD 15.00',
    description: 'Beautiful modern filter paper holder with a dust-proof cover, designed in an elegant snail shape.',
    specs: {
      'Design': 'Snail Shape with Dust-proof Lid'
    },
    image: 'MHW-3Bomber/Snail Filter Paper Holder-black.jpg'
  },
  {
    id: 'mhw-3bomber-snail-holder-white',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Snail Filter Paper Holder - White',
    price: 'JOD 15.00',
    description: 'Beautiful modern filter paper holder with a dust-proof cover, designed in an elegant snail shape.',
    specs: {
      'Design': 'Snail Shape with Dust-proof Lid'
    },
    image: 'MHW-3Bomber/Snail Filter Paper Holder-White.jpg'
  },
  {
    id: 'mhw-3bomber-paper-filter-v02',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Paper Filter Series - V02 White (100pcs/box)',
    price: 'JOD 6.00',
    description: 'High-quality wood-pulp paper filters with exceptional pore distribution for a clean cup profile.',
    specs: {
      'Type': 'V02 Cone-shaped Paper Filter',
      'Quantity': '100 pcs / Box'
    },
    image: 'MHW-3Bomber/Paper Filter-100pcs-box-V02.jpg.jpg'
  },
  {
    id: 'mhw-3bomber-paper-filter-155',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Paper Filter Series - 155 Cake-shaped (50pcs/box)',
    price: 'JOD 7.00',
    description: 'High-quality wood-pulp paper filters with exceptional pore distribution for a clean cup profile.',
    specs: {
      'Type': '155 Cake-shaped Paper Filter',
      'Quantity': '50 pcs / Box'
    },
    image: 'MHW-3Bomber/Cake-shaped Filter Paper-1 or 2 persons-50pcs in-155.jpg'
  },
  {
    id: 'mhw-3bomber-walnut-portafilter-nuova',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Walnut Wood Bottomless Portafilter (58mm) - For Nuova',
    price: 'JOD 48.00',
    description: 'Stunning bottomless portafilter with an ergonomic premium walnut wood handle, specifically cut for Nuova Simonelli.',
    specs: {
      'Handle Material': 'Premium Walnut Wood',
      'Size': '58 mm'
    },
    image: 'MHW-3Bomber/Bottomless Portafilter Series-for Nuova-58mm.jpg'
  },
  {
    id: 'mhw-3bomber-walnut-portafilter-lamarzocco',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Walnut Wood Bottomless Portafilter (58mm) - For La Marzocco / E61',
    price: 'JOD 48.00',
    description: 'Stunning bottomless portafilter with an ergonomic premium walnut wood handle, cut for La Marzocco, Slayer, E61 groups.',
    specs: {
      'Handle Material': 'Premium Walnut Wood',
      'Size': '58 mm'
    },
    image: 'MHW-3Bomber/Bottomless Portafilter Series-for La Marzocco-58mm.jpg'
  },
  {
    id: 'mhw-3bomber-basket-dex-18',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Precision Filter Basket (58mm) - DEX 18g (Universal)',
    price: 'JOD 18.00',
    description: 'Precision laser-cut holes filter basket designed to ensure maximum extraction yield.',
    specs: {
      'Type': 'DEX Precision Basket',
      'Capacity': '18 g',
      'Size': '58 mm Universal'
    },
    image: 'MHW-3Bomber/DEX Precise Filter Basket-58mm universal-18g.jpg'
  },
  {
    id: 'mhw-3bomber-basket-dh-18',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Precision Filter Basket (58mm) - DH Silver 18g (Universal)',
    price: 'JOD 18.00',
    description: 'Precision laser-cut holes filter basket designed to ensure maximum extraction yield.',
    specs: {
      'Type': 'DH Silver Precision Basket',
      'Capacity': '18 g',
      'Size': '58 mm Universal'
    },
    image: 'MHW-3Bomber/DH Filter Basket-Silver-58mm universal-18g.jpg'
  },
  {
    id: 'mhw-3bomber-basket-dh-20',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Precision Filter Basket (58mm) - DH Silver 20g',
    price: 'JOD 18.00',
    description: 'Precision laser-cut holes filter basket designed to ensure maximum extraction yield.',
    specs: {
      'Type': 'DH Silver Precision Basket',
      'Capacity': '20 g',
      'Size': '58 mm Universal'
    },
    image: 'MHW-3Bomber/DH Filter Basket-Black-Silver 58mm -20g.jpg'
  },
  {
    id: 'mhw-3bomber-basket-jusbean-18',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Precision Filter Basket (58mm) - JusBean 18g (MHW & Torch Universal)',
    price: 'JOD 18.00',
    description: 'Precision laser-cut holes filter basket designed to ensure maximum extraction yield.',
    specs: {
      'Type': 'JusBean Precision Basket',
      'Capacity': '18 g',
      'Size': '58 mm Universal'
    },
    image: 'MHW-3Bomber/JusBean Filter Basket-MHW 3BOMBER&Torch-58mm universal-18g.jpg'
  },
  {
    id: 'mhw-3bomber-air-blower',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Silicone Air Blower - Nardo Grey',
    price: 'JOD 8.00',
    description: 'Medical-grade silicone air blower for clearing residual grounds from grinders, baskets, and small crevices.',
    specs: {
      'Material': 'Medical-grade Silicone',
      'Application': 'Grinder & Portafilter cleaning'
    },
    image: 'MHW-3Bomber/Air Blower-silicone.jpg'
  },
  {
    id: 'mhw-3bomber-cooki-cup-green',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Cooki Reusable Cup (360ml) - Avocado Green',
    price: 'JOD 15.00',
    description: 'Premium leak-proof travel cup from the Cooki series, designed for active lifestyles.',
    specs: {
      'Model': 'Cooki Travel Series',
      'Capacity': '360 ml'
    },
    image: 'MHW-3Bomber/Cookie Reusable Cup-360ml-Green.jpg'
  },
  {
    id: 'mhw-3bomber-cooki-cup-white',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Cooki Reusable Cup (360ml) - White',
    price: 'JOD 15.00',
    description: 'Premium leak-proof travel cup from the Cooki series, designed for active lifestyles.',
    specs: {
      'Model': 'Cooki Travel Series',
      'Capacity': '360 ml'
    },
    image: 'MHW-3Bomber/Cookie Reusable Cup-360ml-White.jpg'
  },
  {
    id: 'mhw-3bomber-cooki-cup-black',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Cooki Reusable Cup (360ml) - Obsidian Black',
    price: 'JOD 15.00',
    description: 'Premium leak-proof travel cup from the Cooki series, designed for active lifestyles.',
    specs: {
      'Model': 'Cooki Travel Series',
      'Capacity': '360 ml'
    },
    image: 'MHW-3Bomber/Cookie Reusable Cup-360ml-Black.jpg'
  },
  {
    id: 'mhw-3bomber-rinser-small-black',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Professional Cup Rinser - Small Black (32.5*17.5cm)',
    price: 'JOD 60.00',
    description: 'High-pressure professional pitcher and cup rinser for bar counters, in small matte black.',
    specs: {
      'Type': 'Professional Cup Rinser',
      'Size': '32.5 * 17.5 cm',
      'Color': 'Matte Black'
    },
    image: 'MHW-3Bomber/mhw rinser Cup Rinser-(S)-black.jpg'
  },
  {
    id: 'mhw-3bomber-rinser-large-black',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Professional Cup Rinser - Large Black (53*16cm)',
    price: 'JOD 85.00',
    description: 'High-pressure professional pitcher and cup rinser for bar counters, in large matte black.',
    specs: {
      'Type': 'Professional Cup Rinser',
      'Size': '53 * 16 cm',
      'Color': 'Matte Black'
    },
    image: 'MHW-3Bomber/Cup Rinser-(L)-black.jpg'
  },
  {
    id: 'mhw-3bomber-rinser-large-silver',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Professional Cup Rinser - Large Silver (53*16cm)',
    price: 'JOD 85.00',
    description: 'High-pressure professional pitcher and cup rinser for bar counters, in large brushed silver.',
    specs: {
      'Type': 'Professional Cup Rinser',
      'Size': '53 * 16 cm',
      'Color': 'Brushed Silver'
    },
    image: 'MHW-3Bomber/Cup Rinser-(L)-silver.jpg'
  },
  {
    id: 'mhw-3bomber-rinser-embedded-ss',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Professional Cup Rinser - Embedded Stainless Steel (19.5*59.5cm)',
    price: 'JOD 95.00',
    description: 'High-pressure professional pitcher and cup rinser with dual drain fields, designed for embedded flush-mount installation.',
    specs: {
      'Type': 'Embedded Cup Rinser',
      'Size': '19.5 * 59.5 cm',
      'Material': 'Stainless Steel'
    },
    image: 'MHW-3Bomber/Embedded Stainless Steel Cup Rinser-Silver.jpg'
  },
  {
    id: 'mhw-3bomber-thermometer',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Digital Thermometer',
    price: 'JOD 14.00',
    description: 'High-accuracy digital thermometer stick with interchangeable units and smart battery-saving modes.',
    specs: {
      'Range': '-45°C to 200°C',
      'Unit': 'Celsius / Fahrenheit interchangeable',
      'Battery': 'Disposable Smart Battery Included'
    },
    image: 'MHW-3Bomber/MHW-3Bomber Digital Thermometer.jpg'
  },
  {
    id: 'mhw-3bomber-chilling-ball',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Smooth Pour Over Chilling Ball Stand - Obsidian Black',
    price: 'JOD 24.00',
    description: 'Stainless steel chilling ball and stand designed to retain volatile coffee aromas during espresso/filter extraction.',
    specs: {
      'Purpose': 'Espresso/Filter flash chilling extract retention',
      'Color': 'Obsidian Black'
    },
    image: 'MHW-3Bomber/Smooth Pour Over Chilling Ball Stand-Black.jpg'
  },
  {
    id: 'mhw-3bomber-keychain',
    brandId: 'mhw-3bomber',
    categoryId: 'accessories',
    name: 'MHW-3Bomber Portafilter Key Chain',
    price: 'JOD 5.00',
    description: 'Miniature unibody bottomless portafilter keychain accessory. A perfect gift for any barista.',
    specs: {
      'Type': 'Miniature Portafilter Key Chain',
      'Material': 'Zinc Alloy / Chrome Finish'
    },
    image: 'MHW-3Bomber/mhw_portafilter_key_chain.jpg'
  }
];

