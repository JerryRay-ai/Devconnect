document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('mobileNavToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('show');
        });

        document.addEventListener('click', (event) => {
            const isClickInside = mobileMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInside) {
                mobileMenu.classList.remove('show');
            }
        });
    }
});