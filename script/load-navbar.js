fetch('navbar_pengelola.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.navbar-logo');
    
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      
      if (href === currentPage) {
        item.classList.add('active');
      }

      item.addEventListener('click', function() {
        navItems.forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');
      });
    });

    if (logo) {
      logo.addEventListener('click', function() {
        window.location.href = 'index.html';
      });
    }

  })
  .catch(error => console.error('Error loading navbar:', error));