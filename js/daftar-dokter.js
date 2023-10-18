createDoctorCard();

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

async function createDoctorCard() {
  try {
    const doctors = await getDoctors();
    doctors.map((doctor) => {
      const doctorsContainer = document.getElementById("doctors-container");
      doctorsContainer.innerHTML += `
    <div class="col">
    <div class="card h-100 border-light" style="width: 20rem">
    <img src=${doctor.imageURL} class="card-img-top" alt=${doctor.name} />
    <div class="card-body px-0">
        <h4 class="card-title">${doctor.name}</h4>
        <h6><i>${doctor.specialist}</i></h6>
        <div class="card-text d-flex justify-content-around mx-3 my-4">
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
            height="24"
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
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            >
            <path
                d="M23 10C23 9.46957 22.7893 8.96086 22.4142 8.58579C22.0391 8.21071 21.5304 8 21 8H14.68L15.64 3.43C15.66 3.33 15.67 3.22 15.67 3.11C15.67 2.7 15.5 2.32 15.23 2.05L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9V19C7 19.5304 7.21071 20.0391 7.58579 20.4142C7.96086 20.7893 8.46957 21 9 21H18C18.83 21 19.54 20.5 19.84 19.78L22.86 12.73C22.95 12.5 23 12.26 23 12V10ZM1 21H5V9H1V21Z"
                fill="#49A078"
            />
            </svg>
            <span>${doctor.like}%</span>
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
  } catch (error) {
    console.error(error);
  }
}
