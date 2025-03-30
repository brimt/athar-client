document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const toast = document.getElementById('toast');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        errorMessage.textContent = message;
    }

    function clearError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.remove('error');
    }

    function showToast(message) {
        toast.textContent = message;
        toast.style.display = 'block';

        setTimeout(() => {
            toast.style.display = 'none';
        }, 3000);
    }

    function authenticateUser(email, password) {
        const users = JSON.parse(localStorage.getItem('Athar-users')) || [];

        const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());

        if (user) {
            return {
                success: true,
                userId: user.id,
                userType: user.userType,
                name: `${user.firstName} ${user.lastName}`
            };
        }
        
        return { success: false };
    }

    function handleSuccessfulLogin(userData) {
        localStorage.setItem('currentAthar-user', userData.userId);

        if (rememberCheckbox.checked) {
            localStorage.setItem('Athar-remember-login', 'true');
        }

        showToast(`Welcome back, ${userData.name}!`);

        setTimeout(() => {
            if (userData.userType === 'business') {
                window.location.href = '../index.html';
            } 
        }, 1500);
    }

    function checkSavedLogin() {
        const rememberedLogin = localStorage.getItem('Athar-remember-login');
        const currentUser = localStorage.getItem('currentAthar-user');
        
        if (rememberedLogin === 'true' && currentUser) {
            const users = JSON.parse(localStorage.getItem('Athar-users')) || [];
            const user = users.find(user => user.id === currentUser);
            
            if (user) {
                emailInput.value = user.email;
                rememberCheckbox.checked = true;
            }
        }
    }

    checkSavedLogin();

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        clearError(emailInput);
        clearError(passwordInput);
        
        let isValid = true;
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email) {
            showError(emailInput, 'Please enter your email address');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (!password) {
            showError(passwordInput, 'Please enter your password');
            isValid = false;
        }
        if (isValid) {
            const authResult = authenticateUser(email, password);
            
            if (authResult.success) {
                handleSuccessfulLogin(authResult);
            } else {
                showError(emailInput, 'Invalid email or password');
                showError(passwordInput, 'Invalid email or password');
            }
        }
    });

    emailInput.addEventListener('focus', () => clearError(emailInput));
    passwordInput.addEventListener('focus', () => clearError(passwordInput));
    document.querySelector('.google-btn').addEventListener('click', function() {
        alert('Google authentication would be implemented here in a production environment.');
    });

    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        if (email && isValidEmail(email)) {
            showToast('Password reset instructions sent to your email');
        } else {
            showError(emailInput, 'Please enter a valid email to reset your password');
        }
    });
});