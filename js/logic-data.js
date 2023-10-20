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

export { getDoctors, getDetailDoctor, getDiscussion, getDiscussionById };
