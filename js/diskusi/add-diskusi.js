function getData() {
  let keyword = document.querySelector(".keyword-discussion").value;
  let description = document.querySelector(".discussion").value;

  return { keyword, description };
}

async function submit() {
  const data = getData();

  if (!data.keyword || !data.description) {
    alert("Tolong lengkapi detail diskusi!");
  } else {
    try {
      const username = localStorage.getItem("username");
      const avatar = localStorage.getItem("avatar");
      const createdAt = new Date().toISOString();
      
      const response = await fetch(
        "https://652935bd55b137ddc83e6345.mockapi.io/discussion",
        {
          method: "POST",

          body: JSON.stringify({ ...data, liked: 0, username, createdAt, avatar }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      if (response.status !== 201) {
        alert("Diskusi kamu gagal diunggah!");
        console.error(response);
        return;
      }

      alert("Diskusi kamu sudah diunggah!");
      window.location.href = "diskusi.html";

      return true;
    } catch (error) {
      alert("Diskusi kamu gagal diunggah!");
      console.log(error);

      return true;
    }
  }
}

const button = document.querySelector("#button button");

button.addEventListener("click", (e) => {
  e.preventDefault();
  if (localStorage.getItem("login")) {
    submit();
  } else {
    alert("Kamu harus login terlebih dahulu!");
  }
});
