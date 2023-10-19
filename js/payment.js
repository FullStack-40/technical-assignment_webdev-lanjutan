const backBtn = document.querySelector(".back");
const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));

backBtn.addEventListener("click", () => {
  window.location.href = `../dokter/detail-dokter.html?${bookingInfo.doctor.id}`;
});

const payBtn = document.querySelector(".pay");

payBtn.addEventListener("click", () => {
  if (!localStorage.getItem("login")) {
    alert("Anda harus login terlebih dahulu");
    return;
  }

  const paymentMethod = document.getElementById("payment-method").value;

  if (paymentMethod === "none") {
    alert("Silahkan pilih metode pembayaran terlebih dahulu!");
    return;
  }

  bookingInfo["paymentMethod"] = paymentMethod;
  localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
});

createPaymentInformationCard();

function createPaymentInformationCard() {
  const paymentInformationContainer = document.getElementById(
    "payment-information"
  );

  paymentInformationContainer.innerHTML = `
        <div class="d-flex align-items-center justify-content-center gap-3">
            <img src=${bookingInfo.doctor.imageURL} width="100" alt=${
    bookingInfo.doctor.name
  } class="rounded" />
            <div>
            <h3>${bookingInfo.doctor.name}</h3>
            <span>${bookingInfo.doctor.specialist}</span>

            <div class="d-flex gap-1 align-items-center">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                >
                <path
                    d="M10 0C8.68678 0 7.38642 0.258658 6.17317 0.761205C4.95991 1.26375 3.85752 2.00035 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10C0 12.6522 1.05357 15.1957 2.92893 17.0711C3.85752 17.9997 4.95991 18.7362 6.17317 19.2388C7.38642 19.7413 8.68678 20 10 20C12.6522 20 15.1957 18.9464 17.0711 17.0711C18.9464 15.1957 20 12.6522 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7362 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM14.2 14.2L9 11V5H10.5V10.2L15 12.9L14.2 14.2Z"
                    fill="black"
                />
                </svg>
                <span>${bookingInfo.time}:00 WIB, ${bookingInfo.date}</span>
            </div>
            </div>
        </div>
        </div>
        <div class="row mt-5" id="detail-payment">
        <h2>Rincian Biaya</h2>
        <div class="d-flex justify-content-between">
            <h5>Sesi Konsultasi</h5>
            <h5>Rp. ${(bookingInfo.doctor.price / 1000).toFixed(3)}</h5>
        </div>
        <div class="d-flex justify-content-between">
            <h5>Biaya Layanan</h5>
            <h5>Rp. 10.000</h5>
        </div>
        <div class="d-flex justify-content-between">
            <h5>Total</h5>
            <h5>Rp. ${((bookingInfo.doctor.price + 10000) / 1000).toFixed(
              3
            )}</h5>
        </div>
        </div>
    `;
}
