document.addEventListener('DOMContentLoaded', function() {
    
    const hearts = document.querySelectorAll('.interactive-heart');
    const messageElement = document.getElementById('heart-message');
    
    hearts.forEach(heart => {
        heart.addEventListener('mouseenter', function() {
            const message = this.getAttribute('data-message');
            messageElement.textContent = message;
            messageElement.style.opacity = '1';
        });
        
        heart.addEventListener('mouseleave', function() {
            messageElement.style.opacity = '0';
        });
    });
    
    createFloatingHearts();
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.letter-section, .gallery-section, .video-section, .interactive-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

function createFloatingHearts() {
    const heartsContainer = document.querySelector('.hearts-background');
    const hearts = ['❤️', '💖', '💕', '💗', '💓', '💞', '💝'];
    
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            heart.style.opacity = '0.4';
            heart.style.zIndex = '-1';
            heart.style.animation = `floatHeart ${Math.random() * 10 + 10}s linear infinite`;
            heart.style.animationDelay = Math.random() * 5 + 's';
            
            heartsContainer.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 15000);
        }, i * 1000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0.4;
        }
        50% {
            opacity: 0.6;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);