import { getUserByEmail } from "../logic-data.js";

const resetBtn = document.querySelector(".button-reset");
resetBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;

  if (email) {
    const user = await getUserByEmail(email);

    if (user.length === 0) {
    } else if (user[0].email) {
      localStorage.setItem("user", JSON.stringify(user[0]));
    }

    alert("Silahkan cek email Anda untuk mendapatkan kode verifikasi.");
    window.location.href = "./verification.html";
    return;
  }

  alert("Masukkan email Anda.");
});
