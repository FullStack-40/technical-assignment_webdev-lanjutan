const bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));
const utcDate = new Date();
const wibDate = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Jakarta",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
}).format(utcDate);

const paymentDate = document.getElementById("payment-date");
paymentDate.textContent = wibDate;

const noRef = document.getElementById("no-ref");
noRef.textContent = generateRandomString();

const fundsMethod = document.getElementById("funds-method");
const funds = document.getElementById("funds");

fundsMethod.textContent = bookingInfo.paymentMethod;
funds.textContent = `Rp. ${((bookingInfo.doctor.price + 10000) / 1000).toFixed(
  3
)}`;

const nextBtn = document.querySelector(".next-btn");
nextBtn.addEventListener("click", () => {
  console.log("clicked");

  window.location.href = "../konsultasi/daftar-konsultasi.html";
});

function generateRandomString() {
  const currentTimestamp = Math.floor(new Date().getTime() / 1000);

  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let randomString = `${currentTimestamp}`;
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
