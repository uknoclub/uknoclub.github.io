document.addEventListener('DOMContentLoaded', function() {
    // Form toggle functionality
    const signupBtn = document.getElementById('signupBtn');
    const loginBtn = document.getElementById('loginBtn');
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    const loginEmailInput = document.getElementById('loginEmail'); // Get email input
    const loginPasswordInput = document.getElementById('loginPassword'); // Get password input
    const loginErrorMessage = document.getElementById('loginErrorMessage'); // Get the error message div


    function switchToSignup() {
        if (signupBtn) signupBtn.classList.add('active');
        if (loginBtn) loginBtn.classList.remove('active');
        if (signupForm) signupForm.classList.remove('hidden');
        if (loginForm) loginForm.classList.add('hidden');
        if (loginErrorMessage) loginErrorMessage.style.display = 'none'; // Hide error message on switch
         window.location.hash = ''; // Clear hash
    }

    function switchToLogin() {
        if (loginBtn) loginBtn.classList.add('active');
        if (signupBtn) signupBtn.classList.remove('active');
        if (loginForm) loginForm.classList.remove('hidden');
        if (signupForm) signupForm.classList.add('hidden');
        if (loginErrorMessage) loginErrorMessage.style.display = 'none'; // Hide error message on switch
        window.location.hash = '#login'; // Add hash for direct linking
    }

    // Add event listeners only if buttons exist
    if (signupBtn && loginBtn && signupForm && loginForm) {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToSignup();
        });

        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchToLogin();
        });

        // Initialize form state based on URL hash or default to signup
        if (window.location.hash === '#login') {
             switchToLogin();
        } else {
             switchToSignup();
        }


        // Handle Login Form Submission (for both User and Admin)
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const identifier = loginEmailInput.value; // Using email field as identifier (can be username for admin)
            const password = loginPasswordInput.value;

            // Clear previous error
            if (loginErrorMessage) loginErrorMessage.style.display = 'none';

            // Simple validation (can be enhanced)
             if (!identifier || !password) {
                 if (loginErrorMessage) {
                     loginErrorMessage.textContent = 'Please fill in all fields';
                     loginErrorMessage.style.display = 'block';
                 }
                 return;
             }


            // --- Admin Authentication Logic ---
            // Using credentials from your last provided script: admin@uknoclub.com / admin2024
            if (identifier === "admin@uknoclub.com" && password === "admin2024") {
                console.log("Admin login successful");
                localStorage.setItem('adminAuthenticated', 'true'); // Use consistent key
                window.location.href = "admin-dashboard.html"; // Redirect to admin dashboard
                return; // Stop further processing
            }

            // --- Placeholder User Authentication Logic ---
            console.log('Attempting User Login:', { identifier, password });
            // In a real app, you'd send these credentials to your backend for user verification.
            // This is a placeholder. Replace with your actual user authentication fetch call.

            // Simulate a successful user login for demonstration
             if (identifier === "user@example.com" && password === "password123") { // << Example user credentials
                 console.log("User login successful (simulated)");
                 localStorage.setItem('userAuthenticated', 'true'); // Use a separate key for user auth
                 localStorage.setItem('loggedInUsername', 'Regular User'); // Store placeholder username << ADDED
                 window.location.href = "dashboard.html"; // Redirect to user dashboard
                 if (loginErrorMessage) loginErrorMessage.style.display = 'none';
                 return; // Stop further processing
             }


             // If not admin and not the example user, then failed login
             console.log("Login failed");
             if (loginErrorMessage) {
                 loginErrorMessage.textContent = 'Invalid credentials. Please try again.'; // Generic error
                 loginErrorMessage.style.display = 'block'; // Show error
             }
             // --- End Placeholder ---
        });

        // Show password toggle (remains unchanged)
        document.querySelectorAll('.show-password').forEach(icon => {
            icon.addEventListener('click', function() {
                const input = this.previousElementSibling;
                if (input && input.type === 'password') {
                    input.type = 'text';
                    this.classList.replace('fa-eye', 'fa-eye-slash');
                } else if (input) {
                    input.type = 'password';
                    this.classList.replace('fa-eye-slash', 'fa-eye');
                }
            });
        });

        // Remember me functionality (remains unchanged)
        const rememberMeCheckbox = document.getElementById('rememberMe');
        const rememberedEmail = localStorage.getItem('rememberedEmail');

        if (rememberMeCheckbox && loginEmailInput) {
            if (rememberedEmail) {
              loginEmailInput.value = rememberedEmail;
              rememberMeCheckbox.checked = true;
            }
        }

         // Save/Remove email from localStorage when the checkbox state changes
         if (rememberMeCheckbox && loginEmailInput) {
            rememberMeCheckbox.addEventListener('change', function() {
                if (this.checked) {
                    // Save email when checkbox is checked
                     localStorage.setItem('rememberedEmail', loginEmailInput.value);
                } else {
                    // Remove email when checkbox is unchecked
                    localStorage.removeItem('rememberedEmail');
                }
            });

            // Also save the email right before form submission if checked
            loginForm.addEventListener('submit', function() {
                 if (rememberMeCheckbox.checked) {
                     localStorage.setItem('rememberedEmail', loginEmailInput.value);
                 } else {
                     localStorage.removeItem('rememberedEmail');
                 }
            });
         }

    } else {
        console.error("Authentication elements not found on the page.");
    }
});