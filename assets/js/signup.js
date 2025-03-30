 let userType = 'visitor';
 let selectedPlan = 'premium';

 function selectUserType(type) {
     userType = type;
     document.querySelectorAll('.user-type-option').forEach(option => {
         option.classList.remove('selected');
     });

     document.querySelector(`.user-type-option[data-type="${type}"]`).classList.add('selected');

     if (type === 'business') {
         document.getElementById('businessSection').classList.add('active');
     } else {
         document.getElementById('businessSection').classList.remove('active');
     }
 }

 function selectPlan(plan) {
     selectedPlan = plan;
     document.querySelectorAll('.plan-card').forEach(card => {
         card.classList.remove('selected');
     });

     document.querySelector(`.plan-card[data-plan="${plan}"]`).classList.add('selected');
 }

 function isValidEmail(email) {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email);
 }

 function isValidPassword(password) {
     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
     return passwordRegex.test(password);
 }
 
 function isValidCardNumber(cardNumber) {
     const cardRegex = /^\d{16}$/;
     return cardRegex.test(cardNumber.replace(/\s/g, ''));
 }

 function isValidExpiryDate(expiry) {
     const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
     if (!expiryRegex.test(expiry)) {
         return false;
     }

     const [month, year] = expiry.split('/');
     const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
     const currentDate = new Date();
     return expiryDate > currentDate;
 }

 function isValidCVV(cvv) {
     const cvvRegex = /^\d{3}$/;
     return cvvRegex.test(cvv);
 }

 function showError(fieldId, isError, customMessage) {
     const field = document.getElementById(fieldId);
     const formGroup = field.closest('.form-group');
     
     if (isError) {
         formGroup.classList.add('error');
         if (customMessage) {
             formGroup.querySelector('.error-message').textContent = customMessage;
         }
     } else {
         formGroup.classList.remove('error');
     }
 }

 function validateForm() {
     let isValid = true;

     const firstName = document.getElementById('first-name').value.trim();
     const isFirstNameValid = firstName !== '';
     showError('first-name', !isFirstNameValid);
     isValid = isValid && isFirstNameValid;

     const lastName = document.getElementById('last-name').value.trim();
     const isLastNameValid = lastName !== '';
     showError('last-name', !isLastNameValid);
     isValid = isValid && isLastNameValid;

     const email = document.getElementById('email').value.trim();
     const isEmailValid = isValidEmail(email);
     showError('email', !isEmailValid);
     isValid = isValid && isEmailValid;

     const password = document.getElementById('password').value;
     const isPasswordValid = isValidPassword(password);
     showError('password', !isPasswordValid);
     isValid = isValid && isPasswordValid;
     

     const confirmPassword = document.getElementById('confirm-password').value;
     const isConfirmPasswordValid = confirmPassword === password;
     showError('confirm-password', !isConfirmPasswordValid);
     isValid = isValid && isConfirmPasswordValid;

     if (userType === 'business') {

         const restaurantName = document.getElementById('restaurant-name').value.trim();
         const isRestaurantNameValid = restaurantName !== '';
         showError('restaurant-name', !isRestaurantNameValid);
         isValid = isValid && isRestaurantNameValid;

         const cuisineType = document.getElementById('food-type').value;
         const isCuisineTypeValid = cuisineType !== '';
         showError('food-type', !isCuisineTypeValid);
         isValid = isValid && isCuisineTypeValid;

         const restaurantAddress = document.getElementById('restaurant-address').value.trim();
         const isRestaurantAddressValid = restaurantAddress !== '';
         showError('restaurant-address', !isRestaurantAddressValid);
         isValid = isValid && isRestaurantAddressValid;

         const cardNumber = document.getElementById('card-number').value.trim();
         const isCardNumberValid = isValidCardNumber(cardNumber);
         showError('card-number', !isCardNumberValid);
         isValid = isValid && isCardNumberValid;

         const expiryDate = document.getElementById('expiry-date').value.trim();
         const isExpiryDateValid = isValidExpiryDate(expiryDate);
         showError('expiry-date', !isExpiryDateValid);
         isValid = isValid && isExpiryDateValid;

         const cvv = document.getElementById('cvv').value.trim();
         const isCVVValid = isValidCVV(cvv);
         showError('cvv', !isCVVValid);
         isValid = isValid && isCVVValid;
     }
     
     return isValid;
 }

 function saveToLocalStorage() {
     const userData = {
         userType: userType,
         firstName: document.getElementById('first-name').value.trim(),
         lastName: document.getElementById('last-name').value.trim(),
         email: document.getElementById('email').value.trim(),
         createdAt: new Date().toISOString()
     };

     if (userType === 'business') {
         userData.business = {
             restaurantName: document.getElementById('restaurant-name').value.trim(),
             cuisineType: document.getElementById('food-type').value,
             address: document.getElementById('restaurant-address').value.trim(),
             plan: selectedPlan
         };
     }

     const userId = 'user_' + Date.now();
     const existingUsers = JSON.parse(localStorage.getItem('Athar-users')) || [];

     existingUsers.push({
         id: userId,
         ...userData
     });

     localStorage.setItem('Athar-users', JSON.stringify(existingUsers));

     localStorage.setItem('currentAthar-users', userId);
     
     return userId;
 }

 function showToast(message) {
     const toast = document.getElementById('toast');
     toast.textContent = message;
     toast.style.display = 'block';

     setTimeout(() => {
         toast.style.display = 'none';
     }, 3000);
 }

 document.getElementById('signupForm').addEventListener('submit', function(e) {
     e.preventDefault();

     if (validateForm()) {
         const userId = saveToLocalStorage();
         

         showToast('Account created successfully!');
         this.reset();
         
         console.log('User created with ID:', userId);
     }
 });

 document.getElementById('email').addEventListener('blur', function() {
     const isEmailValid = isValidEmail(this.value.trim());
     showError('email', !isEmailValid);
 });

 document.getElementById('password').addEventListener('blur', function() {
     const isPasswordValid = isValidPassword(this.value);
     showError('password', !isPasswordValid);
 });

 document.getElementById('confirm-password').addEventListener('input', function() {
     const password = document.getElementById('password').value;
     const isConfirmPasswordValid = this.value === password;
     showError('confirm-password', !isConfirmPasswordValid);
 });

 document.getElementById('card-number').addEventListener('input', function() {
     let value = this.value.replace(/\s/g, '');
     value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
     this.value = value;
 });
 
 document.getElementById('card-number').addEventListener('blur', function() {
     const isCardNumberValid = isValidCardNumber(this.value.trim());
     showError('card-number', !isCardNumberValid);
 });
 

 document.getElementById('expiry-date').addEventListener('input', function() {
     let value = this.value.replace(/\D/g, '');
     if (value.length > 2) {
         value = value.substring(0, 2) + '/' + value.substring(2, 4);
     }
     this.value = value;
 });
 
 document.getElementById('expiry-date').addEventListener('blur', function() {
     const isExpiryDateValid = isValidExpiryDate(this.value.trim());
     showError('expiry-date', !isExpiryDateValid);
 });

 document.getElementById('cvv').addEventListener('input', function() {
     this.value = this.value.replace(/\D/g, '').substring(0, 3);
 });
 
 document.getElementById('cvv').addEventListener('blur', function() {
     const isCVVValid = isValidCVV(this.value.trim());
     showError('cvv', !isCVVValid);
 });