import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createMovies,
  deleteMovies,
  listAllMovies,
  listSpecificMovies,
  updateMovies,
} from "./logic";
import { ensureMovieExists } from "./middlewares";

const app: Application = express();
app.use(express.json());

app.post("/movies", createMovies);
app.get("/movies", listAllMovies);
app.get("/movies/:id", ensureMovieExists, listSpecificMovies);
app.patch("/movies/:id", ensureMovieExists, updateMovies);
app.delete("/movies/:id", ensureMovieExists, deleteMovies);

const HOST: string = "localhost";
const PORT: number = 3000;
const runningMessage: string = `Server running at http://${HOST}:${PORT}`;
app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMessage);
});
