import { Client } from "pg";

export const client: Client = new Client({
  user: "pedro",
  host: "localhost",
  port: 5432,
  password: "1234",
  database: "locadora",
});

export const startDatabase = async (): Promise<void> => {
  await client.connect();
  console.log("Database connected");
};
