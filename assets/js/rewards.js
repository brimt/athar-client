const copyButtons = document.querySelectorAll('.referral-code button');
    
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const referralCode = button.previousElementSibling;

        navigator.clipboard.writeText(referralCode.textContent).then(() => {
            button.textContent = 'Copied!';
            button.style.backgroundColor = '#2e7d32';

            setTimeout(() => {
                button.textContent = 'Copy';
                button.style.backgroundColor = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy referral code: ', err);
        });
    });
});