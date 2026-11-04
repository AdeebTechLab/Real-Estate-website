import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeToSqFt, filterAndSortProperties, paginate } from './property-utils.js';
import { validatePropertyForm, validateInquiryForm } from './validation.js';

test('normalizeToSqFt converts Marla and Kanal accurately', () => {
  assert.equal(normalizeToSqFt(1, 'Marla'), 225);
  assert.equal(normalizeToSqFt(10, 'Marla'), 2250);
  assert.equal(normalizeToSqFt(1, 'Kanal'), 4500);
  assert.equal(normalizeToSqFt(2, 'Kanal'), 9000);
  assert.equal(normalizeToSqFt(1500, 'Sq.Ft'), 1500);
});

test('filterAndSortProperties filters by city, type, and price correctly', () => {
  const sampleListings = [
    { id: 1, title: 'Villa in DHA', city: 'Lahore', propertyType: 'house', listingType: 'sale', price: 45000000, size: 1, sizeUnit: 'Kanal', bedrooms: 5, bathrooms: 6, listedAt: '2026-03-01' },
    { id: 2, title: 'Apartment in Clifton', city: 'Karachi', propertyType: 'apartment', listingType: 'rent', price: 250000, size: 10, sizeUnit: 'Marla', bedrooms: 3, bathrooms: 3, listedAt: '2026-03-10' },
    { id: 3, title: 'Modern Penthouse F-7', city: 'Islamabad', propertyType: 'penthouse', listingType: 'sale', price: 95000000, size: 2, sizeUnit: 'Kanal', bedrooms: 4, bathrooms: 5, listedAt: '2026-03-15' }
  ];

  // Filter by city: Karachi
  const karachiResults = filterAndSortProperties(sampleListings, { city: 'Karachi' });
  assert.equal(karachiResults.length, 1);
  assert.equal(karachiResults[0].id, 2);

  // Filter by listingType: sale
  const saleResults = filterAndSortProperties(sampleListings, { listingType: 'sale' });
  assert.equal(saleResults.length, 2);

  // Sort by price descending
  const sortedDesc = filterAndSortProperties(sampleListings, { sortBy: 'price_desc' });
  assert.equal(sortedDesc[0].id, 3);
  assert.equal(sortedDesc[2].id, 2);
});

test('paginate accurately slices items and calculates total pages', () => {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const p1 = paginate(items, 1, 4);
  assert.equal(p1.items.length, 4);
  assert.equal(p1.totalPages, 3);
  assert.equal(p1.currentPage, 1);

  const p3 = paginate(items, 3, 4);
  assert.equal(p3.items.length, 2);
  assert.equal(p3.currentPage, 3);
});

test('validatePropertyForm flags empty and invalid fields', () => {
  const invalidResult = validatePropertyForm({ title: '', price: 0, city: '' });
  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.title);
  assert.ok(invalidResult.errors.price);

  const validResult = validatePropertyForm({
    title: 'Executive 1 Kanal Designer Villa',
    price: 65000000,
    city: 'Lahore',
    area: 'DHA Phase 6',
    propertyType: 'house',
    listingType: 'sale',
    size: 1,
    sizeUnit: 'Kanal',
    description: 'Bespoke custom architecture with imported fixtures and landscaped lawn.',
    contactName: 'Hamza Malik',
    contactEmail: 'hamza.malik@estatepro.pk',
    contactPhone: '+92 300 1234567'
  });
  assert.equal(validResult.isValid, true);
});

test('validateInquiryForm handles contact fields', () => {
  const emptyInquiry = validateInquiryForm({});
  assert.equal(emptyInquiry.isValid, false);
  assert.ok(emptyInquiry.errors.name);
  assert.ok(emptyInquiry.errors.email);

  const validInquiry = validateInquiryForm({
    name: 'Ayesha Khan',
    email: 'ayesha.khan@example.com',
    phone: '03219876543',
    message: 'I would like to schedule an on-site private viewing of this residence.'
  });
  assert.equal(validInquiry.isValid, true);
});
