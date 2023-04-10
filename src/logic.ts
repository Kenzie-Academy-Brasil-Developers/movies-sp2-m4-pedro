import { Request, Response } from "express";
import { TMovies, TMoviesRequest } from "./interfaces";
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
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

const listMovies = async (req: Request, res: Response): Promise<Response> => {
  const category: any = req.query.category;
  let queryString: string = "";
  let queryResult: QueryResult;

  if (category) {
    queryString = `
      SELECT * FROM movies
      WHERE category = $1;
      `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [category],
    };
    queryResult = await client.query(queryConfig);

    if (queryResult.rowCount === 0) {
      queryString = `
    SELECT * FROM movies;
    `;
      queryResult = await client.query(queryString);
    }
  } else {
    queryString = `
    SELECT * FROM movies;
    `;
    queryResult = await client.query(queryString);
  }

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
  listMovies,
  listSpecificMovies,
  updateMovies,
  deleteMovies,
};
