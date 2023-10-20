import { getDoctors } from "./logic-data.js";

getDoctors()
  .then((data) => {
    createDoctorCarousel(data);
  })
  .catch((error) => {
    console.log(error);
  });

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

function createDoctorCarousel(data) {
  const carousel = document.querySelector(".carousel-inner");

  for (let i = 0; i < 3; i++) {
    const doctorCard = document.createElement("div");
    doctorCard.className = `carousel-item ${i === 0 ? "active" : ""}`;

    const divContainer = document.createElement("div");
    divContainer.className = "doctors d-flex align-items-center gap-5";

    const image = document.createElement("img");
    image.src = data[i].imageURL;
    image.alt = data[i].name;

    const div = document.createElement("div");

    const h1 = document.createElement("h1");
    h1.textContent = data[i].name;

    const h2 = document.createElement("h2");
    h2.textContent = data[i].specialist;

    const p = document.createElement("p");
    p.textContent = data[i].description;

    div.append(h1, h2, p);
    divContainer.append(image, div);
    doctorCard.appendChild(divContainer);
    carousel.appendChild(doctorCard);
  }
}
