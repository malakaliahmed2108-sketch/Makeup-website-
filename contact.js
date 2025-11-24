// ==========================================
// CONTACT PAGE JAVASCRIPT
// ==========================================

// Get form element
const contactForm = document.getElementById('contactForm');

// Handle form submission
contactForm.addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent page refresh

  // Get form values
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validate fields
  if (name === "" || email === "" || message === "") {
    showNotification("Please fill in all fields! 📝", "error");
    return;
  }

  // Validate email format
  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address! 📧", "error");
    return;
  }

  // Success - store message (in real app, would send to server)
  storeMessage({ name, email, message, date: new Date().toISOString() });

  // Show success message
  showNotification("Your message has been sent successfully! 💖✨", "success");

  // Reset form
  contactForm.reset();
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Store message in localStorage (in real app, would send to backend)
function storeMessage(messageData) {
  let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
  messages.push(messageData);
  localStorage.setItem('contactMessages', JSON.stringify(messages));
  console.log('Message stored:', messageData);
}

// Show notification function
function showNotification(message, type = "success") {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  
  // Set background color based on type
  if (type === "success") {
    notification.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
  }
  
  // Style the notification
  notification.style.position = 'fixed';
  notification.style.top = '20px';
  notification.style.right = '20px';
  notification.style.color = 'white';
  notification.style.padding = '1rem 2rem';
  notification.style.borderRadius = '15px';
  notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
  notification.style.zIndex = '9999';
  notification.style.fontWeight = '600';
  notification.style.animation = 'slideInRight 0.4s ease-out';
  
  // Add to page
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.4s ease-out';
    setTimeout(() => notification.remove(), 400);
  }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Optional: Auto-fill form if user is logged in
window.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  if (currentUser) {
    document.getElementById('name').value = currentUser.name || '';
    document.getElementById('email').value = currentUser.email || '';
    console.log('Auto-filled user info:', currentUser.name);
  }
});
