/* ==========================================================================
   Dhairya Rajyaguru - Portfolio Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide SVG Icons
    lucide.createIcons();

    // ==========================================================================
    // Theme Management (Dark/Light Mode)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    
    // Check local storage for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;
    updateThemeToggleUI(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeToggleUI('light-theme');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeToggleUI('dark-theme');
        }
    });

    function updateThemeToggleUI(theme) {
        // Redundant check in case we want to customize specific toggles or styles
    }

    // ==========================================================================
    // Mobile Navigation Menu Toggle
    // ==========================================================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const menuIcon = mobileToggle.querySelector('.menu-icon');
    const closeIcon = mobileToggle.querySelector('.close-icon');

    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        if (isOpen) {
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
        } else {
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    });

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        });
    });

    // ==========================================================================
    // Active Navigation Link on Scroll & Scroll Reveal
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

    // Intersection Observer for scroll animation triggers
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains a skill grid, trigger skill bar animations
                const progressBars = entry.target.querySelectorAll('.skill-bar-progress');
                if (progressBars.length > 0) {
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.transform = `scaleX(1)`;
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        root: null,
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(el => revealObserver.observe(el));

    // Scroll handler for active links & Back to Top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Toggle back to top visibility
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==========================================================================
    // Dynamic Hero Typing Effect
    // ==========================================================================
    const typingSpan = document.getElementById('typingText');
    const roles = ["Software Developer", "Python Developer", "Data Analyst", "Open to Opportunities"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            charIndex--;
            typingSpeed = 50;
        } else {
            charIndex++;
            typingSpeed = 150;
        }

        typingSpan.textContent = currentRole.substring(0, charIndex);

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at full word
            typingSpeed = 1500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            // Brief pause before typing next word
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing animation
    setTimeout(typeEffect, 800);

    // ==========================================================================
    // Skills Category Switching (Tabs)
    // ==========================================================================
    const skillsTabButtons = document.querySelectorAll('.skills-tab-btn');
    const programmingSkills = document.getElementById('programming-skills');
    const designSkills = document.getElementById('design-skills');

    skillsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            skillsTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const tab = btn.getAttribute('data-tab');
            if (tab === 'programming') {
                programmingSkills.classList.add('active');
                designSkills.classList.remove('active');
            } else {
                designSkills.classList.add('active');
                programmingSkills.classList.remove('active');
            }
        });
    });

    // ==========================================================================
    // Interactive Project Modals
    // ==========================================================================
    const projectModal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.getElementById('modalBody');
    const openModalButtons = document.querySelectorAll('.open-project-modal');

    // Detailed project data
    const projectDetails = {
        audiobook: {
            title: "Audiobook Web Application",
            category: "Full Stack Development & Accessibility",
            techStack: ["PHP", "MySQL", "Python", "Tesseract OCR", "Text-to-Speech", "HTML/CSS"],
            visualClass: "text-gradient-bg-1",
            visualIcon: "headphones",
            summary: "An inclusive and smart digital audiobook dashboard engineered to assist individuals with visual impairments or reading difficulties. The platform dynamically parses and renders texts, images, and files into clear audio formats.",
            features: [
                "<strong>Text-to-Speech (TTS):</strong> Instant conversion of user-uploaded TXT files into synthetic audio output.",
                "<strong>Image-to-Speech (OCR):</strong> Leverages optical character recognition (OCR) algorithms to capture textual content from image uploads and render it aloud.",
                "<strong>PDF-to-Speech:</strong> Extends traditional document capabilities by scanning multi-page PDF files for direct reading functionality.",
                "<strong>Trilingual Text Summarization:</strong> Employs NLP interfaces to compress extensive texts into structured key summaries. Supports English, Hindi, and Gujarati to maximize local outreach.",
                "<strong>Personalized User Dashboards:</strong> Enabled secure login sessions, user library collections, progress bookmarks, and audio preference configuration controls."
            ],
            challenges: "Integrating low-latency multilingual OCR and TTS modules on a shared hosting environment while maintaining a responsive database dashboard. Solved by asynchronous API loading and optimized query indices."
        },
        attendance: {
            title: "Face Recognizing Attendance System",
            category: "Computer Vision & Automation",
            techStack: ["Python", "OpenCV", "Flask", "face_recognition", "SQLite"],
            visualClass: "text-gradient-bg-2",
            visualIcon: "scan-face",
            summary: "An automated attendance management system using Python, OpenCV, Flask, and face recognition technology. The system enables real-time attendance tracking and improves accuracy over manual register methods.",
            features: [
                "<strong>Real-Time Face Recognition:</strong> Built on OpenCV and face recognition libraries to detect and identify faces from live camera feeds.",
                "<strong>Flask Web Interface:</strong> Delivered a Flask-based application for administrators to manage attendance records and monitor sessions.",
                "<strong>Automated Attendance Logging:</strong> Automatically records date and time stamps when a registered face is recognized, eliminating manual entry errors.",
                "<strong>Improved Accuracy:</strong> Replaced paper-based attendance with a contactless, automated system for schools and offices.",
                "<strong>Database Integration:</strong> Stores attendance records in a structured database for easy retrieval and reporting."
            ],
            challenges: "Ensuring reliable recognition across varying lighting and camera angles. Addressed through preprocessing techniques and tuned matching thresholds for consistent identification."
        }
    };

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const projectId = btn.getAttribute('data-project-id');
            const data = projectDetails[projectId];
            if (data) {
                populateModal(data);
                projectModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            }
        });
    });

    function populateModal(data) {
        let techTags = data.techStack.map(tech => `<span class="modal-tech-tag">${tech}</span>`).join('');
        let featureItems = data.features.map(feat => `<li>${feat}</li>`).join('');

        modalBody.innerHTML = `
            <div class="modal-visual ${data.visualClass}">
                <i data-lucide="${data.visualIcon}" style="width: 80px; height: 80px; color: rgba(255, 255, 255, 0.4)"></i>
            </div>
            <h2>${data.title}</h2>
            <div class="modal-tagline">${data.category}</div>
            
            <div class="modal-tech-stack">
                ${techTags}
            </div>
            
            <h3 class="modal-section-title">Overview</h3>
            <p>${data.summary}</p>
            
            <h3 class="modal-section-title">Key Features</h3>
            <ul class="modal-list">
                ${featureItems}
            </ul>
            
            <h3 class="modal-section-title">Technical Challenges & Solutions</h3>
            <p>${data.challenges}</p>
        `;
        
        // Re-run Lucide in modal
        lucide.createIcons();
    }

    modalClose.addEventListener('click', closeModal);
    
    // Close modal by clicking outside the card
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !projectModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    function closeModal() {
        projectModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scroll
    }
});
