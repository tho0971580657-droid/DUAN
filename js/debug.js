// Debug script for auth
console.log('Debug loaded');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, checking auth');
    if (typeof authManager !== 'undefined') {
        console.log('Auth manager ready');
        authManager.updateNavbar();
    }
});

// Override updateNavbar to add more logs
if (typeof AuthManager !== 'undefined') {
    const originalUpdateNavbar = AuthManager.prototype.updateNavbar;
    AuthManager.prototype.updateNavbar = function() {
        console.log('Custom updateNavbar called');
        return originalUpdateNavbar.call(this);
    };
}