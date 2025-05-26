document.addEventListener("DOMContentLoaded", function() {
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections and projects
  document.querySelectorAll('.section, .project, .expertise-card').forEach(section => {
    observer.observe(section);
  });

  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', formValues);
      
      // Show success message
      alert('Thank you for your message! I will get back to you soon.');
      this.reset();
    });
  }
});

// Remove welcome screen after animation completes
window.addEventListener("load", () => {
  setTimeout(() => {
    const welcomeScreen = document.querySelector(".welcome-screen");
    if (welcomeScreen) {
      welcomeScreen.style.display = "none";
    }
  }, 3500);
});