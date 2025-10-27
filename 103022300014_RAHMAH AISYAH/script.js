// Search functionality
const searchInput = document.querySelector('.search-input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.mountain-card');
    
    cards.forEach(card => {
        const title = card.querySelector('.mountain-title').textContent.toLowerCase();
        card.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
});

// Add button
document.querySelector('.btn-add').addEventListener('click', () => {
    alert('Fitur tambah data akan segera hadir!');
});

// Edit buttons
document.querySelectorAll('.btn-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.mountain-card');
        const name = card.querySelector('.mountain-title').textContent;
        alert(`Edit data: ${name}`);
    });
});

// Delete buttons
document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.mountain-card');
        const name = card.querySelector('.mountain-title').textContent;
        if(confirm(`Hapus data ${name}?`)) {
            card.remove();
        }
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});