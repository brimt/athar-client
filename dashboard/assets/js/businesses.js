document.addEventListener('DOMContentLoaded', function () {
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
  backBtn.addEventListener('click', function (e) {
    if (!e.target.closest('a')) {
      e.preventDefault();
      showToast('Going back to previous page');
      setTimeout(() => {
        window.location.href = '../businesses-list/';
      }, 300);

      backBtn.style.transform = 'translateX(-5px)';
      setTimeout(() => {
        backBtn.style.transform = 'translateX(0)';
      }, 200);
    }
  });

  const heartBtn = document.getElementById('heart-btn');
  let isFavorite = false;

  heartBtn.addEventListener('click', function () {
    isFavorite = !isFavorite;

    if (isFavorite) {
      heartBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
      heartBtn.classList.add('active');
      heartBtn.classList.add('heart-animation');
      showToast('Added to favorites');
    } else {
      heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
      heartBtn.classList.remove('active');
      showToast('Removed from favorites');
    }

    setTimeout(() => {
      heartBtn.classList.remove('heart-animation');
    }, 800);
  });

  // Map button
  const mapBtn = document.getElementById('map-btn');
  mapBtn.addEventListener('click', function () {
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

  prevBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    goToPrevSlide();
    animateButton(prevBtn);
  });

  nextBtn.addEventListener('click', function (e) {
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
  callBtn.addEventListener('click', function () {
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
  scanBtn.addEventListener('click', function () {
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

  sliderWrapper.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
    startTranslate = -currentSlide * 100;
    isDragging = true;
    clearInterval(slideInterval);
  });

  sliderWrapper.addEventListener('touchmove', function (e) {
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

  sliderWrapper.addEventListener('touchend', function (e) {
    isDragging = false;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();

    slideInterval = setInterval(goToNextSlide, 5000);
  });

  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 10);

  heartBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  // document.querySelector('.phone-icon').innerHTML = '<ion-icon name="call"></ion-icon>';
  // document.querySelector('.open-status').innerHTML = '<ion-icon name="time-outline"></ion-icon> Open 24/7';
  // document.querySelector('.address').innerHTML = '<ion-icon name="location-outline"></ion-icon> 23 Abbas Nasr City';

  // * Rating
  const reviewForm = document.getElementById('reviewForm');
  const starRating = document.getElementById('starRating');
  const stars = starRating.querySelectorAll('.star');
  const ratingValueInput = document.getElementById('ratingValue');
  const ratingDisplayText = document.querySelector('#ratingDisplay span');
  const commentTextarea = document.getElementById('comment');
  const charCount = document.getElementById('charCount');
  const submissionMessage = document.getElementById('submissionMessage');
  const submissionMessageFailed = document.getElementById('submissionMessageFailed');
  const writeAnotherReviewBtn = document.getElementsByClassName('writeAnotherReview');
  const submitReviewBtn = document.getElementById('submitReview');

  let lastClickedStar = null;
  let currentRating = 0;
  let isHalfStar = false;

  // Star rating functionality
  stars.forEach(star => {
    star.addEventListener('click', function () {
      const starValue = parseInt(this.getAttribute('data-value'));

      // If clicking the same star again, make it a half star
      if (lastClickedStar === this && !isHalfStar) {
        // Make this star a half star
        isHalfStar = true;

        // Calculate the new rating:
        // Previous full stars + half of current star
        currentRating = (starValue - 1) + 0.5;
      } else {
        // First click on any star - set to full value
        isHalfStar = false;
        currentRating = starValue;
      }

      // Update the hidden input value
      ratingValueInput.value = currentRating;

      // Update the stars display
      updateStarsDisplay(currentRating);

      // Update rating text display
      ratingDisplayText.textContent = currentRating;

      // Remember the last clicked star
      lastClickedStar = this;
    });
  });

  // Function to update stars display using Font Awesome icons
  function updateStarsDisplay(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    stars.forEach((star, index) => {
      const starNumber = index + 1;

      // Remove all classes first
      star.classList.remove('star-filled', 'half', 'star-empty');

      // Clear previous icon
      star.innerHTML = '';

      if (starNumber <= fullStars) {
        star.classList.add('star-filled');
        star.innerHTML = '<i class="fa-solid fa-star"></i>'; // Full star
      } else if (hasHalfStar && starNumber === fullStars + 1) {
        star.classList.add('star-half');
        star.innerHTML = '<i class="fa-solid fa-star-half-stroke"></i>'; // Half star
      } else {
        star.classList.add('star-empty');
        star.innerHTML = '<i class="fa-regular fa-star"></i>'; // Empty star
      }
    });
  }

  // Character counter for comment text
  commentTextarea.addEventListener('input', function () {
    const count = this.value.length;
    charCount.textContent = count;

    // Add visual feedback if approaching limit
    if (count > 400) {
      charCount.style.color = 'orange';
    } else if (count >= 500) {
      charCount.style.color = 'red';
    } else {
      charCount.style.color = '';
    }
  });

  // Form validation and submission
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Validate rating (required)
    if (!ratingValueInput.value) {
      alert('Please select a rating');
      return;
    }

    // Collect review data
    const reviewData = {
      rating: parseFloat(ratingValueInput.value),
      comment: commentTextarea.value.trim() || null
    };

    // Here you would typically send the data to your server
    console.log('Review submitted:', reviewData);

    submitReviewBtn.disabled = true;
    fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewData)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Review submitted successfully:', data);
        // Disable submit button
        // Show success message and hide form
        reviewForm.style.display = 'none';
        submissionMessage.style.display = 'block';
        submitReviewBtn.disabled = false;

      })
      .catch(error => {
        console.error('Error submitting review:', error);
        // Show failure message and hide form
        reviewForm.style.display = 'none';
        submissionMessageFailed.style.display = 'block';
        submitReviewBtn.disabled = false;

      });
  });

  // Allow user to write another review
  Array.from(writeAnotherReviewBtn).forEach(btn => {
    btn.addEventListener('click', function () {
      reviewForm.reset();
      charCount.textContent = '0';
      charCount.style.color = '';
      currentRating = 0;
      lastClickedStar = null;
      isHalfStar = false;
      ratingDisplayText.textContent = 'Not rated yet';
      updateStarsDisplay(0);

      reviewForm.style.display = 'flex';
      submissionMessage.style.display = 'none';
      submissionMessageFailed.style.display = 'none';
    });
  });
});