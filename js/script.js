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

const getDoctor = async () => {
  const url = "https://652935bd55b137ddc83e6345.mockapi.io/doctors";
  const options = {
    method: "GET",
  };

  const carousel = document.querySelector(".carousel-inner");

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    for (let i = 0; i < 3; i++) {
      const doctorCard = document.createElement("div");
      doctorCard.className = `carousel-item ${i === 0 ? "active" : ""}`;

      const divContainer = document.createElement("div");
      divContainer.className = "doctors d-flex align-items-center gap-5";

      const image = document.createElement("img");
      image.src = result[i].imageURL;
      image.alt = result[i].name;

      const div = document.createElement("div");

      const h1 = document.createElement("h1");
      h1.textContent = result[i].name;

      const h2 = document.createElement("h2");
      h2.textContent = result[i].specialist;

      const p = document.createElement("p");
      p.textContent = result[i].description;

      div.append(h1, h2, p);
      divContainer.append(image, div);
      doctorCard.appendChild(divContainer);
      carousel.appendChild(doctorCard);
    }
  } catch (error) {
    console.error(error);
  }
};

getDoctor();
