document.addEventListener('DOMContentLoaded', function() {
  const signupBtn = document.getElementById('signupBtn');
  const loginBtn = document.getElementById('loginBtn');
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');

  // Switch to Sign Up form
  signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    signupBtn.classList.add('active');
    loginBtn.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
  });

  // Switch to Login form
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginBtn.classList.add('active');
    signupBtn.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
  });

  // Form submissions (prevent default for demo)
  signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Sign up form submitted!');
  });

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login form submitted!');
  });
});