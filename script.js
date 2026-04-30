document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // 2. Navbar & Scroll Top functionality
    const navbar = document.querySelector('.navbar');
    const scrollTopBtn = document.querySelector('.scroll-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            scrollTopBtn.classList.add('show');
        } else {
            navbar.classList.remove('scrolled');
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3. Mobile Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // 4. Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const slideCount = slides.length;

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        currentSlide = (n + slideCount) % slideCount;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    setInterval(nextSlide, 6000); // Change slide every 6 seconds

    // 5. Gallery Modal Logic
    const modalImages = [
        "./Asset/33758.jpg",
        "./Asset/33757.jpg",
        "./Asset/33756.jpg",
        "./Asset/33761.jpg",
        "./Asset/33762.jpg",
        "./Asset/33763.jpg",
        "./Asset/33764.jpg",
        "./Asset/33765.jpg",
        "./Asset/33766.jpg"
    ];
    
    const galleryItems = document.querySelectorAll('.gallery-photo');
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.modal-close');
    const prevBtn = document.querySelector('.modal-prev');
    const nextBtn = document.querySelector('.modal-next');
    
    let currentImgIndex = 0;

    function openModal(index) {
        currentImgIndex = index;
        // Loop index if using duplicated track for infinite marquee
        const actualIndex = index % modalImages.length; 
        modalImg.src = modalImages[actualIndex];
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent bg body scrolling
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // enable scroll
    }

    function shiftImage(direction) {
        currentImgIndex += direction;
        if (currentImgIndex < 0) currentImgIndex = modalImages.length - 1;
        if (currentImgIndex >= modalImages.length) currentImgIndex = 0;
        
        modalImg.style.opacity = 0;
        setTimeout(() => {
            modalImg.src = modalImages[currentImgIndex];
            modalImg.style.opacity = 1;
        }, 150);
    }

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openModal(index));
    });

    closeBtn.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', () => shiftImage(-1));
    nextBtn.addEventListener('click', () => shiftImage(1));

    // Close on click outside image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') shiftImage(-1);
        if (e.key === 'ArrowRight') shiftImage(1);
    });
});
