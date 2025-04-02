// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Elements
  const editProfileBtn = document.querySelector('.edit-profile');
  const languageSelector = document.querySelector('.language-selector');
  // const notificationToggle = document.querySelector('.toggle-switch');
  const deleteAccountBtn = document.querySelector('.delete-account');
  const menuItems = document.querySelectorAll('.menu-item');
  const username = document.querySelector('.username');

  // Edit Profile Button
  editProfileBtn.addEventListener('click', function () {
    // Create a modal for editing profile
    const modal = createModal();

    // Add form to modal
    const form = document.createElement('form');
    form.className = 'edit-profile-form';
    form.innerHTML = `
            <h3>Edit Profile</h3>
            <div class="form-group">
                <label for="username">Name</label>
                <input type="text" id="username" value="${username.textContent}" required>
            </div>
            <div class="form-group">
                <label for="profile-pic">Profile Picture</label>
                <input type="file" id="profile-pic" accept="image/*">
            </div>
            <div class="form-actions">
                <button type="button" class="cancel-btn">Cancel</button>
                <button type="submit" class="save-btn">Save Changes</button>
            </div>
        `;

    modal.querySelector('.modal-content').appendChild(form);

    // Handle form submission
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const newUsername = document.getElementById('username').value;

      // Update profile information
      username.textContent = newUsername;
      // Save to localStorage
      saveUserData({ name: newUsername});

      // Close modal with animation
      closeModal(modal);

      // Show success message
      showToast('Profile updated successfully!');
    });

    // Handle cancel button
    form.querySelector('.cancel-btn').addEventListener('click', function () {
      closeModal(modal);
    });
  });

  // Language selector
  languageSelector.addEventListener('click', function () {
    const languages = ['English (US)', 'Arabic', 'French', 'Spanish'];
    const currentLanguage = document.querySelector('.selected-language').textContent;

    // Create a modal for language selection
    const modal = createModal();

    // Add language options
    const langContainer = document.createElement('div');
    langContainer.className = 'language-options';
    langContainer.innerHTML = `<h3>Select Language</h3>`;

    languages.forEach((lang) => {
      const langOption = document.createElement('div');
      langOption.className = 'language-option';
      if (lang.toLowerCase() === currentLanguage.toLowerCase()) {
        langOption.classList.add('selected');
      }
      langOption.textContent = lang;

      langOption.addEventListener('click', function () {
        document.querySelector('.selected-language').textContent = lang;
        closeModal(modal);
        showToast(`Language changed to ${lang}`);
      });

      langContainer.appendChild(langOption);
    });

    modal.querySelector('.modal-content').appendChild(langContainer);
  });

  // Notification toggle
  // notificationToggle.addEventListener('click', function() {
  //     const icon = notificationToggle.querySelector('ion-icon');
  //     const isOn = icon.name === 'toggle';

  //     if (isOn) {
  //         icon.name = 'toggle-outline';
  //         showToast('Notifications turned off');
  //     } else {
  //         icon.name = 'toggle';
  //         showToast('Notifications turned on');
  //     }
  // });

  // Delete account
  deleteAccountBtn.addEventListener('click', function () {
    const modal = createModal();

    const confirmContent = document.createElement('div');
    confirmContent.className = 'confirm-delete';
    confirmContent.innerHTML = `
            <h3>Delete Account?</h3>
            <p>This action cannot be undone. All your data will be permanently deleted.</p>
            <div class="form-actions">
                <button class="cancel-btn">Cancel</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

    modal.querySelector('.modal-content').appendChild(confirmContent);

    // Handle delete confirmation
    confirmContent.querySelector('.delete-btn').addEventListener('click', function () {
      // Clear local storage
      localStorage.removeItem('userData');

      closeModal(modal);
      showToast('Account deleted successfully');

      // Redirect to home page after a delay
      setTimeout(() => {
        window.location.href = '../';
      }, 1000);
    });

    // Handle cancel
    confirmContent.querySelector('.cancel-btn').addEventListener('click', function () {
      closeModal(modal);
    });
  });

  // Menu item click handlers
  menuItems.forEach((item) => {
    item.addEventListener('click', function () {
      const menuText = this.querySelector('.menu-item-text').textContent;

      switch (menuText) {
        case 'personal data':
          // Open personal data page or section
          showToast('Personal data section coming soon');
          break;
        case 'my rewards':
          // Open rewards page or section
          showToast('Rewards section coming soon');
          break;
        case 'saved addresses':
          showAddressModal();
          break;
        case 'visit history':
          // Open visit history page or section
          showToast('Visit history section coming soon');
          break;
      }
    });
  });

  // Function to show addresses modal
  function showAddressModal() {
    const modal = createModal();

    const addressesContent = document.createElement('div');
    addressesContent.className = 'addresses-content';
    addressesContent.innerHTML = `
            <h3>Saved Addresses</h3>
            <div class="address-list">
                <p class="no-addresses">No addresses saved yet</p>
            </div>
            <button class="add-address-btn">+ Add New Address</button>
            <div class="form-actions">
                <button class="close-btn">Close</button>
            </div>
        `;

    modal.querySelector('.modal-content').appendChild(addressesContent);

    // Handle close button
    addressesContent.querySelector('.close-btn').addEventListener('click', function () {
      closeModal(modal);
    });

    // Handle add address button
    addressesContent.querySelector('.add-address-btn').addEventListener('click', function () {
      // Replace content with address form
      addressesContent.innerHTML = `
                <h3>Add New Address</h3>
                <form class="address-form">
                    <div class="form-group">
                        <label for="address-name">Address Name</label>
                        <input type="text" id="address-name" placeholder="Home, Work, etc." required>
                    </div>
                    <div class="form-group">
                        <label for="address-line">Address Line</label>
                        <input type="text" id="address-line" required>
                    </div>
                    <div class="form-group">
                        <label for="city">City</label>
                        <input type="text" id="city" required>
                    </div>
                    <div class="form-group">
                        <label for="zip">Postal/Zip Code</label>
                        <input type="text" id="zip" required>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="cancel-btn">Cancel</button>
                        <button type="submit" class="save-btn">Save Address</button>
                    </div>
                </form>
            `;

      // Handle cancel button
      addressesContent.querySelector('.cancel-btn').addEventListener('click', function () {
        closeModal(modal);
      });

      // Handle form submission
      addressesContent.querySelector('.address-form').addEventListener('submit', function (e) {
        e.preventDefault();
        closeModal(modal);
        showToast('Address saved successfully');
      });
    });
  }

  // Load user data from localStorage on page load
  function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      if (userData.name) username.textContent = userData.name;
    }
  }

  // Save user data to localStorage
  function saveUserData(data) {
    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    userData = { ...userData, ...data };
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  // Helper function to create modals
  function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Close modal when clicking outside content
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        closeModal(modal);
      }
    });

    return modal;
  }

  // Function to close modal with animation
  function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease forwards';
    modal.querySelector('.modal-content').style.animation = 'slideOut 0.3s ease forwards';

    // Add necessary animation keyframes
    if (!document.getElementById('modal-close-styles')) {
      const style = document.createElement('style');
      style.id = 'modal-close-styles';
      style.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
                
                @keyframes slideOut {
                    from { transform: translateY(0); opacity: 1; }
                    to { transform: translateY(20px); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }

    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  }

  // Function to show toast messages
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    // Remove toast after animation completes
    setTimeout(() => {
      if (document.body.contains(toast)) {
        document.body.removeChild(toast);
      }
    }, 3000);
  }

  // Track page visits
  function trackVisit() {
    let userData = JSON.parse(localStorage.getItem('userData')) || {};
    let visits = userData.visits || 0;
    userData.visits = visits + 1;
    localStorage.setItem('userData', JSON.stringify(userData));

    // Update visits display if needed
    const visitsElement = document.querySelector('.stats-card:nth-child(2) .stats-value');
    if (visitsElement) {
      visitsElement.textContent = userData.visits;
    }
  }

  // Initialize stats from localStorage
  function initStats() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    // Points
    const pointsElement = document.querySelector('.stats-card:nth-child(1) .stats-value');
    if (pointsElement) {
      pointsElement.textContent = userData.points || '0';
    }

    // Visits
    const visitsElement = document.querySelector('.stats-card:nth-child(2) .stats-value');
    if (visitsElement) {
      visitsElement.textContent = userData.visits || '3';
    }

    // Referrals
    const referralsElement = document.querySelector('.stats-card:nth-child(3) .stats-value');
    if (referralsElement) {
      referralsElement.textContent = userData.referrals || '2';
    }
  }

  // Animate stats on page load
  function animateStats() {
    const statValues = document.querySelectorAll('.stats-value');

    statValues.forEach((value, index) => {
      const finalValue = parseInt(value.textContent);
      let currentValue = 0;
      const duration = 1000; // animation duration in ms
      const increment = finalValue / (duration / 50); // increment every 50ms

      setTimeout(() => {
        const interval = setInterval(() => {
          currentValue += increment;
          if (currentValue >= finalValue) {
            value.textContent = finalValue;
            clearInterval(interval);
          } else {
            value.textContent = Math.floor(currentValue);
          }
        }, 50);
      }, index * 200);
    });
  }

  // Add hover effect to stats cards
  function addStatsHoverEffect() {
    const statsCards = document.querySelectorAll('.stats-card');

    statsCards.forEach((card) => {
      card.addEventListener('mouseenter', function () {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.15)';
        card.style.transition = 'all 0.3s ease';
      });

      card.addEventListener('mouseleave', function () {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'var(--shadow)';
      });
    });
  }

  // Check for dark mode preference
  function checkDarkModePreference() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    // Insert before delete account
    settingsSection.insertBefore(document.querySelector('.delete-account'));
  }

  function initProfilePage() {
    loadUserData();
    trackVisit();
    initStats();
    animateStats();
    addStatsHoverEffect();
    checkDarkModePreference();
  }

  // Initialize when DOM is ready
  initProfilePage();
});

const copyButtons = document.querySelectorAll('.referral-code button');

copyButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const referralCode = button.previousElementSibling;

    navigator.clipboard
      .writeText(referralCode.textContent)
      .then(() => {
        button.textContent = 'Copied!';
        button.style.backgroundColor = '#2e7d32';

        setTimeout(() => {
          button.textContent = 'Copy';
          button.style.backgroundColor = '';
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy referral code: ', err);
      });
  });
});
