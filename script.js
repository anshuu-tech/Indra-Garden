// Royal Wedding Interactive Script for Indra Garden Jhansi

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

    // 2. Day vs Night View Switcher
    const showDayBtn = document.getElementById('showDayBtn');
    const showNightBtn = document.getElementById('showNightBtn');
    const dayViewBox = document.getElementById('dayViewBox');
    const nightViewBox = document.getElementById('nightViewBox');

    if (showDayBtn && showNightBtn && dayViewBox && nightViewBox) {
        showDayBtn.addEventListener('click', () => {
            // Activate Day View
            dayViewBox.classList.remove('opacity-0', 'pointer-events-none');
            dayViewBox.classList.add('opacity-100');
            nightViewBox.classList.add('opacity-0', 'pointer-events-none');
            nightViewBox.classList.remove('opacity-100');

            showDayBtn.className = 'px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md transition flex items-center gap-2';
            showNightBtn.className = 'px-6 py-2.5 rounded-full text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-2';
        });

        showNightBtn.addEventListener('click', () => {
            // Activate Night View
            nightViewBox.classList.remove('opacity-0', 'pointer-events-none');
            nightViewBox.classList.add('opacity-100');
            dayViewBox.classList.add('opacity-0', 'pointer-events-none');
            dayViewBox.classList.remove('opacity-100');

            showNightBtn.className = 'px-6 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-gold-500 to-amber-600 text-royal-950 shadow-md transition flex items-center gap-2';
            showDayBtn.className = 'px-6 py-2.5 rounded-full text-xs font-bold text-slate-300 hover:text-white transition flex items-center gap-2';
        });
    }

    // 3. Wedding Cost Calculator
    const guestSlider = document.getElementById('guestSlider');
    const guestDisplay = document.getElementById('guestDisplay');
    const decorBtns = document.querySelectorAll('.decor-btn');
    const addRooms = document.getElementById('addRooms');
    const addDj = document.getElementById('addDj');
    const addPyro = document.getElementById('addPyro');
    const totalEstimateDisplay = document.getElementById('totalEstimateDisplay');
    const sendCalcToWhatsAppBtn = document.getElementById('sendCalcToWhatsAppBtn');

    let currentDecor = 'grand'; // standard, grand, royal

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
            guestDisplay.innerText = `${guestSlider.value} लोग`;
            calculateBudget();
        });
    }

    [addRooms, addDj, addPyro].forEach(cb => {
        if (cb) cb.addEventListener('change', calculateBudget);
    });

    function calculateBudget() {
        if (!guestSlider) return;
        const guests = parseInt(guestSlider.value);

        // Base Venue + Lawn rate
        let baseVenue = 60000;
        if (guests > 1200) {
            baseVenue = 95000;
        } else if (guests > 700) {
            baseVenue = 80000;
        }

        // Decor multiplier
        let decorCost = 35000;
        if (currentDecor === 'standard') decorCost = 20000;
        if (currentDecor === 'royal') decorCost = 65000;

        // Add-ons
        let addonsCost = 0;
        if (addRooms && addRooms.checked) addonsCost += 10000;
        if (addDj && addDj.checked) addonsCost += 15000;
        if (addPyro && addPyro.checked) addonsCost += 8000;

        const total = baseVenue + decorCost + addonsCost;
        if (totalEstimateDisplay) {
            totalEstimateDisplay.innerText = `₹${total.toLocaleString('en-IN')}*`;
        }
        return total;
    }

    if (sendCalcToWhatsAppBtn) {
        sendCalcToWhatsAppBtn.addEventListener('click', () => {
            const guests = guestSlider ? guestSlider.value : '500';
            const total = calculateBudget();
            const decorName = currentDecor === 'royal' ? 'अल्ट्रा लक्ज़री' : (currentDecor === 'grand' ? 'शाही / ग्रैंड' : 'स्टैंडर्ड');

            const whatsappNumber = '919876543210';
            const text = `*🏛️ इन्द्रा गार्डन (झाँसी) - शादी बजट कोटेशन इन्क्वायरी*%0A%0A` +
                `👥 *मेहमानों की संख्या:* ${guests} लोग%0A` +
                `✨ *डेकोरेशन थीम:* ${decorName}%0A` +
                `🛏️ *लक्ज़री रूम्स:* ${addRooms && addRooms.checked ? 'हाँ' : 'नहीं'}%0A` +
                `🎵 *डीजे & लाइटिंग:* ${addDj && addDj.checked ? 'हाँ' : 'नहीं'}%0A` +
                `🎆 *कोल्ड पायरोज़:* ${addPyro && addPyro.checked ? 'हाँ' : 'नहीं'}%0A` +
                `💰 *अनुमानित बजट:* ₹${total.toLocaleString('en-IN')}%0A%0A` +
                `कृपया इस बजट में बुकिंग और उपलब्ध तारीख की जानकारी दें।`;

            window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
        });
    }

    // 4. Background Shehnai / Music Player
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const musicIcon = document.getElementById('musicIcon');
    const weddingAudio = document.getElementById('weddingAudio');
    let isPlaying = false;

    if (musicToggleBtn && weddingAudio) {
        musicToggleBtn.addEventListener('click', () => {
            if (!isPlaying) {
                weddingAudio.play().then(() => {
                    isPlaying = true;
                    musicIcon.classList.remove('fa-volume-xmark');
                    musicIcon.classList.add('fa-volume-high', 'text-gold-400');
                    musicToggleBtn.classList.add('border-gold-400', 'bg-gold-500/20');
                }).catch(() => {});
            } else {
                weddingAudio.pause();
                isPlaying = false;
                musicIcon.classList.remove('fa-volume-high', 'text-gold-400');
                musicIcon.classList.add('fa-volume-xmark');
                musicToggleBtn.classList.remove('border-gold-400', 'bg-gold-500/20');
            }
        });
    }

    // 5. Date restriction to today+
    const eventDateInput = document.getElementById('eventDate');
    if (eventDateInput) {
        eventDateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
    }

    // 6. Direct WhatsApp Booking Form
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
            let whatsappText = `*🏛️ इन्द्रा गार्डन (झाँसी) - नई वेन्यू बुकिंग पूछताछ:*%0A%0A` +
                `👤 *नाम:* ${encodeURIComponent(name)}%0A` +
                `📞 *मोबाइल:* ${encodeURIComponent(phone)}%0A` +
                `📅 *तारीख:* ${encodeURIComponent(date)}%0A` +
                `🎉 *इवेंट:* ${encodeURIComponent(eventType)}%0A` +
                `👥 *मेहमान:* ${encodeURIComponent(guests)}%0A`;

            if (msg) whatsappText += `📝 *संदेश:* ${encodeURIComponent(msg)}%0A`;
            whatsappText += `%0Aकृपया बताएं कि क्या यह तारीख उपलब्ध है?`;

            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        });
    }

    // 7. Gallery Filter
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => {
                b.classList.remove('bg-gold-500', 'text-royal-950', 'shadow-md');
                b.classList.add('bg-royal-850', 'text-slate-300');
            });
            btn.classList.remove('bg-royal-850', 'text-slate-300');
            btn.classList.add('bg-gold-500', 'text-royal-950', 'shadow-md');

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

    // 8. Falling Rose Petals Canvas Effect
    const canvas = document.getElementById('petalCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const petalCount = 28;
        const petals = [];

        for (let i = 0; i < petalCount; i++) {
            petals.push({
                x: Math.random() * width,
                y: Math.random() * height - height,
                size: Math.random() * 8 + 8,
                speedY: Math.random() * 1.2 + 0.8,
                speedX: Math.random() * 1 - 0.5,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 1 - 0.5,
                opacity: Math.random() * 0.4 + 0.4,
                color: Math.random() > 0.4 ? '#C92A2A' : '#E03131' // Rose pink/red
            });
        }

        function drawPetal(p) {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;

            // Draw petal curve
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(p.size / 2, -p.size / 2, p.size, 0, 0, p.size * 1.5);
            ctx.bezierCurveTo(-p.size, 0, -p.size / 2, -p.size / 2, 0, 0);
            ctx.fill();
            ctx.restore();
        }

        function updatePetals() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(p => {
                p.y += p.speedY;
                p.x += Math.sin(p.y * 0.01) * 0.8 + p.speedX;
                p.rotation += p.rotationSpeed;

                if (p.y > height + 20) {
                    p.y = -20;
                    p.x = Math.random() * width;
                }
                drawPetal(p);
            });
            requestAnimationFrame(updatePetals);
        }
        updatePetals();
    }
});
