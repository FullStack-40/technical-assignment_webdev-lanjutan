// dokter
async function getDoctors(name = null) {
  try {
    const url = new URL("https://652935bd55b137ddc83e6345.mockapi.io/doctors");

    if (name !== null) {
      url.searchParams.append("name", name);
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getDetailDoctor(id) {
  try {
    const response = await fetch(
      `https://652935bd55b137ddc83e6345.mockapi.io/doctors/${id}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// diskusi
async function getDiscussion(description = null) {
  const url = new URL("https://652935bd55b137ddc83e6345.mockapi.io/discussion");

  if (description !== null) {
    url.searchParams.append("description", description);
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function getDiscussionById(id) {
  try {
    const url = "https://652935bd55b137ddc83e6345.mockapi.io/discussion/" + id;
    const response = await fetch(url);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}

// autentikasi
async function getUserByEmail(email) {
  const url = new URL("https://6532406c4d4c2e3f333dd8e3.mockapi.io/users");
  url.searchParams.append("email", email);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function addUser(data) {
  const url = "https://6532406c4d4c2e3f333dd8e3.mockapi.io/users";
  await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

async function updateUser(id, data) {
  const url = "https://6532406c4d4c2e3f333dd8e3.mockapi.io/users/" + id;
  await fetch(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

export {
  getDoctors,
  getDetailDoctor,
  getDiscussion,
  getDiscussionById,
  addUser,
  getUserByEmail,
  updateUser,
};
