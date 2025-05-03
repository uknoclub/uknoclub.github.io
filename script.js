document.addEventListener('DOMContentLoaded', function() {
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  function switchToSignup() {
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  }

  function switchToLogin() {
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  }

  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    switchToSignup();
  });

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    switchToLogin();
  });

  // Initialize form
  switchToSignup();

  // Form submissions
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your signup logic here
    alert('Sign up form submitted!');
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Add your login logic here
    alert('Login form submitted!');
  });
});