// Configurazione e dati mock
const CONFIG = {
    API_BASE_URL: 'https://api.spaziocorsi.com',
    CURRENCY: 'EUR',
    SITE_NAME: 'Spazio Corsi'
};

// Dati mock per i corsi (Completo)
const MOCK_COURSES = [
    {
        id: 1,
        title: "Design UI/UX Moderno",
        instructor: "Marco Rossi",
        category: "design",
        level: "Intermedio",
        description: "Impara a creare interfacce utente moderne e user-friendly con i principi del design contemporaneo, utilizzando strumenti all'avanguardia come Figma.",
        price: 89.99,
        rating: 4.8,
        students: 1247,
        duration: "8 ore",
        image: "design-course.jpg",
        date: "15 Gen 2024",
        curriculum: [
            "Introduzione al Design UI/UX",
            "Principi fondamentali di usabilità",
            "Strumenti moderni (Figma, Sketch)",
            "Prototipazione avanzata e testing",
            "Portfolio e presentazione progetti"
        ],
        instructorProfile: {
            name: "Marco Rossi",
            bio: "Senior UI/UX Designer con 8+ anni di esperienza in startup e grandi aziende, con focus su prodotti digitali scalabili.",
            expertise: ["UI Design", "UX Research", "Prototipazione", "Figma"],
            students: 15000,
            level: "Certificato Senior"
        },
        reviews: [
            { user: "Alice B.", rating: 5, comment: "Corso eccellente! Marco spiega in modo chiaro e pratico.", date: "2 settimane fa" },
            { user: "Luca M.", rating: 4, comment: "Molto utile, soprattutto la parte su Figma. Vorrei più esercizi pratici.", date: "1 mese fa" }
        ]
    },
    {
        id: 2,
        title: "Sviluppo Web Full Stack con MERN",
        instructor: "Anna Verdi",
        category: "tecnologia",
        level: "Avanzato",
        description: "Diventa uno sviluppatore full stack imparando le tecnologie MERN (MongoDB, Express, React, Node.js) più richieste del mercato.",
        price: 129.99,
        rating: 4.9,
        students: 2156,
        duration: "12 settimane",
        image: "web-dev-course.jpg",
        date: "20 Gen 2024",
        curriculum: [
            "Introduzione al Full Stack e JavaScript moderno",
            "Sviluppo Frontend con React",
            "Sviluppo Backend con Node.js ed Express",
            "Gestione Database con MongoDB",
            "Deploy e pratiche DevOps"
        ],
        instructorProfile: {
            name: "Anna Verdi",
            bio: "Full Stack Developer e Tech Lead con esperienza decennale in progetti scalabili e alta disponibilità.",
            expertise: ["JavaScript", "React", "Node.js", "MongoDB", "DevOps"],
            students: 22000,
            level: "Esperto Tech Lead"
        },
        reviews: [
            { user: "Giovanni R.", rating: 5, comment: "Anna è fantastica! Spiega concetti complessi in modo semplice e la sua assistenza è ottima.", date: "3 giorni fa" }
        ]
    },
    {
        id: 3,
        title: "Marketing Digitale Avanzato e Growth Hacking",
        instructor: "Laura Bianchi",
        category: "business",
        level: "Intermedio",
        description: "Strategie avanzate di marketing digitale e growth hacking per far crescere il tuo business online a ritmi esponenziali.",
        price: 79.99,
        rating: 4.7,
        students: 1893,
        duration: "6 settimane",
        image: "marketing-course.jpg",
        date: "10 Feb 2024",
        curriculum: [
            "SEO avanzato e Audit",
            "Social Media Strategy e Campagne ADS",
            "Email Marketing Automation",
            "Analytics, CRO e A/B Testing",
            "Strategie di Growth Hacking"
        ],
        instructorProfile: {
            name: "Laura Bianchi",
            bio: "Digital Marketing Expert con focus su growth hacking, analytics e ottimizzazione del funnel di conversione.",
            expertise: ["SEO", "Social Media", "Growth Marketing", "Analytics"],
            students: 18000,
            level: "Certificato Google Ads & Analytics"
        },
        reviews: [
            { user: "Filippo Z.", rating: 5, comment: "Contenuti di altissimo livello. Ho applicato subito i concetti e visto risultati.", date: "1 settimana fa" }
        ]
    },
    {
        id: 4,
        title: "Fotografia Creativa e Post-produzione",
        instructor: "Paolo Neri",
        category: "creativita",
        level: "Principiante",
        description: "Scopri le tecniche creative per trasformare le tue foto in opere d'arte, dalla composizione alla post-produzione con Adobe Lightroom.",
        price: 59.99,
        rating: 4.6,
        students: 956,
        duration: "4 settimane",
        image: "photography-course.jpg",
        date: "5 Mar 2024",
        curriculum: [
            "Fondamenti di Fotografia e Composizione",
            "Tecniche di Illuminazione (naturale e artificiale)",
            "Introduzione a Adobe Lightroom",
            "Post-produzione Avanzata",
            "Sviluppo di un Progetto Personale"
        ],
        instructorProfile: {
            name: "Paolo Neri",
            bio: "Fotografo professionista e Art Director con mostre internazionali e 15+ anni di esperienza nel settore.",
            expertise: ["Fotografia", "Post-produzione", "Composizione", "Lightroom"],
            students: 8500,
            level: "Fotografo Professionista"
        },
        reviews: [
            { user: "Sofia L.", rating: 5, comment: "Paolo è un insegnante eccezionale! Ho migliorato tantissimo in poco tempo.", date: "1 settimana fa" }
        ]
    }
];

// Utility Functions
const utils = {
    formatPrice(price) {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: CONFIG.CURRENCY,
            minimumFractionDigits: 2
        }).format(price);
    },

    formatRating(rating) {
        return `${rating.toFixed(1)}/5.0`;
    },

    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        let stars = '';
        for (let i = 0; i < fullStars; i++) stars += '<i class="fas fa-star"></i>';
        if (halfStar) stars += '<i class="fas fa-star-half-alt"></i>';
        for (let i = 0; i < emptyStars; i++) stars += '<i class="far fa-star"></i>';
        
        return stars;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    getUrlParams() {
        const params = new URLSearchParams(window.location.search);
        return Object.fromEntries(params.entries());
    },

    // Funzione per simulare l'animazione AOS
    initAOS() {
        const elements = document.querySelectorAll('[data-aos]');
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const animation = el.dataset.aos;
                    const delay = el.dataset.aosDelay || 0;
                    
                    el.style.visibility = 'hidden';
                    setTimeout(() => {
                        el.style.visibility = 'visible';
                        el.classList.add('aos-animate');
                    }, delay);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.classList.add('aos-init');
            observer.observe(el);
        });
    }
};

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', utils.debounce(() => {
        if (window.scrollY > 50) { // Ridotto a 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 10));
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.classList.toggle('nav-open'); // Blocca lo scroll del body
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    });
}

// Dark Mode Toggle
function initThemeToggle() {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    
    // 1. Check local storage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.add('dark-mode');
        if(toggleButton) toggleButton.textContent = '☀️';
    } else {
        if(toggleButton) toggleButton.textContent = '🌙';
    }

    if (!toggleButton) return;

    // 2. Add event listener
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const isDark = body.classList.contains('dark-mode');
        
        if (isDark) {
            localStorage.setItem('theme', 'dark');
            toggleButton.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            toggleButton.textContent = '🌙';
        }
    });
}

// Courses Page Functionality
function initCoursesPage() {
    const coursesContainer = document.getElementById('coursesContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');

    if (!coursesContainer) return;

    // Show loading skeleton
    function showSkeleton() {
        coursesContainer.innerHTML = `
            <div class="course-skeleton">
                <div class="skeleton-image"></div>
                <div class="skeleton-content">
                    <div class="skeleton-title"></div>
                    <div class="skeleton-text"></div>
                    <div class="skeleton-price"></div>
                </div>
            </div>
        `.repeat(4);
    }

    // Render courses
    function renderCourses(courses = MOCK_COURSES, filter = 'tutti') {
        const filteredCourses = filter === 'tutti' 
            ? courses 
            : courses.filter(course => course.category === filter);

        if (filteredCourses.length === 0) {
            coursesContainer.innerHTML = `
                <div class="no-courses">
                    <h3>Nessun corso trovato</h3>
                    <p>Prova a cambiare filtro o torna più tardi.</p>
                    <a href="proponi.html" class="btn btn-secondary mt-3">Proponi un Corso?</a>
                </div>
            `;
            return;
        }

        coursesContainer.innerHTML = filteredCourses.map(course => `
            <div class="course-card" data-aos="fade-up" data-aos-delay="100" data-course-id="${course.id}" data-category="${course.category}">
                <div class="course-image" style="background: linear-gradient(135deg, ${course.category === 'design' ? '#a78bfa' : '#4f46e5'} 0%, ${course.category === 'design' ? '#6366f1' : '#3730a3'} 100%);">
                    <div class="course-badge">${course.category}</div>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-instructor">Di ${course.instructor}</p>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <div class="course-rating">
                            <div class="stars">${utils.generateStars(course.rating)}</div>
                            <span class="rating-text">${utils.formatRating(course.rating)}</span>
                        </div>
                        <div class="course-price">${utils.formatPrice(course.price)}</div>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-inizializza AOS dopo il rendering
        utils.initAOS();

        // Add click events to course cards
        document.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', () => {
                const courseId = card.dataset.courseId;
                window.location.href = `corso.html?id=${courseId}`;
            });
        });
    }

    // Initialize filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show loading state
            showSkeleton();

            // Simulate API call delay (WOW effect for filtering)
            setTimeout(() => {
                renderCourses(MOCK_COURSES, btn.dataset.filter);
            }, 500); // 500ms di delay
        });
    });

    // Initial render
    showSkeleton();
    setTimeout(() => renderCourses(MOCK_COURSES), 800);
}

// Course Detail Page
function initCourseDetail() {
    const params = utils.getUrlParams();
    const courseId = parseInt(params.id);

    // Gestione reindirizzamento se manca ID o non trovato
    if (!courseId) {
        // Mostra un messaggio di errore soft invece di reindirizzare immediatamente
        document.querySelector('main').innerHTML = `<section class="course-detail"><div class="container text-center"><h1 class="page-title" style="color:red;">Errore: Corso non specificato</h1><p class="page-subtitle">Torna alla pagina corsi per selezionare un corso valido.</p><a href="corsi.html" class="btn btn-primary">Vai ai Corsi</a></div></section>`;
        return;
    }

    const course = MOCK_COURSES.find(c => c.id === courseId);
    if (!course) {
        document.querySelector('main').innerHTML = `<section class="course-detail"><div class="container text-center"><h1 class="page-title" style="color:red;">Errore: Corso non trovato</h1><p class="page-subtitle">Il corso richiesto non esiste.</p><a href="corsi.html" class="btn btn-primary">Vai ai Corsi</a></div></section>`;
        return;
    }

    // Aggiungi un'immagine fittizia per il placeholder
    const imagePlaceholder = document.getElementById('courseImagePlaceholder');
    imagePlaceholder.innerHTML = `<i class="fas fa-desktop"></i><p style="font-size: 1rem;">Immagine di ${course.category}</p>`;

    // Populate course data
    document.getElementById('courseTitle').textContent = course.title;
    document.getElementById('courseInstructor').textContent = `Di ${course.instructor}`;
    document.getElementById('courseDescription').textContent = course.description;
    document.getElementById('courseDuration').textContent = course.duration;
    document.getElementById('courseStudents').textContent = `(${course.students.toLocaleString()} studenti)`;
    document.getElementById('courseDate').textContent = `Inizio: ${course.date}`;
    document.getElementById('coursePrice').textContent = utils.formatPrice(course.price);
    document.getElementById('courseCategory').textContent = course.category.toUpperCase();
    document.getElementById('courseLevel').textContent = course.level;
    
    // Rating stars
    document.getElementById('courseStars').innerHTML = utils.generateStars(course.rating);
    document.getElementById('courseRating').textContent = utils.formatRating(course.rating);

    // Curriculum
    const curriculumHtml = course.curriculum.map((item, index) => `
        <div class="curriculum-item">
            <div class="lesson-number">${index + 1}</div>
            <div class="lesson-title">${item}</div>
        </div>
    `).join('');
    document.getElementById('courseCurriculum').innerHTML = curriculumHtml;

    // Instructor profile
    const instructor = course.instructorProfile;
    document.getElementById('instructorProfile').innerHTML = `
        <div class="instructor-card">
            <h3>${instructor.name}</h3>
            <p>${instructor.bio}</p>
            <div class="instructor-stats">
                <div class="stat">
                    <strong>${instructor.students.toLocaleString()}</strong>
                    <span>Studenti Totali</span>
                </div>
                <div class="stat">
                    <strong>${instructor.level}</strong>
                    <span>Livello di Esperienza</span>
                </div>
            </div>
            <div class="expertise">
                <strong>Competenze:</strong>
                ${instructor.expertise.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `;

    // Reviews
    const reviewsHtml = course.reviews.length > 0 
        ? course.reviews.map(review => `
            <div class="review-card">
                <div class="review-header">
                    <strong>${review.user}</strong>
                    <div class="review-rating">${utils.generateStars(review.rating)}</div>
                </div>
                <p class="review-comment">${review.comment}</p>
                <span class="review-date">${review.date}</span>
            </div>
        `).join('')
        : '<p style="font-style: italic;">Ancora nessuna recensione per questo corso. Sii il primo ad iscriverti!</p>';
    
    document.getElementById('courseReviews').innerHTML = reviewsHtml;

    // Tab functionality
    initTabs();

    // Enroll button
    document.querySelector('.btn-enroll').addEventListener('click', () => {
        alert(`🎉 Complimenti! Hai avviato l'iscrizione al corso "${course.title}". Verrai reindirizzato al checkout.`);
    });
}

// Tab System
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show active tab content with small animation
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                    // Scroll to content for small screens
                    if (window.innerWidth < 768) {
                         content.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    });
}

// Course Proposal Form
function initProposalForm() {
    const form = document.getElementById('courseProposalForm');
    const steps = document.querySelectorAll('.form-step');
    const progressFill = document.getElementById('progressFill');
    const progressSteps = document.querySelectorAll('.progress-step');

    if (!form) return;

    let currentStep = 0; // 0-indexed

    // Character counters
    const titleInput = document.getElementById('courseTitle');
    const descInput = document.getElementById('courseDescription');

    [titleInput, descInput].forEach(input => {
        if (input) {
            input.addEventListener('input', (e) => {
                const counter = e.target.parentElement.querySelector('.char-counter');
                const maxLength = e.target.getAttribute('maxlength');
                counter.textContent = `${e.target.value.length}/${maxLength}`;
            });
            // Init count on load
            const counter = input.parentElement.querySelector('.char-counter');
            const maxLength = input.getAttribute('maxlength');
            if (counter) counter.textContent = `${input.value.length}/${maxLength}`;
        }
    });

    // Function to update progress UI
    function updateProgress(step) {
        // Update steps active state
        progressSteps.forEach((pStep, index) => {
            pStep.classList.toggle('active', index === step);
        });

        // Update progress bar
        const progress = ((step + 1) / steps.length) * 100;
        progressFill.style.width = `${progress}%`;
    }

    // Navigation between steps
    form.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-next')) {
            if (validateStep(currentStep)) {
                goToStep(currentStep + 1);
            }
        } else if (e.target.classList.contains('btn-prev')) {
            goToStep(currentStep - 1);
        }
    });

    function goToStep(step) {
        if (step < 0 || step >= steps.length) return; // Boundary check

        steps[currentStep].classList.remove('active');
        currentStep = step;
        steps[currentStep].classList.add('active');
        updateProgress(currentStep);

        // Scroll to form top (better UX on mobile)
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function validateStep(step) {
        const currentStepEl = steps[step];
        // Seleziona solo gli input/select/textarea diretti nel form-group del passo corrente
        const inputs = currentStepEl.querySelectorAll('.form-group > input[required], .form-group > select[required], .form-group > textarea[required]');
        
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444'; // Red for error
            } else {
                input.style.borderColor = ''; // Reset
            }
        });

        if (!isValid) {
            alert('Per favore, compila tutti i campi obbligatori del modulo.');
            // Focus sul primo campo non compilato
            currentStepEl.querySelector('input:invalid, select:invalid, textarea:invalid')?.focus();
        }

        return isValid;
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validateStep(currentStep)) {
            // Simulate form submission
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            console.log('Course proposal submitted:', data);

            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message show';
            successMessage.innerHTML = `
                <h3>✅ Proposta Inviata con Successo!</h3>
                <p>Grazie ${data.instructorName}. La tua proposta per il corso "${data.courseTitle}" è stata ricevuta. Ti contatteremo a breve all'indirizzo ${data.instructorEmail} dopo la revisione.</p>
            `;

            const formSection = document.querySelector('.propose-form-section .container');
            formSection.insertBefore(successMessage, form);
            form.style.display = 'none';
            document.querySelector('.form-progress').style.display = 'none';

            // Reset form (optional)
            // setTimeout(() => {
            //     form.reset();
            //     form.style.display = 'block';
            //     successMessage.remove();
            //     document.querySelector('.form-progress').style.display = 'block';
            //     goToStep(0);
            // }, 5000);
        }
    });

    // Initialize progress on load
    updateProgress(currentStep);
}

// Page-specific initialization
function initPage() {
    const path = window.location.pathname;
    const page = path.split('/').pop();

    // Common functionality
    initHeaderScroll();
    initMobileMenu();
    initThemeToggle();

    // Page-specific functionality
    switch(page) {
        case 'index.html':
        case '':
            utils.initAOS();
            break;
        case 'corsi.html':
            initCoursesPage();
            break;
        case 'corso.html':
            initCourseDetail();
            utils.initAOS();
            break;
        case 'proponi.html':
            initProposalForm();
            utils.initAOS();
            break;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initPage);

// Aggiungi gli stili CSS per AOS nel <head> - Questo era nel JS precedente, lo manteniamo qui per chiarezza, anche se in un progetto reale andrebbe in style.css
const aosStyles = `
.aos-init {
    visibility: hidden;
    transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
}

/* Animations */
.aos-animate[data-aos="fade-up"] {
    opacity: 1;
    transform: translateY(0);
}
.aos-init[data-aos="fade-up"] {
    opacity: 0;
    transform: translateY(20px);
}

.aos-animate[data-aos="fade-down"] {
    opacity: 1;
    transform: translateY(0);
}
.aos-init[data-aos="fade-down"] {
    opacity: 0;
    transform: translateY(-20px);
}

.aos-animate[data-aos="fade-left"] {
    opacity: 1;
    transform: translateX(0);
}
.aos-init[data-aos="fade-left"] {
    opacity: 0;
    transform: translateX(20px);
}

.aos-animate[data-aos="zoom-in"] {
    opacity: 1;
    transform: scale(1);
}
.aos-init[data-aos="zoom-in"] {
    opacity: 0;
    transform: scale(0.9);
}
`;

// Inject AOS styles
const styleSheetAOS = document.createElement('style');
styleSheetAOS.textContent = aosStyles;
document.head.appendChild(styleSheetAOS);
