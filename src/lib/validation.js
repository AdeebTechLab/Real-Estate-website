/**
 * Validate property submission form fields
 * @param {Object} values
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validatePropertyForm(values) {
  const errors = {};

  if (!values.title || values.title.trim().length < 8) {
    errors.title = 'Title must be at least 8 characters long.';
  }

  if (!values.price || Number(values.price) <= 0) {
    errors.price = 'Please enter a valid price in PKR greater than 0.';
  }

  if (!values.city) {
    errors.city = 'Please select a city.';
  }

  if (!values.area || values.area.trim().length < 3) {
    errors.area = 'Please enter a neighborhood or sector name.';
  }

  if (!values.propertyType) {
    errors.propertyType = 'Please select a property category.';
  }

  if (!values.listingType) {
    errors.listingType = 'Please specify sale or rent.';
  }

  if (!values.size || Number(values.size) <= 0) {
    errors.size = 'Please enter a valid size greater than 0.';
  }

  if (!values.description || values.description.trim().length < 20) {
    errors.description = 'Description should be at least 20 characters long.';
  }

  if (!values.contactName || values.contactName.trim().length < 3) {
    errors.contactName = 'Please enter your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.contactEmail || !emailRegex.test(values.contactEmail)) {
    errors.contactEmail = 'Please provide a valid email address.';
  }

  const phoneDigits = (values.contactPhone || '').replace(/\D/g, '');
  if (!values.contactPhone || phoneDigits.length < 10) {
    errors.contactPhone = 'Please enter a valid phone number (min 10 digits).';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate inquiry or contact form fields
 * @param {Object} values
 * @returns {{ isValid: boolean, errors: Object }}
 */
export function validateInquiryForm(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = 'Please provide your full name.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email || !emailRegex.test(values.email)) {
    errors.email = 'Please provide a valid email address.';
  }

  const phoneDigits = (values.phone || '').replace(/\D/g, '');
  if (!values.phone || phoneDigits.length < 10) {
    errors.phone = 'Please provide a valid 10+ digit contact number.';
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = 'Inquiry message must be at least 10 characters long.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
