const listKonsultasi = document.getElementById("list-konsultasi");
const consultationSchedule = JSON.parse(
  localStorage.getItem("consultationSchedule")
);

consultationSchedule.map((schedule) => {
  listKonsultasi.innerHTML += `
<div class="row mt-5">
<div class="card">
  <div
    class="card-body d-flex justify-content-around align-items-center flex-wrap"
  >
    <div class="d-flex gap-2 align-items-center">
      <img src=${schedule.doctor.imageURL} width="90" height="80" alt="" />
      <div>
        <h3>${schedule.doctor.name}</h3>
        <h5>${schedule.doctor.specialist}</h5>
      </div>
    </div>
    <div class="d-flex gap-3 align-items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
      >
        <path
          d="M22.08 2.07H17.25V0.23C17.25 0.1035 17.1465 0 17.02 0H15.41C15.2835 0 15.18 0.1035 15.18 0.23V2.07H7.82V0.23C7.82 0.1035 7.7165 0 7.59 0H5.98C5.8535 0 5.75 0.1035 5.75 0.23V2.07H0.92C0.411125 2.07 0 2.48113 0 2.99V22.08C0 22.5889 0.411125 23 0.92 23H22.08C22.5889 23 23 22.5889 23 22.08V2.99C23 2.48113 22.5889 2.07 22.08 2.07ZM20.93 20.93H2.07V10.005H20.93V20.93ZM2.07 8.05V4.14H5.75V5.52C5.75 5.6465 5.8535 5.75 5.98 5.75H7.59C7.7165 5.75 7.82 5.6465 7.82 5.52V4.14H15.18V5.52C15.18 5.6465 15.2835 5.75 15.41 5.75H17.02C17.1465 5.75 17.25 5.6465 17.25 5.52V4.14H20.93V8.05H2.07Z"
          fill="black"
          fill-opacity="0.25"
        />
      </svg>
      <div id="date">
        <p>${schedule.date}</p>
        <p>${schedule.time}.00 WIB</p>
      </div>
    </div>
    <h5>Menunggu</h5>

    <button type="button" class="btn pesan-btn">Pesan</button>
  </div>
</div>
</div>
`;
});
