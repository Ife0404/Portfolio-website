// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Simple contact form solution
// Opens user's email client with pre-filled message

// Contact Form Handling with EmailJS
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const btnLoader = document.getElementById("btnLoader");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("from_name");
  const email = formData.get("from_email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Simple validation
  if (!name || !email || !subject || !message) {
    showFormStatus("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showFormStatus("Please enter a valid email address.", "error");
    return;
  }

  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = "none";
  btnLoader.style.display = "inline";

  // Create email with pre-filled content
  const emailBody = `Name: ${name}%0D%0AEmail: ${email}%0D%0ASubject: ${subject}%0D%0A%0D%0AMessage:%0D%0A${message}`;
  const mailtoLink = `mailto:ifepraise2004@gmail.com?subject=${encodeURIComponent(subject)}&body=${emailBody}`;
  
  // Open email client
  window.open(mailtoLink, '_blank');
  
  // Show success message
  showFormStatus('Your email client has opened with the message pre-filled. Please send the email from there. Thank you!', 'success');
  contactForm.reset();
  
  // Reset button state
  submitBtn.disabled = false;
  btnText.style.display = 'inline';
  btnLoader.style.display = 'none';
  
  // Hide status after 8 seconds
  setTimeout(() => {
      formStatus.style.display = 'none';
  }, 8000);
});

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  formStatus.style.display = "block";
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".skill-card, .project-card, .timeline-item, .education-item"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Profile Picture Fallback Handler
function handleProfilePicture() {
  const profilePicture = document.getElementById('profilePicture');
  const profileFallback = document.getElementById('profileFallback');
  
  if (profilePicture && profileFallback) {
    // Show fallback by default until image loads
    profileFallback.classList.add('show');
    profilePicture.style.display = 'none';
    
    profilePicture.addEventListener('error', function() {
      // Hide the image and show fallback
      profilePicture.style.display = 'none';
      profileFallback.classList.add('show');
    });
    
    profilePicture.addEventListener('load', function() {
      // Image loaded successfully, hide fallback
      profileFallback.classList.remove('show');
      profilePicture.style.display = 'block';
    });
  }
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    typeWriter(heroTitle, originalText, 50);
  }
  
  // Initialize profile picture handling
  handleProfilePicture();
});

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const rate = scrolled * -0.5;

  if (hero) {
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Add click effect to buttons
document
  .querySelectorAll(".btn, .submit-btn, .project-link")
  .forEach((button) => {
    button.addEventListener("click", function (e) {
      // Create ripple effect
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      ripple.classList.add("ripple");

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    .btn, .submit-btn, .project-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Console welcome message
console.log(`
🚀 Welcome to Afolabi Praise Ifekristi's Portfolio!
📧 Contact: ifepraise2004@gmail.com
🔗 GitHub: https://github.com/Ife0404
💼 Looking for opportunities in Full Stack Development
`);
