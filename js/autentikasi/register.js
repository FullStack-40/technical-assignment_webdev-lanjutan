import { addUser, getUserByEmail } from "../logic-data.js";

const registerButton = document.querySelector(".signin");

registerButton.addEventListener("click", async function (event) {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  event.preventDefault();

  if (username && email && phone && password && confirmPassword) {
    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok.");
      return;
    }

    const user = await getUserByEmail(email);
    if (user.length > 0) {
      alert("Email sudah terdaftar.");
      return;
    }

    const defaultAvatar = "https://imgur.com/8d7uj9p.jpg";
    const data = {
      username,
      email,
      phone,
      password,
      avatar: defaultAvatar,
    };
    await addUser(data);

    alert("Daftar berhasil");
    window.location.href = "../autentikasi/login.html";
  } else {
    alert("Daftar gagal. Periksa form Anda kembali!.");
  }
});
