import { updateUser } from "../logic-data.js";

const send = document.querySelector(".send");

send.addEventListener("click", async (e) => {
  e.preventDefault();
  const password = document.querySelector("#password").value;
  const confirmPassword = document.querySelector("#confirm-password").value;

  if (!password || !confirmPassword) {
    alert("Masukkan password baru Anda.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Password tidak sama");
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  await updateUser(user.id, { password: password });
  alert("Password berhasil diubah.");
  localStorage.removeItem("user");
  window.location.href = "../autentikasi/login.html";
});
