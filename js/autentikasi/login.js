import { getUserByEmail } from "../logic-data.js";

const signInButton = document.querySelector(".signin");

signInButton.addEventListener("click", async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    const user = await getUserByEmail(email);

    if (user[0].email == email && user[0].password == password) {
      localStorage.setItem("login", true);
      localStorage.setItem("username", user[0].username);
      localStorage.setItem("avatar", user[0].avatar);
      alert("Login berhasil");
      window.location.href = "../index.html";
      return;
    } else {
      alert("Login gagal. Email atau password salah!.");
      return;
    }

    alert("Login berhasil");
  } else {
    alert("Login gagal. Periksa email dan kata sandi Anda.");
  }
});
