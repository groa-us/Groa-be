const db = require("../../../database/dbConfig.js");
const prepTestDB = require("../../../helpers/prepTestDB.js");

const { addToWatched, getWatchedById } = require("./watched.js");

beforeEach(prepTestDB);
beforeEach(async () => await db("user_letterboxd_watched").del());

const watched1 = {
  date: new Date("2012-09-20" + "Z"),
  name: "Pulp Fiction",
  year: Number("1994"),
  letterboxd_uri: String("https://letterboxd.com/film/pulp-fiction/"),
  user_id: Number(2)
};
const watched2 = {
  date: new Date("2012-09-20" + "Z"),
  name: "The Dark Knight Rises",
  year: Number("2012"),
  letterboxd_uri: String("https://letterboxd.com/film/the-dark-knight-rises/"),
  user_id: Number(2)
};

describe("letterboxd watched model", () => {
  it("should insert the provided watched into the db", async () => {
    await addToWatched(watched1);
    let watched = await getWatchedById(1);
    expect(watched.name).toBe("Pulp Fiction");
    expect(watched.year).toBe(1994);

    await addToWatched(watched2);
    watched = await getWatchedById(2);
    expect(watched.name).toBe("The Dark Knight Rises");
    expect(watched.year).toBe(2012);

    let watchedMovies = await db("user_letterboxd_watched");
    expect(watchedMovies).toHaveLength(2);
  });
  // will continue to add tests and model functions if more functionality is needed.
});