document.addEventListener('DOMContentLoaded', () => {
    // Voucher Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const voucherCards = document.querySelectorAll('.voucher-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');

            // Filter voucher cards
            const filter = button.textContent.toLowerCase();
            
            voucherCards.forEach(card => {
                const status = card.querySelector('.voucher-status').textContent.toLowerCase();
                
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    card.style.display = status.includes(filter) ? 'block' : 'none';
                }
            });
        });
    });

    const copyButtons = document.querySelectorAll('.voucher-code button');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const voucherCode = button.previousElementSibling;
            
            // Copy to clipboard
            navigator.clipboard.writeText(voucherCode.textContent).then(() => {
                button.textContent = 'Copied!';
                button.style.backgroundColor = '#2e7d32';

                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.backgroundColor = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy voucher code: ', err);
            });
        });
    });

    function adjustVoucherLayout() {
        const screenWidth = window.innerWidth;
        const voucherList = document.querySelector('.vouchers-list');
        
        if (screenWidth < 375) {
            voucherList.classList.add('compact');
        } else {
            voucherList.classList.remove('compact');
        }
    }

    adjustVoucherLayout();
    window.addEventListener('resize', adjustVoucherLayout);
});