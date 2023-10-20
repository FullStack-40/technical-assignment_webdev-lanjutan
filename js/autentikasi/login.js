import { getUserByEmail } from "../logic-data.js";

const signInButton = document.querySelector(".signin");

signInButton.addEventListener("click", async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (email && password) {
    const user = await getUserByEmail(email);

    if (
      user.length !== 0 &&
      user[0].email == email &&
      user[0].password == password
    ) {
      const dataUser = {
        id: user[0].id,
        name: user[0].name,
        avatar: user[0].avatar,
      };

      localStorage.setItem("user", JSON.stringify(dataUser));
      localStorage.setItem("login", true);

      alert("Login berhasil");
      window.location.href = "../index.html";
      return;
    } else {
      alert("Login gagal. Email atau password salah!.");
      return;
    }
  } else {
    alert("Login gagal. Periksa email dan kata sandi Anda.");
  }
});

