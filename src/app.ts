import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createMovies,
  deleteMovies,
  listMovies,
  listSpecificMovies,
  updateMovies,
} from "./logic";
import { checkIfNameAlreadyExists, ensureMovieExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies", checkIfNameAlreadyExists, createMovies);
app.get("/movies", listMovies);
app.get("/movies/:id", ensureMovieExists, listSpecificMovies);
app.patch(
  "/movies/:id",
  ensureMovieExists,
  checkIfNameAlreadyExists,
  updateMovies
);
app.delete("/movies/:id", ensureMovieExists, deleteMovies);

const HOST: string = "localhost";
const PORT: number = 3000;
const runningMessage: string = `Server running at http://${HOST}:${PORT}`;
app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMessage);
});
