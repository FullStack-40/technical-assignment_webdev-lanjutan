window.onscroll = () => {
  const nav = document.querySelector("nav");
  const fixednav = nav.offsetTop;

  if (window.scrollY > fixednav) {
    nav.classList.add("nav-scroll");
  } else {
    nav.classList.remove("nav-scroll");
  }
};
