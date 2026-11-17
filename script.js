// Interactive Script for Indra Garden Jhansi (Gauri Greens Inspired Theme)

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

    // 2. Set Minimum Event Date to Today
    const eventDate = document.getElementById('eventDate');
    if (eventDate) {
        eventDate.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    // 3. FAQ Accordion (Gauri Greens Style)
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = !answer.classList.contains('hidden');

            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
            document.querySelectorAll('.faq-toggle').forEach(t => t.classList.remove('active'));

            // Toggle current
            if (!isOpen) {
                answer.classList.remove('hidden');
                btn.classList.add('active');
            }
        });
    });

    // 4. Booking Inquiry Submission -> WhatsApp
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
                `• *Contact:* ${encodeURIComponent(phone)}%0A` +
                `• *Event Date:* ${encodeURIComponent(date)}%0A` +
                `• *Event / Occasion:* ${encodeURIComponent(eventType)}%0A` +
                `• *Expected Attendance:* ${encodeURIComponent(guests)}%0A`;

            if (msg) {
                whatsappText += `• *Message / Special Notes:* ${encodeURIComponent(msg)}%0A`;
            }

            whatsappText += `%0APlease confirm date availability and let us know suitable timings for a physical venue tour.`;

            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        });
    }

    // 5. Gallery Category Filter
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update button styles
            filterButtons.forEach(b => {
                b.classList.remove('bg-brand-green', 'text-white', 'shadow-sm');
                b.classList.add('bg-slate-100', 'text-slate-700');
            });
            btn.classList.remove('bg-slate-100', 'text-slate-700');
            btn.classList.add('bg-brand-green', 'text-white', 'shadow-sm');

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
