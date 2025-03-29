document.addEventListener('DOMContentLoaded', function () {
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
        tab.addEventListener('click', function () {
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
            card.addEventListener('click', function () {
                showToast('This business page is coming soon!');
            });
        }
    });

    // Filter button functionality
    const filterButton = document.querySelector('.filter-button');
    const filterModal = document.getElementById('filter-modal');
    const closeModal = document.querySelector('.close-modal');
    const resetFilters = document.querySelector('.reset-filters');
    const applyFilters = document.querySelector('.apply-filters');
    const distanceInput = document.getElementById('distance-input');
    const pointsInput = document.getElementById('points-input');
    const quickDistanceOptions = document.querySelectorAll('input[name="quick-distance"]');
    const quickPointsOptions = document.querySelectorAll('input[name="quick-points"]');

    // Show modal
    filterButton.addEventListener('click', () => {
        filterModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Hide modal
    function hideModal() {
        filterModal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', hideModal);

    // Close modal when clicking outside
    filterModal.addEventListener('click', (e) => {
        if (e.target === filterModal) {
            hideModal();
        }
    });

    // Handle quick distance options
    quickDistanceOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            if (e.target.checked) {
                distanceInput.value = e.target.value;
            }
        });
    });

    // Handle custom distance input
    distanceInput.addEventListener('input', () => {
        // Uncheck quick distance options when custom distance is entered
        quickDistanceOptions.forEach(option => {
            option.checked = false;
        });
    });

    // Handle quick points options
    quickPointsOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            if (e.target.checked) {
                pointsInput.value = e.target.value;
            }
        });
    });

    // Handle custom points input
    pointsInput.addEventListener('input', () => {
        // Uncheck quick points options when custom points are entered
        quickPointsOptions.forEach(option => {
            option.checked = false;
        });
    });

    // Reset filters
    resetFilters.addEventListener('click', () => {
        const inputs = filterModal.querySelectorAll('input');
        inputs.forEach(input => {
            input.checked = false;
            if (input.type === 'number') {
                input.value = '';
            }
        });
        // Show all cards when filters are reset
        businessCards.forEach(card => {
            card.style.display = 'block';
        });
    });

    // Apply filters
    applyFilters.addEventListener('click', () => {
        const selectedFilters = {
            types: Array.from(filterModal.querySelectorAll('input[name="type"]:checked')).map(input => input.value),
            distance: distanceInput.value || null,
            rating: filterModal.querySelector('input[name="rating"]:checked')?.value,
            status: Array.from(filterModal.querySelectorAll('input[name="status"]:checked')).map(input => input.value),
            points: pointsInput.value || null,
            popular: filterModal.querySelector('input[name="popular"]:checked')?.value === 'true'
        };

        // Filter business cards
        businessCards.forEach(card => {
            const businessType = card.querySelector('.business-type').textContent.toLowerCase();
            const rating = parseFloat(card.querySelector('.business-rating span').textContent);
            const distance = parseFloat(card.querySelector('.business-distance span').textContent);
            const status = card.querySelector('.business-status').textContent.toLowerCase();
            const points = parseFloat(card.querySelector('.points-value').textContent.replace('%', ''));
            const isPopular = card.querySelector('.popular-flag') !== null;
            const isOpen = status.includes('open');
            const isClosed = status.includes('closed') || status.includes('opens at');

            let matchesType = selectedFilters.types.length === 0 ||
                selectedFilters.types.some(type => businessType.includes(type));

            let matchesDistance = !selectedFilters.distance ||
                distance <= parseFloat(selectedFilters.distance);

            let matchesRating = !selectedFilters.rating ||
                rating >= parseFloat(selectedFilters.rating);

            let matchesStatus = selectedFilters.status.length === 0 ||
                (selectedFilters.status.includes('open') && isOpen) ||
                (selectedFilters.status.includes('closed') && isClosed);

            let matchesPoints = !selectedFilters.points ||
                points >= parseFloat(selectedFilters.points);

            let matchesPopular = !selectedFilters.popular || isPopular;

            if (matchesType && matchesDistance && matchesRating && matchesStatus && matchesPoints && matchesPopular) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Show toast with filter count
        const visibleCards = Array.from(document.querySelectorAll('.business-card')).filter(card => card.style.display == 'block').length;
        showToast(`Showing ${visibleCards} businesses`);

        hideModal();
    });

    // Prevent modal from closing when clicking inside modal content
    filterModal.querySelector('.modal-content').addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            const searchTerm = this.value.toLowerCase();
            let visibleCount = 0;

            businessCards.forEach(card => {
                const businessName = card.querySelector('.business-name').textContent.toLowerCase();
                const businessType = card.querySelector('.business-type').textContent.toLowerCase();

                if (businessName.includes(searchTerm) || businessType.includes(searchTerm)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            showToast(`Found ${visibleCount} businesses`);
            this.blur();
        }
    });

    // Featured sections
    const sectionActions = document.querySelectorAll('.section-action');
    sectionActions.forEach(action => {
        action.addEventListener('click', function () {
            showToast('More businesses coming soon!');
        });
    });

    // Simulate loading delay for better UX
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});