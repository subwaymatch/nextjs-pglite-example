import { PGlite } from "@electric-sql/pglite";

const pg = new PGlite();

addEventListener("message", async (event: MessageEvent<string>) => {
  console.log(event);

  const query = "SELECT 1 + 2 AS result;";
  const queryResult = await pg.exec(query);

  console.log("Query Result: ", JSON.stringify(queryResult));
  postMessage(JSON.stringify(queryResult));
});
