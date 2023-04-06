import { Request, Response } from "express";
import { IMovieResult } from "./interfaces";
import { client } from "./database";
import format from "pg-format";

const ok = 200;
const created = 201;
const noContent = 204;

export const createMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieBody = req.body;

  console.log(movieBody);
  const queryString = format(
    `
    INSERT INTO movies (%I)
    VALUES (%L)
    RETURNING *;
    `,
    Object.keys(movieBody),
    Object.values(movieBody)
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const createdMovie = queryResult.rows[0];

  return res.status(created).json(createdMovie);
};

export const listAllMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString = `
    SELECT * FROM movies;
`;

  const queryResult: IMovieResult = await client.query(queryString);
  const movies = queryResult.rows;

  return res.status(ok).json(movies);
};

export const listEspecificMovie = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;

  const queryString = format(
    `
    SELECT * FROM movies
    WHERE id = %L;
    `,
    id
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const movie = queryResult.rows[0];

  return res.status(ok).json(movie);
};

export const updateMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.params.id;
  const movieData = req.body;

  const queryString = format(
    `
    UPDATE movies
    SET(%I) = ROW(%L)
    WHERE id = %L
    RETURNING *;
    `,
    Object.keys(movieData),
    Object.values(movieData),
    id
  );

  const queryResult: IMovieResult = await client.query(queryString);
  const updatedMovie = queryResult.rows[0];

  return res.status(ok).send(updatedMovie);
};

export const deleteMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = req.body.id;

  const queryString = format(
    `
    DELETE FROM movies 
    WHERE id = %L;
    `,
    id
  );

  await client.query(queryString);

  return res.status(noContent).send();
};
