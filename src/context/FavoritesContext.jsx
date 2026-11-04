import React, { createContext, useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { PROPERTIES } from '../data/properties.js';

export const FavoritesContext = createContext(null);

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

const STORAGE_KEY_FAVORITES = 'estatepro_favorites_v1';
const STORAGE_KEY_SUBMITTED = 'estatepro_submitted_listings_v1';
const STORAGE_KEY_USER = 'estatepro_demo_user_v1';

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [submittedProperties, setSubmittedProperties] = useState([]);
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore from localStorage safely on client mount
  useEffect(() => {
    try {
      const storedFavs = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (storedFavs) {
        const parsed = JSON.parse(storedFavs);
        if (Array.isArray(parsed)) {
          // Filter out null or non-string/number values
          const cleanFavs = parsed.filter(id => id !== null && id !== undefined);
          setFavoriteIds(cleanFavs);
        }
      }

      const storedSubmitted = localStorage.getItem(STORAGE_KEY_SUBMITTED);
      if (storedSubmitted) {
        const parsedSub = JSON.parse(storedSubmitted);
        if (Array.isArray(parsedSub)) {
          setSubmittedProperties(parsedSub);
        }
      }

      const storedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favoriteIds));
    } catch (e) {
      console.warn('Could not save favorites to localStorage', e);
    }
  }, [favoriteIds, isHydrated]);

  // Save submitted properties to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_SUBMITTED, JSON.stringify(submittedProperties));
    } catch (e) {
      console.warn('Could not save submitted properties to localStorage', e);
    }
  }, [submittedProperties, isHydrated]);

  const toggleFavorite = useCallback((propertyId) => {
    if (!propertyId) return;
    setFavoriteIds((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId);
      } else {
        return [...prev, propertyId];
      }
    });
  }, []);

  const isFavorite = useCallback((propertyId) => {
    return favoriteIds.includes(propertyId);
  }, [favoriteIds]);

  // Combine static properties with approved or pending submitted properties
  const allProperties = useMemo(() => {
    return [...submittedProperties, ...PROPERTIES];
  }, [submittedProperties]);

  const favoriteProperties = useMemo(() => {
    // Only return valid, existing properties matching stored favorite IDs
    return allProperties.filter((prop) => favoriteIds.includes(prop.id));
  }, [allProperties, favoriteIds]);

  const addSubmittedProperty = useCallback((newProperty) => {
    const propertyWithMeta = {
      ...newProperty,
      id: `prop-submitted-${Date.now()}`,
      slug: `custom-listing-${Date.now()}`,
      listedAt: new Date().toISOString(),
      status: 'Pending Review',
      reviewNote: 'Submitted for editorial verification and title deed check.',
      currency: 'PKR',
      availability: 'Pending Review',
      featured: false
    };

    setSubmittedProperties((prev) => [propertyWithMeta, ...prev]);
    return propertyWithMeta;
  }, []);

  const loginDemoUser = useCallback((userData) => {
    const userProfile = {
      name: userData.name || 'Taimur Ali Khan',
      email: userData.email || 'taimur.khan@example.com',
      phone: userData.phone || '+92 300 5551234',
      city: userData.city || 'Lahore',
      role: userData.role || 'Verified Investor',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      joinedAt: 'January 2025'
    };
    setUser(userProfile);
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(userProfile));
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const logoutDemoUser = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY_USER);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  const value = useMemo(() => ({
    favoriteIds,
    favoriteProperties,
    favoritesCount: favoriteIds.length,
    toggleFavorite,
    isFavorite,
    allProperties,
    submittedProperties,
    addSubmittedProperty,
    user,
    loginDemoUser,
    logoutDemoUser,
    isHydrated
  }), [
    favoriteIds,
    favoriteProperties,
    toggleFavorite,
    isFavorite,
    allProperties,
    submittedProperties,
    addSubmittedProperty,
    user,
    loginDemoUser,
    logoutDemoUser,
    isHydrated
  ]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
