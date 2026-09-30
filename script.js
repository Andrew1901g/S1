// ===== Мобильное меню =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('open');
        document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
    });

    // Закрыть меню при клике на ссылку
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    // Закрыть меню при клике вне его
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('open') &&
            !nav.contains(e.target) &&
            !burger.contains(e.target)) {
            burger.classList.remove('active');
            nav.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

// ===== Тень у хедера при скролле =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== FAQ аккордеон =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Закрыть все остальные
        faqItems.forEach(other => other.classList.remove('active'));

        // Открыть текущий, если был закрыт
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Плавная прокрутка для якорных ссылок =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Анимация появления секций =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.querySelectorAll('.service-card, .benefit-card, .review-card, .price-card, .fact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// ===== Форма заявки =====
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    // Маска для телефона (простая)
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('8')) value = '7' + value.slice(1);
        if (!value.startsWith('7')) value = '7' + value;

        let formatted = '+7';
        if (value.length > 1) formatted += ' (' + value.slice(1, 4);
        if (value.length >= 5) formatted += ') ' + value.slice(4, 7);
        if (value.length >= 8) formatted += '-' + value.slice(7, 9);
        if (value.length >= 10) formatted += '-' + value.slice(9, 11);

        e.target.value = formatted;
    });

    // Отправка формы
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            goal: document.getElementById('goal').value,
            comment: document.getElementById('comment').value
        };

        // Валидация
        if (!formData.name.trim() || formData.phone.replace(/\D/g, '').length < 11) {
            alert('Пожалуйста, заполните имя и корректный номер телефона.');
            return;
        }

        // Здесь можно отправить данные на сервер:
        // fetch('/api/lead', { method: 'POST', body: JSON.stringify(formData) })
        console.log('Заявка отправлена:', formData);

        // Показать сообщение об успехе
        const submitBtn = leadForm.querySelector('.form-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Заявка отправлена!';
        submitBtn.style.background = '#16a34a';
        submitBtn.disabled = true;

        setTimeout(() => {
            leadForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    });
}

// ===== Активная ссылка в навигации при скролле =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]:not(.btn)');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--primary)';
        }
    });
});