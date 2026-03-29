// Language Toggle for About Page
let isEnglish = false;

function toggleLanguage() {
    isEnglish = !isEnglish;
    const toggleBtn = document.getElementById('lang-toggle');
    
    if (toggleBtn) {
        // Remove existing classes
        toggleBtn.classList.remove('english', 'japanese');
        
        // Add appropriate class based on current language
        if (isEnglish) {
            toggleBtn.classList.add('english');
        } else {
            toggleBtn.classList.add('japanese');
        }
    }
    
    // Update content based on language
    updateContent();
    
    // Restart typing animation with new language text
    if (window.restartTypingAnimation) {
        window.restartTypingAnimation();
    }
}

function updateContent() {
    const elements = document.querySelectorAll('[data-ja][data-en]');
    elements.forEach(element => {
        const text = isEnglish ? 
            element.getAttribute('data-en') : 
            element.getAttribute('data-ja');
        
        // Handle HTML content (like <strong> and <br> tags)
        if (text && (text.includes('<strong>') || text.includes('<br>'))) {
            element.innerHTML = text;
        } else {
            element.textContent = text;
        }
        
        // Force layout recalculation for this element
        element.offsetHeight;
    });
}

// Initialize language toggle
document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleLanguage);
        
        // Initialize page in Japanese mode (default)
        isEnglish = false;
        toggleBtn.classList.remove('english', 'japanese');
        toggleBtn.classList.add('japanese');
        updateContent();
    }
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (typingElement && cursor) {
        const japaneseText = "ソフトウェア開発者 × マーケティングディレクター × デジタルアーティスト";
        const englishText = "Software Developer × Marketing Director × Digital Artist";
        
        let currentText = isEnglish ? englishText : japaneseText;
        
        // Start with empty text
        typingElement.textContent = '';
        
        let index = 0;
        
        function typeText() {
            if (index < currentText.length) {
                typingElement.textContent += currentText.charAt(index);
                index++;
                // Adjust typing speed based on screen size
                const isMobile = window.innerWidth <= 768;
                const delay = isMobile ? 60 : 80;
                setTimeout(typeText, delay);
            } else {
                // Animation complete, keep cursor blinking
                cursor.style.animation = 'blink 1s infinite';
            }
        }
        
        // Function to restart typing animation with new text
        function restartTypingAnimation() {
            currentText = isEnglish ? englishText : japaneseText;
            typingElement.textContent = '';
            index = 0;
            cursor.style.animation = 'none';
            setTimeout(typeText, 100);
        }
        
        // Start typing animation after a short delay
        setTimeout(typeText, 1500);
        
        // Store the restart function globally so it can be called from toggleLanguage
        window.restartTypingAnimation = restartTypingAnimation;
    }
});

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile navigation toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
});

// Intersection Observer for fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Optimized flip cards - CSS-only hover with mobile fallback
document.addEventListener('DOMContentLoaded', function() {
    const flipCards = document.querySelectorAll('.flip-card');
    
    // Only add mobile touch support, let CSS handle hover
    flipCards.forEach(card => {
        // Handle mobile tap events only
        card.addEventListener('click', function(e) {
            // Only on mobile devices
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Close other flipped cards first
                flipCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('flipped');
                    }
                });
                
                // Toggle the current card
                this.classList.toggle('flipped');
            }
        });
    });
    
    // Close flipped cards when clicking outside (mobile only)
    if (window.innerWidth <= 768) {
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.flip-card')) {
                flipCards.forEach(card => {
                    card.classList.remove('flipped');
                });
            }
        });
    }
});

// Profile image upload functionality
const profileImageContainer = document.querySelector('.profile-image-container');
const profileImage = document.getElementById('profileImage');
const imagePlaceholder = document.querySelector('.image-placeholder');

if (profileImageContainer) {
    profileImageContainer.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.style.display = 'none';
        
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    profileImage.src = e.target.result;
                    profileImageContainer.classList.add('has-image');
                };
                reader.readAsDataURL(file);
            }
        });
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    });
}

// Modal functionality
function openModal(modalId) {
    console.log('Opening modal:', modalId);
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        console.log('Modal opened successfully');
    } else {
        console.error('Modal not found:', modalId);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const openModals = document.querySelectorAll('.modal[style*="block"]');
        openModals.forEach(modal => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
});

// Initialize EmailJS
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
})();

// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('すべてのフィールドを入力してください。');
                return;
            }
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 送信中...';
            submitButton.disabled = true;
            
            // Send email using EmailJS
            emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                from_name: name,
                from_email: email,
                message: message,
                to_name: "Denpota Furugaki",
            })
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                alert('お問い合わせありがとうございます！24時間以内にご返信いたします。');
                contactForm.reset();
            })
            .catch(function(error) {
                console.error('FAILED...', error);
                alert('送信に失敗しました。もう一度お試しください。');
            })
            .finally(function() {
                // Restore button state
                submitButton.innerHTML = originalButtonText;
                submitButton.disabled = false;
            });
        });
    }
});

// Carousel functionality
let currentSlideIndex = {};

function moveCarousel(modalId, direction) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const slides = modal.querySelectorAll('.carousel-slide');
    const dots = modal.querySelectorAll('.dot');
    
    if (!currentSlideIndex[modalId]) {
        currentSlideIndex[modalId] = 0;
    }
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex[modalId]].classList.remove('active');
    dots[currentSlideIndex[modalId]].classList.remove('active');
    
    // Calculate new index
    currentSlideIndex[modalId] += direction;
    
    // Wrap around
    if (currentSlideIndex[modalId] >= slides.length) {
        currentSlideIndex[modalId] = 0;
    } else if (currentSlideIndex[modalId] < 0) {
        currentSlideIndex[modalId] = slides.length - 1;
    }
    
    // Add active class to new slide and dot
    slides[currentSlideIndex[modalId]].classList.add('active');
    dots[currentSlideIndex[modalId]].classList.add('active');
}

function currentSlide(modalId, index) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const slides = modal.querySelectorAll('.carousel-slide');
    const dots = modal.querySelectorAll('.dot');
    
    if (!currentSlideIndex[modalId]) {
        currentSlideIndex[modalId] = 0;
    }
    
    // Remove active class from current slide and dot
    slides[currentSlideIndex[modalId]].classList.remove('active');
    dots[currentSlideIndex[modalId]].classList.remove('active');
    
    // Set new index
    currentSlideIndex[modalId] = index;
    
    // Add active class to new slide and dot
    slides[currentSlideIndex[modalId]].classList.add('active');
    dots[currentSlideIndex[modalId]].classList.add('active');
}

// Reset carousel when modal closes
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset carousel to first slide
        if (currentSlideIndex[modalId] !== undefined) {
            const slides = modal.querySelectorAll('.carousel-slide');
            const dots = modal.querySelectorAll('.dot');
            
            slides[currentSlideIndex[modalId]].classList.remove('active');
            dots[currentSlideIndex[modalId]].classList.remove('active');
            
            currentSlideIndex[modalId] = 0;
            
            slides[0].classList.add('active');
            dots[0].classList.add('active');
        }
    }
}

// Digital Art Carousel - 3D Style Auto-Rotation
let currentDigitalArtIndex = 0;
let digitalArtAutoRotate;

function updateDigitalArtPositions() {
    const slides = document.querySelectorAll('.digital-art-slide');
    const dots = document.querySelectorAll('.digital-art-dot');
    
    slides.forEach((slide, index) => {
        slide.classList.remove('left', 'center', 'right', 'hidden');
        
        if (index === currentDigitalArtIndex) {
            slide.classList.add('center');
        } else if (index === (currentDigitalArtIndex + 1) % slides.length) {
            slide.classList.add('right');
        } else if (index === (currentDigitalArtIndex - 1 + slides.length) % slides.length) {
            slide.classList.add('left');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentDigitalArtIndex);
    });
}

function moveDigitalArtCarousel(direction) {
    const slides = document.querySelectorAll('.digital-art-slide');
    currentDigitalArtIndex = (currentDigitalArtIndex + direction + slides.length) % slides.length;
    updateDigitalArtPositions();
}

function currentDigitalArtSlide(index) {
    currentDigitalArtIndex = index;
    updateDigitalArtPositions();
}

function startDigitalArtAutoRotate() {
    digitalArtAutoRotate = setInterval(() => {
        moveDigitalArtCarousel(1);
    }, 4000);
}

function stopDigitalArtAutoRotate() {
    clearInterval(digitalArtAutoRotate);
}

// Initialize Digital Art Carousel
document.addEventListener('DOMContentLoaded', function() {
    const digitalArtCarousel = document.querySelector('.digital-art-carousel-container');
    if (!digitalArtCarousel) return;
    
    // Initialize positions
    updateDigitalArtPositions();
    startDigitalArtAutoRotate();
    
    // Pause on hover
    digitalArtCarousel.addEventListener('mouseenter', stopDigitalArtAutoRotate);
    digitalArtCarousel.addEventListener('mouseleave', startDigitalArtAutoRotate);
    
    // Manual navigation
    const prevBtn = document.querySelector('.digital-art-prev');
    const nextBtn = document.querySelector('.digital-art-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopDigitalArtAutoRotate();
            moveDigitalArtCarousel(-1);
            startDigitalArtAutoRotate();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopDigitalArtAutoRotate();
            moveDigitalArtCarousel(1);
            startDigitalArtAutoRotate();
        });
    }
    
    // Dot navigation
    const dots = document.querySelectorAll('.digital-art-dot');
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopDigitalArtAutoRotate();
            currentDigitalArtSlide(index);
            startDigitalArtAutoRotate();
        });
    });
});

// Case Studies Carousel - Center Focus with Auto-Rotation
let currentCaseStudySlide = 1; // Start with middle slide
let caseStudyAutoRotate;

function updateCaseStudyPositions() {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    const caseStudyDots = document.querySelectorAll('.case-study-dot');
    const totalSlides = caseStudySlides.length;
    
    if (totalSlides === 0) return;
    
    caseStudySlides.forEach((slide, index) => {
        // Remove all position classes
        slide.classList.remove('center', 'left', 'right', 'hidden');
        
        // Calculate position relative to current slide
        let position = index - currentCaseStudySlide;
        
        // Handle wrap-around
        if (position < -Math.floor(totalSlides / 2)) {
            position += totalSlides;
        } else if (position > Math.floor(totalSlides / 2)) {
            position -= totalSlides;
        }
        
        // Apply position classes
        if (position === 0) {
            slide.classList.add('center');
        } else if (position === -1) {
            slide.classList.add('left');
        } else if (position === 1) {
            slide.classList.add('right');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    // Update dots
    caseStudyDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCaseStudySlide);
    });
}

function moveCaseStudyCarousel(direction) {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    const totalSlides = caseStudySlides.length;
    
    if (totalSlides === 0) return;
    
    // Calculate new slide index
    currentCaseStudySlide += direction;
    
    if (currentCaseStudySlide >= totalSlides) {
        currentCaseStudySlide = 0;
    } else if (currentCaseStudySlide < 0) {
        currentCaseStudySlide = totalSlides - 1;
    }
    
    updateCaseStudyPositions();
    resetCaseStudyAutoRotate();
}

function goToCaseStudySlide(index) {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    const totalSlides = caseStudySlides.length;
    
    if (index < 0 || index >= totalSlides) return;
    
    currentCaseStudySlide = index;
    updateCaseStudyPositions();
    resetCaseStudyAutoRotate();
}

// Auto-rotate functionality
function startCaseStudyAutoRotate() {
    caseStudyAutoRotate = setInterval(() => {
        moveCaseStudyCarousel(1);
    }, 5000); // Rotate every 5 seconds
}

function resetCaseStudyAutoRotate() {
    clearInterval(caseStudyAutoRotate);
    startCaseStudyAutoRotate();
}

// Swipe gesture support
function initCaseStudySwipe() {
    const track = document.querySelector('.case-studies-carousel-track');
    if (!track) return;
    
    let startX = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
    }, { passive: true });
    
    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        
        // Swipe threshold
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                // Swiped left - go to next
                moveCaseStudyCarousel(1);
            } else {
                // Swiped right - go to previous
                moveCaseStudyCarousel(-1);
            }
        }
        
        isDragging = false;
    });
    
    // Mouse drag support for desktop
    track.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        isDragging = true;
        track.style.cursor = 'grabbing';
    });
    
    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
    });
    
    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        
        const endX = e.clientX;
        const diff = startX - endX;
        
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                moveCaseStudyCarousel(1);
            } else {
                moveCaseStudyCarousel(-1);
            }
        }
        
        isDragging = false;
        track.style.cursor = 'grab';
    });
    
    track.addEventListener('mouseleave', () => {
        isDragging = false;
        track.style.cursor = 'grab';
    });
}

// Initialize case studies carousel
document.addEventListener('DOMContentLoaded', function() {
    const caseStudySlides = document.querySelectorAll('.case-study-slide');
    
    if (caseStudySlides.length > 0) {
        updateCaseStudyPositions();
        startCaseStudyAutoRotate();
        initCaseStudySwipe();
        
        // Click on side slides to navigate
        caseStudySlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                if (index !== currentCaseStudySlide) {
                    goToCaseStudySlide(index);
                }
            });
        });
    }
});

// Onitsuka Carousel functionality
let currentOnitsukaIndex = 1;

function moveOnitsukaCarousel(direction) {
    const slides = document.querySelectorAll('#onitsukaCarousel .carousel-slide');
    const dots = document.querySelectorAll('.onitsuka-carousel .dot');
    
    slides[currentOnitsukaIndex - 1].classList.remove('active');
    dots[currentOnitsukaIndex - 1].classList.remove('active');
    
    currentOnitsukaIndex += direction;
    
    if (currentOnitsukaIndex > slides.length) {
        currentOnitsukaIndex = 1;
    }
    if (currentOnitsukaIndex < 1) {
        currentOnitsukaIndex = slides.length;
    }
    
    slides[currentOnitsukaIndex - 1].classList.add('active');
    dots[currentOnitsukaIndex - 1].classList.add('active');
}

function currentOnitsukaSlide(index) {
    const slides = document.querySelectorAll('#onitsukaCarousel .carousel-slide');
    const dots = document.querySelectorAll('.onitsuka-carousel .dot');
    
    slides[currentOnitsukaIndex - 1].classList.remove('active');
    dots[currentOnitsukaIndex - 1].classList.remove('active');
    
    currentOnitsukaIndex = index;
    
    slides[currentOnitsukaIndex - 1].classList.add('active');
    dots[currentOnitsukaIndex - 1].classList.add('active');
}

// Fishing Carousel functionality
let currentFishingIndex = 1;

function moveFishingCarousel(direction) {
    const slides = document.querySelectorAll('#fishingCarousel .carousel-slide');
    const dots = document.querySelectorAll('.fishing-carousel .dot');
    
    slides[currentFishingIndex - 1].classList.remove('active');
    dots[currentFishingIndex - 1].classList.remove('active');
    
    currentFishingIndex += direction;
    
    if (currentFishingIndex > slides.length) {
        currentFishingIndex = 1;
    }
    if (currentFishingIndex < 1) {
        currentFishingIndex = slides.length;
    }
    
    slides[currentFishingIndex - 1].classList.add('active');
    dots[currentFishingIndex - 1].classList.add('active');
}

function currentFishingSlide(index) {
    const slides = document.querySelectorAll('#fishingCarousel .carousel-slide');
    const dots = document.querySelectorAll('.fishing-carousel .dot');
    
    slides[currentFishingIndex - 1].classList.remove('active');
    dots[currentFishingIndex - 1].classList.remove('active');
    
    currentFishingIndex = index;
    
    slides[currentFishingIndex - 1].classList.add('active');
    dots[currentFishingIndex - 1].classList.add('active');
}

// Fishing Carousel functionality for Modal 8
let currentFishingIndex8 = 1;

function moveFishingCarousel8(direction) {
    const slides = document.querySelectorAll('#fishingCarousel8 .carousel-slide');
    const dots = document.querySelectorAll('#caseStudyModal8 .fishing-carousel .dot');
    
    slides[currentFishingIndex8 - 1].classList.remove('active');
    dots[currentFishingIndex8 - 1].classList.remove('active');
    
    currentFishingIndex8 += direction;
    
    if (currentFishingIndex8 > slides.length) {
        currentFishingIndex8 = 1;
    }
    if (currentFishingIndex8 < 1) {
        currentFishingIndex8 = slides.length;
    }
    
    slides[currentFishingIndex8 - 1].classList.add('active');
    dots[currentFishingIndex8 - 1].classList.add('active');
}

function currentFishingSlide8(index) {
    const slides = document.querySelectorAll('#fishingCarousel8 .carousel-slide');
    const dots = document.querySelectorAll('#caseStudyModal8 .fishing-carousel .dot');
    
    slides[currentFishingIndex8 - 1].classList.remove('active');
    dots[currentFishingIndex8 - 1].classList.remove('active');
    
    currentFishingIndex8 = index;
    
    slides[currentFishingIndex8 - 1].classList.add('active');
    dots[currentFishingIndex8 - 1].classList.add('active');
}

// Tab functionality for Works section
function showWorksTab(tabName) {
    // Hide all works tab contents
    const tabContents = document.querySelectorAll('.works-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.works-tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = document.querySelector(`[onclick="showWorksTab('${tabName}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Tab functionality for Case Studies section
function showCaseStudyTab(tabName) {
    // Hide all case study tab contents
    const tabContents = document.querySelectorAll('.case-study-tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.case-study-tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = document.getElementById(tabName + '-tab');
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = document.querySelector(`[onclick="showCaseStudyTab('${tabName}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Tab functionality for modals (Freshh and InterviewX)
function showTab(tabName) {
    // Get the modal context (which modal is currently open)
    const activeModal = document.querySelector('.modal[style*="display: block"]') || 
                       document.querySelector('.modal[style*="display:block"]');
    
    if (!activeModal) return;
    
    // Hide all tab contents within this modal
    const tabContents = activeModal.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });
    
    // Remove active class from all tab buttons within this modal
    const tabButtons = activeModal.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected tab content
    const selectedTab = activeModal.querySelector(`#${tabName}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Add active class to clicked button
    const clickedButton = activeModal.querySelector(`[onclick="showTab('${tabName}')"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Photography Lightbox
function openPhotoLightbox(src) {
    const lightbox = document.getElementById('photoLightbox');
    const img = document.getElementById('lightboxImage');
    img.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePhotoLightbox() {
    const lightbox = document.getElementById('photoLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closePhotoLightbox();
    }
});

