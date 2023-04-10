import { Request, Response } from "express";
import { TMovies, TMoviesRequest } from "./interfaces";
import format from "pg-format";
import { QueryResult } from "pg";
import { client } from "./database";

const createMovies = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMoviesRequest = req.body;

  const queryString: string = format(
    `
    INSERT INTO movies (%I)
    VALUES (%L)  
    RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload)
  );

  const queryResult: QueryResult<TMovies> = await client.query(queryString);

  return res.status(201).json(queryResult.rows[0]);
};

const listAllMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const queryString: string = format(
    `
    SELECT * FROM movies;
    `
  );

  const queryResult: QueryResult<TMovies> = await client.query(queryString);

  return res.status(200).json(queryResult.rows);
};

const listSpecificMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    SELECT * FROM movies
    WHERE id = %L
    `,
    id
  );

  const queryResult: QueryResult<TMovies> = await client.query(queryString);

  return res.status(200).json(queryResult.rows[0]);
};

const updateMovies = async (req: Request, res: Response): Promise<Response> => {
  const payload: TMoviesRequest = req.body;
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
    UPDATE movies
    SET(%I) = ROW(%L)
    WHERE id = %L
    RETURNING *;
    `,
    Object.keys(payload),
    Object.values(payload),
    id
  );

  const queryResult: QueryResult<TMovies> = await client.query(queryString);
  console.log(queryResult);

  return res.status(200).json(queryResult.rows[0]);
};

const deleteMovies = async (req: Request, res: Response): Promise<Response> => {
  const id: number = Number(req.params.id);

  const queryString: string = format(
    `
  DELETE FROM movies
  WHERE id = %L
  `,
    id
  );

  await client.query(queryString);

  return res.status(204).send();
};

export {
  createMovies,
  listAllMovies,
  listSpecificMovies,
  updateMovies,
  deleteMovies,
};
