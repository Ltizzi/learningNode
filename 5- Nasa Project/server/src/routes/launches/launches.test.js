const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  test("It should respond with 200 success", async () => {
    const response = await request(app)
      .get("/launches")
      .expect(200)
      .expect("Content-Type", /json/); //app.js
    //    expect(response.status).toBe(200);
  });
});

describe("Test POST /launch", () => {
  const completeLaunchData = {
    mission: "USS Entreprise",
    rocket: "NCC 1701-D",
    destination: "Kepler-186 f",
    launchDate: "January 4, 2028",
  };

  const launchDataWithoutDate = {
    mission: "USS Entreprise",
    rocket: "NCC 1701-D",
    destination: "Kepler-186 f",
  };

  const launchDataWithInvalidDate = {
    mission: "USS Entreprise",
    rocket: "NCC 1701-D",
    destination: "Kepler-186 f",
    launchDate: "zoot",
  };
  test("It should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches/new")
      .send(completeLaunchData)
      .expect("Content-Type", /json/)
      .expect(201);

    //dates

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);

    expect(response.body).toMatchObject(launchDataWithoutDate);
  });

  test("It should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches/new")
      .send(launchDataWithoutDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "launch data cant be null",
    });
  });

  test("It should catch invalid dates", async () => {
    const response = await request(app)
      .post("/launches/new")
      .send(launchDataWithInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "invalid launch date",
    });
  });
});
