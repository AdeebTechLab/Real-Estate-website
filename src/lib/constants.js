export const CITIES = [
  'Lahore',
  'Islamabad',
  'Karachi',
  'Rawalpindi',
  'Peshawar',
  'Faisalabad'
];

export const NEIGHBORHOODS_BY_CITY = {
  Lahore: ['DHA Phase 5', 'DHA Phase 6', 'Gulberg III', 'Model Town', 'Bahria Town Sector C', 'Johar Town', 'Askari 11'],
  Islamabad: ['Sector F-6', 'Sector F-7', 'Sector F-8', 'Sector E-7', 'Bahria Enclave', 'DHA Phase 2', 'Bani Gala'],
  Karachi: ['Clifton Block 4', 'DHA Phase 8', 'DHA Phase 6', 'Gulshan-e-Iqbal Block 13', 'PECHS Block 2', 'KDA Scheme 1'],
  Rawalpindi: ['Bahria Town Phase 8', 'Chaklala Scheme 3', 'Saddar', 'Westridge 1', 'Top City-1'],
  Peshawar: ['Hayatabad Phase 3', 'University Town', 'Regi Model Town', 'DHA Peshawar'],
  Faisalabad: ['Canal Road', 'Kohinoor City', 'Madina Town', 'D-Ground Peoples Colony']
};

export const PROPERTY_TYPES = [
  { id: 'house', label: 'Houses & Villas', icon: 'Home' },
  { id: 'apartment', label: 'Apartments & Flats', icon: 'Building' },
  { id: 'penthouse', label: 'Luxury Penthouses', icon: 'Crown' },
  { id: 'commercial', label: 'Commercial Offices', icon: 'Briefcase' },
  { id: 'plot', label: 'Residential Plots', icon: 'MapPin' },
  { id: 'farmhouse', label: 'Country Farmhouses', icon: 'Trees' }
];

export const LISTING_TYPES = [
  { id: 'all', label: 'All Listings' },
  { id: 'sale', label: 'For Sale' },
  { id: 'rent', label: 'For Rent' }
];

export const SIZE_UNITS = [
  { id: 'Marla', label: 'Marla (approx. 225 sq ft)' },
  { id: 'Kanal', label: 'Kanal (20 Marla / 4,500 sq ft)' },
  { id: 'Sq.Ft', label: 'Square Feet' }
];

export const FURNISHING_STATUSES = [
  { id: 'all', label: 'Any Furnishing' },
  { id: 'Furnished', label: 'Fully Furnished' },
  { id: 'Semi-Furnished', label: 'Semi-Furnished' },
  { id: 'Unfurnished', label: 'Unfurnished' }
];

export const AMENITIES_LIST = [
  'Central Air Conditioning',
  'Covered Car Porch',
  'Backup Solar & Generator',
  'Swimming Pool',
  'Private Lawn & Terrace',
  '24/7 Gated Security & CCTV',
  'Servant Quarters',
  'Smart Home Automation',
  'Modern Fitted Kitchen',
  'High-Speed Elevators',
  'Gym & Fitness Studio',
  'Basement Cinema'
];

export const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'size_desc', label: 'Size: Largest First' }
];
