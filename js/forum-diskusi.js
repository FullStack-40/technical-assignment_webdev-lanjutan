const discussionContainer = document.querySelector("#discussion-container");
localStorage.setItem("avatar", "https://imgur.com/8d7uj9p.jpg")
getDiscussion();

async function getDiscussion() {
  const searchDiscussion = document.getElementById("search-discussion");
  searchDiscussion.addEventListener("input", async () => {
    const url = new URL(
      "https://652935bd55b137ddc83e6345.mockapi.io/discussion"
    );
    url.searchParams.append("description", searchDiscussion.value);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      if (response.ok) {
        const sort = localStorage.getItem("sort");
        const discussions = await response.json();
        if (sort === "newest") {
          discussions.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else {
          discussions.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
        }

        document.querySelector(".newest").addEventListener("click", () => {
          localStorage.setItem("sort", "newest");
          sortByTimeDescending(discussions);
        });

        document.querySelector(".oldest").addEventListener("click", () => {
          localStorage.setItem("sort", "oldest");
          sortByTimeAscending(discussions);
        });

        discussionContainer.innerHTML = "";
        for (item of discussions) {
          const container = createDiscussionCard(item);
          discussionContainer.appendChild(container);
        }
      } else {
        console.error(response.status);
      }
    } catch (error) {
      console.error(error);
    }
  });

  try {
    discussionContainer.innerHTML = "";
    const data = await fetch(
      "https://652935bd55b137ddc83e6345.mockapi.io/discussion",
      {
        method: "GET",
      }
    );

    const sort = localStorage.getItem("sort");
    const result = await data.json();
    if (sort === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    let keywords = {};

    for (item of result) {
      if (item.keyword in keywords) {
        keywords[item.keyword] += 1;
      } else {
        keywords[item.keyword] = 1;
      }
      const container = createDiscussionCard(item);
      discussionContainer.appendChild(container);
    }

    createKeywordContainer(keywords);

    document.querySelector(".newest").addEventListener("click", () => {
      localStorage.setItem("sort", "newest");
      sortByTimeDescending(result);
    });

    document.querySelector(".oldest").addEventListener("click", () => {
      localStorage.setItem("sort", "oldest");
      sortByTimeAscending(result);
    });
  } catch (error) {
    console.log(error);
  }
}

function createKeywordContainer(keywords) {
  const keywordContainer = document.querySelector(".keyword-list");
  for (let keyword in keywords) {
    const span = document.createElement("span");
    span.className = "d-inline-block py-1 px-2 text-light";
    span.textContent = `#${keyword}`;
    keywordContainer.append(span);
  }
}

function createDiscussionCard(item) {
  const date = new Date(item.createdAt);
  const now = new Date();
  const timeDifferent = now.getTime() - date.getTime();
  const minutes = Math.floor(timeDifferent / (1000 * 60));

  let timeText;
  if (minutes < 1) {
    timeText = "Baru saja";
  } else if (minutes < 60) {
    timeText = `${minutes} menit yang lalu`;
  } else if (minutes >= 60 && minutes < 1440) {
    timeText = `${Math.floor(minutes / 60)} jam yang lalu`;
  } else if (minutes >= 1440 && minutes < 10080) {
    timeText = `${Math.floor(minutes / 1440)} hari yang lalu`;
  } else if (minutes >= 10080 && minutes < 43800) {
    timeText = `${Math.floor(minutes / 10080)} minggu yang lalu`;
  } else {
    timeText = `${Math.floor(minutes / 43800)} bulan yang lalu`;
  }

  const container = document.createElement("div");

  const card = document.createElement("div");
  card.className = "card";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";
  cardBody.id = item.username.split(" ")[0].toLowerCase();

  const header = document.createElement("div");
  header.className = "header d-flex align-items-center mb-3";
  const headerImg = document.createElement("img");
  headerImg.src = item.avatar;
  headerImg.width = "35";
  headerImg.alt = item.username;

  const name = document.createElement("h3");
  name.className = "card-title mb-0 mx-3";
  name.textContent = item.username;

  const time = document.createElement("h6");
  time.className = "mb-0";
  time.textContent = timeText;

  const description = document.createElement("a");

  description.href = "./detail-diskusi.html?" + item.id;
  description.className = "card-text text-decoration-none text-dark";
  description.textContent = item.description;

  const footer = document.createElement("div");
  footer.className = "d-flex gap-4 mt-5";

  const replyContainer = document.createElement("div");
  replyContainer.className = "reply-container";
  const replyWrapper = document.createElement("a");
  replyWrapper.href = "./detail-diskusi.html?" + item.id;
  replyWrapper.innerHTML += `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M1.5625 23.6497V2.08301H23.4375V18.7497H7.1625L1.5625 23.6497ZM3.64583 19.058L6.37917 16.6663H21.3542V4.16634H3.64583V19.058ZM13.5458 11.458H11.4583V9.37051H13.5458V11.458ZM8.3375 11.458H6.25V9.37051H8.3375V11.458ZM18.7542 11.458H16.6667V9.37051H18.7542V11.458Z"
          fill="black"
        />
      </svg>
      `;

  const replyTextWrapper = document.createElement("a");
  replyTextWrapper.href = "./detail-diskusi.html?" + item.id;
  const replyText = document.createElement("p");
  replyText.className = "mb-0";
  replyText.textContent = "Balas";

  const shareContainer = document.createElement("div");
  shareContainer.className = "share-container";
  const shareWrapper = document.createElement("a");
  shareWrapper.href = "#";
  shareWrapper.innerHTML += `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M18.75 22.9163C17.8819 22.9163 17.1441 22.6125 16.5365 22.0049C15.9288 21.3972 15.625 20.6594 15.625 19.7913C15.625 19.6698 15.6337 19.5438 15.651 19.4132C15.6684 19.2827 15.6944 19.1656 15.7292 19.0622L8.38542 14.7913C8.09028 15.0518 7.76042 15.2559 7.39583 15.4038C7.03125 15.5518 6.64931 15.6254 6.25 15.6247C5.38194 15.6247 4.6441 15.3209 4.03646 14.7132C3.42882 14.1056 3.125 13.3677 3.125 12.4997C3.125 11.6316 3.42882 10.8938 4.03646 10.2861C4.6441 9.67849 5.38194 9.37467 6.25 9.37467C6.64931 9.37467 7.03125 9.44863 7.39583 9.59655C7.76042 9.74447 8.09028 9.94829 8.38542 10.208L15.7292 5.93717C15.6944 5.83301 15.6684 5.71599 15.651 5.58613C15.6337 5.45627 15.625 5.33023 15.625 5.20801C15.625 4.33995 15.9288 3.60211 16.5365 2.99447C17.1441 2.38683 17.8819 2.08301 18.75 2.08301C19.6181 2.08301 20.3559 2.38683 20.9635 2.99447C21.5712 3.60211 21.875 4.33995 21.875 5.20801C21.875 6.07606 21.5712 6.81391 20.9635 7.42155C20.3559 8.02919 19.6181 8.33301 18.75 8.33301C18.3507 8.33301 17.9687 8.2594 17.6042 8.11217C17.2396 7.96495 16.9097 7.76079 16.6146 7.49967L9.27083 11.7705C9.30555 11.8747 9.3316 11.992 9.34896 12.1226C9.36632 12.2531 9.375 12.3788 9.375 12.4997C9.375 12.6212 9.36632 12.7472 9.34896 12.8778C9.3316 13.0084 9.30555 13.1254 9.27083 13.2288L16.6146 17.4997C16.9097 17.2393 17.2396 17.0354 17.6042 16.8882C17.9687 16.741 18.3507 16.667 18.75 16.6663C19.6181 16.6663 20.3559 16.9702 20.9635 17.5778C21.5712 18.1854 21.875 18.9233 21.875 19.7913C21.875 20.6594 21.5712 21.3972 20.9635 22.0049C20.3559 22.6125 19.6181 22.9163 18.75 22.9163ZM18.75 6.24967C19.0451 6.24967 19.2927 6.14967 19.4927 5.94967C19.6927 5.74967 19.7924 5.50245 19.7917 5.20801C19.7917 4.91287 19.6917 4.6653 19.4917 4.4653C19.2917 4.2653 19.0444 4.16565 18.75 4.16634C18.4549 4.16634 18.2073 4.26634 18.0073 4.46634C17.8073 4.66634 17.7076 4.91356 17.7083 5.20801C17.7083 5.50315 17.8083 5.75072 18.0083 5.95072C18.2083 6.15072 18.4556 6.25037 18.75 6.24967ZM6.25 13.5413C6.54514 13.5413 6.79271 13.4413 6.99271 13.2413C7.19271 13.0413 7.29236 12.7941 7.29167 12.4997C7.29167 12.2045 7.19167 11.957 6.99167 11.757C6.79167 11.557 6.54444 11.4573 6.25 11.458C5.95486 11.458 5.70729 11.558 5.50729 11.758C5.30729 11.958 5.20764 12.2052 5.20833 12.4997C5.20833 12.7948 5.30833 13.0424 5.50833 13.2424C5.70833 13.4424 5.95556 13.542 6.25 13.5413ZM18.75 20.833C19.0451 20.833 19.2927 20.733 19.4927 20.533C19.6927 20.333 19.7924 20.0858 19.7917 19.7913C19.7917 19.4962 19.6917 19.2486 19.4917 19.0486C19.2917 18.8486 19.0444 18.749 18.75 18.7497C18.4549 18.7497 18.2073 18.8497 18.0073 19.0497C17.8073 19.2497 17.7076 19.4969 17.7083 19.7913C17.7083 20.0865 17.8083 20.3341 18.0083 20.534C18.2083 20.7341 18.4556 20.8337 18.75 20.833Z"
          fill="black"
        />
      </svg>
      `;
  const shareTextWrapper = document.createElement("a");
  shareTextWrapper.href = "#";
  const shareText = document.createElement("p");
  shareText.className = "mb-0";
  shareText.textContent = "Bagikan";

  const likeContainer = document.createElement("div");
  likeContainer.id = "like-container";

  const likeWrapper = document.createElement("label");
  likeWrapper.htmlFor = "like-btn-" + item.id;
  likeWrapper.innerHTML += `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
      >
        <path
          d="M22.9328 13.1048C23.4015 12.4854 23.661 11.7264 23.661 10.9368C23.661 9.68403 22.9607 8.49821 21.8335 7.83693C21.5433 7.66672 21.2129 7.57714 20.8764 7.57745H14.1856L14.353 4.14832C14.3921 3.31964 14.0991 2.53281 13.5299 1.93292C13.2506 1.63724 12.9135 1.40198 12.5397 1.24169C12.1659 1.0814 11.7631 0.999484 11.3563 1.001C9.90545 1.001 8.62197 1.97756 8.23692 3.37544L5.84016 12.0529H2.23246C1.7386 12.0529 1.3396 12.4519 1.3396 12.9458V23.102C1.3396 23.5959 1.7386 23.9949 2.23246 23.9949H19.0098C19.2665 23.9949 19.5176 23.9446 19.7492 23.8442C21.0773 23.2778 21.9339 21.9804 21.9339 20.5406C21.9339 20.1891 21.8837 19.8431 21.7832 19.5083C22.252 18.8888 22.5115 18.1299 22.5115 17.3403C22.5115 16.9887 22.4613 16.6427 22.3608 16.3079C22.8296 15.6885 23.089 14.9296 23.089 14.1399C23.0835 13.7884 23.0332 13.4396 22.9328 13.1048V13.1048ZM3.34853 21.9859V14.0618H5.60857V21.9859H3.34853ZM21.1052 12.1366L20.4942 12.6667L20.882 13.3754C21.0098 13.6089 21.076 13.871 21.0745 14.1372C21.0745 14.5975 20.8736 15.0356 20.5277 15.3369L19.9166 15.8671L20.3044 16.5758C20.4322 16.8092 20.4985 17.0714 20.497 17.3375C20.497 17.7979 20.2961 18.2359 19.9501 18.5373L19.339 19.0674L19.7269 19.7761C19.8547 20.0096 19.9209 20.2717 19.9194 20.5378C19.9194 21.1628 19.5511 21.7264 18.9819 21.9831H7.39429V13.9725L10.1705 3.91394C10.2421 3.65613 10.3958 3.42868 10.6082 3.26605C10.8207 3.10343 11.0804 3.01449 11.348 3.01272C11.56 3.01272 11.7693 3.0741 11.9367 3.19966C12.2129 3.40613 12.3608 3.71863 12.3441 4.05066L12.0762 9.58638H20.8485C21.3452 9.89051 21.6521 10.4039 21.6521 10.9368C21.6521 11.3972 21.4512 11.8325 21.1052 12.1366Z"
          fill="black"
          fill-opacity="0.85"
        />
      </svg>
      `;

  const likeBtn = document.createElement("input");
  likeBtn.style.display = "none";
  likeBtn.className = "like";
  likeBtn.name = "like";
  likeBtn.type = "checkbox";
  likeBtn.id = "like-btn-" + item.id;

  const likeCount = document.createElement("p");
  likeCount.style.marginBottom = 0;
  likeCount.textContent = item.liked;
  likeCount.id = "like-count-" + item.id;

  likeContainer.append(likeBtn, likeWrapper, likeCount);

  likeBtn.addEventListener("click", async () => {
    if (localStorage.getItem("login")) {
      if (likeBtn.checked) {
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        likeWrapper.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M22.9328 13.1048C23.4015 12.4854 23.661 11.7264 23.661 10.9368C23.661 9.68403 22.9607 8.49821 21.8335 7.83693C21.5433 7.66672 21.2129 7.57714 20.8764 7.57745H14.1856L14.353 4.14832C14.3921 3.31964 14.0991 2.53281 13.5299 1.93292C13.2506 1.63724 12.9135 1.40198 12.5397 1.24169C12.1659 1.0814 11.7631 0.999484 11.3563 1.001C9.90545 1.001 8.62197 1.97756 8.23692 3.37544L5.84016 12.0529H2.23246C1.7386 12.0529 1.3396 12.4519 1.3396 12.9458V23.102C1.3396 23.5959 1.7386 23.9949 2.23246 23.9949H19.0098C19.2665 23.9949 19.5176 23.9446 19.7492 23.8442C21.0773 23.2778 21.9339 21.9804 21.9339 20.5406C21.9339 20.1891 21.8837 19.8431 21.7832 19.5083C22.252 18.8888 22.5115 18.1299 22.5115 17.3403C22.5115 16.9887 22.4613 16.6427 22.3608 16.3079C22.8296 15.6885 23.089 14.9296 23.089 14.1399C23.0835 13.7884 23.0332 13.4396 22.9328 13.1048V13.1048ZM3.34853 21.9859V14.0618H5.60857V21.9859H3.34853ZM21.1052 12.1366L20.4942 12.6667L20.882 13.3754C21.0098 13.6089 21.076 13.871 21.0745 14.1372C21.0745 14.5975 20.8736 15.0356 20.5277 15.3369L19.9166 15.8671L20.3044 16.5758C20.4322 16.8092 20.4985 17.0714 20.497 17.3375C20.497 17.7979 20.2961 18.2359 19.9501 18.5373L19.339 19.0674L19.7269 19.7761C19.8547 20.0096 19.9209 20.2717 19.9194 20.5378C19.9194 21.1628 19.5511 21.7264 18.9819 21.9831H7.39429V13.9725L10.1705 3.91394C10.2421 3.65613 10.3958 3.42868 10.6082 3.26605C10.8207 3.10343 11.0804 3.01449 11.348 3.01272C11.56 3.01272 11.7693 3.0741 11.9367 3.19966C12.2129 3.40613 12.3608 3.71863 12.3441 4.05066L12.0762 9.58638H20.8485C21.3452 9.89051 21.6521 10.4039 21.6521 10.9368C21.6521 11.3972 21.4512 11.8325 21.1052 12.1366Z" fill="#49A078"/>
    </svg>
      `;

        item.liked += 1;
        await fetch(
          "https://652935bd55b137ddc83e6345.mockapi.io/discussion/" + item.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          }
        );
      } else {
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        likeWrapper.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path d="M22.9328 13.1048C23.4015 12.4854 23.661 11.7264 23.661 10.9368C23.661 9.68403 22.9607 8.49821 21.8335 7.83693C21.5433 7.66672 21.2129 7.57714 20.8764 7.57745H14.1856L14.353 4.14832C14.3921 3.31964 14.0991 2.53281 13.5299 1.93292C13.2506 1.63724 12.9135 1.40198 12.5397 1.24169C12.1659 1.0814 11.7631 0.999484 11.3563 1.001C9.90545 1.001 8.62197 1.97756 8.23692 3.37544L5.84016 12.0529H2.23246C1.7386 12.0529 1.3396 12.4519 1.3396 12.9458V23.102C1.3396 23.5959 1.7386 23.9949 2.23246 23.9949H19.0098C19.2665 23.9949 19.5176 23.9446 19.7492 23.8442C21.0773 23.2778 21.9339 21.9804 21.9339 20.5406C21.9339 20.1891 21.8837 19.8431 21.7832 19.5083C22.252 18.8888 22.5115 18.1299 22.5115 17.3403C22.5115 16.9887 22.4613 16.6427 22.3608 16.3079C22.8296 15.6885 23.089 14.9296 23.089 14.1399C23.0835 13.7884 23.0332 13.4396 22.9328 13.1048V13.1048ZM3.34853 21.9859V14.0618H5.60857V21.9859H3.34853ZM21.1052 12.1366L20.4942 12.6667L20.882 13.3754C21.0098 13.6089 21.076 13.871 21.0745 14.1372C21.0745 14.5975 20.8736 15.0356 20.5277 15.3369L19.9166 15.8671L20.3044 16.5758C20.4322 16.8092 20.4985 17.0714 20.497 17.3375C20.497 17.7979 20.2961 18.2359 19.9501 18.5373L19.339 19.0674L19.7269 19.7761C19.8547 20.0096 19.9209 20.2717 19.9194 20.5378C19.9194 21.1628 19.5511 21.7264 18.9819 21.9831H7.39429V13.9725L10.1705 3.91394C10.2421 3.65613 10.3958 3.42868 10.6082 3.26605C10.8207 3.10343 11.0804 3.01449 11.348 3.01272C11.56 3.01272 11.7693 3.0741 11.9367 3.19966C12.2129 3.40613 12.3608 3.71863 12.3441 4.05066L12.0762 9.58638H20.8485C21.3452 9.89051 21.6521 10.4039 21.6521 10.9368C21.6521 11.3972 21.4512 11.8325 21.1052 12.1366Z" fill="black" fill-opacity="0.85"/>
    </svg>
      `;
        item.liked -= 1;
        await fetch(
          "https://652935bd55b137ddc83e6345.mockapi.io/discussion/" + item.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(item),
          }
        );
      }
    }

    likeCount.textContent = parseInt(likeCount.textContent);
  });

  shareTextWrapper.append(shareText);
  shareContainer.append(shareWrapper, shareTextWrapper);

  replyTextWrapper.append(replyText);
  replyContainer.append(replyWrapper, replyTextWrapper);
  footer.append(replyContainer, shareContainer, likeContainer);

  header.append(headerImg, name, time);
  cardBody.append(header, description, footer);
  card.appendChild(cardBody);
  container.appendChild(card);

  return container;
}

function sortByTimeAscending(result) {
  discussionContainer.innerHTML = "";

  result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  for (item of result) {
    const container = createDiscussionCard(item);
    discussionContainer.appendChild(container);
  }
}

function sortByTimeDescending(result) {
  discussionContainer.innerHTML = "";

  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  for (item of result) {
    const container = createDiscussionCard(item);
    discussionContainer.appendChild(container);
  }
}
