const buttons = document.querySelectorAll('.toggle-buttons button');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    // You can switch form visibility here based on active tab
  });
});
