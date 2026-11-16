// Professional Script for Indra Garden Jhansi

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
        });
    }

    // 2. Set minimum event date to today
    const eventDate = document.getElementById('eventDate');
    if (eventDate) {
        eventDate.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    // 3. Booking Form Submission -> WhatsApp (Zero Price Mentions)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('custName').value.trim();
            const phone = document.getElementById('custPhone').value.trim();
            const date = document.getElementById('eventDate').value;
            const eventType = document.getElementById('eventType').value;
            const guests = document.getElementById('guestCount').value;
            const msg = document.getElementById('custMessage').value.trim();

            const whatsappNumber = '919876543210';
            let whatsappText = `*Indra Garden Jhansi - New Venue Inquiry*%0A%0A` +
                `• *Name:* ${encodeURIComponent(name)}%0A` +
                `• *Phone:* ${encodeURIComponent(phone)}%0A` +
                `• *Target Date:* ${encodeURIComponent(date)}%0A` +
                `• *Event Type:* ${encodeURIComponent(eventType)}%0A` +
                `• *Estimated Guests:* ${encodeURIComponent(guests)}%0A`;

            if (msg) {
                whatsappText += `• *Inquiry / Notes:* ${encodeURIComponent(msg)}%0A`;
            }

            whatsappText += `%0APlease let me know if this date is available and when we can visit the venue.`;

            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        });
    }

    // 4. Gallery Filter
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-champagne-500', 'text-onyx-950');
                b.classList.add('bg-onyx-900', 'text-slate-300');
            });
            btn.classList.remove('bg-onyx-900', 'text-slate-300');
            btn.classList.add('bg-champagne-500', 'text-onyx-950');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});
