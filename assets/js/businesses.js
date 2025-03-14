 document.addEventListener('DOMContentLoaded', function() {
      function showToast(message, duration = 2000) {
        const toast = document.getElementById('toast-message');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
          toast.classList.remove('show');
        }, duration);
      }


      const backBtn = document.getElementById('back-btn');
      backBtn.addEventListener('click', function() {
        showToast('Going back to previous page');
      });
      


      const heartBtn = document.getElementById('heart-btn');
      let isFavorite = false;
      
      heartBtn.addEventListener('click', function() {
        isFavorite = !isFavorite;
        
        if (isFavorite) {
          heartBtn.textContent = '❤️';
          heartBtn.classList.add('active');
          showToast('Added to favorites');
        } else {
          heartBtn.textContent = '♡';
          heartBtn.classList.remove('active');
          showToast('Removed from favorites');
        }
      });

      const mapBtn = document.getElementById('map-btn');
      mapBtn.addEventListener('click', function() {
        showToast('Opening map location');
      });

      const sliderWrapper = document.getElementById('slider-wrapper');
      const prevBtn = document.getElementById('prev-slide');
      const nextBtn = document.getElementById('next-slide');
      let currentSlide = 0;
      const totalSlides = document.querySelectorAll('.slide').length;
      
      function updateSlider() {
        const offset = -currentSlide * 100;
        sliderWrapper.style.transform = `translateX(${offset}%)`;
      }
      
      prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
      });
      
      nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
      });

      const stars = document.querySelectorAll('.star');
      let currentRating = 0;
      
      stars.forEach((star, index) => {
        star.addEventListener('mouseover', function() {
          for (let i = 0; i <= index; i++) {
            stars[i].textContent = '★';
          }
        });
        
        star.addEventListener('mouseout', function() {
          if (currentRating === 0) {
            stars.forEach(s => s.textContent = '☆');
          } else {
            stars.forEach((s, i) => {
              s.textContent = i < currentRating ? '★' : '☆';
            });
          }
        });
        
        star.addEventListener('click', function() {
          currentRating = index + 1;
          stars.forEach((s, i) => {
            s.textContent = i < currentRating ? '★' : '☆';
          });
          showToast(`You rated ${currentRating} stars`);
        });
      });

      const callBtn = document.getElementById('call-btn');
      callBtn.addEventListener('click', function() {
        showToast('Calling restaurant...');
      });

      const scanBtn = document.getElementById('scan-btn');
      scanBtn.addEventListener('click', function() {
        showToast('Scanning QR code...');
      });

      let touchStartX = 0;
      let touchEndX = 0;
      
      sliderWrapper.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
      });
      
      sliderWrapper.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });

      function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
          currentSlide = (currentSlide + 1) % totalSlides;
          updateSlider();
        } else if (touchEndX > touchStartX + swipeThreshold) {
          currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
          updateSlider();
        }
      }
    });