/**
 * Helper functions for URL generation and manipulation
 */

/**
 * Generates a sort URL based on current filters
 * @param {string} sortType - The sort type to apply
 * @param {object} currentFilters - The current filters being applied
 * @returns {string} - The generated URL with sort parameter
 */
function generateSortUrl(sortType, currentFilters = {}) {
  const { category, price } = currentFilters;
  let url = '/plugins?';
  
  const params = [];
  if (category) params.push(`category=${category}`);
  if (price) params.push(`price=${price}`);
  if (sortType) params.push(`sort=${sortType}`);
  
  return url + params.join('&');
}

module.exports = {
  generateSortUrl
};
