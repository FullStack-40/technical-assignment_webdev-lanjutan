const doctorsContainer = document.getElementById("doctors-container");

getDoctors()
  .then((data) => {
    document.querySelector("#cheapest").addEventListener("click", () => {
      sortByPriceDescending(data);
    });

    document.querySelector("#most-expensive").addEventListener("click", () => {
      sortByPriceAscending(data);
    });

    createDoctorCard(data);
  })
  .catch((error) => console.error(error));

async function getDoctors() {
  try {
    const response = await fetch(
      "https://652935bd55b137ddc83e6345.mockapi.io/doctors"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function createDoctorCard(doctors) {
  doctors.map((doctor) => {
    doctorsContainer.innerHTML += `
    <div class="col">
    <div class="card" style="width: 20rem">
    <img src=${doctor.imageURL} class="card-img-top" alt=${doctor.name} />
    <div class="card-body px-2">
        <h4 class="card-title">${doctor.name}</h4>
        <h6><i>${doctor.specialist}</i></h6>
        <div class="card-text d-flex justify-content-between mx-3 my-4">
        <div
            class="d-flex gap-2 rounded align-items-center justify-content-center"
            style="
            background-color: #d3ffd8;
            width: 130px;
            height: 40px;
            "
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            >
            <g clip-path="url(#clip0_60_155)">
                <path
                d="M2 24C1.45 24 0.979001 23.7524 0.587001 23.2573C0.195002 22.7621 -0.000664969 22.1676 1.69779e-06 21.4737V7.57895C1.69779e-06 6.88421 0.196002 6.28926 0.588002 5.79411C0.980002 5.29895 1.45067 5.05179 2 5.05263H6V2.52632C6 1.83158 6.196 1.23663 6.588 0.741475C6.98 0.246318 7.45067 -0.00083996 8 2.14458e-06H12C12.55 2.14458e-06 13.021 0.247581 13.413 0.742739C13.805 1.2379 14.0007 1.83242 14 2.52632V5.05263H18C18.55 5.05263 19.021 5.30021 19.413 5.79537C19.805 6.29053 20.0007 6.88505 20 7.57895V21.4737C20 22.1684 19.804 22.7634 19.412 23.2585C19.02 23.7537 18.5493 24.0008 18 24H2ZM8 5.05263H12V2.52632H8V5.05263Z"
                fill="#49A078"
                />
            </g>
            <defs>
                <clipPath id="clip0_60_155">
                <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
            </svg>
            <span>${doctor.experience} tahun</span>
        </div>
        <div
            class="d-flex gap-2 rounded align-items-center justify-content-center"
            style="
            background-color: #d3ffd8;
            width: 130px;
            height: 40px;
            "
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <g clip-path="url(#clip0_523_713)">
                <path d="M19.3536 7.04257L13.358 6.1301L10.6778 0.440169C10.6046 0.284382 10.4841 0.158269 10.3354 0.0816118C9.96227 -0.111267 9.50887 0.0494654 9.32232 0.440169L6.64213 6.1301L0.646516 7.04257C0.481218 7.0673 0.330088 7.1489 0.214379 7.27254C0.0744931 7.4231 -0.00259025 7.62566 6.6464e-05 7.8357C0.00272317 8.04575 0.0849026 8.2461 0.228547 8.39272L4.56645 12.8215L3.5416 19.0753C3.51757 19.2207 3.53294 19.3703 3.58598 19.5071C3.63901 19.6439 3.72759 19.7624 3.84166 19.8492C3.95573 19.9359 4.09074 19.9875 4.23137 19.998C4.37199 20.0085 4.51262 19.9775 4.63729 19.9086L10 16.9561L15.3628 19.9086C15.5092 19.9902 15.6792 20.0174 15.8422 19.9877C16.2531 19.9135 16.5293 19.5055 16.4585 19.0753L15.4336 12.8215L19.7715 8.39272C19.8896 8.27156 19.9675 8.1133 19.9912 7.9402C20.0549 7.50746 19.7668 7.10686 19.3536 7.04257Z" fill="#49A078"/>
              </g>
              <defs>
                <clipPath id="clip0_523_713">
                  <rect width="20" height="20" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span>${doctor.rating}</span>
        </div>
        </div>
        <div class="row mt-4">
        <div
            class="col d-flex justify-content-around align-items-end"
        >
            <h5 class="fw-semibold">Rp. ${(doctor.price / 1000).toFixed(3)}</h5>
            <a href="#" class="btn btn-success px-4 py-2">Konsultasi</a>
        </div>
        </div>
    </div>
    </div>
    </div>
    `;
  });
}

const searchDoctor = document.getElementById("search-doctor");

searchDoctor.addEventListener("input", async () => {
  const url = new URL("https://652935bd55b137ddc83e6345.mockapi.io/doctors");
  url.searchParams.append("name", searchDoctor.value);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    if (response.ok) {
      const sort = localStorage.getItem("sort");
      const result = await response.json();
      if (sort === "newest") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      }

      document.querySelector("#cheapest").addEventListener("click", () => {
        sortByPriceDescending(result);
      });

      document
        .querySelector("#most-expensive")
        .addEventListener("click", () => {
          sortByPriceAscending(result);
        });

      doctorsContainer.innerHTML = "";
      console.log(result);
      createDoctorCard(result);
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error(error);
  }
});

function sortByPriceAscending(result) {
  doctorsContainer.innerHTML = "";

  result.sort((a, b) => b.price - a.price);
  createDoctorCard(result);
}

function sortByPriceDescending(result) {
  doctorsContainer.innerHTML = "";

  result.sort((a, b) => a.price - b.price);
  createDoctorCard(result);
}
