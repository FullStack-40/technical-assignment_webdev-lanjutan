function submit() {
  const reply = document.querySelector(".reply").value;

  if (!reply) {
    alert("Tolong tulis sesuatu terlebih dahulu!");
  } else {
    const replyContainer = document.getElementById("reply-container");
    replyContainer.innerHTML += `
    <div class="row">
    <div class="header d-flex align-items-center mb-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 45 45"
        fill="none"
      >
        <path
          d="M22.5 1.40625C10.8506 1.40625 1.40625 10.8506 1.40625 22.5C1.40625 34.1494 10.8506 43.5938 22.5 43.5938C34.1494 43.5938 43.5938 34.1494 43.5938 22.5C43.5938 10.8506 34.1494 1.40625 22.5 1.40625ZM30.4277 32.7009H15.9785V12.2991H20.2416V29.0327H30.4284L30.4277 32.7009Z"
          fill="#F0A411"
        />
      </svg>
      <h3 class="card-title mb-0 mx-3">Ahmad</h3>
      <h6 class="mb-0">Baru saja</h6>
    </div>
    <div class="card-text">
      ${reply}
    </div>
  </div>
    `;
    document.getElementById("reply-form").reset();
    return true;
  }
}

const button = document.querySelector("#button button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  submit();
});
