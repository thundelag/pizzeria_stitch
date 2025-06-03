const SUPABASE_URL = 'https://lmvubnduwbrzidowxlmn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtdnVibmR1d2Jyemlkb3d4bG1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MTg5OTgsImV4cCI6MjA2MzQ5NDk5OH0.3ZIww_-JupqUE95Jv4GTAbwnB4EgpZ7m9bA7V8FUhuI';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutButton = document.getElementById('logout-button');

    // Handle Registration
    if (registerForm) {
        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;

            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            });

            if (error) {
                alert('Error registering: ' + error.message);
                console.error('Error registering:', error);
            } else {
                alert('Registration successful! Please check your email to confirm.');
                // Redirect to login page or directly to dashboard if auto-confirm is enabled
                window.location.href = 'index.html';
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = event.target.email.value;
            const password = event.target.password.value;

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                alert('Error logging in: ' + error.message);
                console.error('Error logging in:', error);
            } else {
                // Store session or redirect
                window.location.href = 'dashboard.html';
            }
        });
    }

    // Handle Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            const { error } = await supabase.auth.signOut();
            if (error) {
                alert('Error logging out: ' + error.message);
                console.error('Error logging out:', error);
            } else {
                alert('Logged out successfully!');
                window.location.href = 'index.html';
            }
        });
    }

    // Protect dashboard page
    if (window.location.pathname.endsWith('dashboard.html')) {
        const protectDashboard = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                alert('You must be logged in to view this page.');
                window.location.href = 'index.html';
            }
        };
        protectDashboard();
    }
});
