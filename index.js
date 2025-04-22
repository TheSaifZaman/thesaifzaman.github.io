// Mobile Menu Functionality
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const mobileMenu = document.getElementById('mobileMenu');

// Add click event listener for menu toggle
menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Add click event listener for close button
if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
}

// Close menu when clicking outside
window.addEventListener('click', (event) => {
    if (!menuToggle.contains(event.target) && !mobileMenu.contains(event.target)) {
        mobileMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// Add touch event handlers for better mobile experience
document.addEventListener('touchstart', function(e) {
    const target = e.target;
    
    // Add touch feedback to interactive elements
    if (target.classList.contains('touch-friendly') || target.closest('.nav-links a')) {
        target.style.backgroundColor = '#ffffff';
    }
}, false);

document.addEventListener('touchend', function(e) {
    const target = e.target;
    
    // Reset touch feedback
    if (target.classList.contains('touch-friendly') || target.closest('.nav-links a')) {
        target.style.backgroundColor = '';
    }
}, false);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            // Update active navigation state
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// Add touch-friendly hover effects for mobile devices
const touchFriendlyElements = document.querySelectorAll('.touch-friendly');
touchFriendlyElements.forEach(element => {
    element.addEventListener('touchstart', () => {
        element.style.opacity = '0.9';
    });
    
    element.addEventListener('touchend', () => {
        element.style.opacity = '1';
    });
});

// Add back button functionality for mobile menu
window.history.pushState(null, null, window.location.href);
window.addEventListener('popstate', function() {
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
});

// Add scroll animation for sections
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add smooth scroll for scroll down icon
document.addEventListener('DOMContentLoaded', () => {
    const scrollDownLink = document.querySelector('.scroll-down-link');
    if (scrollDownLink) {
        scrollDownLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(scrollDownLink.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Add parallax effect to scroll down icon
window.addEventListener('scroll', () => {
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        const scrollPosition = window.pageYOffset;
        const opacity = 1 - (scrollPosition / 200);
        scrollDown.style.opacity = opacity > 0 ? opacity : 0;
    }
});

// Create round favicon
function createRoundFavicon() {
    const canvas = document.getElementById('faviconCanvas');
    const ctx = canvas.getContext('2d');
    
    // Draw a white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw a circle mask
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    
    // Load the profile image
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
        // Draw the image inside the circle
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // Create a new ImageData object
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Create a Blob from the canvas
        canvas.toBlob((blob) => {
            // Create a new image
            const img = new Image();
            img.src = URL.createObjectURL(blob);
            
            // Set as favicon
            const link = document.querySelector('link[rel*="icon"]') || document.createElement('link');
            link.type = 'image/x-icon';
            link.rel = 'shortcut icon';
            link.href = img.src;
            document.getElementsByTagName('head')[0].appendChild(link);
        }, 'image/png');
    };
    
    // Load the profile image
    img.src = 'https://github.com/thesaifzaman.png';
}

// Initialize the round favicon
document.addEventListener('DOMContentLoaded', () => {
    createRoundFavicon();
});