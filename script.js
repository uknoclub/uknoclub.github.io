document.addEventListener('DOMContentLoaded', function() {
  // Form toggle functionality
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  // Toggle between forms
  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
  });

  // Show password toggle
  document.querySelectorAll('.show-password').forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        this.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  // Remember me functionality
  const rememberMe = document.getElementById('rememberMe');
  if (localStorage.getItem('rememberedEmail')) {
    document.getElementById('loginEmail').value = localStorage.getItem('rememberedEmail');
    rememberMe.checked = true;
  }

  // Form submissions
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your signup logic here
    alert('Sign up form submitted!');
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorMessage = document.getElementById('loginErrorMessage');

    // Clear previous error
    errorMessage.style.display = 'none';

    // Simple validation
    if (!email || !password) {
      errorMessage.textContent = 'Please fill in all fields';
      errorMessage.style.display = 'block';
      return;
    }

    // Remember email if checked
    if (rememberMe.checked) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Check for admin login
    if (email === 'admin@uknoclub.com' && password === 'admin2024') {
      localStorage.setItem('isAdmin', 'true');
      window.location.href = 'admin-dashboard.html';
    } 
    // Regular user login (replace with actual authentication)
    else {
      localStorage.setItem('isAdmin', 'false');
      window.location.href = 'dashboard.html';
    }
  });
});