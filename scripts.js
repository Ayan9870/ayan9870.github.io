document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
        localStorage.setItem('theme', 'dark');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');
    if (savedTheme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fas fa-moon';
        themeText.textContent = 'Dark';
    } else {
        themeIcon.className = 'fas fa-sun';
        themeText.textContent = 'Light';
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

let lastScrollTop = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const form = this;
        const submitButton = form.querySelector('button[type="submit"]');
        const successMessage = form.querySelector('.success-message');
        const errorMessage = form.querySelector('.error-message');
        if (successMessage) successMessage.style.display = 'none';
        if (errorMessage) errorMessage.style.display = 'none';
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e53e3e';
                field.style.boxShadow = '0 0 0 1px #e53e3e';
            } else {
                field.style.borderColor = '#e2e8f0';
                field.style.boxShadow = 'none';
            }
        });
        const emailField = form.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailField && emailField.value && !emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.style.borderColor = '#e53e3e';
            emailField.style.boxShadow = '0 0 0 1px #e53e3e';
        }
        if (!isValid) {
            if (errorMessage) {
                errorMessage.textContent = 'Please fill in all required fields with valid information.';
                errorMessage.style.display = 'block';
            }
            return;
        }
        if (typeof emailjs === 'undefined') {
            console.error('EmailJS not loaded');
            if (errorMessage) {
                errorMessage.textContent = 'Email service not available. Please try again later.';
                errorMessage.style.display = 'block';
            }
            return;
        }
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        const templateParams = {
            first_name: document.getElementById('firstName')?.value || '',
            last_name: document.getElementById('lastName')?.value || '',
            email: document.getElementById('email')?.value || '',
            company: document.getElementById('company')?.value || '',
            subject: document.getElementById('subject')?.value || '',
            budget: document.getElementById('budget')?.value || '',
            timeline: document.getElementById('timeline')?.value || '',
            message: document.getElementById('message')?.value || ''
        };       
        emailjs.send('service_n0qud1p', 'template_xat4h38', templateParams)
            .then(function(response) {
                console.log('EmailJS Success:', response);
                form.reset();
                
                if (successMessage) {
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                requiredFields.forEach(field => {
                    field.style.borderColor = '#e2e8f0';
                    field.style.boxShadow = 'none';
                });
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
            })
            .catch(function(emailError) {
                console.error('EmailJS Error Details:', emailError);
                console.error('Error status:', emailError.status);
                console.error('Error text:', emailError.text);
                let errorMsg = 'Sorry! There was an error sending your message. Please try again or contact me directly.';
                
                if (emailError.status === 412) {
                    errorMsg = 'Email service configuration error. Please contact me directly at ayanhashmi205@yahoo.com';
                    console.error('412 Error - Check EmailJS service ID, template ID, and public key');
                } else if (emailError.status === 400) {
                    errorMsg = 'Invalid email format. Please check your email address and try again.';
                } else if (emailError.status === 403) {
                    errorMsg = 'Email service temporarily unavailable. Please try again later.';
                }
                if (errorMessage) {
                    errorMessage.textContent = errorMsg;
                    errorMessage.style.display = 'block';
                }
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            });
    });
});

const heroTitle = document.querySelector('.typewriter-text');
const titles = [
    'Data Scientist',
    'Machine Learning Engineer',
    'Full-Stack Developer',
    'Business Analyst'
];
let currentTitleIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

function typeWriter() {
    if (!heroTitle) return;
    const currentTitle = titles[currentTitleIndex];
    if (isDeleting) {
        heroTitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
        currentCharIndex--;
    } else {
        heroTitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
        currentCharIndex++;
    }
    let typeSpeed = isDeleting ? 100 : 200;
    if (!isDeleting && currentCharIndex === currentTitle.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && currentCharIndex === 0) {
        isDeleting = false;
        currentTitleIndex = (currentTitleIndex + 1) % titles.length;
        typeSpeed = 500;
    }
    setTimeout(typeWriter, typeSpeed);
}

window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

document.querySelectorAll('.project-item img, .skill-item img, .service-item img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    img.addEventListener('error', function() {
        this.style.opacity = '0.5';
    });
});

document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

function animateProgressBars() {
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
}

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
    observer.observe(skillsSection);
}