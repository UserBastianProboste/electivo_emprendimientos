/*
 * Module: ApiService
 * Description: HTTP client for Store Config (PostgreSQL) and Catalog (MongoDB) backend endpoints
 * Created: 2026-10-15
 * by: Bastian Proboste :D
 *
 * Changelog:
 * - 2026-10-15 [v0.1.0]: Initial API client implementation.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Fetch public store configuration (theme, branding, texts, layout).
 * @returns {Promise<Object>} Store config payload
 */
export async function getStoreConfig() {
  const response = await fetch(`${API_BASE_URL}/store-config/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch store config: HTTP ${response.status}`);
  }
  return await response.json();
}

/**
 * Update store configuration (admin action).
 * @param {Object} payload Modification fields
 * @returns {Promise<Object>} Updated store config
 */
export async function updateStoreConfig(payload) {
  const response = await fetch(`${API_BASE_URL}/store-config/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to update store config: HTTP ${response.status}`);
  }
  return await response.json();
}

/**
 * Query products with search, pagination, and dynamic attributes.
 * @param {Object} params Filter criteria
 * @returns {Promise<Object>} Paginated products envelope
 */
export async function getCatalogProducts(params = {}) {
  const url = new URL(`${window.location.origin}${API_BASE_URL}/catalog/products/`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Failed to fetch catalog: HTTP ${response.status}`);
  }
  return await response.json();
}

/**
 * Fetch available categories, price ranges, and dynamic facet attributes.
 * @returns {Promise<Object>} Facets discovery envelope
 */
export async function getCatalogFilters() {
  const response = await fetch(`${API_BASE_URL}/catalog/filters/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch catalog filters: HTTP ${response.status}`);
  }
  return await response.json();
}
