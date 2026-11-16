// Script for Indra Garden Jhansi Website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 2. Restrict Date Picker to Today and Future Dates
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        const today = new Date().toISOString().split('T')[0];
        eventDateInput.setAttribute('min', today);
    }

    // 3. Gallery Filtering
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => {
                b.classList.remove('bg-gold-500', 'text-royal-900');
                b.classList.add('bg-royal-800', 'text-slate-300');
            });
            btn.classList.remove('bg-royal-800', 'text-slate-300');
            btn.classList.add('bg-gold-500', 'text-royal-900');

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

    // 4. WhatsApp Direct Booking Enquiry for Indra Garden Jhansi
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

            // Set the manager/owner's WhatsApp number here (with country code, no + or -)
            const whatsappNumber = '919876543210';

            // Construct nice WhatsApp message for Indra Garden Jhansi
            let whatsappText = `*🏛️ इन्द्रा गार्डन (झाँसी) - नई बुकिंग पूछताछ:*%0A%0A` +
                `👤 *नाम:* ${encodeURIComponent(name)}%0A` +
                `📞 *मोबाइल नंबर:* ${encodeURIComponent(phone)}%0A` +
                `📅 *इवेंट की तारीख:* ${encodeURIComponent(date)}%0A` +
                `🎉 *इवेंट का प्रकार:* ${encodeURIComponent(eventType)}%0A` +
                `👥 *मेहमानों की संख्या:* ${encodeURIComponent(guests)}%0A`;

            if (msg) {
                whatsappText += `📝 *विशेष आवश्यकता:* ${encodeURIComponent(msg)}%0A`;
            }

            whatsappText += `%0Aकृपया बताएं कि इस तारीख को इन्द्रा गार्डन उपलब्ध है या नहीं? धन्यवाद!`;

            // Open WhatsApp URL
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;
            window.open(whatsappUrl, '_blank');
        });
    }
});
