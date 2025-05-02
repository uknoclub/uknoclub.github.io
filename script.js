const signupBtn = document.getElementById('signupBtn');
const loginBtn = document.getElementById('loginBtn');
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

signupBtn.addEventListener('click', () => {
  signupForm.classList.add('active');
  loginForm.classList.remove('active');
  signupBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

loginBtn.addEventListener('click', () => {
  loginForm.classList.add('active');
  signupForm.classList.remove('active');
  loginBtn.classList.add('active');
  signupBtn.classList.remove('active');
});
