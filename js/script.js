window.onscroll = () => {
  const nav = document.querySelector("nav");
  const fixednav = nav.offsetTop;

  if (window.scrollY > fixednav) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }
};

const navBtn = document.getElementById("nav-btn");
const isLogin = localStorage.getItem("login");

if (isLogin) {
  const user = JSON.parse(localStorage.getItem("user"));
  
  navBtn.innerHTML = `
  <div class="btn-group">
    <button type="button" class="btn btn-success dropdown-toggle d-flex align-items-center gap-2" data-bs-toggle="dropdown" aria-expanded="false" 
      style="background-color:#49a078;border:none;"
    >
      <img src=${user.avatar} width="35" class="rounded-circle" />
      <h5 class="mb-0">${user.name}</h5>
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="#">Data Diri</a></li>
      <li><a class="dropdown-item" href="../konsultasi/daftar-konsultasi.html">Konsultasi</a></li>
      <li><a class="dropdown-item" href="#">Notifikasi</a></li>
      <li><a class="dropdown-item" onclick="logout()">Keluar</a></li>
    </ul>
  </div>
  `;
} else {
  navBtn.innerHTML = `
    <a href="../autentikasi/login.html" type="button" class="btn text-light py-2 px-4">Masuk</a>
  `;
}

function logout() {
  console.log("ok");
  localStorage.removeItem("login");
  localStorage.removeItem("user");
  localStorage.removeItem("bookingInfo");
  window.location.href = "../index.html";
}
