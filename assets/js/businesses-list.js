document.addEventListener('DOMContentLoaded', function() {
    function showToast(message, duration = 2500) {
        const toast = document.getElementById('toast-message');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            filterTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const businessCards = document.querySelectorAll('.business-card');
    businessCards.forEach(card => {
        if (!card.hasAttribute('href')) {
            card.addEventListener('click', function() {
                showToast('This business page is coming soon!');
            });
        }
    });

    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', function() {
        showToast('Going back to home page');
        
        backBtn.style.transform = 'translateX(-5px)';
        setTimeout(() => {
            backBtn.style.transform = 'translateX(0)';
        }, 200);
    });
});