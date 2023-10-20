// script.js
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const signInButton = document.querySelector('.signin');

    signInButton.addEventListener('click', function () {
        const email = emailInput.value;
        const password = passwordInput.value;


        if (email && password) {
            alert('Login berhasil');

        } else {
            alert('Login gagal. Periksa email dan kata sandi Anda.');
        }
    });
});
