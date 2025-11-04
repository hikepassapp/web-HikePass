fetch('navbar_pengelola.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
      if (item.getAttribute('href') === currentPage) {
        item.classList.add('active');
      }
    });
  });