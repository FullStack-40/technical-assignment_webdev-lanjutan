window.onscroll = () => {
  const nav = document.querySelector("nav");
  const fixednav = nav.offsetTop;

  if (window.scrollY > fixednav) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }
};

let subsButton = document.getElementById("subs-button");

subsButton.addEventListener("click", function (event) {
  event.preventDefault();
  let email = subscribeEmail();
  const emailRegex = /^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  if (emailRegex.test(email)) {
    document.getElementById("subs-form").reset();
    alert("Anda berhasil subscribe kabar berita Life Well!");
  } else {
    alert("Alamat email anda tidak valid!");
  }
});

function subscribeEmail() {
  let email = document.getElementById("subs-email").value;
  return email;
}
