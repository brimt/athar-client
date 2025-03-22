document.addEventListener('DOMContentLoaded', function() {
    // Toast message functionality
    function showToast(message, duration = 2500) {
        const toast = document.getElementById('toast-message');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    // Filter tabs functionality
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show filtering toast
            showToast(`Filtering by ${this.textContent}`);
        });
    });

    // Business cards click handling
    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        if (!card.hasAttribute('href')) {
            card.addEventListener('click', function() {
                showToast('This business page is coming soon!');
            });
        }
    });


    
    // Filter button functionality
    const filterButton = document.querySelector('.filter-button');
    filterButton.addEventListener('click', function() {
        showToast('Filter options coming soon!');
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            showToast(`Searching for "${this.value}"`);
            this.blur();
        }
    });
    
    // Featured sections
    const sectionActions = document.querySelectorAll('.section-action');
    sectionActions.forEach(action => {
        action.addEventListener('click', function() {
            showToast('More businesses coming soon!');
        });
    });
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});