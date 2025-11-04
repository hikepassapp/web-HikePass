// ========================================
// TIKET SAYA SCRIPT - API VERSION
// ========================================

const API_BASE_URL = 'https://6906c98ab1879c890ed807e9.mockapi.io/api/tiketSaya';

document.addEventListener("DOMContentLoaded", () => {
    console.log('🚀 Initializing Tiket Saya page...');
    initTiketSaya();
});

// ========================================
// MAIN INITIALIZATION
// ========================================

function initTiketSaya() {
    showLoading();
    loadTicketsFromAPI();
    setupFilterButtons();
}

// ========================================
// LOAD TICKETS FROM API
// ========================================

async function loadTicketsFromAPI() {
    try {
        console.log('📡 Loading tickets from API...');

        const response = await fetch(`${API_BASE_URL}/tiket`);
        console.log('📥 Fetch response status:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const allTickets = await response.json();
        console.log('✅ API data loaded:', allTickets);
        console.log('📊 Total tickets:', allTickets.length);

        // Sort tickets by createdAt date (newest first)
        allTickets.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA; // Descending order (newest first)
        });

        if (allTickets.length > 0) {
            console.table(allTickets);
        }

        hideLoading();

        if (allTickets.length === 0) {
            console.log('❌ No tickets found, showing empty state');
            showEmptyState();
        } else {
            console.log('✅ Rendering', allTickets.length, 'tickets (sorted by newest)');
            renderTickets(allTickets);
        }

    } catch (error) {
        console.error('❌ Error loading tickets:', error);
        hideLoading();
        showError('Gagal memuat tiket. Silakan refresh halaman.');
    }
}

// ========================================
// HELPER FUNCTIONS - API
// ========================================

async function getTicketsFromAPI() {
    try {
        const response = await fetch(`${API_BASE_URL}/tiket`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        return [];
    }
}

async function updateTicketInAPI(ticketId, updates) {
    try {
        const response = await fetch(`${API_BASE_URL}/tiket/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...updates,
                updatedAt: new Date().toISOString()
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const updatedTicket = await response.json();
        console.log('✅ Ticket updated in API:', updatedTicket);
        return updatedTicket;
    } catch (error) {
        console.error('❌ Error updating ticket:', error);
        return null;
    }
}

async function getTicketById(ticketId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tiket/${ticketId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching ticket:', error);
        return null;
    }
}

async function deleteTicketFromAPI(ticketId) {
    try {
        const response = await fetch(`${API_BASE_URL}/tiket/${ticketId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log('✅ Ticket deleted from API:', ticketId);
        return true;
    } catch (error) {
        console.error('❌ Error deleting ticket:', error);
        return false;
    }
}

// ========================================
// RENDER TICKETS
// ========================================

async function renderTickets(tickets, filterStatus = 'semua') {
    const ticketsGrid = document.getElementById('ticketsGrid');
    const emptyState = document.getElementById('emptyState');

    console.log(`🔍 Rendering tickets with filter: ${filterStatus}`);

    let filteredTickets = tickets;
    if (filterStatus !== 'semua') {
        filteredTickets = tickets.filter(ticket => {
            if (filterStatus === 'belum-bayar') {
                return ticket.paymentStatus === 'belum_dibayar';
            }
            return ticket.status === filterStatus;
        });
    }

    console.log(`📊 Filtered tickets: ${filteredTickets.length} of ${tickets.length}`);

    if (filteredTickets.length === 0) {
        ticketsGrid.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    ticketsGrid.innerHTML = filteredTickets.map(ticket => createTicketCard(ticket)).join('');

    console.log('✅ Tickets rendered successfully');
}

// ========================================
// CREATE TICKET CARD HTML
// ========================================

function createTicketCard(ticket) {
    const displayStatus = getDisplayStatus(ticket);
    const statusClass = getStatusClass(ticket);
    const actionButtons = getActionButtons(ticket);

    return `
        <div class="ticket-card" data-ticket-id="${ticket.id}">
            <img src="${ticket.image || 'assets/gunung-default.jpg'}" 
                 alt="${ticket.mountain}" 
                 class="ticket-image" 
                 onerror="this.src='assets/gunung-default.jpg'">
            
            <div class="ticket-content">
                <div class="ticket-header">
                    <div class="ticket-info">
                        <h3 class="ticket-mountain-name">${ticket.mountain}</h3>
                        <p class="ticket-id">ID: ${ticket.id}</p>
                    </div>
                    <span class="status-badge ${statusClass}">${displayStatus}</span>
                </div>

                <div class="ticket-details">
                    <div class="detail-item">
                        <span class="detail-label">Nama Pemesan</span>
                        <span class="detail-value">${ticket.nama}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Jumlah Tiket</span>
                        <span class="detail-value">${ticket.climbers} Orang</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tanggal Masuk</span>
                        <span class="detail-value">${ticket.tanggalMasuk}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Tanggal Keluar</span>
                        <span class="detail-value">${ticket.tanggalKeluar}</span>
                    </div>
                </div>

                <div class="ticket-price">
                    <span class="price-label">Total Harga</span>
                    <span class="price-value">${formatPrice(ticket.total)}</span>
                </div>

                <div class="ticket-actions">
                    ${actionButtons}
                </div>
            </div>
        </div>
    `;
}

// ========================================
// GET DISPLAY STATUS & CLASS
// ========================================

function getDisplayStatus(ticket) {
    if (ticket.paymentStatus === 'belum_dibayar') {
        return 'Belum Dibayar';
    }

    if (ticket.paymentStatus === 'lunas') {
        return 'Lunas';
    }

    const statusMap = {
        'berhasil': 'Berhasil',
        'tidak-berhasil': 'Tidak Berhasil',
        'dibatalkan': 'Dibatalkan'
    };
    return statusMap[ticket.status] || ticket.status;
}

function getStatusClass(ticket) {
    if (ticket.paymentStatus === 'belum_dibayar') {
        return 'belum-bayar';
    }

    if (ticket.paymentStatus === 'lunas') {
        return 'berhasil';
    }

    return ticket.status;
}

// ========================================
// GET ACTION BUTTONS
// ========================================

function getActionButtons(ticket) {
    let buttons = `
        <button class="btn-detail" onclick="showTicketDetail('${ticket.id}')">
            Lihat Detail
        </button>
    `;

    if (ticket.paymentStatus === 'belum_dibayar') {
        buttons += `
            <button class="btn-pay" onclick="handlePayment('${ticket.id}')">
                Bayar Sekarang
            </button>
            <button class="btn-cancel" onclick="handleCancel('${ticket.id}')">
                Batalkan
            </button>
        `;
    }

    if (ticket.status === 'berhasil' && ticket.paymentStatus === 'lunas') {
        buttons += `
            <button class="btn-review" onclick="handleReview('${ticket.id}')">
                Beri Ulasan
            </button>
        `;
    }

    return buttons;
}

// ========================================
// ACTION HANDLERS
// ========================================

function handlePayment(ticketId) {
    sessionStorage.setItem('paymentTicketId', ticketId);
    window.location.href = 'pembayaran.html';
}

async function handleCancel(ticketId) {
    if (confirm('Apakah Anda yakin ingin membatalkan tiket ini?')) {
        const updated = await updateTicketInAPI(ticketId, {
            status: 'dibatalkan',
            paymentStatus: 'dibatalkan'
        });

        if (updated) {
            alert('Tiket berhasil dibatalkan');
            location.reload();
        } else {
            alert('Gagal membatalkan tiket');
        }
    }
}

function handleReview(ticketId) {
    alert('Fitur review dalam pengembangan\nTicket ID: ' + ticketId);
}

// ========================================
// SHOW TICKET DETAIL
// ========================================

async function showTicketDetail(ticketId) {
    console.log('Showing detail for ticket:', ticketId);

    showDetailModal('loading');

    setTimeout(async () => {
        const ticket = await getTicketById(ticketId);

        if (ticket) {
            showDetailModal('success', ticket);
        } else {
            showDetailModal('error');
        }
    }, 300);
}

function showDetailModal(state, ticket = null) {
    const oldModal = document.getElementById('ticketDetailModal');
    if (oldModal) {
        oldModal.remove();
    }

    let modalContent = '';

    if (state === 'loading') {
        modalContent = `
            <div class="modal-header">
                <h2>Memuat Detail...</h2>
            </div>
            <div class="modal-body" style="text-align: center; padding: 40px;">
                <div style="width: 48px; margin: 0 auto;">
                    <img src="assets/iconLoading.svg" alt="" style="width: 48px;">
                </div>
                <p>Sedang memuat data tiket...</p>
            </div>
        `;
    } else if (state === 'error') {
        modalContent = `
            <div class="modal-header">
                <h2>Error</h2>
                <button class="modal-close" onclick="closeDetailModal()"><img src="assets/iconCancel.svg" alt=""></button>
            </div>
            <div class="modal-body" style="text-align: center; padding: 40px;">
                <div style="width: 48px; margin: 0 auto;"><img src="assets/iconCancel.svg" alt=""></div>
                <p>Gagal memuat detail tiket</p>
                <button onclick="closeDetailModal()" style="margin-top: 20px; padding: 10px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer;">
                    Tutup
                </button>
            </div>
        `;
    } else if (state === 'success' && ticket) {
        modalContent = `
            <div class="modal-header">
                <h2>Detail Tiket</h2>
                <button class="modal-close" onclick="closeDetailModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="detail-section">
                    <h3 style="display: flex; align-items: center;"> <img src="assets/iconGunung.svg" alt="" style="margin-right: 8px;">Informasi Gunung</h3>
                    <div class="detail-grid">
                        <div class="detail-row">
                            <span class="label">Nama Gunung:</span>
                            <span class="value">${ticket.mountain}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">ID Tiket:</span>
                            <span class="value">${ticket.id}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Status:</span>
                            <span class="value">
                                <span class="status-badge ${getStatusClass(ticket)}">${getDisplayStatus(ticket)}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3 style="display: flex; align-items: center;"> <img src="assets/iconUser.svg" alt="" style="margin-right: 8px;">Data Pemesan</h3>
                    <div class="detail-grid">
                        <div class="detail-row">
                            <span class="label">Nama Lengkap:</span>
                            <span class="value">${ticket.nama}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">NIK:</span>
                            <span class="value">${ticket.nik}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">No. Telepon:</span>
                            <span class="value">${ticket.noTelepon}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Jenis Kelamin:</span>
                            <span class="value">${ticket.jenisKelamin}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Alamat:</span>
                            <span class="value">${ticket.alamat}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3 style="display: flex; align-items: center;"> <img src="assets/iconCalendar.svg" alt="" style="margin-right: 8px;">Jadwal Pendakian</h3>
                    <div class="detail-grid">
                        <div class="detail-row">
                            <span class="label">Pos Masuk:</span>
                            <span class="value">${ticket.posMasuk}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Tanggal Masuk:</span>
                            <span class="value">${ticket.tanggalMasuk}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Pos Keluar:</span>
                            <span class="value">${ticket.posKeluar}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Tanggal Keluar:</span>
                            <span class="value">${ticket.tanggalKeluar}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3 style="display: flex; align-items: center;"> <img src="assets/iconMoneyBag.svg" alt="" style="margin-right: 8px;">Rincian Pembayaran</h3>
                    <div class="detail-grid">
                        <div class="detail-row">
                            <span class="label">Jumlah Pendaki:</span>
                            <span class="value">${ticket.climbers} Orang</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Harga per Orang:</span>
                            <span class="value">${formatPrice(ticket.price)}</span>
                        </div>
                        <div class="detail-row" style="border-top: 2px solid #f0f0f0; padding-top: 12px; margin-top: 12px;">
                            <span class="label" style="font-weight: 700; font-size: 16px;">Total Pembayaran:</span>
                            <span class="value" style="font-weight: 700; font-size: 18px; color: var(--primary);">${formatPrice(ticket.total)}</span>
                        </div>
                    </div>
                </div>

                <div class="detail-section">
                    <h3 style="display: flex; align-items: center;"> <img src="assets/iconNote.svg" alt="" style="margin-right: 8px;">Informasi Lainnya</h3>
                    <div class="detail-grid">
                        <div class="detail-row">
                            <span class="label">Tanggal Booking:</span>
                            <span class="value">${formatDateTime(ticket.createdAt)}</span>
                        </div>
                        <div class="detail-row">
                            <span class="label">Terakhir Diupdate:</span>
                            <span class="value">${formatDateTime(ticket.updatedAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-modal-close" onclick="closeDetailModal()">Tutup</button>
                ${ticket.paymentStatus === 'belum_dibayar' ?
                `<button class="btn-modal-pay" onclick="closeDetailModal(); handlePayment('${ticket.id}')">Bayar Sekarang</button>`
                : ''}
            </div>
        `;
    }

    const modal = document.createElement('div');
    modal.id = 'ticketDetailModal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-container">
            ${modalContent}
        </div>
    `;

    document.body.appendChild(modal);

    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeDetailModal();
        }
    });
}

function closeDetailModal() {
    const modal = document.getElementById('ticketDetailModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// ========================================
// SETUP FILTER BUTTONS
// ========================================

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            console.log('🔍 Filter clicked:', btn.getAttribute('data-status'));

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterStatus = btn.getAttribute('data-status');
            showLoading();

            const allTickets = await getTicketsFromAPI();

            // Sort tickets by createdAt date (newest first)
            allTickets.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });

            hideLoading();
            renderTickets(allTickets, filterStatus);
        });
    });
}

// ========================================
// LOADING & ERROR STATES
// ========================================

function showLoading() {
    const ticketsGrid = document.getElementById('ticketsGrid');
    const emptyState = document.getElementById('emptyState');

    emptyState.style.display = 'none';
    ticketsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #666;">
            <div style="font-size: 48px; margin-bottom: 20px;">⏳</div>
            <p style="font-size: 16px;">Memuat tiket...</p>
        </div>
    `;
}

function hideLoading() {
}

function showEmptyState() {
    const ticketsGrid = document.getElementById('ticketsGrid');
    const emptyState = document.getElementById('emptyState');

    ticketsGrid.innerHTML = '';
    emptyState.style.display = 'block';
}

function showError(message) {
    const ticketsGrid = document.getElementById('ticketsGrid');
    const emptyState = document.getElementById('emptyState');

    emptyState.style.display = 'none';
    ticketsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: #cf1322;">
            <div style="font-size: 48px; margin-bottom: 20px;"></div>
            <p style="font-size: 16px; margin-bottom: 20px;">${message}</p>
            <button onclick="location.reload()" 
                    style="padding: 10px 24px; background: var(--primary); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 14px; font-weight: 600;">
                 Refresh Halaman
            </button>
        </div>
    `;
}

// ========================================
// HELPER FUNCTIONS
// ========================================

function formatPrice(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(price);
}

function formatDateTime(dateString) {
    if (!dateString) return 'Tidak tersedia';

    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return 'Tanggal tidak valid';
        }

        return date.toLocaleString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Tanggal tidak valid';
    }
}

console.log('%c🎫 Tiket Saya Page - LOADED (API Version)', 'font-size: 16px; font-weight: bold; color: #0c665c;');
console.log('%cData Source: MockAPI', 'font-weight: bold;');