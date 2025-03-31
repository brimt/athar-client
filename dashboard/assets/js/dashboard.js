document.addEventListener('DOMContentLoaded', () => {
  const featuredBusinessSlider = document.getElementById('featuredBusinessSlider');
  const nearbyBusinessSlider = document.getElementById('nearbyBusinessSlider');

  // Fetch business data from the server
  fetch('./data/businesses.json')
    .then((response) => response.json())
    .then((data) => {
      featuredBusinessSlider.innerHTML = data.map((business) => business.featured && createBusinessCard(business.name, business.image, business.rating)).join('');
      nearbyBusinessSlider.innerHTML = data.map((business) => createBusinessCard(business.name, business.image, business.rating)).join('');
    })
    .catch((error) => {
      console.error('Error fetching business data:', error);
    });
});

function createBusinessCard(name, image, rating) {
  return `
      <a href="./businesses" class="business-slide">
        <img src="${image}" alt="${name}">
        <div class="business-info">
          <h3>${name}</h3>
          <div class="business-rating">
            ${Array(Math.floor(rating))
              .fill('')
              .map((_, i) => `<i class="fa-solid fa-star"></i>`)
              .join('')}
            ${rating % 1 !== 0 ? '<i class="fa-solid fa-star-half"></i>' : ''}
            <span>${rating}</span>
          </div>
        </div>
      </a>
  `;
}
