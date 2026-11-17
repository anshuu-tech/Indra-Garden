// Interactive Script for Indra Garden Jhansi (Gauri Greens Clone)

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

            // Toggle clicked one
            if (!isOpen) {
                answer.classList.remove('hidden');
                btn.classList.add('active');
            }
        });
    });

    // 4. Booking Inquiry Submission -> WhatsApp Router
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.getElementById('firstName')?.value.trim() || '';
            const lastName = document.getElementById('lastName')?.value.trim() || '';
            const fullName = `${firstName} ${lastName}`.trim();
            const email = document.getElementById('custEmail')?.value.trim() || '';
            const phone = document.getElementById('custPhone')?.value.trim() || '';
            const date = document.getElementById('eventDate')?.value || '';
            const eventType = document.getElementById('eventType')?.value || '';
            const guests = document.getElementById('guestCount')?.value || '';
            const rooms = document.getElementById('roomCount')?.value || '';
            const msg = document.getElementById('custMessage')?.value.trim() || '';

            const whatsappNumber = '919876543210';
            let whatsappText = `*Indra Garden Jhansi - New Venue Inquiry*%0A%0A` +
                `• *Name:* ${encodeURIComponent(fullName)}%0A` +
                `• *Contact Number:* ${encodeURIComponent(phone)}%0A`;

            if (email) {
                whatsappText += `• *Email:* ${encodeURIComponent(email)}%0A`;
            }

            whatsappText += `• *Event Date:* ${encodeURIComponent(date)}%0A` +
                `• *Event / Occasion:* ${encodeURIComponent(eventType)}%0A` +
                `• *Expected Guests:* ${encodeURIComponent(guests)}%0A` +
                `• *Rooms Required:* ${encodeURIComponent(rooms)}%0A`;

            if (msg) {
                whatsappText += `• *Message / Special Notes:* ${encodeURIComponent(msg)}%0A`;
            }

            whatsappText += `%0APlease confirm venue date availability and schedule a physical property inspection tour.`;

            window.open(`https://wa.me/${whatsappNumber}?text=${whatsappText}`, '_blank');
        });
    }

    // 5. Gallery Category Filter
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterButtons.forEach(b => {
                b.classList.remove('bg-[#4b7637]', 'text-white', 'shadow-sm');
                b.classList.add('bg-white', 'text-[#3a3a3a]', 'border-slate-200');
            });
            btn.classList.remove('bg-white', 'text-[#3a3a3a]', 'border-slate-200');
            btn.classList.add('bg-[#4b7637]', 'text-white', 'shadow-sm');

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

    // 6. Interactive Lightbox Modal for 12 Real Photos
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentPhotoIndex = 0;
    const photoList = [];

    galleryItems.forEach((card, index) => {
        const img = card.querySelector('img');
        const title = card.querySelector('h4')?.textContent || 'Indra Garden Jhansi';
        const category = card.querySelector('span')?.textContent || 'Photo Gallery';
        if (img) {
            photoList.push({
                src: img.getAttribute('src'),
                title: title,
                category: category
            });

            card.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });

    function openLightbox(index) {
        if (!lightbox || !photoList[index]) return;
        currentPhotoIndex = index;
        lightboxImg.src = photoList[index].src;
        lightboxCaption.innerHTML = `<span class="text-xs uppercase tracking-widest text-[#71ce7e] block">${photoList[index].category}</span><h3 class="text-white text-lg font-heading font-medium mt-0.5">${photoList[index].title}</h3>`;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentPhotoIndex = (currentPhotoIndex - 1 + photoList.length) % photoList.length;
            openLightbox(currentPhotoIndex);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentPhotoIndex = (currentPhotoIndex + 1) % photoList.length;
            openLightbox(currentPhotoIndex);
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightboxPrev?.click();
            if (e.key === 'ArrowRight') lightboxNext?.click();
        }
    });
});
