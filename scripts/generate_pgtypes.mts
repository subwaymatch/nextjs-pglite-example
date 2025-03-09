import { PGlite } from "@electric-sql/pglite";
import fs from "node:fs";
import path from "node:path";

const db = new PGlite();

const query = "SELECT oid, typname, typcategory FROM pg_type;";
const queryResult = await db.exec(query);

// Ensure the lib directory exists
const libDir = path.join(process.cwd(), "lib");
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
}

// Write the result to lib/pgtypes.json
const outputPath = path.join(libDir, "pgTypes.json");
fs.writeFileSync(outputPath, JSON.stringify(queryResult[0]["rows"], null, 2));

console.log(`Query result written to ${outputPath}`);
