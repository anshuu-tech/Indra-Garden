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

    // 2. Interactive Cost Estimator
    const guestSlider = document.getElementById('guestSlider');
    const guestDisplay = document.getElementById('guestDisplay');
    const decorBtns = document.querySelectorAll('.decor-btn');
    const addSuites = document.getElementById('addSuites');
    const addSound = document.getElementById('addSound');
    const addSpecialFx = document.getElementById('addSpecialFx');
    const totalEstimateDisplay = document.getElementById('totalEstimateDisplay');
    const sendQuoteWhatsApp = document.getElementById('sendQuoteWhatsApp');

    let currentDecor = 'regal'; // classic, regal, luxury

    decorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            decorBtns.forEach(b => b.classList.remove('active-option'));
            btn.classList.add('active-option');
            currentDecor = btn.getAttribute('data-val');
            calculateBudget();
        });
    });

    if (guestSlider) {
        guestSlider.addEventListener('input', () => {
            guestDisplay.innerText = `${guestSlider.value} Guests`;
            calculateBudget();
        });
    }

    [addSuites, addSound, addSpecialFx].forEach(cb => {
        if (cb) cb.addEventListener('change', calculateBudget);
    });

    function calculateBudget() {
        if (!guestSlider) return;
        const guests = parseInt(guestSlider.value);

        // Base venue hire
        let baseVenue = 60000;
        if (guests > 1200) {
            baseVenue = 95000;
        } else if (guests > 700) {
            baseVenue = 80000;
        }

        // Decor Tier
        let decorCost = 35000;
        if (currentDecor === 'classic') decorCost = 20000;
        if (currentDecor === 'luxury') decorCost = 65000;

        // Add-ons
        let addonsCost = 0;
        if (addSuites && addSuites.checked) addonsCost += 10000;
        if (addSound && addSound.checked) addonsCost += 15000;
        if (addSpecialFx && addSpecialFx.checked) addonsCost += 8000;

        const total = baseVenue + decorCost + addonsCost;
        if (totalEstimateDisplay) {
            totalEstimateDisplay.innerText = `₹${total.toLocaleString('en-IN')}*`;
        }
        return total;
    }

    if (sendQuoteWhatsApp) {
        sendQuoteWhatsApp.addEventListener('click', () => {
            const guests = guestSlider ? guestSlider.value : '500';
            const total = calculateBudget();
            const decorLabel = currentDecor === 'luxury' ? 'Ultra Luxury' : (currentDecor === 'regal' ? 'Regal Grand' : 'Classic');

            const whatsappNumber = '919876543210';
            const message = `*Indra Garden Jhansi - Event Estimate Inquiry*%0A%0A` +
                `• *Guest Attendance:* ${guests} guests%0A` +
                `• *Decor Tier:* ${decorLabel}%0A` +
                `• *Bridal AC Suites:* ${addSuites && addSuites.checked ? 'Yes' : 'No'}%0A` +
                `• *Sound & Illumination:* ${addSound && addSound.checked ? 'Yes' : 'No'}%0A` +
                `• *Special Effects:* ${addSpecialFx && addSpecialFx.checked ? 'Yes' : 'No'}%0A` +
                `• *Estimated Investment:* ₹${total.toLocaleString('en-IN')}%0A%0A` +
                `Kindly share available dates and arrange a physical venue tour.`;

            window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
        });
    }

    // 3. Set minimum event date to today
    const eventDate = document.getElementById('eventDate');
    if (eventDate) {
        eventDate.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    // 4. Booking Form Submission -> WhatsApp
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
                whatsappText += `• *Notes:* ${encodeURIComponent(msg)}%0A`;
            }

            whatsappText += `%0APlease confirm venue availability and tariff details.`;

            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        });
    }

    // 5. Gallery Filter
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
