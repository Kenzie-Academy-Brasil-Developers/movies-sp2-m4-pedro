import { NextFunction, Request, Response } from "express";
import { QueryResult } from "pg";
import format from "pg-format";
import { TMovies } from "./interfaces";
import { client } from "./database";

const ensureMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM movies
    WHERE id = %L
    `,
    id
  );

  const queryResult: QueryResult<TMovies> = await client.query(queryString);

  if (queryResult.rowCount === 0) {
    return res.status(404).json({
      error: "Movie not found!",
    });
  }

  return next();
};

const checkIfNameAlreadyExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  return res.status(409).json();
};

export { ensureMovieExists };
