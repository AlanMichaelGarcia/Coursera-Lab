function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('visible');
    }
}

// Example: Attach to hamburger icon
document.getElementById('hamburger-icon').addEventListener('click', toggleMenu);

// Smooth scrolling for navigation links
document.querySelectorAll('#nav-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Filter feature for the “Projects” section
function filterProjects(category) {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        if (category === 'all' || project.dataset.category === category) {
            project.style.display = '';
        } else {
            project.style.display = 'none';
        }
    });
}

// Example: Attach filter buttons
document.querySelectorAll('.project-filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const category = this.getAttribute('data-category');
        filterProjects(category);
    });
});

// Lightbox effect for project images
function createLightbox() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.id = 'lightbox-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.8)';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const img = document.createElement('img');
    img.style.maxWidth = '90vw';
    img.style.maxHeight = '90vh';
    img.style.boxShadow = '0 0 20px #000';

    modal.appendChild(img);

    // Close modal on click
    modal.addEventListener('click', () => {
        modal.style.display = 'none';
        img.src = '';
    });

    document.body.appendChild(modal);

    return { modal, img };
}

const { modal: lightboxModal, img: lightboxImg } = createLightbox();

document.querySelectorAll('.project img').forEach(image => {
    image.style.cursor = 'pointer';
    image.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightboxModal.style.display = 'flex';
    });
});

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    // Helper to show or clear error messages
    function setFieldError(field, message) {
        let errorElem = field.parentElement.querySelector('.error-message');
        if (!errorElem) {
            errorElem = document.createElement('div');
            errorElem.className = 'error-message';
            errorElem.style.color = 'red';
            errorElem.style.fontSize = '0.9em';
            errorElem.style.marginTop = '4px';
            field.parentElement.appendChild(errorElem);
        }
        errorElem.textContent = message || '';
    }

    function validateField(field) {
        const name = field.getAttribute('name');
        let value = field.value.trim();
        let message = '';
        if (name === 'name' && !value) {
            message = 'Please enter your name.';
        }
        if (name === 'email') {
            if (!value) {
                message = 'Please enter your email.';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                message = 'Please enter a valid email address.';
            }
        }
        if (name === 'message' && !value) {
            message = 'Please enter your message.';
        }
        setFieldError(field, message);
        return !message;
    }

    // Real-time validation
    ['name', 'email', 'message'].forEach(fieldName => {
        const field = contactForm.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.addEventListener('input', () => validateField(field));
            field.addEventListener('blur', () => validateField(field));
        }
    });

    contactForm.addEventListener('submit', function(e) {
        const name = contactForm.querySelector('[name="name"]');
        const email = contactForm.querySelector('[name="email"]');
        const message = contactForm.querySelector('[name="message"]');
        let valid = true;

        [name, email, message].forEach(field => {
            if (!validateField(field)) valid = false;
        });

        if (!valid) {
            e.preventDefault();
        }
    });
}