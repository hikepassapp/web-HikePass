// Load navbar dan inisialisasi setelah ter-load
fetch('navbar_pengelola.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    
    // Inisialisasi navbar setelah di-load
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.navbar-logo');
    
    // Set active class based on current page
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      
      if (href === currentPage) {
        item.classList.add('active');
      }

      // Add click event listener
      item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Logo click to home
    if (logo) {
      logo.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }

    // Smooth scroll effect
    if (navbar) {
      let lastScroll = 0;
      navbar.style.transition = 'transform 0.3s ease';

      window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
          // Scrolling down - hide navbar
          navbar.style.transform = 'translateY(-100%)';
        } else {
          // Scrolling up - show navbar
          navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
      });
    }
  })
  .catch(error => console.error('Error loading navbar:', error));