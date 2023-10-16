function getData() {
  let title = document.querySelector(".title-discussion").value;
  let keyword = document.querySelector(".keyword-discussion").value;
  let discussion = document.querySelector(".discussion").value;

  return { title, keyword, discussion };
}

function submit() {
  const data = getData();

  if (!data.title || !data.keyword || !data.discussion) {
    alert("Tolong lengkapi detail diskusi!");
  } else {
    alert("Diskusi kamu sudah diunggah!");
    window.location.href = "diskusi.html";

    return true;
  }
}

const button = document.querySelector("#button button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  submit();
});
