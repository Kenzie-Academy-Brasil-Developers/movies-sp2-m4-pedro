import express, { Application } from "express";
import { startDatabase } from "./database";
import {
  createMovies,
  deleteMovies,
  listAllMovies,
  listEspecificMovie,
  updateMovies,
} from "./logic";

const app: Application = express();
app.use(express.json());

app.post("/movies", createMovies);
app.get("/movies", listAllMovies);
app.get("/movies/:id", listEspecificMovie);
app.patch("/movies", updateMovies);
app.delete("/movies", deleteMovies);

const HOST: string = "localhost";
const PORT: number = 3000;
const runningMessage: string = `Server running at http://${HOST}:${PORT}`;
app.listen(PORT, async () => {
  await startDatabase();
  console.log(runningMessage);
});
