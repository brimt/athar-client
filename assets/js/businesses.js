document.addEventListener('DOMContentLoaded', function() {
  // Toast notification system
  function showToast(message, duration = 2500) {
    const toast = document.getElementById('toast-message');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  const backBtn = document.getElementById('back-btn');
  backBtn.addEventListener('click', function(e) {
    if (!e.target.closest('a')) {
      e.preventDefault();
      showToast('Going back to previous page');

      backBtn.style.transform = 'translateX(-5px)';
      setTimeout(() => {
        backBtn.style.transform = 'translateX(0)';
      }, 200);
    }
  });

  const heartBtn = document.getElementById('heart-btn');
  let isFavorite = false;
  
  heartBtn.addEventListener('click', function() {
    isFavorite = !isFavorite;
    
    if (isFavorite) {
      heartBtn.innerHTML = '<ion-icon name="heart"></ion-icon>';
      heartBtn.classList.add('active');
      heartBtn.classList.add('heart-animation');
      showToast('Added to favorites');
    } else {
      heartBtn.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
      heartBtn.classList.remove('active');
      showToast('Removed from favorites');
    }
    
    setTimeout(() => {
      heartBtn.classList.remove('heart-animation');
    }, 800);
  });

  // Map button
  const mapBtn = document.getElementById('map-btn');
  mapBtn.addEventListener('click', function() {
    showToast('Opening map location');

    mapBtn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      mapBtn.style.transform = 'scale(1)';
    }, 200);
  });

  const sliderWrapper = document.getElementById('slider-wrapper');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const totalSlides = slides.length;

  const slideIndicatorsContainer = document.createElement('div');
  slideIndicatorsContainer.className = 'slide-indicators';
  
  for (let i = 0; i < totalSlides; i++) {
    const indicator = document.createElement('div');
    indicator.className = i === 0 ? 'slide-indicator active' : 'slide-indicator';
    indicator.dataset.slide = i;
    
    indicator.addEventListener('click', () => {
      goToSlide(i);
    });
    
    slideIndicatorsContainer.appendChild(indicator);
  }
  
  document.querySelector('.image-slider').appendChild(slideIndicatorsContainer);
  
  function updateSlider() {
    const offset = -currentSlide * 100;
    sliderWrapper.style.transform = `translateX(${offset}%)`;

    document.querySelectorAll('.slide-indicator').forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
  
  function goToSlide(index) {
    currentSlide = index;
    updateSlider();
  }
  
  function goToPrevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
  }
  
  function goToNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
  }

  let slideInterval = setInterval(goToNextSlide, 5000);

  const imageSlider = document.querySelector('.image-slider');
  imageSlider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
  });
  
  imageSlider.addEventListener('mouseleave', () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(goToNextSlide, 5000);
  });
  
  prevBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    goToPrevSlide();
    animateButton(prevBtn);
  });
  
  nextBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    goToNextSlide();
    animateButton(nextBtn);
  });
  
  function animateButton(button) {
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 200);
  }


  const callBtn = document.getElementById('call-btn');
  callBtn.addEventListener('click', function() {
    showToast('Calling restaurant...');

    callBtn.querySelector('.phone-icon').style.transform = 'rotate(-20deg)';
    setTimeout(() => {
      callBtn.querySelector('.phone-icon').style.transform = 'rotate(20deg)';
      setTimeout(() => {
        callBtn.querySelector('.phone-icon').style.transform = 'rotate(0)';
      }, 100);
    }, 100);
  });

  const scanBtn = document.getElementById('scan-btn');
  scanBtn.addEventListener('click', function() {
    showToast('Scanning QR code...');

    scanBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      scanBtn.style.transform = 'scale(1)';
    }, 200);
  });

  let touchStartX = 0;
  let touchEndX = 0;
  let isDragging = false;
  let startTranslate = 0;
  let currentTranslate = 0;
  
  sliderWrapper.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
    startTranslate = -currentSlide * 100;
    isDragging = true
    clearInterval(slideInterval)
  });
  
  sliderWrapper.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    
    const currentX = e.changedTouches[0].screenX;
    const diff = currentX - touchStartX;
    const percentMove = (diff / window.innerWidth) * 100;
    
    currentTranslate = startTranslate + percentMove;

    if (currentTranslate > 0) {
      currentTranslate = 0;
    } else if (currentTranslate < -((totalSlides - 1) * 100)) {
      currentTranslate = -((totalSlides - 1) * 100);
    }
    
    sliderWrapper.style.transform = `translateX(${currentTranslate}%)`;
  });
  
  sliderWrapper.addEventListener('touchend', function(e) {
    isDragging = false;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();

    slideInterval = setInterval(goToNextSlide, 5000);
  });

  setTimeout(() => {
    document.body.classList.add('loaded');
}, 500);

  heartBtn.innerHTML = '<ion-icon name="heart-outline"></ion-icon>';
  document.querySelector('.phone-icon').innerHTML = '<ion-icon name="call"></ion-icon>';
  document.querySelector('.open-status').innerHTML = '<ion-icon name="time-outline"></ion-icon> Open 24/7';
  document.querySelector('.address').innerHTML = '<ion-icon name="location-outline"></ion-icon> 23 Abbas Nasr City';
});
