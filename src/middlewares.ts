import { Request } from "express";

const notFound = 404;
const conflict = 409;

export const ensureMovieExists = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return res.json();
};
