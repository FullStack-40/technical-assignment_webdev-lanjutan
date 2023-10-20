document.addEventListener('DOMContentLoaded', function () {
    // Temukan elemen-elemen yang diperlukan
    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const registerButton = document.querySelector('.signin');

    // Menambahkan event listener untuk tombol registrasi
    registerButton.addEventListener('click', function (event) {
        event.preventDefault(); // Untuk mencegah pengiriman formulir

        // Ambil nilai dari elemen input
        const fullName = fullNameInput.value;
        const email = emailInput.value;
        const phone = phoneInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Lakukan validasi data di sini (misalnya, periksa apakah password dan konfirmasi password cocok)
        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok.');
            return; // Berhenti jika ada kesalahan validasi
        }

        // Lakukan sesuatu dengan data yang diambil, seperti mengirimkannya ke server

        // Contoh: Tampilkan data yang diambil di konsol
        console.log('Nama lengkap:', fullName);
        console.log('Email:', email);
        console.log('Nomor Handphone:', phone);
        console.log('Password:', password);

        // Anda dapat menambahkan logika untuk mengirim data ke server di sini
    });
});
