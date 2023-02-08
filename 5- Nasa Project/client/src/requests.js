const URL = "http://localhost:4246/v1";

export async function getPlanets() {
  try {
    const data = await fetch(`${URL}/planets`).then((response) => {
      return response.json();
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export async function getAllLaunches() {
  try {
    const data = await fetch(`${URL}/launches`).then((response) => {
      return response.json();
      // return fetchedLaunches.sort((a, b) => {
      //   return a.flightNumber - b.flightNumber;
      // });
    });
    return data;
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
export async function postLaunch(data) {
  try {
    await fetch(`${URL}/launches/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => response.json());
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

export async function deleteLaunch(flightNumber) {
  try {
    await fetch(`${URL}/launches/delete/${flightNumber}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return {
      ok: false,
    };
  }
}

const httpService = {
  getPlanets,
  getAllLaunches,
  postLaunch,
};

export default httpService;
